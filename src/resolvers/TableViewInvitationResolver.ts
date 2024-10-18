/* eslint-disable indent */
import { Invitation } from '../models/invitation.model';
import { ApolloError } from 'apollo-server';
import { GraphQLError } from 'graphql';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import logger from '../utils/logger.utils';
import { User } from '../models/user';
import { checkLoggedInOrganization } from '../helpers/organization.helper';

const TableViewInvitationResolver = {
  Query: {
    async getInvitations(
      parent: any,
      args: { query: string; limit: number; offset: number; orgToken: string }
    ) {
      try {
        const { query, orgToken } = args;
        const limit = args.limit ?? 3;
        const offset = args.offset ?? 0;

        if (!query) throw new GraphQLError('No query provided');
        if (!orgToken) throw new GraphQLError('No organization token provided');

        const org = (await checkLoggedInOrganization(orgToken)).name.toLocaleLowerCase();

        const searchCriteria = {
          $and: [
            { orgName: org },
            {
              $or: [
                { 'invitees.email': { $regex: query, $options: 'i' } },
                { 'invitees.role': { $regex: query, $options: 'i' } },
                { status: { $regex: query, $options: 'i' } },
              ],
            },
          ],
        };

        const totalInvitations = await Invitation.countDocuments(searchCriteria);

        const invitations = await Invitation.find(searchCriteria)
          .skip(offset)
          .limit(limit)
          .sort({ createdAt: -1 });

        return {
          invitations,
          totalInvitations,
        };
      } catch (error) {
        const { message } = error as { message: any };
        throw new ApolloError(
          'An error occurred while fetching invitations by query.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message.toString() }
        );
      }
    },

    async getAllInvitations(
      _: any,
      args: { limit?: number; offset?: number; orgToken: string; sortBy?: 1 | -1 }
    ) {
      try {
        const { orgToken, sortBy = -1 } = args;
        const limit = args.limit ?? 3;
        const offset = args.offset ?? 0;

    
        if (!orgToken) throw new GraphQLError('No organization token provided');
    
        const org = (await checkLoggedInOrganization(orgToken)).name.toLocaleLowerCase();
        const invitations = await Invitation.find({ orgName: org })
          .sort({ createdAt: sortBy }) // Ensure sorting by the correct field
          .skip(offset)
          .limit(limit);
    
        const totalInvitations = await Invitation.countDocuments({ orgName: org });
    
        return {
          invitations,
          totalInvitations,
        };
      } catch (error) {
        const { message } = error as { message: any };
        throw new ApolloError(
          'An error occurred while fetching invitations.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message.toString() }
        );
      }
    },
    

    async filterInvitations(
      _: any,
      args: { limit?: number; offset?: number; role?: string; status?: string; orgToken: string; sortBy?: 1 | -1 },
      context: any
    ) {
      try {
        const { userId } = await (await checkUserLoggedIn(context))(['admin']);
        const { orgToken, role, status, sortBy = -1 } = args;
        const limit = args.limit ?? 3;
        const offset = args.offset ?? 0;
        
        if (!userId) throw new GraphQLError('User ID not provided');
        const user = await User.findById(userId);
        if (!user) throw new GraphQLError('User not found');
        if (!orgToken) throw new GraphQLError('Organization token not provided');
    
        const org = await checkLoggedInOrganization(orgToken);
        if (!org) throw new GraphQLError('Organization not found');
    
        // Build the filter criteria dynamically
        const criteria: any = { orgName: { $regex: org.name, $options: 'i' } };
        if (role) criteria['invitees.role'] = { $regex: role, $options: 'i' };
        if (status) criteria['status'] = { $regex: status, $options: 'i' };
    
        // Fetch the filtered and sorted invitations
        const invitations = await Invitation.find(criteria)
          .sort({ createdAt: sortBy })
          .skip(offset)
          .limit(limit);
    
        const totalInvitations = await Invitation.countDocuments(criteria);
    
        return {
          invitations,
          totalInvitations,
        };
      } catch (error) {
        const { message } = error as { message: string };
        if (error instanceof GraphQLError) throw error;
    
        throw new ApolloError(
          'An error occurred while fetching invitations.',
          'INTERNAL_SERVER_ERROR',
          { detailedMessage: message }
        );
      }
    }
    
  },
  Mutation: {},
};

export default TableViewInvitationResolver;