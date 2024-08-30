import { Invitation } from '../models/invitation.model'
import { Context } from '../context'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'

const resolvers = {
  Query: {
    getInvitationStatistics: async (
      _: any,
      { orgToken }: any,
      context: Context
    ) => {
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(context))(['admin'])

      const totalInvitations = await Invitation.countDocuments({
        organization: org,
      })
      const totalPending = await Invitation.countDocuments({
        organization: org,
        status: 'pending',
      })
      const totalAccepted = await Invitation.countDocuments({
        organization: org,
        status: 'accepted',
      })
      console.log(totalAccepted)

      return {
        totalInvitations,
        totalPending,
        totalAccepted,
      }
    },
  },
}

export default resolvers
