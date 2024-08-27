import { Invitation } from '../models/invitation.model';
import { Context } from '../context';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import { checkLoggedInOrganization } from '../helpers/organization.helper';
import { ApolloError } from 'apollo-server';
import { User } from '../models/user';
import { timeFilterMiddleware } from '../utils/timeFilter';

const StatisticsResolvers = {
  Query: {
    getInvitationStatistics: async (
      _: any,
      { orgToken, timeRange }: any,
      context: Context
    ) => {
      const org = await checkLoggedInOrganization(orgToken);
      await (await checkUserLoggedIn(context))(['admin']);

      const filter = timeFilterMiddleware({ query: { timeRange } });
      try {
        const invitations = await Invitation.find({ organization: org, ...filter.timeFilter });

        if (!invitations.length) {
          return {
            totalInvitations: 0,
            acceptedInvitationsCount: 0,
            pendingInvitationsCount: 0,
            getAcceptedInvitationsPercentsCount: 0,
            getPendingInvitationsPercentsCount: 0,
          };
        }

        // CALCULATE TOTAL INVITATION
        const totalInvitations = invitations.length;

        // CALCULATE ACCEPTED INVITATION COUNT
        const acceptedInvitationsCount = await User.countDocuments({
          invitationId: { $in: invitations.map((inv) => inv._id) },
          status: 'accepted',
        });

        // CALCULATE PENDING INVITATION COUNT
        const pendingInvitationsCount = await User.countDocuments({
          invitationId: { $in: invitations.map((inv) => inv._id) },
          status: 'pending',
        });

        return {
          totalInvitations,
          acceptedInvitationsCount,
          pendingInvitationsCount,
          getAcceptedInvitationsPercentsCount: () => (acceptedInvitationsCount / totalInvitations) * 100,
          getPendingInvitationsPercentsCount: () => (pendingInvitationsCount / totalInvitations) * 100,
        };
      } catch (error) {
        throw new ApolloError(
          'Failed to fetch invitation statistics',
          'INTERNAL_SERVER_ERROR',
          { error }
        );
      }
    },
  },
  Mutation: {},
};

export default StatisticsResolvers;
