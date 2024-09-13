import { Invitation } from '../models/invitation.model'
import { GraphQLError } from 'graphql'

interface InvitationStatistics {
  totalInvitations: number
  acceptedInvitationsCount: number
  pendingInvitationsCount: number
  getAcceptedInvitationsPercentsCount: number
  getPendingInvitationsPercentsCount: number
}

interface QueryArguments {
  orgToken: string
  startDate?: string
  endDate?: string
  daysRange?: number
}
const StatisticsResolvers = {
  Query: {
    getInvitationStatistics: async (
      _: any,
      args: QueryArguments
    ): Promise<InvitationStatistics> => {
      const { orgToken, startDate, endDate, daysRange } = args

      try {
        const query: any = { 'invitees.orgToken': orgToken }

        if (daysRange) {
          const today = new Date()
          const rangeStartDate = new Date(today)
          rangeStartDate.setDate(today.getDate() - daysRange)

          query.createdAt = {
            $gte: rangeStartDate,
            $lte: today,
          }
        }

        if (startDate || endDate) {
          query.createdAt = query.createdAt || {}
          if (startDate) query.createdAt.$gte = new Date(startDate)
          if (endDate) query.createdAt.$lte = new Date(endDate)
        }

        const invitations = await Invitation.find(query)

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
          getAcceptedInvitationsPercentsCount:
            (acceptedInvitationsCount / totalInvitations) * 100,
          getPendingInvitationsPercentsCount:
            (pendingInvitationsCount / totalInvitations) * 100,
        }
      } catch (error) {
        //
        throw new GraphQLError('Failed to fetch invitation statistics', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        })
      }
    },
  },
  Mutation: {},
}

export default StatisticsResolvers
