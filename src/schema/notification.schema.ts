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
