import { Invitation } from '../models/invitation.model'
import { Context } from './../context'
import { ApolloError } from 'apollo-server'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { User } from '../models/user'

const InvitationResolver = {
  Query: {
    async getAcceptedInvitations(_: any,{orgToken}:any,context:Context) {
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(context))(['admin'])
      try {
        const invitations = await Invitation.find({ accepted: true,orgToken:org })
        if (!invitations.length) {
          return []
        }

        return invitations
      } catch (error) {
        throw new ApolloError(
          'Failed to fetch invitations',
          'INTERNAL_SERVER_ERROR',
          { error }
        )
      }
    },
  },
}

export default InvitationResolver
