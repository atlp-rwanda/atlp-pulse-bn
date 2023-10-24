/* eslint-disable @typescript-eslint/no-var-requires */

import { formatError } from './ErrorMsg'
import { ApolloServer } from 'apollo-server-express'
import { execute, subscribe } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import http from 'http'
import { PubSub } from 'graphql-subscriptions'
const { SubscriptionServer } = require('subscriptions-transport-ws')
import cohortResolvers from './resolvers/cohort.resolvers'
import manageStudentResolvers from './resolvers/coordinatorResolvers'
import createRatingSystemresolver from './resolvers/createRatingSystemresolver'
import profileResolvers from './resolvers/profileResolver'
import programResolvers from './resolvers/program.resolvers'
import userResolvers from './resolvers/userResolver'
import ratingResolvers from './resolvers/ratingsResolvers'
import cohortSchema from './schema/cohort.schema'
import coordinatorSchema from './schema/coordinator.schema'
import ticketSchema from './schema/ticket.shema'
import schemas from './schema/index'
import programSchema from './schema/program.schema'
import replyResolver from './resolvers/reply.resolver'
import phaseResolver from './resolvers/phase.resolver'
import phaseSchema from './schema/phase.schema'
import teamResolver from './resolvers/team.resolvers'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { connect } from './database/db.config'
import { context } from './context'
import notificationResolver from './resolvers/notification.resolvers'
import eventResolvers from './resolvers/eventResolver'
import ticketResolver from './resolvers/ticket.resolver'
import DocumentationResolvers from './resolvers/DocumentationResolvers'
import attendanceResolver from './resolvers/attendance.resolvers'

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
])

export const typeDefs = mergeTypeDefs([
  schemas,
  cohortSchema,
  programSchema,
  coordinatorSchema,
  phaseSchema,
  ticketSchema,
])

;(async function startApolloServer(typeDefs, resolvers) {
  console.log(process.env.NODE_ENV)
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const pubsub = new PubSub()
  // Same ApolloServer initialization as before.
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              // WebSocket subscriptions will be managed by Apollo Server directly.
            },
          }
        },
      },
    ],
    cache: 'bounded',
    formatError: formatError,
    context: context,
    csrfPrevention: true,
  })

  // // Setup serving of static files or images.
  // app.use('/images', express.static('public'));

  // // More required logic for integrating with Express
  // await server.start();
  // server.applyMiddleware({
  //   app,
  //   path: '/',
  // });
  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
      async onConnect() {
        console.log('Connected!')
        // If an object is returned here, it will be passed as the `context`
        // argument to your subscription resolvers.
        return {
          pubsub,
        }
      },
      onDisconnect() {
        console.log('Disconnected!')
      },
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: '/',
    }
  )

  // Modified server startup
  const PORT: number = parseInt(process.env.PORT!) || 4000

  connect().then(() => {
    console.log('Database Connected')
    httpServer.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    )
  })
})(typeDefs, resolvers)
