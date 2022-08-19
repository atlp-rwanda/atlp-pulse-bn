import mongoose from "mongoose";
import { Profile, User} from "../models/user";
import { systemRating } from "../models/rating";
const resolvers = {
  Query: {
    hello: () => "Hellooo, welcome to your Graphql server",
    async getAllUsers() {
      const users = await User.find({});
      return users;
    },
    async getAllProfiles() {
      const profiles = await Profile.find({});
      return profiles;
    },
    async getRatingSystem(){
      const ratingSystem = await systemRating.find({});
      return ratingSystem;
    }
  },
  Mutation: {
    async createUser(_: any, { email, password }: any) {
      const userExists = await User.findOne({ email: email });
      if (userExists) throw new Error("Email is taken");
      const newUser = await User.create({ email, password });
      return newUser;
    },
    async createProfile(_: any, { user, lastName, firstName, role }: any) {
      if (!mongoose.isValidObjectId(user)) throw new Error("Invalid user id");
      const profileExists = await Profile.findOne({ where: { user } });
      if (profileExists) throw new Error("User already have a profile");
      const userExists = await User.findOne({ where: { _id: user } });
      if (!userExists) throw new Error("This user does not exists");
      const newProfile = await Profile.create({
        lastName,
        firstName,
        role,
        user,
      });
      await userExists.update({ profile: newProfile._id });
      return newProfile;
    },
    async createRatingSystem(_: any, {name,grade,description,percentage}: any) {
      const ratingSystemExists = await systemRating.findOne({ name: name });
      if (ratingSystemExists) throw new Error("Rating system already exists");
      const newRatingSystem = await systemRating.create({ name,grade,description,percentage  });
      return newRatingSystem;
    },
  },
  User: {
    async profile(parent: any) {
      console.log(parent);
      return await Profile.findOne({ where: { user: parent._id.toString() } });
    },
  },
  Profile: {
    async user(parent: any) {
      const user = await User.findOne({
        where: { _id: parent.user._id.toString() },
      });
      console.log(user);
      return user;
    },
  },
 
};

export default resolvers;
