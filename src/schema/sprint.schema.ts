import gql from "graphql-tag";

const sprintSchema = gql`

type Sprint{
    id: ID!
    phase: Phase!
    sprintNbr: Number!
    organization: Organization!
    startDate: DateTime!
    endDate: DateTime!
    isDeleted: Boolean!
}

type Query{
    getSprints(
        phase: ID!,
        orgToken: String!
    ):[Sprint]!
    getSprint(
        sprintId: ID!,
        orgToken: String!
    ): Sprint!
}

type Mutation{
    createSprint(
        phase: ID!
        startDate: String!
        endDate: String!
        orgToken: String
    ): Sprint!
    updateSprint(
        sprintId: ID!
        startDate: String!
        endDate: String!
        orgToken: String!
    ): Sprint!
    deleteSprint(
        sprintId: ID!
        orgToken: String!
    ): Sprint!
}
`
export default sprintSchema