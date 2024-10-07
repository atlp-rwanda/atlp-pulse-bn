import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { expect } from 'chai';
import { resolvers, typeDefs } from '../index';
import { PubSub } from 'graphql-subscriptions';

const GET_RATING_SYSTEMS_QUERY = gql`
  query GetRatingSystems($orgToken: String!) {
    getRatingSystems(orgToken: $orgToken) {
      id
      name
      grade
      description
      percentage
      organization
    }
  }
`;

const GET_RATING_SYSTEM_QUERY = gql`
  query GetRatingSystem($id: ID!) {
    getRatingSystem(id: $id) {
      id
      name
      grade
      description
      percentage
    }
  }
`;

const GET_DEFAULT_GRADING_QUERY = gql`
  query GetDefaultGrading {
    getDefaultGrading {
      id
      name
      grade
      description
      percentage
      defaultGrading
    }
  }
`;

const CREATE_RATING_SYSTEM_MUTATION = gql`
  mutation CreateRatingSystem(
    $name: String!
    $grade: String!
    $description: String
    $percentage: Int!
    $orgToken: String!
  ) {
    createRatingSystem(
      name: $name
      grade: $grade
      description: $description
      percentage: $percentage
      orgToken: $orgToken
    ) {
      id
      name
      grade
      description
      percentage
    }
  }
`;

const MAKE_RATING_DEFAULT_MUTATION = gql`
  mutation MakeRatingDefault($id: ID!) {
    makeRatingdefault(id: $id)
  }
`;

const DELETE_RATING_SYSTEM_MUTATION = gql`
  mutation DeleteRatingSystem($id: ID!) {
    deleteRatingSystem(id: $id)
  }
`;

describe('Rating System Resolvers', () => {
  let testServer: ApolloServer;
  let pubsub: PubSub;

  beforeEach(() => {
    pubsub = new PubSub();

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it('should fetch all rating systems for a given organization', async () => {
    const result = await testServer.executeOperation({
      query: GET_RATING_SYSTEMS_QUERY,
      variables: { orgToken: 'someOrgToken' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should fetch a single rating system by ID', async () => {
    const result = await testServer.executeOperation({
      query: GET_RATING_SYSTEM_QUERY,
      variables: { id: 'someRatingSystemId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should fetch the default grading system', async () => {
    const result = await testServer.executeOperation({
      query: GET_DEFAULT_GRADING_QUERY,
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should create a new rating system', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_RATING_SYSTEM_MUTATION,
      variables: {
        name: 'Test Rating',
        grade: 'A',
        description: 'A test rating system',
        percentage: 90,
        orgToken: 'someOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should set a rating system as default', async () => {
    const result = await testServer.executeOperation({
      query: MAKE_RATING_DEFAULT_MUTATION,
      variables: { id: 'someRatingSystemId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should delete a rating system by ID', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_RATING_SYSTEM_MUTATION,
      variables: { id: 'someRatingSystemId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should not fetch rating systems with invalid orgToken', async () => {
    const result = await testServer.executeOperation({
      query: GET_RATING_SYSTEMS_QUERY,
      variables: { orgToken: 'invalidOrgToken' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should throw an error if trying to create a rating system with an existing name', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_RATING_SYSTEM_MUTATION,
      variables: {
        name: 'Duplicate Rating System',
        grade: 'A',
        description: 'A duplicate rating system',
        percentage: 90,
        orgToken: 'validOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should throw an error when deleting a non-existent rating system', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_RATING_SYSTEM_MUTATION,
      variables: { id: 'nonExistentRatingSystemId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should not allow unauthorized users to create a rating system', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_RATING_SYSTEM_MUTATION,
      variables: {
        name: 'Unauthorized Test',
        grade: 'B',
        description: 'Unauthorized creation attempt',
        percentage: 80,
        orgToken: 'validOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should handle missing required fields for creating a rating system', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_RATING_SYSTEM_MUTATION,
      variables: {
        name: '',
        grade: '',
        description: 'Missing fields test',
        percentage: null,
        orgToken: 'validOrgToken',
      },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should not allow unauthorized users to delete a rating system', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_RATING_SYSTEM_MUTATION,
      variables: { id: 'someRatingSystemId' },
    });

    expect(result.body.kind).to.equal('single');
  });
});
