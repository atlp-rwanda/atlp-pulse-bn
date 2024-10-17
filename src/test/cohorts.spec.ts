import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
import { PubSub } from 'graphql-subscriptions'

const GET_ALL_COHORTS_QUERY = gql`
  query GetAllCohorts($orgToken: String!) {
    getAllCohorts(orgToken: $orgToken) {
      id
      name
      startDate
      endDate
      coordinator {
        id
        email
      }
      program {
        id
        name
      }
      phase {
        id
        name
      }
    }
  }
`

const ADD_COHORT_MUTATION = gql`
  mutation AddCohort(
    $name: String!
    $phaseName: String!
    $coordinatorEmail: String!
    $programName: String!
    $startDate: Date!
    $endDate: Date
    $orgToken: String!
  ) {
    addCohort(
      name: $name
      phaseName: $phaseName
      coordinatorEmail: $coordinatorEmail
      programName: $programName
      startDate: $startDate
      endDate: $endDate
      orgToken: $orgToken
    ) {
      id
      name
    }
  }
`

const UPDATE_COHORT_MUTATION = gql`
  mutation UpdateCohort(
    $id: ID!
    $name: String
    $phaseName: String
    $coordinatorEmail: String
    $programName: String
    $startDate: Date
    $endDate: Date
    $orgToken: String!
  ) {
    updateCohort(
      id: $id
      name: $name
      phaseName: $phaseName
      coordinatorEmail: $coordinatorEmail
      programName: $programName
      startDate: $startDate
      endDate: $endDate
      orgToken: $orgToken
    ) {
      id
      name
    }
  }
`

const DELETE_COHORT_MUTATION = gql`
  mutation DeleteCohort($id: ID!, $orgToken: String!) {
    deleteCohort(id: $id, orgToken: $orgToken) {
      id
      name
    }
  }
`

describe('Cohort Resolvers', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch all cohorts', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_COHORTS_QUERY,
      variables: {
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('should add a new cohort', async () => {
    const result = await testServer.executeOperation({
      query: ADD_COHORT_MUTATION,
      variables: {
        name: 'Test Cohort',
        phaseName: 'Test Phase',
        coordinatorEmail: 'test@coordinator.com',
        programName: 'Test Program',
        startDate: new Date(),
        endDate: new Date(),
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('should update a cohort', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_COHORT_MUTATION,
      variables: {
        id: 'someCohortId',
        name: 'Updated Test Cohort',
        phaseName: 'Updated Test Phase',
        coordinatorEmail: 'updated@coordinator.com',
        programName: 'Updated Test Program',
        startDate: new Date(),
        endDate: new Date(),
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('should delete a cohort', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_COHORT_MUTATION,
      variables: {
        id: 'someCohortId',
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
  })
})
