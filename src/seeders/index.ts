import { connect } from './../database/db.config';
import { User } from '../models/user';
import seedUsers from './users.seed';
import cohorts from './cohorts.seed'




connect().then(async () =>{
  
  await seedUsers();
  await cohorts()
  process.exit();
});
