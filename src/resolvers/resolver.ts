import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from '../models/user'
import { Profile } from '../models/profile.model'
import { emailExpression, generateToken } from '../helpers/user.helpers'
import { logActivity } from '../helpers/loginActivities'
import { checkloginAttepmts } from '../helpers/logintracker'
import getGeoLocation from '../helpers/geolocation.helper'

const SECRET = process.env.SECRET || 'test_secret'

const resolvers = {
  Query: {
    async getAllProfiles(_: any, _args: any, context: { userId: any }) {
      if (!context.userId) throw new Error('Unauthorized')
      const profiles = await Profile.find({})
      return profiles
    },
    async getAllUsers(_: any, _args: any, context: { userId: any }) {
      if (!context.userId) throw new Error('Unauthorized')
      return await User.find({}).populate({
        path: 'team',
        strictPopulate: false,
        populate: {
          path: 'cohort',
          strictPopulate: false,
          populate: {
            path: 'program',
            strictPopulate: false,
            populate: {
              path: 'organization',
              strictPopulate: false,
            },
          },
        },
      })
    },
  },
  Mutation: {
    async createUser(
      _: any,
      { registerInput: { email, password, role } }: any
    ) {
      const userExists = await User.findOne({ email: email })
      if (userExists) throw new Error('Email is taken')
      const isValidEmail = emailExpression.test(String(email).toLowerCase())
      if (!isValidEmail) throw new Error('invalid email format')
      if (password.length < 6)
        throw new Error('password should be minimum 6 characters')
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        role: role || 'user',
        email: email,
        password: hashedPassword,
      })
      const token = generateToken(newUser._id.toString(), newUser?.role)

      return { token, user: newUser }
    },
    async loginUser(
      _: any,
      { loginInput: { email, password } }: any,
      { req }: any
    ) {
      const ipAddress =
        req.headers['x-forwarded-for'] || req.connection.remoteAddress
      console.log(
        'here is ip adressssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
        ipAddress
      )

      if (!ipAddress) {
        throw new Error('IP address not found')
      }

      const user: any = await User.findOne({ email: email })
      if (await user?.checkPass(password)) {
        const token = jwt.sign(
          { userId: user._id, role: user._doc?.role || 'user' },
          SECRET,
          {
            expiresIn: '2h',
          }
        )

        const geoData = await getGeoLocation(ipAddress)
        console.log(
          'GeoDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:',
          geoData
        )

        const profile = await Profile.findOne({ user: user._id })
        if (!profile) {
          throw new Error('Profile not found for the user')
        }

        profile.activity.push({
          country_code: geoData?.country_code || null,
          country_name: geoData?.country_name || null,
          IPv4: ipAddress,
          city: geoData?.city || null,
          state: geoData?.region || null,
          postal: geoData?.postal || null,
          latitude: geoData?.latitude || null,
          longitude: geoData?.longitude || null,
          failed: 0,
          date: new Date().toISOString(),
        })

        const data = {
          token: token,
          user: user.toJSON(),
        }
        return data
      } else {
        await logActivity(user._id, {
          country_code: null,
          country_name: null,
          IPv4: ipAddress,
          city: null,
          state: null,
          postal: null,
          latitude: null,
          longitude: null,
          failed: 1,
          date: new Date().toISOString(),
        })

        throw new Error('Invalid credential')
      }
    },
    async createProfile(_: any, args: any, context: { userId: any }) {
      if (!context.userId) throw new Error('Unauthorized')
      if (!mongoose.isValidObjectId(context.userId))
        throw new Error('Invalid user id')
      const userExists = await User.findOne({
        where: { _id: context.userId },
      })
      if (!userExists) throw new Error('This user does not exists')
      const profile = await Profile.findOneAndUpdate(
        { user: context.userId },
        args,
        {
          upsert: true,
          new: true,
        }
      )

      return profile.toJSON()
    },
  },
  User: {
    async profile(parent: any): Promise<any> {
      const profile = await Profile.findOne({
        where: { user: parent.id.toString() },
      })
      if (!profile) return null
      return profile.toJSON()
    },
  },
  Profile: {
    async user(parent: any) {
      const user = await User.findOne({
        where: { _id: parent.user.id.toString() },
      })
      if (!user) return null
      return user?.toJSON()
    },
  },
}

export default resolvers
