import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { Profile, User, UserRole } from '../models/user';

interface Variables {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
} as Variables);

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
          fileName,
          cover,
        }: any = args;
        const { userId }: any = context;
        let photo: UploadApiResponse;
        let image: UploadApiResponse;

        if (!userId) {
          throw new Error('You need to login first');
        }

        if (fileName) {
          const mainDir: string = path.dirname(
            require.main?.filename as string
          );
          photo = await cloudinary.uploader.upload(
            `${mainDir}/uploads/${fileName}`
          );
          args.photo = photo;
        }

        if (cover) {
          const mainDir: string = path.dirname(
            require.main?.filename as string
          );
          image = await cloudinary.uploader.upload(
            `${mainDir}/uploads/${cover}`
          );
          args.image = image;
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
            avatar: args?.photo?.secure_url,
            coverImage: args?.image?.secure_url,
          },
          { new: true, upsert: true }
        );
        return updatedProfile;
      } catch (error: any) {
        throw error;
      }
    },
  },
};

export default profileResolvers;
