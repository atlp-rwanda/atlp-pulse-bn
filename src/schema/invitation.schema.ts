import { gql } from 'apollo-server'

const invitationSchema = gql`
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
