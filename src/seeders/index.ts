import { connect } from './../database/db.config'
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
import seedAttendance from './attendance.seed';

connect().then(async () => {
  try {
    await seedTickets()
    await seedUsers()
    await seedOrganizations()
    await seedPrograms()
    await seedPhases()
    await seedCohorts()
    await seedTeams()
    await seedNotification()
    await seedsystemRatings()
    await seedRatings()
    await seedAttendance()

    console.log('Database seeded Successfully')
    process.exit()
  } catch (error) {
    console.log('database seed errors ', { error })
    process.exit()
  }
})
