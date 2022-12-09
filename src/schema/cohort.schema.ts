import { gql } from 'apollo-server';

const Schema = gql`
  scalar DateTime

  type Cohort {
    id: ID!
    name: String!
    coordinator: User!
    phase: Phase!
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
      phaseName: String
      coordinatorEmail: String!
      programName: String!
      startDate: DateTime!
      endDate: DateTime
    ): Cohort!
    updateCohort(
      id: ID!
      orgToken: String
      coordinatorEmail: String!
      programName: String!
      name: String
      phaseName: String
      startDate: DateTime
      endDate: DateTime
    ): Cohort
    deleteCohort(id: ID!, orgToken: String): Cohort
  }
`;

export default Schema;
