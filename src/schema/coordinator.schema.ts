import { gql } from 'apollo-server'

const Schema = gql`
  type Query {
    getUsers: [User]
    getCohorts(orgToken: String): [Cohort]
    getTrainees(orgToken: String): [User]
    getCohortTrainees(orgToken: String, cohort: String): [User]
    getAllCoordinators(orgToken: String): [User]
  }
  type Message {
    message: String
  }
  type Mutation {
    addMemberToTeam(
      teamName: String!
      email: String!
      orgToken: String!
    ): String
    removeMemberFromCohort(
      teamName: String!
      email: String!
      orgToken: String!
    ): String
    dropTrainee(traineeId: String!, reason: String!, date: DateTime!): String
    editMember(
      removedFromTeamName: String!
      addedToTeamName: String!
      email: String!
      orgToken: String!
    ): String

    inviteUser(email: String!, orgToken: String!, type: String!): String!
  }
`
export default Schema
