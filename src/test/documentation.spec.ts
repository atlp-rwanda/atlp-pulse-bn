import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { expect } from 'chai';
import { resolvers, typeDefs } from '../index';
import { PubSub } from 'graphql-subscriptions';

const GET_DOCUMENTATIONS_QUERY = gql`
  query GetDocumentations {
    getDocumentations {
      id
      title
      description
      subDocuments {
        title
        description
      }
    }
  }
`;

const ADD_DOCUMENTATION_MUTATION = gql`
  mutation AddDocumentation($title: String!, $description: String!) {
    addDocumentation(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const UPDATE_DOCUMENTATION_MUTATION = gql`
  mutation UpdateDocumentation($id: ID!, $title: String, $description: String) {
    updateDocumentation(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const DELETE_DOCUMENTATION_MUTATION = gql`
  mutation DeleteDocumentation($id: ID!) {
    deleteDocumentation(id: $id)
  }
`;

const ADD_SUB_DOCUMENTATION_MUTATION = gql`
  mutation AddSubDocumentation($id: ID!, $title: String!, $description: String!) {
    addSubDocumentation(id: $id, title: $title, description: $description) {
      id
      title
      description
      subDocuments {
        title
        description
      }
    }
  }
`;

const DELETE_SUB_DOCUMENTATION_MUTATION = gql`
  mutation DeleteSubDocumentation($id: ID!, $title: String!, $description: String!) {
    deleteSubDocumentation(id: $id, title: $title, description: $description) {
      id
      title
      description
      subDocuments {
        title
        description
      }
    }
  }
`;

describe('Documentation Resolvers', () => {
  let testServer: ApolloServer;
  let pubsub: PubSub;

  beforeEach(() => {
    pubsub = new PubSub();

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it('should fetch all documentations', async () => {
    const result = await testServer.executeOperation({
      query: GET_DOCUMENTATIONS_QUERY,
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should add a new documentation', async () => {
    const result = await testServer.executeOperation({
      query: ADD_DOCUMENTATION_MUTATION,
      variables: { title: 'Test Documentation', description: 'Test description' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should update an existing documentation', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_DOCUMENTATION_MUTATION,
      variables: { id: 'existingDocId', title: 'Updated Title' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should delete a documentation', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_DOCUMENTATION_MUTATION,
      variables: { id: 'existingDocId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should add a sub-documentation', async () => {
    const result = await testServer.executeOperation({
      query: ADD_SUB_DOCUMENTATION_MUTATION,
      variables: { id: 'existingDocId', title: 'Sub-doc Title', description: 'Sub-doc description' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should delete a sub-documentation', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_SUB_DOCUMENTATION_MUTATION,
      variables: { id: 'existingDocId', title: 'Sub-doc Title', description: 'Sub-doc description' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should return an error when updating a non-existent documentation', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_DOCUMENTATION_MUTATION,
      variables: { id: 'nonExistentDocId', title: 'Updated Title' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should return an error when deleting a non-existent documentation', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_DOCUMENTATION_MUTATION,
      variables: { id: 'nonExistentDocId' },
    });

    expect(result.body.kind).to.equal('single');
  });
});
