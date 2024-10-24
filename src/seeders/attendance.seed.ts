/* eslint-disable */
import { User } from '../models/user'
import { Attendance } from '../models/attendance.model'
import { Roles } from '../types/roles'
import UserRole from '../models/userRoles'
import logger from '../utils/logger.utils'
import Cohort from '../models/cohort.model'
import Phase from '../models/phase.model'

const seedAttendance = async () => {
  const traineeLimit = 25

  try {
    const coordinatorRole = await UserRole.findOne({ title: Roles.COORDINATOR })
    const traineeRole = await UserRole.findOne({ title: Roles.TRAINEE })

    if (!coordinatorRole || !traineeRole) {
      throw new Error('Roles not found')
    }

    const coordinators = await User.find({
      role: coordinatorRole._id,
      organizations: { $in: ['Andela'] },
    })

    logger.debug('coordinators')
    console.log(coordinators)

    const trainees = await User.find({
      role: traineeRole._id,
      organizations: { $in: ['Andela'] },
    }).limit(traineeLimit * coordinators.length)

    logger.info('trainees')
    console.log(trainees)

    // Define the attendance statuses and corresponding days
    const attendanceStatuses = [
      { value: 0, days: 'Monday' },
      { value: 0, days: 'Tuesday' },
      { value: 0, days: 'Wednesday' },
      { value: 0, days: 'Thursday' },
      { value: 0, days: 'Friday' },
    ]
    const numberOfWeeks: any = 4

    // Fetch the cohort and phase
    const cohort = await Cohort.findOne({ name: 'cohort 1' }) 
    const phase = await Phase.findOne({ name: 'Phase I' })

    if (!cohort || !phase) {
      logger.debug('Cohort or Phase not found', { cohort, phase })
      throw new Error('Cohort or Phase not found')
    }

    const attendance = coordinators
      .map((coordinator, index) => {
        const start = index * traineeLimit
        const end = start + traineeLimit

        const coordinatorAttendance = []
        for (let week = 1; week <= numberOfWeeks; week++) {
          coordinatorAttendance.push({
            week,
            coordinatorId: coordinator._id.toHexString(),
            cohort: cohort._id,
            phase: phase._id,
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
    logger.debug('Error seeding attendance:', error)
    throw error
  }
}

export default seedAttendance