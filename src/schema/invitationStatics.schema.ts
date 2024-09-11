import { gql } from 'apollo-server'

const statisticsSchema = gql`
  type Statistics {
    totalInvitations: Int!
    acceptedInvitationsCount: Int!
    pendingInvitationsCount: Int!
    getAcceptedInvitationsPercentsCount: Float!
    getPendingInvitationsPercentsCount: Float!
    cancelledInvitationsCount: Int!
    getCancelledInvitationsPercentsCount: Float!
  }
  type Query {
    getInvitationStatistics(
      orgToken: String!
      startDate: String
      endDate: String
      daysRange: Int
    ): Statistics!
  }
`

export default statisticsSchema
