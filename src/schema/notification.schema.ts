import { gql } from 'apollo-server'

const Schema = gql`
  type Notification1 {
    id: ID!
    receiver: ID!
    message: String!
    sender: ID!
    read: Boolean!
    type: String
    createdAt: String!
    updatedAt: String!
  }
  type Profile {
    firstName: String!
    lastName: String!
    name: String
    cover: String
    country: String
    address: String
    phoneNumber: String
    id: ID!
    avatar: String
  }

  type Sender {
    profile: Profile!
  }

  type NotificationReturned {
    id: ID!
    receiver: ID!
    message: String!
    sender: Sender!
    read: Boolean!
    type: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    getAllNotification: [NotificationReturned]!
  }

  type Mutation {
    deleteNotifications(id: ID!): String
    markAsRead(id: ID!): String
    markAllAsRead: String
  }
  type Subscription {
    pushNotification(receiverId: String!): Notification1!
  }
`
export default Schema
