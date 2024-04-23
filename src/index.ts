// Import libraries using ES Module syntax
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloError, ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import morgan from 'morgan';

// Import resolvers, schemas, utilities
import { formatError } from './ErrorMsg';
import { connect } from './database/db.config';
import { context } from './context';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import logger  from './utils/logger.utils';
import errorHandler from './utils/errorHandler.utils';

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

const PORT: number = parseInt(process.env.PORT!) || 4000;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
      schemas,
      cohortSchema,
      programSchema,
      coordinatorSchema,
      phaseSchema,
      ticketSchema,
    ]),
    resolvers: mergeResolvers([
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
    ]),
  });

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
    ],
    formatError: (err) => {
      // Log the error using Winston
      logger.error(`Error: ${err}`, {
        additional: 'details', 
        error: err
      });
  
      // Optionally, modify the error before sending it to the client
      if (err.originalError instanceof ApolloError) {
        return err;
      } else {
        return new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
      }
    },
    context,
    csrfPrevention: true,
  });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    onConnect() {
      console.log('Connected!');
      return { pubsub };
    },
    onDisconnect() {
      console.log('Disconnected!');
    },
  }, {
    server: httpServer,
    path: '/',
  });

  app.use(morgan('dev'));
  app.use('/images', express.static('public'));

  app.use(errorHandler);

  await server.start();
  server.applyMiddleware({ app, path: '/' });

  connect().then(() => {
    logger.info('Database Connected.');
    logger.info(`Environment is set to ${process.env.NODE_ENV }`);
    httpServer.listen({ port: PORT }, () => {
      logger.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer().catch(error => {
  logger.error('Failed to start the server:', error);
});
