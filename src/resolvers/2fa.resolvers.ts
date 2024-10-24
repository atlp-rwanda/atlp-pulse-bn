import { AuthenticationError } from 'apollo-server-errors';
import { authenticator } from 'otplib';
import mongoose from 'mongoose';
import sendEmaile from '../utils/sendotp'; // Import the email utility functions
interface Enable2FAInput {
  email: string; 
}

interface Disable2FAInput {
  email: string;
}

interface VerifyCodeInput {
  email: string;
  code: string;
}

const resolvers = {
  Mutation: {
    enableTwoFactorAuth: async (_:any, { email }:Enable2FAInput) => {
      try {
        const UserModel = mongoose.model('User');
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        if (user.twoFactorAuth) {
          // 2FA is already enabled for this user
          return 'Two-factor authentication is already enabled for this user.';
        }

        const secret = authenticator.generateSecret();
        const oneTimeCode = authenticator.generate(secret);

        // Save the secret and one-time code to the user's profile
        user.twoFactorSecret = secret;
        user.twoFactorAuth = true;
        user.oneTimeCode = oneTimeCode;

        await user.save();

        // Send the one-time code to the user via email
        await sendEmaile({
          to: user.email,
          subject: 'Your One-Time Code for Two-Factor Authentication',
          text: `Your one-time code is: ${oneTimeCode}`,
        });
        return 'Two-factor authentication enabled. Check your email for a one-time code.';
      } catch (error) {
        // Add this for more detailed error logging
        throw new Error('Failed to enable two-factor authentication');
      }
    },
    disableTwoFactorAuth: async (_:any, { email }: Disable2FAInput ) => {
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
    verifyOneTimeCode: async (_:any, { email, code }:VerifyCodeInput) => {
      try {

        const UserModel = mongoose.model('User');
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        if (!user.twoFactorAuth) {
          throw new AuthenticationError('2FA not enabled for user');
        }

        const providedCode = code.toString(); // Ensure the provided code is a string

        if (providedCode !== user.oneTimeCode) {
          throw new AuthenticationError('Invalid one-time code');
        }

        user.oneTimeCode = null;
        await user.save();

        return 'One time code verified successfully.';
      } catch (error) {
        throw new Error('Failed to verify one-time code');
      }
    },
  },
};

export default resolvers;