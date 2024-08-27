/* eslint-disable */

import 'dotenv/config'
import mongoose from 'mongoose'
import logger from '../utils/logger.utils'

// add your own uri below
const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_PROD_DB
    : process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_DB
    : process.env.MONGO_DEV_DB

const isDev = process.env.NODE_ENV === 'dev'
const isDebug = isDev && process.env.DEBUG === 'true'

export const connect = async () => {
  try {
    //MONGODB CONNECTION
    logger.info(`Database: ${uri}, Env: ${process.env.NODE_ENV}`)
    mongoose.set('strictQuery', false)
    mongoose.set('debug', isDebug)
    return mongoose.connect(uri!)
  } catch (error) {
    logger.info(`Database connection error: ${error}`)
    process.exit(1)
  }
}
