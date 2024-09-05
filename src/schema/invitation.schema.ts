import { gql } from 'graphql-tag';

const invitationSchema = gql`
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

  type Mutation {
    sendInvitation(
      invitees: [InviteeInput!]!
      orgToken: String!
    ): Invitation!

    # Other mutations like delete, edit, and update go below
  }
`;

export default invitationSchema;
