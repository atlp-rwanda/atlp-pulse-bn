import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { expect } from 'chai';
import { resolvers, typeDefs } from '../index'; // adjust if needed
import { PubSub } from 'graphql-subscriptions';

const SEND_INVITATION_MUTATION = gql`
  mutation SendInvitation($invitees: [InviteeInput!]!, $orgToken: String!, $orgName: String!) {
    sendInvitation(invitees: $invitees, orgToken: $orgToken, orgName: $orgName) {
      inviterId
      invitees {
        email
        role
      }
      orgToken
      orgName
    }
  }
`;

const CANCEL_INVITATION_MUTATION = gql`
  mutation CancelInvitation($id: ID!, $orgToken: String!) {
    cancelInvitation(id: $id, orgToken: $orgToken) {
      id
      status
    }
  }
`;

const UPLOAD_INVITATION_FILE_MUTATION = gql`
  mutation UploadInvitationFile($file: Upload!, $orgName: String!, $orgToken: String!) {
    uploadInvitationFile(file: $file, orgName: $orgName, orgToken: $orgToken) {
      filename
      sentEmails
      message
    }
  }
`;

const UPDATE_INVITATION_MUTATION = gql`
  mutation UpdateInvitation($orgToken: String!, $invitationId: String!, $newEmail: String, $newRole: String) {
    updateInvitation(orgToken: $orgToken, invitationId: $invitationId, newEmail: $newEmail, newRole: $newRole) {
      id
      invitees {
        email
        role
      }
      status
    }
  }
`;

const DELETE_INVITATION_MUTATION = gql`
  mutation DeleteInvitation($invitationId: ID!) {
    deleteInvitation(invitationId: $invitationId) {
      message
    }
  }
`;

const RESEND_INVITATION_MUTATION = gql`
  mutation ResendInvitation($invitationId: ID!, $orgToken: String!) {
    resendInvitation(invitationId: $invitationId, orgToken: $orgToken) {
      success
      message
    }
  }
`;

describe('Invitation Resolvers', () => {
  let testServer: ApolloServer;
  let pubsub: PubSub;

  beforeEach(() => {
    pubsub = new PubSub();

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it('should send an invitation', async () => {
    const result = await testServer.executeOperation({
      query: SEND_INVITATION_MUTATION,
      variables: {
        invitees: [{ email: 'test@user.com', role: 'ADMIN' }],
        orgToken: 'someOrgToken',
        orgName: 'TestOrg',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should cancel an invitation', async () => {
    const result = await testServer.executeOperation({
      query: CANCEL_INVITATION_MUTATION,
      variables: {
        id: 'someInvitationId',
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should upload an invitation file', async () => {
    const result = await testServer.executeOperation({
      query: UPLOAD_INVITATION_FILE_MUTATION,
      variables: {
        file: 'someMockFile',
        orgName: 'TestOrg',
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should update an invitation', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_INVITATION_MUTATION,
      variables: {
        orgToken: 'someOrgToken',
        invitationId: 'someInvitationId',
        newEmail: 'updatedEmail@test.com',
        newRole: 'TTL',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should delete an invitation', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_INVITATION_MUTATION,
      variables: {
        invitationId: 'someInvitationId',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should resend an invitation', async () => {
    const result = await testServer.executeOperation({
      query: RESEND_INVITATION_MUTATION,
      variables: {
        invitationId: 'someInvitationId',
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });
});
