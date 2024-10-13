/* eslint-disable indent */
import { Attendance } from '../models/attendance.model'
import { IntegerType, ObjectId } from 'mongodb'
import { Context } from './../context'
import mongoose, { Document, Error, Types } from 'mongoose'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { pushNotification } from '../utils/notification/pushNotification'
import Phase, { PhaseInterface } from '../models/phase.model'
import { RoleOfUser, User, UserInterface } from '../models/user'
import Team, { TeamInterface } from '../models/team.model'
import { CohortInterface } from '../models/cohort.model'
import { GraphQLError } from 'graphql'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { getDateForDays } from '../utils/getDateForDays'
import { isSameWeek } from 'date-fns'

interface TraineeAttendanceStatus {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
  date: string
  score: 0 | 1 | 2
}
interface TraineeAttendanceData {
  trainee: ObjectId
  score: number
}
interface TeamAttendanceData {
  week: number
  phase: PhaseInterface
  cohort: CohortInterface
  teams: Array<{
    team: TeamInterface
    trainees: Array<{
      trainee: UserInterface
      status: Array<TraineeAttendanceStatus>
    }
    >
  }>
}

interface AttendanceInput {
  week: string
  team: string
  phase?: string
  today: boolean
  yesterday: boolean
  trainees: TraineeAttendanceData[]
  orgToken: string
}

interface TraineeAttendanceDataInterface {
  trainee?: {
    id: string;
    email: string;
    status: {
      status: string
    };
    profile: {
      name: string;
    };
  };
  score?: number;
}
interface DayInterface {
  date: string
  isValid: boolean
}
export interface WeekdaysInterface {
  mon: DayInterface;
  tue: DayInterface;
  wed: DayInterface;
  thu: DayInterface;
  fri: DayInterface;
}
interface TraineeAttendanceDayInterface {
  week: number;
  phase: {
    id: string
    name: string
  };
  dates: WeekdaysInterface;
  days: {
    mon: TraineeAttendanceDataInterface[];
    tue: TraineeAttendanceDataInterface[];
    wed: TraineeAttendanceDataInterface[];
    thu: TraineeAttendanceDataInterface[];
    fri: TraineeAttendanceDataInterface[];
  };
}

interface AttendanceWeeksInterface {
  phase: {
    name: string,
    id: string
  }
  weeks: Array<number>
}

const formatAttendanceData = (data: TeamAttendanceData[], teamData: TeamInterface) => {
  const tempPhases: PhaseInterface[] = [];
  let lastDayDate = '';
  const attendanceWeeks: AttendanceWeeksInterface[] = []

  const attendanceResult: TraineeAttendanceDayInterface[] = [];
  data.forEach(attendance => {
    let hasData = false;

    const result: TraineeAttendanceDayInterface = {
      week: attendance.week,
      dates: {
        mon: {
          date: '',
          isValid: false
        },
        tue: {
          date: '',
          isValid: false
        },
        wed: {
          date: '',
          isValid: false
        },
        thu: {
          date: '',
          isValid: false
        },
        fri: {
          date: '',
          isValid: false
        },
      },
      phase: {
        id: attendance.phase._id.toString(),
        name: attendance.phase.name
      },
      days: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
      },
    };

    // Store all attendance weeks
    let isWeekSet = false
    attendanceWeeks.forEach((week, index) => {
      if (week.phase.id === attendance.phase._id.toString()) {
        isWeekSet = true;
        attendanceWeeks[index].weeks.push(attendance.week)
      }
    })

    !isWeekSet && attendanceWeeks.push({
      phase: {
        id: attendance.phase._id.toString(),
        name: attendance.phase.name
      },
      weeks: [attendance.week]
    })

    if (!tempPhases.find((p) => p._id.equals(attendance.phase._id)))
      tempPhases.push(attendance.phase);

    let date = '';

    attendance.teams[0].trainees.forEach((traineeData) => {
      if (traineeData.status.length && traineeData.trainee.status.status !== 'drop') {
        hasData = true;
        traineeData.status.forEach((traineeStatus) => {
          if (traineeStatus.date && !date) {
            date = traineeStatus.date;
          }

          result.days[
            traineeStatus.day as 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
          ].push({
            trainee: {
              ...(traineeData.trainee as unknown as Document).toObject(),
              profile: {
                name: (traineeData.trainee.profile! as any).name
              },
              id: traineeData.trainee._id.toString(),
            },
            score: traineeStatus.score,
          });
        });
      }
    });
    result.dates = (date && hasData) ? getDateForDays(date) : getDateForDays(Date.now().toString());
    lastDayDate = result.dates.fri.date;
    attendanceResult.push(result);
  });

  const phaseIds = tempPhases.map((phase) => phase._id.toString());
  let isDataSet = false;
  if (!data.length) {
    isDataSet = true;
    attendanceWeeks.push({
      phase: {
        id: teamData.cohort!.phase._id.toString(),
        name: teamData.cohort!.phase.name
      },
      weeks: [1]
    })
    attendanceResult.push(
      {
        week: 1,
        phase: {
          id: teamData.cohort!.phase._id.toString(),
          name: teamData.cohort!.phase.name
        },
        dates: getDateForDays(Date.now().toString()),
        days: {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
        },
      },
    )
  }

  if (!phaseIds.includes(teamData.cohort!.phase._id.toString())) {
    tempPhases.push(teamData.cohort!.phase);

    if (!isDataSet) {
      attendanceWeeks.push({
        phase: {
          id: teamData.cohort!.phase._id.toString(),
          name: teamData.cohort!.phase.name
        },
        weeks: [1]
      })
      attendanceResult.push({
        week: 1,
        phase: {
          id: teamData.cohort!.phase._id.toString(),
          name: teamData.cohort!.phase.name
        },
        dates: getDateForDays(Date.now().toString()),
        days: {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
        },
      })
    }
  }
  if (!isDataSet && lastDayDate && phaseIds.includes(teamData.cohort!.phase._id.toString())) {
    const isInSameWeek = isSameWeek(
      new Date(lastDayDate),
      new Date(Date.now()),
      {
        weekStartsOn: 1,
      }
    )

    const attendanceWeekIndex = attendanceWeeks.findIndex(week => week.phase.id === teamData.cohort!.phase._id.toString());

    if (!isInSameWeek && attendanceWeekIndex !== -1) {
      const newWeek = attendanceWeeks[attendanceWeekIndex].weeks[attendanceWeeks[attendanceWeekIndex].weeks.length - 1] + 1;
      attendanceWeeks[attendanceWeekIndex].weeks.push(newWeek)
      attendanceResult.push({
        week: newWeek,
        phase: {
          id: teamData.cohort!.phase._id.toString(),
          name: teamData.cohort!.phase.name
        },
        dates: getDateForDays(Date.now().toString()),
        days: {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
        },
      })
    }
  }

  const today = new Date();
  const yesterday = new Date().getDay() === 1 ? new Date().setDate(new Date().getDate() - 3) : new Date().setDate(new Date().getDate() - 1);

  return { attendanceWeeks, attendance: attendanceResult, today, yesterday }
};

const validateAttendance = async (
  team: string,
  orgToken: string,
  trainees: TraineeAttendanceData[],
  context: Context
) => {
  const org = await checkLoggedInOrganization(orgToken)
  if (!org) {
    throw new Error('Organisation doesn\'t exist')
  }
  ; (await checkUserLoggedIn(context))(['coordinator'])
  const teamData = await Team.findById(team)
    .populate({
      path: 'members',
      match: { role: 'trainee' }
    })
    .populate('cohort')
    .populate('cohort.phase')
  if (!teamData) {
    throw new Error("Team provided doesn't exist")
  }

  const phaseData = await Phase.findById(
    (teamData.cohort as CohortInterface).phase._id
  )
  if (!phaseData) {
    throw new Error("Phase provided doesn't exist")
  }
  teamData.members.forEach((member) => {
    const trainee = member as UserInterface;
    if (trainee.role === 'trainee' && trainee.status.status === 'active') {
      const sentTestTrainee = trainees.find(traineeData => trainee._id.equals(traineeData.trainee))
      if (!sentTestTrainee) {
        throw new GraphQLError('Please ensure attendance is taken for all active trainees in the team', {
          extensions: {
            code: 'INCONSISTENT_TRAINEE_ATTENDANCE',
          },
        })
      }
      if (![0, 1, 2].includes(sentTestTrainee.score)) {
        throw new GraphQLError('Attendance cannot be recorded due to an invalid score for one of trainees.', {
          extensions: {
            code: 'INVALID_TRAINEE_SCORE',
          },
        })
      }
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
    .populate({
      path: 'teams.trainees.trainee',
      select: '-password',
      populate: {
        path: 'profile',
      }
    })
  const sanitizedAttendance: any[] = []
  attendances.forEach((attendance) => {
    const result = attendance.teams.find((teamAttendanceData) =>
      (teamAttendanceData.team as ObjectId).equals(teamData.id)
    )

    const filteredTrainees = result?.trainees.filter(trainee => (trainee.trainee as UserInterface).status.status !== 'drop')

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
        teams: [{ team: { ...(result.team as mongoose.Document).toObject(), id: (result.team as mongoose.Document)._id }, trainees: filteredTrainees }],
      })
  })
  return formatAttendanceData(sanitizedAttendance, teamData)
}

const attendanceResolver = {
  Query: {
    async getTraineeAttendanceByID(
      _: any,
      { traineeEmail }: any,
      context: Context
    ) {
      ; (await checkUserLoggedIn(context))([RoleOfUser.TRAINEE])
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
      ; (await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR])
      const { userId } = (await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR])

      const teamData = await Team.findById(team)
        .populate({
          path: 'cohort',
          populate: {
            path: 'phase'
          }
        })

      if (!teamData) {
        throw new Error("Team provided doesn't exist")
      }

      return returnAttendanceData(teamData)
    },

    async getAttendanceStats(_: any, args: any, context: Context) {
      ; (await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR])
      const { userId } = (await checkUserLoggedIn(context))([RoleOfUser.COORDINATOR])
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
      { week, trainees, team, today, yesterday, orgToken }: AttendanceInput,
      context: Context
    ) {

      if (!today && !yesterday) {
        throw new Error('Recording attendance is only allowed for today and the day before within work days.')
      }
      if (today && yesterday) {
        throw new Error('Please select either today or yesterday, not both.')
      }
      let date = (today && new Date()).toString();

      if (yesterday) {
        const today = new Date();
        if (today.getDay() === 1) {
          const lastFriday = new Date(today);

          lastFriday.setDate(today.getDate() - 3);
          date = lastFriday.toString()
        } else {
          const previousDay = new Date(today);
          previousDay.setDate(today.getDate() - 1);
          date = previousDay.toString()
        }
      }

      // Check if the day is among work days
      if (![1, 2, 3, 4, 5].includes(new Date(date).getDay())) {
        throw new Error('Attendance can only be recorded on workdays.')
      }


      console.log('innn--', date)

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
                  date: new Date(date),
                  score: trainees[i].score,
                  day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase(),
                },
              ],
            })
          }
        }

        if (!attendants.length) {
          throw new Error(
            "Invalid Ids for trainees or trainees doesn't belong to the team"
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
          return returnAttendanceData(teamData)
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
            ; (attendance.teams[attendanceTeamIndex!].trainees as any[]).push({
              trainee: traineeData,
              status: [
                {
                  day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase(),
                  date: new Date(date),
                  score: trainees[i].score,
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
          ].status.find((s) => s.day === new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase())

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
              day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() as
                | 'mon'
                | 'tue'
                | 'wed'
                | 'thu'
                | 'fri',
              date: new Date(date!),
              score: trainees[i].score,
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

      await attendance.save();
      return returnAttendanceData(teamData)
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
        throw new Error("Phase provided doesn't exist")
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

      trainees.forEach((sentTrainee) => {
        let isDropped = false
        const traineeIndex = teamAttendanceTrainees.trainees.findIndex(
          (trainee) => {
            isDropped =
              (trainee.trainee as UserInterface).status.status === 'drop'
            return (trainee.trainee as UserInterface)._id.equals(
              sentTrainee.trainee
            )
          }
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
          const traineeToUpdateStatus =
            teamAttendanceTrainees.trainees[traineeIndex].status
          traineeToUpdateStatus.forEach((status) => {
            if (
              status.day === trainees[traineeIndex].status.day.toLowerCase()
            ) {
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
      ; (await checkUserLoggedIn(context))(['coordinator'])

      const teamData = await Team.findById(team)
        .populate('cohort')
        .populate('cohort.phase')

      if (!teamData) {
        throw new Error("Team provided doesn't exist")
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
        throw new Error("Can't find the Attendance for this day")
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

      throw new Error("Can't find the Attendance for this day")
    },
  },
}

export default attendanceResolver
