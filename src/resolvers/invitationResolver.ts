import { Invitation } from '../models/invitation.model'
import { ApolloError } from 'apollo-server'
import { checkUserLoggedIn } from '../helpers/user.helpers'

const invitationResolver = {
  Query: {
    // eslint-disable-next-line no-empty-pattern
    async getPendingInvitations(_: any, {}, context: any) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
