import { gql } from 'apollo-server'

const Schema = gql`
  type Query {
    getTrainees: [User]
    getCoordinatorCohorts(orgToken: String): [Cohort]
    getCoordinatorTrainees(orgToken: String):[User]
  }

  type Message {
    message: String
  }
  type Mutation {
    addMemberToCohort(cohortName: String!, email: String!, orgToken: String!): String

    removeMemberFromCohort(cohortName: String!, email: String!, orgToken: String!): String

    editMember(
      removedFromcohortName: String!
      addedTocohortName: String!
      email: String!
      orgToken: String!
    ): String
  }
`
export default Schema
