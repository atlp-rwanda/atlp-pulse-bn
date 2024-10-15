/* eslint-disable indent */
import { Invitation } from '../models/invitation.model'
import { ApolloError } from 'apollo-server'
import { GraphQLError } from 'graphql'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import logger from '../utils/logger.utils'
import { User } from '../models/user'
import { checkLoggedInOrganization } from '../helpers/organization.helper'

const TableViewInvitationResolver = {
  Query: {
    async getInvitations(
      parent: any,
      args: { query: string; limit: number; offset: number ;orgToken: string}
    ) {
      try {
        const { query,orgToken } = args;
        const limit = args.limit ?? 5;
        const offset = args.offset ?? 0;

        if (!query) throw new GraphQLError('No query provided')
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

        const invitations = await Invitation.find(searchCriteria)
          .skip(offset)
          .limit(limit).sort({createdAt:-1})

        const totalInvitations = invitations.length

        return {
          invitations,
          totalInvitations,
        }
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(
          'An error occurred while fetching invitations by query.',
          'INTERNAL_SERVER_ERROR',
          {
            detailedMessage: message.toString(),
          }
        )
      }
    },

    async getAllInvitations(_: any, args: { limit: number; offset: number;orgToken: string  }) {
      try {
        const { orgToken } = args;
        if (!orgToken) throw new GraphQLError('No organization token provided'); 
        const org = (await checkLoggedInOrganization(orgToken)).name.toLocaleLowerCase();
        const invitations = await Invitation.find({orgName:org}).sort({createdAt:-1});
        const totalInvitations = invitations.length;

        return {
          invitations,
          totalInvitations,
        }
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(
          'An error occurred while fetching invitations.',
          'INTERNAL_SERVER_ERROR',
          {
            detailedMessage: message.toString(),
          }
        )
      }
    },

    async filterInvitations(
      _: any,
      args: { limit: number; offset: number; role: string; status: string; orgToken: string },
      context: any 
    ) {
      try {
        const { userId } = (await checkUserLoggedIn(context))(['admin']);
        const { orgToken, role, status, limit = 5, offset = 0 } = args;
    
        if (!userId) {
          throw new GraphQLError('User id not provided');
        }
    
        const user = await User.findById(userId);
        if (!user) {
          throw new GraphQLError('User not found');
        }
    
        if (!orgToken) {
          throw new GraphQLError('Organization token not provided');
        }
        const org = await checkLoggedInOrganization(orgToken);
        if (!org) {
          throw new GraphQLError('Organization not found');
        }
    
        if (!role && !status) throw new GraphQLError('No filter criteria provided');
    
        // Original criteria
        const criteria = {
          $and: [
            { orgName: { $regex: org.name, $options: 'i' } },
            {
              $and: [
                { 'invitees.role': { $regex: role, $options: 'i' } },
                { status: { $regex: status, $options: 'i' } },
              ],
            },
          ],
        };
    
        let invitations: any = [];
    
        // OUR TRUE LOGIC
        if (role && status) {
        invitations = await Invitation.find(criteria)
          .skip(offset)
          .limit(limit).sort({createdAt:-1});
    
      } else if (role) {
        invitations = await Invitation.find({           
          $and: [
          { orgName: { $regex: org.name, $options: 'i' } },
          {'invitees.role': { $regex: role, $options: 'i' } }
          ]})
         .skip(offset)
         .limit(limit).sort({createdAt:-1});

      } else if (status) {
        invitations = await Invitation.find({
          $and: [
            { orgName: { $regex: org.name, $options: 'i' }  },
            { status: { $regex: status, $options: 'i' } },
          ],
        })
         .skip(offset)
         .limit(limit).sort({createdAt:-1});
      }

      const totalInvitations = invitations.length;
      return {
        invitations,
        totalInvitations,
      };
      } catch (error) {
        const { message } = error as { message: any };
    
        if (error instanceof GraphQLError) {
          throw error;
        }
    
        throw new ApolloError(
          'An error occurred while fetching invitations.',
          'INTERNAL_SERVER_ERROR',
          {
            detailedMessage: message.toString(),
          }
        );
      }
    }            
  },
  Mutation: {},
}

export default TableViewInvitationResolver