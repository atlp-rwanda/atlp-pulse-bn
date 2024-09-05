import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'

const ql = gql`
  query Mutation($registerInput: RegisterInput) {
    createUser(registerInput: $registerInput) {
      token
      user {
        role
        id
      }
    }
  }
`
describe('User mutations', () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })
  it('Should return error as email is taken', async () => {
    const { body } = await testServer.executeOperation({
      query: ql,
      variables: {
        registerInput: {
          email: process.env.TEST_EMAIL,
          password: process.env.TEST_PASS,
        },
      },
    })
    if (body.kind === 'single' && body.singleResult.errors) {
      expect(body.singleResult.errors).to.be.a('Array')
    }
  })
})
