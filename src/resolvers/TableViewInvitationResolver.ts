/* eslint-disable indent */
import { Invitation } from '../models/invitation.model'
import { ApolloError } from 'apollo-server'
import { GraphQLError } from 'graphql'

const TableViewInvitationResolver = {
  Query: {
    async getInvitations(
      parent: any,
      args: { query: string; limit: number; offset: number }
    ) {
      try {
        const { query } = args;
        const limit = args.limit ?? 5;
        const offset = args.offset ?? 0;

        if (!query) throw new GraphQLError('No query provided')

        const searchCriteria = {
          $or: [
            { 'invitees.email': { $regex: query, $options: 'i' } },
            { 'invitees.role': { $regex: query, $options: 'i' } },
            { status: { $regex: query, $options: 'i' } },
          ],
        }

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

    async getAllInvitations(_: any, args: { limit: number; offset: number }) {
      try {
        const limit = args.limit ?? 5;
        const offset = args.offset ?? 0;

        const invitations = await Invitation.find({}).skip(offset).limit(limit)

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

    async filterInvitations(_: any, args: { limit: number; offset: number; role: string; status: string }) {
      try {
        const limit = args.limit ?? 5;
        const offset = args.offset ?? 0;
        const { role, status } = args;

        if (!role &&!status) throw new GraphQLError('No filter criteria provided');

        let invitations = [];
        let totalInvitations = 0
        invitations = await Invitation.find()
        
        invitations = invitations.filter(result => {
          const inv = result.invitees
          let found = false
          inv.forEach(invitee => {
            if ( invitee.role === role )
              found = true
        })
          return ((result.status === status) && found)
        })
        invitations = invitations.splice(offset, limit)

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