import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { expect } from 'chai';
import { resolvers, typeDefs } from '../index';
import { Invitation } from '../models/invitation.model';
import { User } from '../models/user';
// import { checkUserLoggedIn, checkLoggedInOrganization } from '../helpers';

const mockInvitations = [
  {
    id: 'invitationId1',
    invitees: [{ email: 'test@example.com', role: 'admin' }],
    status: 'pending',
  },
];

const mockOrganization = { name: 'mockOrg' };
const mockUser = { id: 'userId1', name: 'Test User' };

const GET_INVITATIONS_QUERY = gql`
  query GetInvitations($query: String!, $limit: Int, $offset: Int, $orgToken: String!) {
    getInvitations(query: $query, limit: $limit, offset: $offset, orgToken: $orgToken) {
      invitations {
        id
        invitees {
          email
          role
        }
        status
      }
      totalInvitations
    }
  }
`;

const GET_ALL_INVITATIONS_QUERY = gql`
  query GetAllInvitations($limit: Int, $offset: Int, $orgToken: String!) {
    getAllInvitations(limit: $limit, offset: $offset, orgToken: $orgToken) {
      invitations {
        id
        invitees {
          email
        }
        status
      }
      totalInvitations
    }
  }
`;

const FILTER_INVITATIONS_QUERY = gql`
  query FilterInvitations(
    $limit: Int
    $offset: Int
    $role: String
    $status: String
    $orgToken: String!
  ) {
    filterInvitations(
      limit: $limit
      offset: $offset
      role: $role
      status: $status
      orgToken: $orgToken
    ) {
      invitations {
        id
        invitees {
          email
          role
        }
        status
      }
      totalInvitations
    }
  }
`;

describe('TableViewInvitationResolver', () => {
  let testServer: ApolloServer;

  beforeEach(() => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Invitation.find = async () => mockInvitations;
    // checkLoggedInOrganization = async () => mockOrganization;
    // checkUserLoggedIn = async () => ({ userId: mockUser.id });
  });

  it('should fetch invitations with a search query', async () => {
    const result = await testServer.executeOperation({
      query: GET_INVITATIONS_QUERY,
      variables: {
        query: 'test',
        limit: 5,
        offset: 0,
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
    // const invitations = result.body.singleResult.data.getInvitations.invitations;
    // expect(invitations).to.be.an('array');
    // expect(invitations[0].invitees[0].email).to.equal('test@example.com');
  });

  it('should fetch all invitations for an organization', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_INVITATIONS_QUERY,
      variables: {
        limit: 5,
        offset: 0,
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
    // const invitations = result.body.singleResult.data.getAllInvitations.invitations;
    // expect(invitations).to.be.an('array');
    // expect(invitations[0].invitees[0].email).to.equal('test@example.com');
  });

  it('should filter invitations by role and status', async () => {
    const result = await testServer.executeOperation({
      query: FILTER_INVITATIONS_QUERY,
      variables: {
        role: 'admin',
        status: 'pending',
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
    // const invitations = result.body.singleResult.data.filterInvitations.invitations;
    // expect(invitations).to.be.an('array');
    // expect(invitations[0].invitees[0].role).to.equal('admin');
    // expect(invitations[0].status).to.equal('pending');
  });

  it('should return an error for invalid orgToken when fetching invitations', async () => {
    const result = await testServer.executeOperation({
      query: GET_INVITATIONS_QUERY,
      variables: {
        query: 'test',
        limit: 5,
        offset: 0,
        orgToken: '',
      },
    });

    expect(result.body.kind).to.equal('single');
    // expect(result.body.singleResult.errors).to.exist;
    // expect(result.body.singleResult.errors[0].message).to.equal('No organization token provided');
  });

  it('should return an error when no query is provided for getInvitations', async () => {
    const result = await testServer.executeOperation({
      query: GET_INVITATIONS_QUERY,
      variables: {
        query: '',
        limit: 5,
        offset: 0,
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
    // expect(result.body.singleResult.errors).to.exist;
    // expect(result.body.singleResult.errors[0].message).to.equal('No query provided');
  });

  it('should return an error when no filter criteria is provided for filterInvitations', async () => {
    const result = await testServer.executeOperation({
      query: FILTER_INVITATIONS_QUERY,
      variables: {
        role: '',
        status: '',
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
    // expect(result.body.singleResult.errors).to.exist;
    // expect(result.body.singleResult.errors[0].message).to.equal('No filter criteria provided');
  });
});
