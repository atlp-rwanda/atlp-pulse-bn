import gql from 'graphql-tag'

const eventSchema = gql`
  enum Status {
    pending
    accepted
    declined
  }
  type Invitee{
    id: ID!
    email: String!
    status: Status!
  }
  type Event {
    id: ID!
    user: String!
    title: String!
    hostName: String!
    start: String!
    end: String!
    timeToStart: String!
    timeToEnd: String!
    invitees: [Invitee]!
  }
  
  type Mutation {
    createEvent(
      title: String!
      hostName: String!
      start: String!
      end: String!
      timeToStart: String!
      timeToEnd: String!
      authToken: String!
      orgToken: String!
      invitees: [String]!
    ): Event!

    editEvent(
      eventId: String!
      title: String!
      hostName: String!
      start: String!
      end: String!
      timeToStart: String!
      timeToEnd: String!
      authToken: String!
      orgToken: String!
      invitees: [String]!
    ): Event!

    cancelEvent(
      eventId: String!
      authToken: String!
    ): Event!

    respondToEventInvitation(
      eventId: String!
      inviteeResponse: String!
      authToken: String!
    ): Event!

  }
  type Query {
    getEvents(authToken: String): [Event]
    getAcceptedEvents(authToken: String): [Event]
    getEvent(
    eventId: String!
    authToken: String!
    ): Event!
  }

`

export default eventSchema
