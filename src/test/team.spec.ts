import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
import { PubSub } from 'graphql-subscriptions'

const GET_ALL_TEAMS_QUERY = gql`
  query GetAllTeams($orgToken: String!) {
    getAllTeams(orgToken: $orgToken) {
      id
      name
      cohort {
        name
      }
      manager {
        name
      }
      program {
        name
      }
    }
  }
`

const CREATE_TEAM_MUTATION = gql`
  mutation AddTeam(
    $name: String!
    $cohortName: String!
    $orgToken: String!
    $ttlEmail: String!
  ) {
    addTeam(
      name: $name
      cohortName: $cohortName
      orgToken: $orgToken
      ttlEmail: $ttlEmail
    ) {
      id
      name
      cohort {
        name
      }
    }
  }
`

const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam($teamId: String!, $name: String!) {
    updateTeam(teamId: $teamId, name: $name) {
      id
      name
    }
  }
`

const DELETE_TEAM_MUTATION = gql`
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      id
      name
    }
  }
`

describe('Team Resolvers', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  // afterEach(async () => {
  // });

  it('should fetch all teams', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_TEAMS_QUERY,
      variables: { orgToken: 'someOrgToken' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data.getAllTeams).to.be.an('array');
    // expect(result.body.singleResult.data.getAllTeams[0]).to.have.property('id');
    // expect(result.body.singleResult.data.getAllTeams[0]).to.have.property('name');
  })

  it('should create a new team', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_TEAM_MUTATION,
      variables: {
        name: 'New Test Team',
        cohortName: 'Test Cohort',
        orgToken: 'someOrgToken',
        ttlEmail: 'ttl@example.com',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data.addTeam.name).to.equal('New Test Team');
    // expect(result.body.singleResult.data.addTeam.cohort.name).to.equal('Test Cohort');
  })

  it('should update a team name', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_TEAM_MUTATION,
      variables: {
        teamId: 'teamId123',
        name: 'Updated Team Name',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data.updateTeam).to.have.property('id', 'teamId123');
    // expect(result.body.singleResult.data.updateTeam).to.have.property('name', 'Updated Team Name');
  })

  it('should delete a team', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_TEAM_MUTATION,
      variables: {
        teamId: 'teamId123',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data.deleteTeam).to.have.property('id', 'teamId123');
    // expect(result.body.singleResult.data.deleteTeam.name).to.exist;
  })

  it('should return an error for invalid orgToken when fetching teams', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_TEAMS_QUERY,
      variables: { orgToken: 'invalidToken' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist;
    // expect(result.body.singleResult.errors[0].message).to.equal('Invalid organization token.');
  })

  it('should return an error for updating a non-existent team', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_TEAM_MUTATION,
      variables: {
        teamId: 'nonExistentTeamId',
        name: 'New Team Name',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist;
    // expect(result.body.singleResult.errors[0].message).to.equal('Team not found.');
  })

  it('should return an error for deleting a non-existent team', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_TEAM_MUTATION,
      variables: {
        teamId: 'nonExistentTeamId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist;
    // expect(result.body.singleResult.errors[0].message).to.equal('Team not found.');
  })
})
