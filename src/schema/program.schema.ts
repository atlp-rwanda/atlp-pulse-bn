import { gql } from 'apollo-server';

const Schema = gql`
  scalar DateTime

  type Program {
    id: ID!
    name: String!
    description: String
    manager: User!
    organization: Organization!
    cohorts: [Cohort!]!
  }

  type Query {
    getAllPrograms(orgToken: String): [Program!]!
    getProgram(orgToken: String!): Program
  }

  type Mutation {
    addProgram(
      name: String!
      description: String!
      managerEmail: String!
      orgToken: String!
    ): Program!
    deleteProgram(id: ID!, orgToken: String): Program
    updateProgram(
      id: ID!
      orgToken: String
      name: String
      description: String
    ): Program
  }
`;

export default Schema;
