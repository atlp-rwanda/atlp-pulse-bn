/* eslint-disable indent */
import { Attendance } from '../models/attendance.model'
import { IntegerType, ObjectId } from 'mongodb'
import { Context } from './../context'
import mongoose, { Error, Types } from 'mongoose'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { pushNotification } from '../utils/notification/pushNotification'
import Phase from '../models/phase.model'
import { User, UserInterface } from '../models/user'
import Team from '../models/team.model'
import { CohortInterface } from '../models/cohort.model'
import { GraphQLError } from 'graphql'
import { checkLoggedInOrganization } from '../helpers/organization.helper'

interface TraineeAttendanceStatus {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
  score: '0' | '1' | '2'
}
interface TraineeAttendanceData {
  trainee: ObjectId
  status: TraineeAttendanceStatus
}
interface AttendanceInput {
  week: string
  team: string
  date?: string
  phase?: string
  trainees: TraineeAttendanceData[]
  orgToken: string
}

const validateAttendance = async (
  team: string,
  orgToken: string,
  trainees: TraineeAttendanceData[],
  context: Context
) => {
  const org = await checkLoggedInOrganization(orgToken)
  if (!org) {
    throw new Error('Orgnasation doesn\'t exist')
  }
  ;(await checkUserLoggedIn(context))(['coordinator'])
  const teamData = await Team.findById(team)
    .populate('cohort')
    .populate('cohort.phase')
  if (!teamData) {
    throw new Error('Team provided doesn\'t exist')
  }
  const phaseData = await Phase.findById(
    (teamData.cohort as CohortInterface).phase._id
  )
  if (!phaseData) {
    throw new Error('Phase provided doesn\'t exist')
  }
  trainees.forEach((trainee) => {
    if (
      trainee.status.day.toLowerCase() !== trainees[0].status.day.toLowerCase()
    ) {
      throw new GraphQLError(
        'Please make sure, you submit same date for each trainee ',
        {
          extensions: {
            code: 'INCONSISTENT_TRAINEE_ATTENDANCE_DATE',
          },
        }
      )
    }
  })
  return {
    teamData,
    phaseData,
  }
}

const returnAttendanceData = async (teamData: any) => {
  const attendances = await Attendance.find({ cohort: teamData.cohort })
    .populate('phase')
    .populate('cohort')
    .populate('teams.team')
    .populate('teams.trainees.trainee', '-password')
  const sanitizedAttendance: any[] = []
  attendances.forEach((attendance) => {
    const result = attendance.teams.find((teamAttendanceData) =>
      (teamAttendanceData.team as ObjectId).equals(teamData.id)
    )

    const filteredTrainees = result?.trainees.filter(trainee => (trainee.trainee as UserInterface).status.status !== 'drop' )

    result &&
      sanitizedAttendance.push({
        ...attendance.toObject(),
        id: attendance.id,
        cohort: {
          ...(attendance.cohort as mongoose.Document).toObject(),
          id: (attendance.cohort as mongoose.Document)._id,
        },
        phase: {
          ...(attendance.phase as mongoose.Document).toObject(),
          id: (attendance.phase as mongoose.Document)._id,
        },
        teams: [{team: {...(result.team as mongoose.Document).toObject(), id: (result.team as mongoose.Document)._id}, trainees: filteredTrainees}],
      })
  })
  return sanitizedAttendance
}

const attendanceResolver = {
  Query: {
    async getTraineeAttendanceByID(
      _: any,
      { traineeEmail }: any,
      context: Context
    ) {
      ;(await checkUserLoggedIn(context))(['trainee'])
      const attendance = await Attendance.find()

      const weeklyAttendance = attendance.map((week: any) => {
        const weekNumber = week.week
        const trainee = week.trainees.filter((trainee: any) =>
          trainee.traineeEmail.includes(traineeEmail)
        )
        const traineeAttendance = trainee[0]?.status
        return { weekNumber, traineeAttendance }
      })
      return weeklyAttendance
    },

    async getTeamAttendance(
      _: any,
      { team }: { team: string },
      context: Context
    ) {
      ;(await checkUserLoggedIn(context))(['coordinator'])
      const { userId } = (await checkUserLoggedIn(context))(['coordinator'])

      const teamData = await Team.findById(team)

      if (!teamData) {
        throw new Error('Team provided doesn\'t exist')
      }

      return returnAttendanceData(teamData)
    },

    async getAttendanceStats(_: any, args: any, context: Context) {
      ;(await checkUserLoggedIn(context))(['coordinator'])
      const { userId } = (await checkUserLoggedIn(context))(['coordinator'])
      const attendances: any = await Attendance.find({ coordinatorId: userId })

      //calculate statistic
      const attendanceStats: {
        week: any
        traineesStatistics: { traineeId: any; attendancePerc: number }[]
      }[] = []

      attendances.forEach((weekData: any) => {
        const week = weekData.week
        const trainees = weekData.trainees
        const weekAttendanceStats: {
          traineeId: any
          attendancePerc: number
        }[] = []

        // Iterate through trainees
        trainees.forEach((trainee: any) => {
          const traineeId = trainee.traineeId
          const attendanceRecods = trainee.status
          let attendedCount: any = 0
          const totalCount: any = 0

          //count attendance recods
          attendanceRecods.forEach((recods: any) => {
            if (recods.value === 2) {
              attendedCount++
            }
            // if (recods.value !== 0) {
            //   totalCount++
            // }
          })

          // calculate attendance per trainee  in one week
          const attendancePerc =
            totalCount > 0 ? (attendedCount / totalCount) * 100 : 0

          weekAttendanceStats.push({
            traineeId,
            attendancePerc: attendancePerc > 50 ? 1 : 0,
          })
        })

        attendanceStats.push({
          week,
          traineesStatistics: weekAttendanceStats,
        })
      })

      return attendanceStats
    },
  },

  Mutation: {
    async recordAttendance(
      _: any,
      { week, trainees, team, date, orgToken }: AttendanceInput,
      context: Context
    ) {
      const { teamData, phaseData } = await validateAttendance(
        team,
        orgToken,
        trainees,
        context
      )
      const attendance = await Attendance.findOne({
        phase: phaseData.id,
        week,
        cohort: teamData.cohort,
      }).populate('teams.trainees.trainee', '-password')
      const attendanceTeamIndex = attendance?.teams.findIndex(
        (teamAttendanceData) =>
          (teamAttendanceData.team as ObjectId).equals(teamData.id)
      )

      if (!attendance || attendanceTeamIndex === -1) {
        const attendants = []

        for (let i = 0; i < trainees.length; i++) {
          if (!ObjectId.isValid(trainees[i].trainee)) continue

          const traineeData = await User.findOne(
            { _id: new ObjectId(trainees[i].trainee), team: teamData.id },
            { password: 0 }
          )
          if (traineeData) {
            attendants.push({
              trainee: traineeData,
              status: [
                {
                  ...trainees[i].status,
                  date: new Date(date!),
                  day: trainees[i].status.day.toLowerCase(),
                },
              ],
            })
          }
        }

        if (!attendants.length) {
          throw new Error(
            'Invalid Ids for trainees or trainees doesn\'t belong to the team'
          )
        }

        if (!attendance) {
          const newAttendance = {
            week,
            phase: phaseData,
            cohort: teamData.cohort,
            teams: [
              {
                team: teamData,
                trainees: attendants,
              },
            ],
          }

          const savedAttendance = await Attendance.create(newAttendance)
          return savedAttendance.teams[0]
        }

        // Adding new team to week attendance
        const savedAttendance = await Attendance.findOneAndUpdate(
          { phase: phaseData.id, week, cohort: teamData.cohort },
          {
            $push: {
              teams: {
                team: teamData,
                trainees: attendants,
              },
            },
          },
          {
            new: true,
          }
        )
          .populate('teams.team')
          .populate('teams.trainees.trainee', '-password')

        return savedAttendance?.teams[savedAttendance?.teams.length - 1]
      }

      let traineeStatusUpdated = false

      for (let i = 0; i < trainees.length; i++) {
        const traineeIndex = attendance.teams[
          attendanceTeamIndex!
        ].trainees.findIndex((traineeData) =>
          (traineeData.trainee as UserInterface)._id.equals(trainees[i].trainee)
        )

        if (traineeIndex === -1) {
          const traineeData = await User.findOne(
            { _id: new ObjectId(trainees[i].trainee), team: teamData.id },
            { password: 0 }
          )
          if (traineeData) {
            ;(attendance.teams[attendanceTeamIndex!].trainees as any[]).push({
              trainee: traineeData,
              status: [
                {
                  day: trainees[i].status.day.toLowerCase() as
                    | 'mon'
                    | 'tue'
                    | 'wed'
                    | 'thu'
                    | 'fri',
                  date: new Date(date!),
                  score: trainees[i].status.score as '0' | '1' | '2',
                },
              ],
            })
          }
        } else {
          if (
            attendance.teams[attendanceTeamIndex!].trainees[traineeIndex].status
              .length === 5
          ) {
            throw new GraphQLError(
              'Attendance for all days this week has been recorded, proceed to next week!',
              {
                extensions: {
                  code: 'ATTENDANCE_WEEK_COMPLETE',
                },
              }
            )
          }

          const existingDay = attendance.teams[attendanceTeamIndex!].trainees[
            traineeIndex
          ].status.find((s) => s.day === trainees[i].status.day.toLowerCase())

          if (
            (
              attendance.teams[attendanceTeamIndex!].trainees[traineeIndex]
                .trainee as UserInterface
            )._id.equals(trainees[i].trainee) &&
            !existingDay
          ) {
            traineeStatusUpdated = true
            attendance.teams[attendanceTeamIndex!].trainees[
              traineeIndex
            ].status.push({
              day: trainees[i].status.day.toLowerCase() as
                | 'mon'
                | 'tue'
                | 'wed'
                | 'thu'
                | 'fri',
              date: new Date(date!),
              score: trainees[i].status.score,
            })
          }
        }
      }
      if (!traineeStatusUpdated) {
        throw new GraphQLError(
          'Attendance for this day has already been recorded, please proceed to another day!',
          {
            extensions: {
              code: 'ATTENDANCE_ALREADY_RECORDED',
            },
          }
        )
      }

      const savedTeamAttendance = await (
        await attendance.save()
      ).populate('teams.team')
      return savedTeamAttendance.teams[attendanceTeamIndex!]
    },

    async updateAttendance(
      _: any,
      { week, trainees, team, orgToken, phase }: AttendanceInput,
      context: Context
    ) {
      const { teamData } = await validateAttendance(
        team,
        orgToken,
        trainees,
        context
      )
      const phaseData = await Phase.findById(phase)
      
      if (!phaseData) {
        throw new Error('Phase provided doesn\'t exist')
      }
      const attendance = await Attendance.findOne({
        phase: phaseData.id,
        week,
        cohort: teamData.cohort,
      }).populate('teams.trainees.trainee', '-password')
      const teamToUpdateIndex = attendance?.teams.findIndex(
        (teamAttendanceData) =>
          (teamAttendanceData.team as ObjectId).equals(teamData.id)
      )
      if (!attendance || teamToUpdateIndex === -1) {
        throw new GraphQLError('Invalid week or team', {
          extensions: {
            code: 'UPDATE_ATTENDANCE_ERROR',
          },
        })
      }
      const teamAttendanceTrainees = attendance.teams[teamToUpdateIndex!]
      teamAttendanceTrainees.trainees.forEach((trainee) => {
        let isDropped = false;
        const traineeIndex = trainees.findIndex((sentTrainee) =>
          {
            isDropped = (trainee.trainee as UserInterface).status.status === 'drop'
            return (trainee.trainee as UserInterface)._id.equals(sentTrainee.trainee)}
        )
        if (traineeIndex === -1 && !isDropped) {
          throw new GraphQLError(
            'You sent a non-existing trainee in this attendance',
            {
              extensions: {
                code: 'UPDATE_ATTENDANCE_ERROR',
              },
            }
          )
        }
        if (traineeIndex !== -1 && !isDropped) {
          trainee.status.forEach((status) => {
            if (status.day === trainees[traineeIndex].status.day.toLowerCase()) {
              status.score = trainees[traineeIndex].status.score
            }
          })
        }
      })
      await attendance.save()
      return returnAttendanceData(teamData)
    },

    async deleteAttendance(
      _: any,
      { week, day, team }: { week: string; day: string; team: string },
      context: Context
    ) {
      ;(await checkUserLoggedIn(context))(['coordinator'])

      const teamData = await Team.findById(team)
        .populate('cohort')
        .populate('cohort.phase')

      if (!teamData) {
        throw new Error('Team provided doesn\'t exist')
      }

      const attendance = await Attendance.findOne({
        phase: (teamData?.cohort as CohortInterface).phase._id,
        week,
        cohort: teamData.cohort,
      }).populate('teams.trainees.trainee', '-password')
      const attendanceTeamIndex = attendance?.teams.findIndex(
        (teamAttendanceData) =>
          (teamAttendanceData.team as ObjectId).equals(teamData.id)
      )

      if (!attendance || attendanceTeamIndex === -1) {
        throw new Error('Can\'t find the Attendance for this day')
      }

      let removedAttendances = 0
      attendance.teams[attendanceTeamIndex!].trainees.forEach((trainee) => {
        const statusIndex = trainee.status.findIndex(
          (s) => s.day === day.toLowerCase()
        )
        if (statusIndex !== -1) {
          removedAttendances++
          trainee.status.splice(statusIndex, 1)
        }
      })

      if (removedAttendances) {
        await attendance.save()
        return returnAttendanceData(teamData)
      }

      throw new Error('Can\'t find the Attendance for this day')
    },
  },
}

export default attendanceResolver
