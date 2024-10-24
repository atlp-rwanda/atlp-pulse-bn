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
import seedAttendance from './attendance.seed'

connect().then(async () => {
  let allSeedsSuccessful = true;

  try {
    await seedUsers()
  } catch (error) {
    logger.error('Error seeding users ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedTickets()
  } catch (error) {
    logger.error('Error seeding tickets ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedAttendance()
  } catch (error) {
    logger.error('Error seeding attendance ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedOrganizations()
  } catch (error) {
    logger.error('Error seeding organizations ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedPrograms()
  } catch (error) {
    logger.error('Error seeding programs ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedCohorts()
  } catch (error) {
    logger.error('Error seeding cohorts ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedPhases()
  } catch (error) {
    logger.error('Error seeding phases ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedTeams()
  } catch (error) {
    logger.error('Error seeding teams ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedNotification()
  } catch (error) {
    logger.error('Error seeding notifications ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedRatings()
  } catch (error) {
    logger.error('Error seeding ratings ', { error })
    allSeedsSuccessful = false;
  }

  try {
    await seedsystemRatings()
  } catch (error) {
    logger.error('Error seeding system ratings ', { error })
    allSeedsSuccessful = false;
  }

  if (allSeedsSuccessful) {
    logger.info('All seeds were seeded successfully')
  } else {
    logger.error('Some seeds failed to seed')
  }

  process.exit()
})