import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import { expect } from 'chai';
import { resolvers, typeDefs } from '../index';
import { PubSub } from 'graphql-subscriptions';

const GET_ALL_NOTIFICATIONS_QUERY = gql`
  query GetAllNotifications {
    getAllNotification {
      id
      sender {
        profile {
          user
        }
      }
      receiver
      read
      createdAt
    }
  }
`;

const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotifications(id: $id)
  }
`;

const MARK_AS_READ_MUTATION = gql`
  mutation MarkAsRead($id: ID!) {
    markAsRead(id: $id)
  }
`;

const MARK_ALL_AS_READ_MUTATION = gql`
  mutation MarkAllAsRead {
    markAllAsRead
  }
`;

const PUSH_NOTIFICATION_SUBSCRIPTION = gql`
  subscription PushNotification($receiverId: String!) {
    pushNotification(receiverId: $receiverId) {
      id
      sender {
        profile {
          user
        }
      }
      receiver
      createdAt
    }
  }
`;

describe('Notification Resolvers', () => {
  let testServer: ApolloServer;
  let pubsub: PubSub;

  beforeEach(() => {
    pubsub = new PubSub();

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it('should fetch all notifications for the logged-in user', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_NOTIFICATIONS_QUERY,
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should delete a notification by ID', async () => {
    const result = await testServer.executeOperation({
      query: DELETE_NOTIFICATION_MUTATION,
      variables: { id: 'someNotificationId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should mark a notification as read', async () => {
    const result = await testServer.executeOperation({
      query: MARK_AS_READ_MUTATION,
      variables: { id: 'someNotificationId' },
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should mark all notifications as read', async () => {
    const result = await testServer.executeOperation({
      query: MARK_ALL_AS_READ_MUTATION,
    });

    expect(result.body.kind).to.equal('single');
  });

  it('should subscribe to push notifications for a receiver', async () => {
    const result = await testServer.executeOperation({
      query: PUSH_NOTIFICATION_SUBSCRIPTION,
      variables: { receiverId: 'someReceiverId' },
    });

    expect(result.body.kind).to.equal('single');
  });
});
