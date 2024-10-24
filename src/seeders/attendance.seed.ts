/* eslint-disable */
import { User } from '../models/user'
import { Attendance } from '../models/attendance.model'
import { Roles } from '../types/roles'
import UserRole from '../models/userRoles'

const seedAttendance = async () => {
  const traineeLimit = 25

  try {
    const coordinatorRole = await UserRole.findOne({ title: Roles.Coordinator })
    const traineeRole = await UserRole.findOne({ title: Roles.Trainee })

    if (!coordinatorRole || !traineeRole) {
      throw new Error('Roles not found')
    }

    const coordinators = await User.find({
      role: coordinatorRole._id,
      organizations: { $in: ['Andela'] },
    })

    const trainees = await User.find({
      role: traineeRole._id,
      organizations: { $in: ['Andela'] },
    }).limit(traineeLimit * coordinators.length)

    // Define the attendance statuses and corresponding days
    const attendanceStatuses = [
      { value: 0, days: 'Monday' },
      { value: 0, days: 'Tuesday' },
      { value: 0, days: 'Wednesday' },
      { value: 0, days: 'Thursday' },
      { value: 0, days: 'Friday' },
    ]
    const numberOfWeeks: any = 4

    const attendance = coordinators
      .map((coordinator, index) => {
        const start = index * traineeLimit
        const end = start + traineeLimit

        const coordinatorAttendance = []
        for (let week = 1; week <= numberOfWeeks; week++) {
          coordinatorAttendance.push({
            week,
            coordinatorId: coordinator._id.toHexString(),
            trainees: trainees.slice(start, end).map((trainee) => ({
              traineeId: trainee._id.toHexString(),
              traineeEmail: trainee.email,
              status: attendanceStatuses.map((status) => ({
                days: status.days,
                value: status.value,
              })),
            })),
          })
        }
        return coordinatorAttendance
      })
      .reduce((acc, val) => acc.concat(val), [])

    await Attendance.deleteMany({})
    await Attendance.insertMany(attendance)
    return null
  } catch (error) {
    console.error('Error seeding attendance:', error)
    throw error
  }
}

export default seedAttendance