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
  type Invitee {
    inviteeId: ID
    email: String
    role: String
  }

  type Invitation {
    id: ID!
    inviterId: ID
    status: String
    invitees: [Invitee]
    createdAt: String
  }

  type Query {
    getPendingInvitations: [Invitation]
  }
`

export default invitationSchema
