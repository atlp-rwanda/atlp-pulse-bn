import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
// import { Ticket, User } from '../models'
import { PubSub } from 'graphql-subscriptions'

const GET_ALL_TICKETS_QUERY = gql`
  query {
    getAllTickets {
      id
      subject
      message
      status
    }
  }
`

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($subject: String!, $message: String!, $assignee: ID) {
    createTicket(subject: $subject, message: $message, assignee: $assignee) {
      responseMsg
    }
  }
`

const REPLY_TO_TICKET_MUTATION = gql`
  mutation ReplyToTicket($ticketId: ID!, $replyMessage: String!) {
    replyToTicket(ticketId: $ticketId, replyMessage: $replyMessage) {
      replyMessage
    }
  }
`

const CLOSE_TICKET_MUTATION = gql`
  mutation CloseTicket($ticketId: ID!) {
    closeTicket(ticketId: $ticketId) {
      responseMsg
    }
  }
`

describe('Ticket Resolvers', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch all tickets', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_TICKETS_QUERY,
    })

    expect(result.body.kind).to.equal('single')
  })

  it('should create a new ticket', async () => {
    const result = await testServer.executeOperation({
      query: CREATE_TICKET_MUTATION,
      variables: {
        subject: 'Test Ticket Subject',
        message: 'This is a test ticket message',
        assignee: 'someUserId',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('should reply to a ticket', async () => {
    const result = await testServer.executeOperation({
      query: REPLY_TO_TICKET_MUTATION,
      variables: {
        ticketId: 'someTicketId',
        replyMessage: 'This is a reply message',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('should close a ticket', async () => {
    const result = await testServer.executeOperation({
      query: CLOSE_TICKET_MUTATION,
      variables: {
        ticketId: 'someTicketId',
      },
    })

    expect(result.body.kind).to.equal('single')
  })
})
