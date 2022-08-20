import { ApolloServer, gql } from 'apollo-server'
import { connect } from './database/db.config'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import typeDefs from './schema/index'

import resolvers from './resolvers/resolver'
import { context } from './context'


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    cache: 'bounded',
    context: context
})

connect().then(() => {
    console.log('Database connected')
    server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
})
