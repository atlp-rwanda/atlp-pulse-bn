import gql from 'graphql-tag';

const invitationSchema = gql`
  scalar Upload

  enum Status {
    pending
    accepted
    denied
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
      query: String!
      limit: Int
      offset: Int
    ): PaginatedInvitations!
  }

  type Query {
    getAllInvitations(limit: Int, offset: Int): PaginatedInvitations!
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
    sendInvitation(invitees: [InviteeInput!]!, orgToken: String!): Invitation!
    updateInvitation(invitationId: ID!, orgToken: String!, newEmail: String, newRole: String): Invitation
    uploadInvitationFile(file: Upload!, orgToken: String!): FileData!
    deleteInvitation(invitationId: ID!): DeleteMessage
  }
`;

export default invitationSchema;