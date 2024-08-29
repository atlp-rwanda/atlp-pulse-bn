import { Invitation } from '../models/invitation.model'
import { Context } from './../context'
import { ApolloError } from 'apollo-server'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { User } from '../models/user'

const InvitationResolver = {
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
}

export default InvitationResolver
