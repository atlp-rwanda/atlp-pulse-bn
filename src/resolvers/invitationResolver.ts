/* eslint-disable indent */
import { Invitation } from '../models/invitation.model'
import { IntegerType, ObjectId } from 'mongodb'
import { Context } from '../context'
import { ApolloError } from 'apollo-server'
import mongoose, { Error } from 'mongoose'
import { checkUserLoggedIn } from '../helpers/user.helpers'

const invitationResolver = {
  Query: {
    async getPendingInvitations(_: any, {}, context: any) {
      try {
        const { userId, role } = (await checkUserLoggedIn(context))([
          'admin',
          'manager',
        ])

        const invitations = await Invitation.find({ status: 'pending' })
        return invitations
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(
          'An error occurred while fetching pending invitations.',
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

export default invitationResolver
