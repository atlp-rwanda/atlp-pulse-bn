import gql from 'graphql-tag'

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

  type Team {
    id: ID!
    name: String
  }

  type Cohort {
    id: ID!
    name: String
  }

  type Ticket {
    id: ID!
    user: UserType
    assignee: UserType
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
    profile: Profile
    team: Team
    cohort: Cohort
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

  input UpdateTicketInput {
    subject: String
    message: String
    status: String
    assignee: ID
  }

  type Query {
    getAllTickets: [Ticket!]!
  }

  type DeleteTicketResponse {
    responseMsg: String!
  }

  type UpdateTicketResponse {
    responseMsg: String!
  }

  type Mutation {
    createTicket(
      subject: String!
      message: String!
      assignee: ID
    ): TicketResponseMsg!
    replyToTicket(ticketId: String!, replyMessage: String!): Reply!
    closeTicket(ticketId: String!): TicketResponseMsg
    updateTicket(
      updateTicketId: ID!
      input: UpdateTicketInput!
    ): UpdateTicketResponse
    deleteTicket(id: ID!): DeleteTicketResponse
  }
`

export default ticketSchema
