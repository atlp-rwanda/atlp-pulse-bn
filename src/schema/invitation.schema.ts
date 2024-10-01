import gql from 'graphql-tag'

const invitationSchema = gql`
  scalar Upload

  enum Status {
    pending
    accepted
    denied
    cancelled
  }

  enum Role {
    trainee
    admin
    ttl
    coordinator
  }

  type Invitee {
    inviteeId: ID
    email: String
    role: Role!
  }

  type Invitation {
    id: ID!
    inviterId: String!
    status: String!
    invitees: [Invitee!]!
    orgName: String!
    orgToken: String!
    createdAt: String!
  }

  input InviteeInput {
    email: String
    role: Role!
  }

  type PaginatedInvitations {
    invitations: [Invitation!]!
    totalInvitations: Int!
  }

  type Query {
    getInvitations(
      orgToken: String,
      query: String!
      limit: Int
      offset: Int
    ): PaginatedInvitations!
  }

  type Query {
    getAllInvitations(orgToken: String!,limit: Int, offset: Int): PaginatedInvitations!
  }

    type Query {
    filterInvitations(limit: Int, offset: Int, role: String, status: String): PaginatedInvitations!
  }

  type InvitationResult {
    success: Boolean!
    email: String!
    error: String
  }

  type FileData {
    filename: String!
    data: [InvitationResult!]!
    invalidRows: [String!]!
    message: String!
    sentEmails: Int!
  }
  type DeleteMessage {
    message: String!
  }

  type Mutation {
    sendInvitation(invitees: [InviteeInput!]!,orgName: String!, orgToken: String!): Invitation!
    updateInvitation(invitationId: ID!, orgToken: String!, newEmail: String, newRole: String): Invitation
    uploadInvitationFile(file: Upload!,orgName: String!, orgToken: String!): FileData!
    deleteInvitation(invitationId: ID!): DeleteMessage
    cancelInvitation(orgToken: String!, id: ID!): Invitation!
  }
`;

export default invitationSchema
