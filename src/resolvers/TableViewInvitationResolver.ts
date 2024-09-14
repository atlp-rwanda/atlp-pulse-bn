/* eslint-disable indent */
import { Invitation } from '../models/invitation.model'
import { Context } from '../context'
import { ApolloError } from 'apollo-server'
import { GraphQLError } from 'graphql'

const TableViewInvitationResolver = {
  Query: {
    async getInvitations(
      parent: any,
      args: { query: string; limit: number; offset: number }
    ) {
      try {
        const { query } = args
        const limit = args.limit ?? 5
        const offset = args.offset ?? 0

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

    async getAllInvitations(_: any, args: { limit: number; offset: number }) {
      try {
        const limit = args.limit ?? 10
        const offset = args.offset ?? 0

        const invitations = await Invitation.find({})

        const totalInvitations = await Invitation.countDocuments()

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