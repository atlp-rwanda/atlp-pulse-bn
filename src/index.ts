import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { context } from './context';
import { connect } from './database/db.config';
import { formatError } from './ErrorMsg';
import cohortResolvers from './resolvers/cohort.resolvers';
import manageStudentResolvers from './resolvers/coordinatorResolvers';
import createRatingSystemresolver from './resolvers/createRatingSystemresolver';
import profileResolvers from './resolvers/profileResolver';
import programResolvers from './resolvers/program.resolvers';
import userResolvers from './resolvers/userResolver';
import ratingResolvers from './resolvers/ratingsResolvers';
import cohortSchema from './schema/cohort.schema';
import coordinatorSchema from './schema/coordinator.schema';
import schema from './schema/index';
import programSchema from './schema/program.schema';
import replyResolver from './resolvers/reply.resolver';
import { sendEmails } from './utils/sendEmails';
import phaseResolver from './resolvers/phase.resolver';
import phaseSchema from './schema/phase.schema';

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
]);
export const typeDefs = mergeTypeDefs([
  schema,
  cohortSchema,
  programSchema,
  coordinatorSchema,
  phaseSchema
]);

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
    // ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  cache: 'bounded',
  formatError: formatError,
  context: context,
  csrfPrevention: true,
});

const PORT: number = parseInt(process.env.PORT!) || 4000;

connect().then (() => {
  console.log('Database Connected');
 
  server
    .listen({ port: PORT })
    .then(({ url }) => console.log(`Server ready at ${url}`));
});
