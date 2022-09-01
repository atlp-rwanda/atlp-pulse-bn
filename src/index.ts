import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { connect } from './database/db.config'
import typeDefs from './schema/index'
const PORT = process.env.PORT || 4000

import { context } from './context'
import resolvers from './resolvers/resolver'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    cache: 'bounded',
    context: context,
})

connect().then(() => {
    console.log('Database connected')
    server
        .listen({ port: PORT })
        .then(({ url }): void => console.log(`Server ready at ${url}`))
})
