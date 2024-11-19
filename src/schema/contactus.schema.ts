import gql from 'graphql-tag'

const contactUsSchema = gql`
  type Mutation {
    sendMessage(
      name: String!
      email: String!
      phone: String
      message: String!
    ): String
  }
`

export default contactUsSchema
