import { connect } from './../database/db.config';
import seedCohorts from './cohorts.seed';
import seedOrganizations from './organization.seed';
import seedPrograms from './programs.seed';
import seedsystemRatings from './ratingSystem';
import seedUsers from './users.seed';

connect().then(async () => {
  try {
    await seedUsers();
    await seedOrganizations();
    await seedPrograms();
    await seedCohorts();
    await seedsystemRatings()

    process.exit();
  } catch (error) {
    process.exit();
  }
});
