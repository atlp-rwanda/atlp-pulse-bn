import { AuthenticationError } from 'apollo-server-errors';
import { authenticator } from 'otplib';
import mongoose from 'mongoose';
import { sendEmail } from '../utils/sendotp'; // Import the email utility functions
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

const resolvers = {
  Mutation: {
    enableTwoFactorAuth: async (_, { email }) => {
      try {
        console.log('Starting enableTwoFactorAuth'); // Add this
        const UserModel = mongoose.model('User');
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        const secret = authenticator.generateSecret();
        const oneTimeCode = authenticator.generate(secret);

        // Save the secret and one-time code to the user's profile
        user.twoFactorSecret = secret;
        user.twoFactorAuth = true;
        user.oneTimeCode = oneTimeCode;

        await user.save();

        // Send the one-time code to the user via email
        await sendEmail({
          to: user.email,
          subject: 'Your One-Time Code for Two-Factor Authentication',
          text: `Your one-time code is: ${oneTimeCode}`,
        });

        console.log('enableTwoFactorAuth succeeded'); // Add this
        return 'Two-factor authentication enabled. Check your email for a one-time code.';
      } catch (error) {
        console.error('enableTwoFactorAuth error:', error); // Add this
        throw new Error('Failed to enable two-factor authentication');
      }
    },
    disableTwoFactorAuth: async (_, { email }) => {
      try {
        const UserModel = mongoose.model('User');
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        // Disable 2FA by clearing the secret and one-time code
        user.twoFactorSecret = null;
        user.twoFactorAuth = false;
        user.oneTimeCode = null;

        await user.save();

        return 'Two-factor authentication disabled.';
      } catch (error) {
        throw new Error('Failed to disable two-factor authentication');
      }
    },

    verifyOneTimeCode: async (_, { email, code }) => {
      try {
        const UserModel = mongoose.model('User');
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        if (!user.twoFactorAuth) {
          throw new AuthenticationError('2FA not enabled for user');
        }

        const isValid = authenticator.check(code, user.oneTimeCode);

        if (!isValid) {
          throw new AuthenticationError('Invalid one-time code');
        }

        // Clear the one-time code from the user's profile after successful verification
        user.oneTimeCode = null;
        await user.save();

        return true;
      } catch (error) {
        throw new Error('Failed to verify one-time code');
      }
    },
  },
};

export default resolvers;
