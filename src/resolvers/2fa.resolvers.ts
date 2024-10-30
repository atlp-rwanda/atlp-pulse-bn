import { AuthenticationError } from 'apollo-server-errors'
import { authenticator } from 'otplib'
import mongoose from 'mongoose'

import jwt from 'jsonwebtoken';
import { generateTokenUserExists } from '../helpers/user.helpers';
import { sendEmail } from '../utils/sendEmail';
import { verifyOtpToken } from '../utils/2WayAuthentication';
import { GraphQLError } from 'graphql';
import { User } from '../models/user';
import { logGeoActivity } from './userResolver';
interface Enable2FAInput {
  email: string
}

interface Disable2FAInput {
  email: string
}

const SECRET: string = process.env.SECRET ?? 'test_secret'
const resolvers = {
  Mutation: {
    enableTwoFactorAuth: async (_: any, { email }: Enable2FAInput) => {
      try {
        const UserModel = mongoose.model('User')
        const user = await UserModel.findOne({ email })
        //console.log(user);
        if (!user) {
          throw new Error('User not found')
        }

        if (user.twoFactorAuth) {
          // 2FA is already enabled for this user
          return 'Two-factor authentication is already enabled for this user.'
        }
       
        user.twoFactorAuth = true
      
        await user.save()

        
        await sendEmail(
          email,
          ' Two-Factor Authentication enabled ',
          'Two-Factor Authentication has been enabled on your account next time . You will be asked to verify your account with an OTP code',
          null,
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )
        return 'Two-factor authentication enabled. Check your email for a one-time code.'
      } catch (error) {
        console.error('Enable 2FA Error:', error)
        // Add this for more detailed error logging
        throw new Error('Failed to enable two-factor authentication')
      }
    },
    disableTwoFactorAuth: async (_: any, { email }: Disable2FAInput) => {
      try {
        const UserModel = mongoose.model('User')
        const user = await UserModel.findOne({ email })

        if (!user) {
          throw new Error('User not found')
        }

        // Disable 2FA by clearing the secret and one-time code
        user.twoFactorSecret = null
        user.twoFactorAuth = false
        user.oneTimeCode = null

        await user.save()

        return 'Two-factor authentication disabled.'
      } catch (error) {
        throw new Error('Failed to disable two-factor authentication')
      }
    },
    
   
    loginWithTwoFactorAuthentication: async (
      _: any,
      { email, otp, TwoWayVerificationToken }: { email: string; otp: string; TwoWayVerificationToken: string }
    ) => {
     
      const isValidOtp = verifyOtpToken(TwoWayVerificationToken, otp);
      
      if (!isValidOtp) {
        throw new GraphQLError('Invalid OTP. Please try again.');
      }

    
      const user:any = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError('User not found.');
      }
      const token = jwt.sign(
        { userId: user._id, role: user._doc?.role || 'user' },
        SECRET,
        { expiresIn: '2h' }
      );
      const geoData = await logGeoActivity(user);

      return {
        token,
        user: user.toJSON(),
        geoData, 
        message: 'Logged in successful ',
      };
    },
  },
};
  

export default resolvers


