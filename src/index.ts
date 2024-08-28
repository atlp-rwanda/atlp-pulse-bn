// Import libraries using ES Module syntax
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloError, ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { DocumentNode, execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

// Import resolvers, schemas, utilities
import { connect } from './database/db.config';
import { context } from './context';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import logGraphQLRequests from './utils/logGraphQLRequests'
import logger from './utils/logger.utils';

import userResolvers from './resolvers/userResolver';
import profileResolvers from './resolvers/profileResolver';
import programResolvers from './resolvers/program.resolvers';
import cohortResolvers from './resolvers/cohort.resolvers';
import manageStudentResolvers from './resolvers/coordinatorResolvers';
import createRatingSystemresolver from './resolvers/createRatingSystemresolver';
import ratingResolvers from './resolvers/ratingsResolvers';
import replyResolver from './resolvers/reply.resolver';
import phaseResolver from './resolvers/phase.resolver';
import teamResolver from './resolvers/team.resolvers';
import notificationResolver from './resolvers/notification.resolvers';
import eventResolvers from './resolvers/eventResolver';
import ticketResolver from './resolvers/ticket.resolver';
import DocumentationResolvers from './resolvers/DocumentationResolvers';
import attendanceResolver from './resolvers/attendance.resolvers';
import Sessionresolvers from './resolvers/session.resolver';
import schemas from './schema/index';
import cohortSchema from './schema/cohort.schema';
import programSchema from './schema/program.schema';
import coordinatorSchema from './schema/coordinator.schema';
import phaseSchema from './schema/phase.schema';
import ticketSchema from './schema/ticket.shema';
import notificationSchema from './schema/notification.schema';
import { IResolvers } from '@graphql-tools/utils';

const PORT: number = parseInt(process.env.PORT!) || 4000;

export const typeDefs = mergeTypeDefs([
  schemas,
  notificationSchema,
  cohortSchema,
  programSchema,
  coordinatorSchema,
  phaseSchema,
  ticketSchema,
])

export const resolvers = mergeResolvers([
  userResolvers,
  profileResolvers,
  programResolvers,
  cohortResolvers,
  createRatingSystemresolver,
  manageStudentResolvers,
  ratingResolvers,
  replyResolver,
  phaseResolver,
  teamResolver,
  notificationResolver,
  eventResolvers,
  ticketResolver,
  DocumentationResolvers,
  attendanceResolver,
  Sessionresolvers,
]);

async function startApolloServer(typeDefs: DocumentNode, resolvers: IResolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const pubsub = new PubSub();
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
      logGraphQLRequests,
    ],
    context,
    formatError: (err) => {
      // Log the error using tslog
      logger.error(`${err}`);
      return err;
    },
    csrfPrevention: true,
  });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    onConnect() {
      logger.info('Connected!');
      return { pubsub };
    },
    onDisconnect() {
      logger.warn('Disconnected!');
    },
  }, {
    server: httpServer,
    path: '/',
  });

  app.use('/images', express.static('public'));

  await server.start();
  server.applyMiddleware({ app, path: '/' });

  connect().then(() => {
    console.log('Database Connected.');
    console.log(`Environment is set to ${process.env.NODE_ENV}`);
    httpServer.listen({ port: PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer(typeDefs, resolvers).catch(error => {
  logger.error('Failed to start the server:', error);
});
