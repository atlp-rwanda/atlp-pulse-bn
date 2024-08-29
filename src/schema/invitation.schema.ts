import { gql } from 'apollo-server'

const invitationSchema = gql`
  type Invitee {
    inviteedId: ID
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
    getAcceptedInvitations(orgToken:String!): [Invitation] 
  }
`
export default invitationSchema
