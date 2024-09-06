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
    email: String
    role: Role!
  }

  type Invitation {
    status: Status!
    invitees: [Invitee!]!
    orgToken:String
    createdAt: String!
  }

  input InviteeInput {
    email: String
    role: Role!
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
    sentEmails:Int!
  }

  type Mutation {
    sendInvitation(
      invitees: [InviteeInput!]!
      orgToken: String!
    ): Invitation!

    uploadInvitationFile(file: Upload!, orgToken: String!): FileData!
  }
`;

export default invitationSchema;
