import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    hello: String
    }`

const resolvers = {
  Query: {
    hello: () => 'Hellooo, welcome to your Graphql server'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(
  ({ url }) => console.log(`Server ready at ${url}`
  ))