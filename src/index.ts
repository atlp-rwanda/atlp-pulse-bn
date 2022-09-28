import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { context } from './context'
import { connect } from './database/db.config'
import cohortResolvers from './resolvers/cohort.resolvers'
import profileResolvers from './resolvers/profileResolver'
import programResolvers from './resolvers/program.resolvers'
import userResolvers from './resolvers/userResolver'
import cohortSchema from './schema/cohort.schema'
import schema from './schema/index'
import programSchema from './schema/program.schema'
import coordinatorSchema from './schema/coordinator.schema'
import { formatError } from './ErrorMsg'
import createRatingSystemresolver from './resolvers/createRatingSystemresolver'
import manageStudentResolvers from './resolvers/coordinatorResolvers'

export const resolvers = mergeResolvers([
    userResolvers,
    profileResolvers,
    programResolvers,
    cohortResolvers,
    createRatingSystemresolver,
    manageStudentResolvers
])
export const typeDefs = mergeTypeDefs([schema, cohortSchema, programSchema, coordinatorSchema])

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    cache: 'bounded',
    formatError: formatError,
    context: context,
    csrfPrevention: true,
})

const PORT: number = parseInt(process.env.PORT!) || 4000

connect().then(() => {
    console.log('Database Connected')
    server.listen({ port: PORT }).then(({ url }) => console.log(`Server ready at ${url}`))
})