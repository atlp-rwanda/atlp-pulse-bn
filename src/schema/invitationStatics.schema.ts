import { gql } from 'apollo-server'

const statisticsSchema = gql`
  type Statistics {
    totalInvitations: Int!
    acceptedInvitationsCount: Int!
    pendingInvitationsCount: Int!
    getAcceptedInvitationsPercentsCount: Int!
    getPendingInvitationsPercentsCount: Int!
  }
  type Query {
    getInvitationStatistics: Statistics!
  }
`

export default statisticsSchema
