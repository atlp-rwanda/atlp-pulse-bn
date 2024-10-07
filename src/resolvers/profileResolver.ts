import { Context } from '../context'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { RoleOfUser, User, UserRole } from '../models/user'
import { Profile } from '../models/profile.model'
import { sendEmail } from '../utils/sendEmail'

const profileResolvers: any = {
  Query: {
    getProfile: async (parent: any, args: any, context: any) => {
      const { userId }: any = context
      if (!userId) {
        throw new Error('You need to login first')
      }
      const profile = await Profile.findOne({ user: userId })
      return profile
    },
    getAllUsers: async (
      _: any,
      args: {
        orgToken: string
      },
      context: Context
    ) => {
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.ADMIN,
        RoleOfUser.TRAINEE,
        RoleOfUser.COORDINATOR,
      ])
      const org = await checkLoggedInOrganization(args.orgToken)
      const users = await User.find({
        organizations: org?.name,
        role: {
          $in: [
            'user',
            RoleOfUser.COORDINATOR,
            RoleOfUser.MANAGER,
            RoleOfUser.ADMIN,
            RoleOfUser.TRAINEE,
            'user',
            RoleOfUser.TTL,
          ],
        },
      }).populate({
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
      return users
    },
    async getAllRoles() {
      const roles = await UserRole.find({})
      return roles
    },
    getAllTTLUsers: async (
      _: any,
      args: {
        orgToken: string
      },
      context: Context
    ) => {
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.ADMIN,
        RoleOfUser.TRAINEE,
        RoleOfUser.COORDINATOR,
      ])

      const org = await checkLoggedInOrganization(args.orgToken)

      const users = await User.find({
        organizations: org?.name,
        role: RoleOfUser.TTL, // Filter users with role "TTL"
      })
        .populate({
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
        .exec()

      return users
    },
    getTTLTrainees: async (
      _: any,
      args: {
        orgToken: string
      },
      context: Context
    ) => {
      // Ensure the user is logged in and has the 'ttl' role
      if (context.role !== RoleOfUser.TTL) {
        throw new Error('You must be logged in as a TTL to view trainees.')
      }

      // Get the logged-in organization
      const org = await checkLoggedInOrganization(args.orgToken)

      // Find the TTL user based on the logged-in user's userId
      const ttlUser = await User.findOne({
        _id: context.userId, // Assuming userId uniquely identifies users
        organizations: org?.name,
        role: RoleOfUser.TTL,
      })
        .populate('team')
        .exec()

      if (!ttlUser) {
        throw new Error('TTL user not found')
      }

      // Check if the TTL user is assigned to a team
      if (!ttlUser?.team) {
        throw new Error('You are not assigned to a team yet.')
      }

      // Find all trainees in the same team as the TTL
      const traineesInSameTeam = await User.find({
        team: ttlUser.team, // Assuming the team field represents the team of a user
        role: RoleOfUser.TRAINEE, // Filter users with role "trainee"
      })
        .populate({
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
        .exec()

      return traineesInSameTeam
    },
  },
  Mutation: {
    uploadResume: async (parent: any, args: any, context: Context) => {
      try {
        const { userId, resume } = args

        if (!context.userId || context.userId !== userId) {
          throw new Error('Unauthorized. You can only upload your own resume.')
        }

        const profile = await Profile.findOne({ user: userId })

        if (!profile) {
          throw new Error('Profile not found for the user.')
        }

        profile.resume = resume
        await profile.save()

        return profile
      } catch (error) {
        throw new Error('Failed to upload resume: ' + error)
      }
    },

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
          githubUsername,
        }: any = args
        const { userId }: any = context

        if (!userId) {
          throw new Error('You need to login first')
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
            githubUsername: githubUsername,
          },
          { new: true, upsert: true }
        )
        return updatedProfile
      } catch (error) {
        throw error
      }
    },

    updateAvatar: async (parent: any, args: any, context: any) => {
      try {
        const { avatar }: any = args
        const { userId }: any = context

        if (!userId) {
          throw new Error('You need to login first')
        }

        const newAvatar = await Profile.findOneAndUpdate(
          { user: userId },
          { avatar: avatar },
          { new: true, upsert: true }
        )
        return newAvatar
      } catch (error) {
        throw error
      }
    },
    dropTTLUser: async (
      _: any,
      { email, reason }: { email: string; reason: string },
      context: Context
    ) => {
      ;(await checkUserLoggedIn(context))([RoleOfUser.ADMIN])
      const user = await User.findOne({ email, role: 'ttl' }).exec()
      if (!user) {
        throw new Error('TTL user not found')
      }
      await user.remove()
      await sendEmail(
        user.email,
        'Dropped',
        reason,
        'Byee!',
        process.env.COORDINATOR_EMAIL,
        process.env.COORDINATOR_PASS
      )
      return `TTL user with email ${email} has been deleted. with Reason :${reason} `
    },
    updateCoverImage: async (parent: any, args: any, context: any) => {
      try {
        const { cover }: any = args
        const { userId }: any = context

        if (!userId) {
          throw new Error('You need to login first')
        }

        const newCoverImage = await Profile.findOneAndUpdate(
          { user: userId },
          { cover: cover },
          { new: true, upsert: true }
        )
        return newCoverImage
      } catch (error) {
        throw error
      }
    },
  },
}

export default profileResolvers
