/* eslint-disable */

import 'dotenv/config';
import mongoose from 'mongoose';

// add your own uri below
const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_PROD_DB
    : process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_DB
    : process.env.MONGO_DEV_DB;

export const connect = async () => {
  try {
    //MONGODB CONNECTION
    console.log('database',uri)
    return mongoose.connect(uri!);
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    process.exit(1);
  }
};
