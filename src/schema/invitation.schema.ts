import { gql } from 'apollo-server'

const invitationSchema = gql`
  scalar DateTime
  type Invitation {
    id: ID!
    inviterId: ID!
    status: String!
    invitees: [invitees!]!
    createdAt: String!
  }
  type Invitee {
    inviteedId: ID!
    email: String!
    role: String!
  }
  type Query {
    getInvitationById(id: ID!): [Invitation]
    getAcceptedInvitationsCount: Int
    getAcceptedInvitationsPercentsCount: Float
  }

  type Query {
    getPendingInvitations: [Invitation]
    getInvitationStatistics(orgToken: String!): Statistics!
  }
`

export default invitationSchema
