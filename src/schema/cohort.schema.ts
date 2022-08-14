import { gql } from 'apollo-server'

const Schema = gql`
	scalar DateTime

	type Cohort {
		id: ID!
		name: String!
		coordinator: User!
		phase: String!
		program: Program!
    members: [User]
		startDate: DateTime!
		endDate: DateTime
	}

  type Query {
    getAllCohorts(orgToken: String): [Cohort!]
  }
  type Mutation {
    addCohort(
      name: String!
      phase: String!
      coordinatorEmail: String!
      programName: String!
      startDate: DateTime!
      endDate: DateTime
    ): Cohort!
  }
`

export default Schema


