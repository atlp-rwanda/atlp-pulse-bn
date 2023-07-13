import { gql } from 'apollo-server';

const ticketSchema = gql`
  type Ticket {
    _id: ID!
    firstName: String!
    lastName: String!
    message: String!
    email: String!
    subject: String!
    status: String!
    user: UserType
    createdAt: String
  }

  type UserType {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
  }

  type CreateTicketResponse {
    responseMsg: String!
  }

  type Query {
    getAllTickets: [Ticket!]!
  }
  type Mutation {
    createTicket(subject: String!, message: String!): CreateTicketResponse!
  }
`;

export default ticketSchema;
