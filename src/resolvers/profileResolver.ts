import { Profile, User, UserRole } from '../models/user';

const profileResolvers: any = {
  Query: {
    getProfile: async (parent: any, args: any, context: any) => {
      const { userId }: any = context;
      if (!userId) {
        throw new Error('You need to login first');
      }
      const profile = await Profile.findOne({ user: userId });
      return profile;
    },
    async getAllUsers() {
      const users = await User.find({}).populate('cohort');
      return users;
    },
    async getAllRoles() {
      const roles = await UserRole.find({});
      return roles;
    },
  },
  Mutation: {
    updateProfile: async (parent: any, args: any, context: any) => {
      try {
        const {
          firstName,
          lastName,
          address,
          city,
          country,
          phoneNumber,
          biography,
          avatar,
          cover,
        }: any = args;
        const { userId }: any = context;

        if (!userId) {
          throw new Error('You need to login first');
        }

        const updatedProfile = await Profile.findOneAndUpdate(
          { user: userId },
          {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            country: country,
            phoneNumber: phoneNumber,
            biography: biography,
            avatar: avatar,
            cover: cover,
          },
          { new: true, upsert: true }
        );
        return updatedProfile;
      } catch (error: any) {
        throw error;
      }
    },

    updateAvatar: async (parent: any, args: any, context: any) => {
      try {
        const { avatar }: any = args;
        const { userId }: any = context;

        if (!userId) {
          throw new Error('You need to login first');
        }

        const newAvatar = await Profile.findOneAndUpdate(
          { user: userId },
          { avatar: avatar },
          { new: true, upsert: true }
        );
        return newAvatar;
      } catch (error: any) {
        throw error;
      }
    },

    updateCoverImage: async (parent: any, args: any, context: any) => {
      try {
        const { cover }: any = args;
        const { userId }: any = context;

        if (!userId) {
          throw new Error('You need to login first');
        }

        const newCoverImage = await Profile.findOneAndUpdate(
          { user: userId },
          { cover: cover },
          { new: true, upsert: true }
        );
        return newCoverImage;
      } catch (error: any) {
        throw error;
      }
    },
  },
};

export default profileResolvers;
