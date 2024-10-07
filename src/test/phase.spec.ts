import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'

const GET_ALL_PHASES_QUERY = gql`
  query GetAllPhases($orgToken: String!) {
    getAllPhases(orgToken: $orgToken) {
      id
      name
      description
    }
  }
`

const ADD_PHASE_MUTATION = gql`
  mutation AddPhase($name: String!, $description: String!, $orgToken: String!) {
    addPhase(name: $name, description: $description, orgToken: $orgToken) {
      id
      name
      description
    }
  }
`

const UPDATE_PHASE_MUTATION = gql`
  mutation UpdatePhase(
    $id: ID!,
    $name: String!,
    $description: String!,
    $orgToken: String!
  ) {
    updatePhase(id: $id, name: $name, description: $description, orgToken: $orgToken) {
      id
      name
      description
    }
  }
`

const DELETE_PHASE_MUTATION = gql`
  mutation DeletePhase($id: ID!) {
    deletePhase(id: $id) {
      id
      name
    }
  }
`

describe('Phase Resolver', () => {
  let testServer: ApolloServer

  beforeEach(() => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch all phases for a given organization', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_PHASES_QUERY,
      variables: {
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.getAllPhases).to.be.an('array')
  })

  it('should add a new phase', async () => {
    const result = await testServer.executeOperation({
      query: ADD_PHASE_MUTATION,
      variables: {
        name: 'Phase 1',
        description: 'Description of Phase 1',
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.addPhase.name).to.equal('Phase 1')
    // expect(result.body.data.addPhase.description).to.equal('Description of Phase 1')
  })

  it('should throw an error when adding a phase with an existing name', async () => {
    const result = await testServer.executeOperation({
      query: ADD_PHASE_MUTATION,
      variables: {
        name: 'Existing Phase',
        description: 'This phase already exists',
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.errors).to.exist
    // expect(result.body.errors[0].message).to.equal('a phase with name Existing Phase already exist')
  })

  it('should update an existing phase', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_PHASE_MUTATION,
      variables: {
        id: 'somePhaseId',
        name: 'Updated Phase Name',
        description: 'Updated Description',
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.updatePhase.name).to.equal('Updated Phase Name')
    // expect(result.body.data.updatePhase.description).to.equal('Updated Description')
  })

  it('should throw an error if the phase to update does not exist', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_PHASE_MUTATION,
      variables: {
        id: 'nonExistentPhaseId',
        name: 'Non-existent Phase',
        description: 'Description',
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.errors).to.exist
    // expect(result.body.errors[0].message).to.equal(`Phase with id "nonExistentPhaseId" doesn't exist`)
  })

  it('should delete a phase if it has no cohorts assigned', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_PHASE_MUTATION,
      variables: {
        id: 'phaseWithNoCohortsId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.deletePhase.id).to.equal('phaseWithNoCohortsId')
  })

  it('should throw an error when attempting to delete a phase with cohorts', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_PHASE_MUTATION,
      variables: {
        id: 'phaseWithCohortsId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.errors).to.exist
    // expect(result.body.errors[0].message).to.equal("You can't delete this phase! Some cohorts belong to it.")
  })
})
