import { connect } from './../database/db.config';
import { User } from '../models/user';
import seedUsers from './users.seed';





connect().then(async () =>{  
  await seedUsers();
  process.exit();
});