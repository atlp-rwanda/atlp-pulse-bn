// Import libraries using ES Module syntax
import express from 'express'
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { DocumentNode } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { graphqlUploadExpress } from 'graphql-upload-ts'

// Import resolvers, schemas, utilities
import { connect } from './database/db.config'
import { context } from './context'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import logGraphQLRequests from './utils/logGraphQLRequests'
import logger from './utils/logger.utils'

import userResolvers from './resolvers/userResolver'
import profileResolvers from './resolvers/profileResolver'
import programResolvers from './resolvers/program.resolvers'
import cohortResolvers from './resolvers/cohort.resolvers'
import manageStudentResolvers from './resolvers/coordinatorResolvers'
import createRatingSystemresolver from './resolvers/createRatingSystemresolver'
import ratingResolvers from './resolvers/ratingsResolvers'
import replyResolver from './resolvers/reply.resolver'
import phaseResolver from './resolvers/phase.resolver'
import teamResolver from './resolvers/team.resolvers'
import notificationResolver from './resolvers/notification.resolvers'
import eventResolvers from './resolvers/eventResolver'
import ticketResolver from './resolvers/ticket.resolver'
import DocumentationResolvers from './resolvers/DocumentationResolvers'
import attendanceResolver from './resolvers/attendance.resolvers'
import Sessionresolvers from './resolvers/session.resolver'
import invitationResolvers from './resolvers/invitation.resolvers'
import schemas from './schema/index'
import cohortSchema from './schema/cohort.schema'
import programSchema from './schema/program.schema'
import coordinatorSchema from './schema/coordinator.schema'
import phaseSchema from './schema/phase.schema'
import ticketSchema from './schema/ticket.shema'
import notificationSchema from './schema/notification.schema'

import statisticsSchema from './schema/invitationStatics.schema'
import StatisticsResolvers from './resolvers/invitationStatics.resolvers'

import { IResolvers } from '@graphql-tools/utils'
import invitationSchema from './schema/invitation.schema'
import TableViewInvitationResolver from './resolvers/TableViewInvitationResolver'

const PORT: number = parseInt(process.env.PORT!) || 4000

export const typeDefs = mergeTypeDefs([
  schemas,
  notificationSchema,
  cohortSchema,
  programSchema,
  coordinatorSchema,
  phaseSchema,
  ticketSchema,
  invitationSchema,
  notificationSchema,
  statisticsSchema,
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

  StatisticsResolvers,

  invitationResolvers,
  TableViewInvitationResolver,
])

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: IResolvers
) {
  const app = express() as any
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const graphqlPath = process.env.NODE_ENV === 'development'? '/': '/ws'

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: graphqlPath,
  })

  const wsServerCleanup = useServer({ schema }, wsServer)

  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000,
      maxFiles: 10,
      overrideSendResponse: false,
    })
  )

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose()
            },
          }
        },
      },
      logGraphQLRequests,
    ],
    formatError: (err: any) => {
      // Log the error using tslog
      logger.error(`${err.message}`)
      return err
    },
    csrfPrevention: true,
  })

  await server.start()

  app.use(
    graphqlPath,
    cors({
      origin: '*',
    }),
    express.json(),
    expressMiddleware(server, {
      context,
    })
  )
  app.use('/images', express.static('public'))

  connect().then(() => {
    console.log('Database Connected.')
    console.log(`Environment is set to ${process.env.NODE_ENV}`)
    httpServer.listen({ port: PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${graphqlPath}`)
    })
  })
}

startApolloServer(typeDefs, resolvers).catch((error) => {
  logger.error('Failed to start the server:', error)
})
