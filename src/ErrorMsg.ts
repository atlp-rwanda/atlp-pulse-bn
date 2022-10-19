import { GraphQLError } from 'graphql';
export function formatError(error: GraphQLError): GraphQLError {
  if (error.extensions?.exception?.stacktrace !== undefined) {
    error.extensions.exception.stacktrace = undefined;
  }
  return error;
}
