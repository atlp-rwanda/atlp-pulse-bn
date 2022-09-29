import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { context } from './context'
import { connect } from './database/db.config'
import cohortResolvers from './resolvers/cohort.resolvers'
import profileResolvers from './resolvers/profileResolver'
import programResolvers from './resolvers/program.resolvers'
import userResolvers from './resolvers/userResolver'
<<<<<<< HEAD
<<<<<<< HEAD
import cohortSchema from './schema/cohort.schema'
import schema from './schema/index'
import programSchema from './schema/program.schema'
import coordinatorSchema from './schema/coordinator.schema';
=======
import ratingResolvers from './resolvers/ratingsResolvers'
import typeDefs from './schema/index'

>>>>>>> 60083b5a7ed24d2ede340717570bc6e4ef1324f6
=======
import ratingResolvers from './resolvers/ratingsResolvers'
import cohortSchema from './schema/cohort.schema'
import schema from './schema/index'
import programSchema from './schema/program.schema'
import coordinatorSchema from './schema/coordinator.schema'
>>>>>>> 72cf498483edb23f357aae84bd02b293969a47d9
import { formatError } from './ErrorMsg'
import createRatingSystemresolver from './resolvers/createRatingSystemresolver'
import manageStudentResolvers from './resolvers/coordinatorResolvers'

<<<<<<< HEAD
export const resolvers = mergeResolvers([
    userResolvers,
    profileResolvers,
    programResolvers,
    cohortResolvers,
    createRatingSystemresolver,
    manageStudentResolvers,
    ratingResolvers
])
export const typeDefs = mergeTypeDefs([schema, cohortSchema, programSchema, coordinatorSchema])
=======
const resolvers = mergeResolvers([userResolvers, profileResolvers,createRatingSystemresolver, ratingResolvers])
>>>>>>> 60083b5a7ed24d2ede340717570bc6e4ef1324f6

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