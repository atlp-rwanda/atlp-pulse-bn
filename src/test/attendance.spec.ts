import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
import { PubSub } from 'graphql-subscriptions'

const GET_TEAM_ATTENDANCE_QUERY = gql`
  query GetTeamAttendance($team: String!) {
    getTeamAttendance(team: $team) {
      id
      cohort {
        id
        name
      }
      phase {
        id
        name
      }
      teams {
        team {
          id
          name
        }
        trainees {
          trainee {
            id
            firstName
            lastName
          }
          status {
            day
            score
          }
        }
      }
    }
  }
`

const RECORD_ATTENDANCE_MUTATION = gql`
  mutation RecordAttendance(
    $week: String!
    $team: String!
    $date: String
    $orgToken: String!
    $trainees: [TraineeAttendanceInput!]!
  ) {
    recordAttendance(
      week: $week
      team: $team
      date: $date
      orgToken: $orgToken
      trainees: $trainees
    ) {
      team {
        id
        name
      }
      trainees {
        trainee {
          id
          firstName
          lastName
        }
        status {
          day
          score
        }
      }
    }
  }
`

describe('Attendance Resolvers', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch team attendance', async () => {
    const result = await testServer.executeOperation({
      query: GET_TEAM_ATTENDANCE_QUERY,
      variables: { team: 'someTeamId' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.getTeamAttendance).to.exist
  })

  it('should record attendance', async () => {
    const result = await testServer.executeOperation({
      query: RECORD_ATTENDANCE_MUTATION,
      variables: {
        week: 'Week 1',
        team: 'someTeamId',
        date: '2024-10-09',
        orgToken: 'someOrgToken',
        trainees: [
          {
            trainee: 'traineeId1',
            status: {
              day: 'mon',
              score: '1',
            },
          },
        ],
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.recordAttendance).to.exist
  })
})
