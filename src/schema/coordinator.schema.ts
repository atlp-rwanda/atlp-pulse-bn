import { gql } from 'apollo-server';

const Schema = gql`
  type Query {
    getUsers: [User]
    getCohorts(orgToken: String): [Cohort]
    getTrainees(orgToken: String): [User]
    getCohortTrainees(orgToken: String, cohort: String): [User]
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

    editMember(
      removedFromTeamName: String!
      addedToTeamName: String!
      email: String!
      orgToken: String!
    ): String

    inviteUser(email: String!, orgToken: String!): String!
  }
`;
export default Schema;