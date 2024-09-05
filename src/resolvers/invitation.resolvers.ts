
import { ApolloError } from 'apollo-server'
import { Invitation } from '../models/invitation.model'
import { IResolvers } from '@graphql-tools/utils'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import Template from '../utils/templates/inviteUserTemplate'
import { sendEmail } from '../utils/sendEmail'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import inviteUserTemplate from '../utils/templates/inviteUserTemplate'

const SECRET: string = process.env.SECRET ?? 'test_secret'
const invitationResolvers: IResolvers = {
  Query: {
    async getAcceptedInvitations(_: any) {
      try {
        const invitations = await Invitation.find({ accepted: true })
        if (!invitations.length) {
          return []
        }

        return invitations
      } catch (error) {
        throw new ApolloError(
          'Failed to fetch invitations',
          'INTERNAL_SERVER_ERROR',
          { error }
        )
      }
    },
    async getAcceptedInvitationsCount(_: any) {
      try {
        const invitations = await Invitation.find()
        if (!invitations.length) {
          return 0
        }

        const acceptedInvitationsCount = await User.countDocuments({
          invitationId: { $in: invitations.map((inv) => inv._id) },
        })

        return acceptedInvitationsCount
      } catch (error) {
        throw new ApolloError(
          'Failed to fetch invitations',
          'INTERNAL_SERVER_ERROR',
          { error }
        )
      }
    },
    async getAcceptedInvitationsPercentsCount(_: any) {
      try {
        const invitations = await Invitation.find()
        if (!invitations.length) {
          return 0
        }

        const acceptedInvitationsCount = await User.countDocuments({
          invitationId: { $in: invitations.map((inv) => inv._id) },
        })

        const percentage = (acceptedInvitationsCount / invitations.length) * 100
        return percentage
      } catch (error) {
        throw new ApolloError(
          'Failed to calculate invitation acceptance percentage',
          'INTERNAL_SERVER_ERROR',
          { error }
        )
      }
    },
  },
  Mutation: {
    sendInvitation: async (
      _,
      {
        invitees,
        orgToken,
        type,
      }: {
        invitees: { email: string; role: string }[]
        orgToken: string
        type: any
      },
      context
    ) => {
      try {
        const { userId } = (await checkUserLoggedIn(context))(['admin'])
        if (!userId) {
          throw new ApolloError('User is not logged in', 'UNAUTHENTICATED')
        }

        const org = await checkLoggedInOrganization(orgToken)
        if (!org) {
          throw new ApolloError('Invalid organization token', 'FORBIDDEN')
        }
        const email = invitees.map((invitee) => invitee?.email)
        const userExists: any = await User.findOne({ email })

        if (userExists) {
          throw new Error(`This user already exists in ${org.name}`)
        } else {
          const token: any = jwt.sign(
            {
              name: org.name,
              email: invitees.map((invitee) => invitee.email),
              role: invitees.map((invitee) => invitee.role),
            },
            SECRET,
            {
              expiresIn: '2d',
            }
          )

          const newToken: any = token.replace(/\./g, '*')
          const newInvitation = new Invitation({
            inviterId: userId.toString(),
            invitees: invitees.map((invitee) => ({
              email: invitee.email,
              role: invitee.role,
            })),
            orgToken,
          })

          const link =
            type == 'user'
              ? `${process.env.REGISTER_FRONTEND_URL}/${newToken}`
              : `${process.env.REGISTER_ORG_FRONTEND_URL}/${newToken}`
          const content = inviteUserTemplate(org?.name || '', link)
          const someSpace = process.env.FRONTEND_LINK + 'register'
          await sendEmail(
            email,
            'Invitation',
            content,
            someSpace,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS
          )

          await newInvitation.save()
          return newInvitation
        }
      } catch (error: any) {
        throw new ApolloError(error.message, 'INTERNAL_SERVER_ERROR')
      }
    },
  },
}

export default invitationResolvers
