import mongoose from "mongoose";
import { Profile, User } from "../models/user";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "test_secret";

const resolvers = {
  Query: {
    async getAllProfiles(_: any, _args: any, context: { userId: any }) {
      if (!context.userId) throw new Error("Unauthorized");
      const profiles = await Profile.find({});
      return profiles;
    },
  },
  Mutation: {
    async createUser(
      _: any,
      { registerInput: { email, password, role } }: any
    ) {
      const userExists = await User.findOne({ email: email });
      if (userExists) throw new Error("Email is taken");
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        role: role || "user",
        email: email,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { userId: newUser._id, role: newUser?.role },
        SECRET,
        { expiresIn: "2h" }
      );

      return { token, user: newUser };
    },
    async loginUser(_: any, { loginInput: { email, password } }: any) {
      const user = await User.findOne({ email: email });
      if (await user?.checkPass(password)) {
        const token = jwt.sign(
          { userId: user._id, role: user._doc?.role || "user" },
          SECRET,
          { expiresIn: "2h" }
        );
        const data = {
          token: token,
          user: { ...user._doc, password: "", role: user?.role || "user" },
        };
        return data;
      } else {
        throw new Error("Invalid credential");
      }
    },
    async createProfile(
      _: any,
      { user, lastName, firstName, role }: any,
      
    ) {
      if (!mongoose.isValidObjectId(user)) throw new Error("Invalid user id");
      const profileExists = await Profile.findOne({ where: { user } });
      if (profileExists) throw new Error("User already have a profile");
      const userExists = await User.findOne({ where: { _id: user } });
      if (!userExists) throw new Error("This user does not exists");
      const user = await User.findOne({ email: email });
      const newProfile = await Profile.create({
        lastName,
        firstName,
        role,
        user,
      });
      await userExists.update({ profile: newProfile._id });
      return newProfile;
    },
  },
  User: {
    async profile(parent: any) {
      return await Profile.findOne({ where: { user: parent._id.toString() } });
    },
  },
  Profile: {
    async user(parent: any) {
      const user = await User.findOne({
        where: { _id: parent.user._id.toString() },
      });
      return user;
    },
  },
};

export default resolvers;