import { mergeResolvers } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { context } from './context'
import { connect } from './database/db.config'
import profileResolvers from './resolvers/profileResolver'
import userResolvers from './resolvers/userResolver'
import manageStudentResolvers from './resolvers/manageStudentsResolver'
import typeDefs from './schema/index'

import { formatError } from './ErrorMsg'
const PORT = process.env.PORT || 4000

const resolvers = mergeResolvers([userResolvers, profileResolvers,manageStudentResolvers])

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
connect().then(() => {
    console.log('Database connected')
    server
        .listen({ port: PORT })
        .then(({ url }): void => console.log(`Server ready at ${url}`))
})
