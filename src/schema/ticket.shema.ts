import { gql } from 'apollo-server'

const ticketSchema = gql`
  type Subscription {
    ticketCreated: Ticket
    replyAdded: Reply
    sendNotsOnTickets: TicketNot
  }

  type TicketNot {
    id: ID!
    receiver: ID!
    message: String!
    sender: UserType!
    createdAt: String!
    read: String!
  }

  type Ticket {
    id: ID!
    user: UserType
    message: String!
    subject: String!
    status: String!
    createdAt: String
    replies: [Reply]
  }

  type Profile {
    name: String
    firstName: String
    lastName: String
  }

  type UserType {
    id: ID!
    email: String!
    role: String
    profile: [Profile]
  }

  type Reply {
    id: ID!
    sender: UserType!
    receiver: UserType!
    replyMessage: String!
    createdAt: String
    ticket: String
  }

  type TicketResponseMsg {
    responseMsg: String!
  }

  type Query {
    getAllTickets: [Ticket!]!
  }
  type Mutation {
    createTicket(subject: String!, message: String!): TicketResponseMsg!
    replyToTicket(ticketId: String!, replyMessage: String!): Reply!
    closeTicket(ticketId: String!): TicketResponseMsg
  }
`

export default ticketSchema
