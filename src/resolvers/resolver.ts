import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from '../models/user'
import { Profile } from '../models/profile.model'
import { emailExpression, generateToken } from '../helpers/user.helpers'
import { checkloginAttepmts } from '../helpers/logintracker'
import { GraphQLError } from 'graphql/error'

const SECRET = process.env.SECRET as string

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
    async loginUser(_: any, { loginInput: { email, password } }: any) {
      try {
        const user: any = await User.findOne({ email: email })
        if (!user) {
          throw new Error('User not found')
        }

        if (await user?.checkPass(password)) {
          const token = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          )

          const data = {
            token: token,
            user: user.toJSON(),
          }
          return data
        } else {
          throw new Error('Invalid credential')
        }
      } catch (error) {
        console.error('Login error:', error)
        throw new Error('Login failed. Please try again.')
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
