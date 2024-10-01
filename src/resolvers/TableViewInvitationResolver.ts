/* eslint-disable indent */
import { Invitation } from '../models/invitation.model'
import { ApolloError } from 'apollo-server'
import { GraphQLError } from 'graphql'
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
          .limit(limit)

        const totalInvitations = invitations.length;

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
        const invitations = await Invitation.find({orgName:org});
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

    async filterInvitations(_: any, args: { limit: number; offset: number; role: string; status: string}) {
      try {
        const limit = args.limit ?? 5;
        const offset = args.offset ?? 0;
        const { role, status} = args;
        if (!role && !status) throw new GraphQLError('No filter criteria provided');

        let invitations: any = [];
        let totalInvitations = 0

        if (role && status) { 
          invitations = await Invitation.find({
            $and: [
              { 'invitees.role': { $regex: role, $options: 'i' } },
              { status: { $regex: status, $options: 'i' } }
            ]
          });
        } else if (status) {
        invitations = await Invitation.find({
          status: { $regex: status, $options: 'i' },
        })          
        .skip(offset)
        .limit(limit)
        } else if (role) {
        invitations = await Invitation.find({
          'invitees.role': { $regex: role, $options: 'i' },
        })
        .skip(offset)
        .limit(limit)
        }

        totalInvitations = invitations.length;
      
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
  },
  Mutation: {},
}

export default TableViewInvitationResolver