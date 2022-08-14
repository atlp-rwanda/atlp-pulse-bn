/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from "mongoose";
import "dotenv/config";

// add your own uri below
const uri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_PROD_URI
    : process.env.NODE_ENV === "test"
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_DEV_URI;

export const connect = async (): Promise<void> => {
  try {
    //MONGODB CONNECTION
    await mongoose.connect(uri!);
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    process.exit(1);
  }
};
