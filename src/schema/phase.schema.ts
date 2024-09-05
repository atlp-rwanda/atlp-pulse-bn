import gql from 'graphql-tag'

const phaseSchema = gql`
  type Phase {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    getAllPhases(orgToken: String!): [Phase]
  }

  type Mutation {
    addPhase(name: String!, description: String!, orgToken: String!): Phase!
    deletePhase(id: ID!, orgToken: String): Phase
    updatePhase(
      id: ID!
      orgToken: String
      name: String
      description: String
    ): Phase
  }
`

export default phaseSchema
