import { connect } from './../database/db.config';
import seedCohorts from './cohorts.seed';
import seedOrganizations from './organization.seed';
import seedPrograms from './programs.seed';
import seedsystemRatings from './ratingSystem';
import seedUsers from './users.seed';
import seedPhases from './phases.seed';
import seedTeams from './teams.seed';
import seedNotification from './notification.seed';

connect().then(async () => {
  try {
    await seedUsers();
    await seedOrganizations();
    await seedPrograms();
    await seedPhases();
    await seedCohorts();
    await seedTeams();
    await seedsystemRatings();

    process.exit();
  } catch (error) {
    console.log('database seed errors ', { error });
    process.exit();
  }
});
