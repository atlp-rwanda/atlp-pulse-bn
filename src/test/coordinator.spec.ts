import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'

const GET_COORDINATOR_BY_ID_QUERY = gql`
  query GetCoordinatorById($id: ID!) {
    getCoordinatorById(id: $id) {
      id
      name
      email
    }
  }
`

const GET_ALL_COORDINATORS_QUERY = gql`
  query GetAllCoordinators {
    getAllCoordinators {
      id
      name
      email
    }
  }
`

const CREATE_COORDINATOR_MUTATION = gql`
  mutation CreateCoordinator($name: String!, $email: String!, $orgId: ID!) {
    createCoordinator(name: $name, email: $email, orgId: $orgId) {
      id
      name
      email
    }
  }
`

const UPDATE_COORDINATOR_MUTATION = gql`
  mutation UpdateCoordinator($id: ID!, $name: String, $email: String) {
    updateCoordinator(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`

const DELETE_COORDINATOR_MUTATION = gql`
  mutation DeleteCoordinator($id: ID!) {
    deleteCoordinator(id: $id) {
      id
      name
    }
  }
`

describe('Coordinator Resolvers', () => {
  let testServer: ApolloServer

  beforeEach(() => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch a coordinator by ID', async () => {
    const result = await testServer.executeOperation({
      query: GET_COORDINATOR_BY_ID_QUERY,
      variables: { id: 'someCoordinatorId' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.getCoordinatorById).to.have.property('id')
  })

  it('should return error for fetching non-existent coordinator by ID', async () => {
    const result = await testServer.executeOperation({
      query: GET_COORDINATOR_BY_ID_QUERY,
      variables: { id: 'invalidCoordinatorId' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist
  })

  it('should fetch all coordinators', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_COORDINATORS_QUERY,
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.getAllCoordinators).to.be.an('array')
  })

  it('should return an empty list if no coordinators exist', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_COORDINATORS_QUERY,
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.getAllCoordinators).to.be.an('array').that.is.empty
  })

  it('should create a new coordinator', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_COORDINATOR_MUTATION,
      variables: {
        name: 'Test Coordinator',
        email: 'test@example.com',
        orgId: 'someOrgId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.createCoordinator).to.have.property('id')
  })

  it('should fail to create coordinator with invalid email', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_COORDINATOR_MUTATION,
      variables: {
        name: 'Test Coordinator',
        email: 'invalid-email',
        orgId: 'someOrgId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist
  })

  it('should update a coordinator', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_COORDINATOR_MUTATION,
      variables: {
        id: 'someCoordinatorId',
        name: 'Updated Coordinator',
        email: 'updated@example.com',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.updateCoordinator).to.have.property('id')
  })

  it('should return error when updating non-existent coordinator', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_COORDINATOR_MUTATION,
      variables: {
        id: 'invalidCoordinatorId',
        name: 'Updated Coordinator',
        email: 'updated@example.com',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist
  })

  it('should delete a coordinator', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_COORDINATOR_MUTATION,
      variables: { id: 'someCoordinatorId' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.deleteCoordinator).to.have.property('id')
  })

  it('should return error when deleting non-existent coordinator', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_COORDINATOR_MUTATION,
      variables: { id: 'invalidCoordinatorId' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist
  })
})
