import { connect } from './../database/db.config'
import logger from '../utils/logger.utils'
import seedCohorts from './cohorts.seed'
import seedOrganizations from './organization.seed'
import seedPrograms from './programs.seed'
import seedsystemRatings from './ratingSystem'
import seedUsers from './users.seed'
import seedPhases from './phases.seed'
import seedTeams from './teams.seed'
import seedNotification from './notification.seed'
import seedRatings from './rating.seed'
import seedTickets from './ticket.seed'
// import seedAttendance from './attendance.seed';

connect().then(async () => {
  try {
    await seedUsers()
    await seedTickets()
    await seedOrganizations()
    await seedPrograms()
    await seedPhases()
    await seedCohorts()
    await seedTeams()
    await seedNotification()
    await seedsystemRatings()
    await seedRatings()
    // await seedAttendance()

    logger.info('Database seeded Successfully')
    process.exit()
  } catch (error) {
    logger.error('database seed errors ', { error })
    process.exit()
  }
})
