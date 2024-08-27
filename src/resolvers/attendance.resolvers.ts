/* eslint-disable indent */
import { Attendance } from '../models/attendance.model'
import { IntegerType, ObjectId } from 'mongodb'
import { Context } from './../context'
import { ApolloError } from 'apollo-server'
import mongoose, { Error } from 'mongoose'
import { checkUserLoggedIn } from '../helpers/user.helpers'

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

    async getTraineeAttendance(_: any, args: any, context: Context) {
      ;(await checkUserLoggedIn(context))(['coordinator'])
      const { userId } = (await checkUserLoggedIn(context))(['coordinator'])
      const replies = await Attendance.find({ coordinatorId: userId })
      return replies
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
      { week, days, trainees }: any,
      context: Context
    ) {
      ;(await checkUserLoggedIn(context))(['coordinator'])

      const { userId } = (await checkUserLoggedIn(context))(['coordinator'])
      const attendances: any[] = await Attendance.find({
        coordinatorId: userId,
      })

      //check if week exist
      const weekIndex = attendances.findIndex((items: any) => {
        return items.week === week
      })

      if (weekIndex === -1) {
        throw new Error('Week not exist! ')
      }

      trainees.forEach((trainee: any) => {
        const traineeIndex = attendances[weekIndex].trainees.findIndex(
          (item: any) => item.traineeId.includes(trainee.traineeId)
        )
        if (traineeIndex !== -1) {
          const attendanceIndex = attendances[weekIndex].trainees[
            traineeIndex
          ].status.findIndex((item: any) => item.days.includes(days))

          if (attendanceIndex !== -1) {
            // update attendance
            attendances[weekIndex].trainees[traineeIndex].status[
              attendanceIndex
            ].value = trainee.status[0].value
          } else {
            const validDays = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ]
            if (!validDays.includes(days)) {
              throw new Error(' We don\'t have that day ')
            } else {
              attendances[weekIndex].trainees[traineeIndex].status.push({
                days,
                value: trainee.status[0].value,
              })
            }
          }
        } else {
          throw new Error(' Trainee not exist, choose correct trainee ')
        }
      })

      try {
        await Attendance.findOneAndUpdate(
          { coordinatorId: userId, week: week },
          { $set: attendances[weekIndex] },
          { upsert: false }
        )
      } catch (error) {
        throw new Error('Failed to update Attendance')
      }

      return attendances[weekIndex]
    },

    async deleteAttendance(
      _: any,
      { week, days, traineeId }: any,
      context: Context
    ) {
      const { userId } = (await checkUserLoggedIn(context))(['coordinator'])
      const attendances: any = await Attendance.find({ coordinatorId: userId })
      let remainAttendance: any = []
      //check if week exist
      const weekIndex = attendances.findIndex((items: any) => {
        return items.week === week
      })

      if (weekIndex === -1) {
        throw new Error('Week not exist! ')
      }

      const traineeIndex = attendances[weekIndex].trainees.findIndex(
        (item: any) => item.traineeId.includes(traineeId)
      )

      if (traineeIndex !== -1) {
        const dayIndex = attendances[weekIndex].trainees[
          traineeIndex
        ].status.findIndex((items: any) => items.days.includes(days))

        if (dayIndex !== -1) {
          attendances[weekIndex].trainees[traineeIndex].status.splice(
            dayIndex,
            1
          )
          remainAttendance = attendances[weekIndex].trainees[traineeIndex]
        } else {
          throw new Error('Day not Exist')
        }
      } else {
        throw new Error('Trainee not exist')
      }

      try {
        await Attendance.findOneAndUpdate(
          { coordinatorId: userId, week: week },
          { $set: attendances[weekIndex] },
          { upsert: false }
        )
      } catch (error) {
        throw new Error('Failed to Delete Attendance')
      }

      return attendances[weekIndex]
    },
  },
}

export default attendanceResolver
