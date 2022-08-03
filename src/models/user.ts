import mongoose, { Schema } from "mongoose";

const User = mongoose.model(
  "User",
  new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
  })
);

const Profile = mongoose.model(
  "Profile",
  new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  })
);

export { User, Profile };
