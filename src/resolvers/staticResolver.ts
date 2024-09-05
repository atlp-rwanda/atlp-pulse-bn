import { Invitation } from '../models/invitation.model'
import { ApolloError } from 'apollo-server'

const StatisticsResolvers = {
  Query: {
    getInvitationStatistics: async () => {
      const invitations = await Invitation.find()

      try {
        if (!invitations.length) {
          return {
            totalInvitations: 0,
            acceptedInvitationsCount: 0,
            pendingInvitationsCount: 0,
            getAcceptedInvitationsPercentsCount: 0,
            getPendingInvitationsPercentsCount: 0,
          }
        }

        // CALCULATE TOTAL INVITATION
        const totalInvitations = invitations.length

        // CALCULATE ACCEPTED INVITATION COUNT
        const acceptedInvitationsCount = await invitations.filter(
          (inv) => inv.status == 'accepted'
        ).length

        // CALCULATE PENDING INVITATION COUNT
        const pendingInvitationsCount = await invitations.filter(
          (inv) => inv.status == 'pending'
        ).length

        return {
          totalInvitations,
          acceptedInvitationsCount,
          pendingInvitationsCount,
          getAcceptedInvitationsPercentsCount: () =>
            (acceptedInvitationsCount / totalInvitations) * 100,
          getPendingInvitationsPercentsCount: () =>
            (pendingInvitationsCount / totalInvitations) * 100,
        }
      } catch (error) {
        throw new ApolloError(
          'Failed to fetch invitation statistics',
          'INTERNAL_SERVER_ERROR',
          { error }
        )
      }
    },
  },
  Mutation: {},
}

export default StatisticsResolvers
