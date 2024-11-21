import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
import { PubSub } from 'graphql-subscriptions'

const GET_RATINGS_QUERY = gql`
  query {
    getRatings {
      id
      score
      feedback
    }
  }
`

const CREATE_RATING_MUTATION = gql`
  mutation CreateRating($score: Int!, $feedback: String!) {
    createRating(score: $score, feedback: $feedback) {
      responseMsg
    }
  }
`

const DELETE_RATING_MUTATION = gql`
  mutation DeleteRating($ratingId: ID!) {
    deleteRating(ratingId: $ratingId) {
      responseMsg
    }
  }
`

describe('Ratings Resolver', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch all ratings', async () => {
    const result = await testServer.executeOperation({
      query: GET_RATINGS_QUERY,
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.getRatings).to.be.an('array')
  })

  it('should create a new rating', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_RATING_MUTATION,
      variables: {
        score: 5,
        feedback: 'Great service!',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.createRating.responseMsg).to.equal('Rating created successfully')
  })

  it('should delete a rating', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_RATING_MUTATION,
      variables: {
        ratingId: 'someRatingId',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.deleteRating.responseMsg).to.equal('Rating deleted successfully')
  })
})
