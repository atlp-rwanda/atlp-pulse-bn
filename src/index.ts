import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { context } from './context'
import { connect } from './database/db.config'
import cohortResolvers from './resolvers/cohort.resolvers'
import profileResolvers from './resolvers/profileResolver'
import programResolvers from './resolvers/program.resolvers'
import userResolvers from './resolvers/userResolver'
import ratingResolvers from './resolvers/ratingsResolvers'
import typeDefs from './schema/index'

import { formatError } from './ErrorMsg'
import createRatingSystemresolver from './resolvers/createRatingSystemresolver';
import manageStudentResolvers from './resolvers/coordinatorResolvers';

const resolvers = mergeResolvers([userResolvers, profileResolvers,createRatingSystemresolver, ratingResolvers])

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

const PORT: number = parseInt(process.env.PORT!) | 4000

connect().then(() => {
    console.log('Database connected')
    server.listen({ port: PORT }).then(({ url }) => console.log(`Server ready at ${url}`))
})