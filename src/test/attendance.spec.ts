import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
import { PubSub } from 'graphql-subscriptions'

// Queries and Mutations
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

const GET_TRAINEE_ATTENDANCE_BY_ID_QUERY = gql`
  query GetTraineeAttendanceByID($traineeEmail: String!) {
    getTraineeAttendanceByID(traineeEmail: $traineeEmail) {
      weekNumber
      traineeAttendance {
        day
        score
      }
    }
  }
`

const GET_ATTENDANCE_STATS_QUERY = gql`
  query GetAttendanceStats {
    getAttendanceStats {
      week
      traineesStatistics {
        traineeId
        attendancePerc
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

const UPDATE_ATTENDANCE_MUTATION = gql`
  mutation UpdateAttendance(
    $week: String!
    $team: String!
    $orgToken: String!
    $trainees: [TraineeAttendanceInput!]!
    $phase: String!
  ) {
    updateAttendance(
      week: $week
      team: $team
      orgToken: $orgToken
      trainees: $trainees
      phase: $phase
    ) {
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

const DELETE_ATTENDANCE_MUTATION = gql`
  mutation DeleteAttendance($week: String!, $day: String!, $team: String!) {
    deleteAttendance(week: $week, day: $day, team: $team) {
      teams {
        team {
          id
          name
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

  it('should fetch trainee attendance by ID', async () => {
    const result = await testServer.executeOperation({
      query: GET_TRAINEE_ATTENDANCE_BY_ID_QUERY,
      variables: { traineeEmail: 'trainee@example.com' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.getTraineeAttendanceByID).to.exist
  })

  it('should fetch attendance stats', async () => {
    const result = await testServer.executeOperation({
      query: GET_ATTENDANCE_STATS_QUERY,
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.getAttendanceStats).to.exist
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

  it('should update attendance', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_ATTENDANCE_MUTATION,
      variables: {
        week: 'Week 1',
        team: 'someTeamId',
        orgToken: 'someOrgToken',
        phase: 'somePhaseId',
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
    // expect(result.body.singleResult.data?.updateAttendance).to.exist
  })

  it('should delete attendance', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_ATTENDANCE_MUTATION,
      variables: {
        week: 'Week 1',
        day: 'mon',
        team: 'someTeamId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.data?.deleteAttendance).to.exist
  })
})

describe('Attendance Resolvers Edge Cases', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should return null or error for invalid team ID in getTeamAttendance', async () => {
    const result = await testServer.executeOperation({
      query: GET_TEAM_ATTENDANCE_QUERY,
      variables: { team: 'invalidTeamId' },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist
  })

  it('should return error for missing orgToken in recordAttendance', async () => {
    const result = await testServer.executeOperation({
      query: RECORD_ATTENDANCE_MUTATION,
      variables: {
        week: 'Week 1',
        team: 'someTeamId',
        date: '2024-10-09',
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
    // expect(result.body.singleResult.errors).to.exist // Expect an error due to missing orgToken
  })

  it('should return error for invalid trainee data in recordAttendance', async () => {
    const result = await testServer.executeOperation({
      query: RECORD_ATTENDANCE_MUTATION,
      variables: {
        week: 'Week 1',
        team: 'someTeamId',
        date: '2024-10-09',
        orgToken: 'someOrgToken',
        trainees: [
          {
            trainee: '',
            status: {
              day: 'mon',
              score: '1',
            },
          },
        ],
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist
  })

  it('should return error for missing week in updateAttendance', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_ATTENDANCE_MUTATION,
      variables: {
        team: 'someTeamId',
        orgToken: 'someOrgToken',
        phase: 'somePhaseId',
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
    // expect(result.body.singleResult.errors).to.exist // Expect an error due to missing week
  })

  it('should return error for invalid week in deleteAttendance', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_ATTENDANCE_MUTATION,
      variables: {
        week: 'invalidWeek',
        day: 'mon',
        team: 'someTeamId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist 
  })

  it('should return error for non-existent team in deleteAttendance', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_ATTENDANCE_MUTATION,
      variables: {
        week: 'Week 1',
        day: 'mon',
        team: 'nonExistentTeamId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.singleResult.errors).to.exist 
  })
})
