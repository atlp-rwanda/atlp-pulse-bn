import { gql } from 'apollo-server';

const statisticsSchema = gql`
  type Statistics {
    totalInvitations: Int!
    totalPending: Int!
    totalAccepted: Int!
  }

  type Query {
    getInvitationStatistics(orgToken: String!): Statistics!
  }
`;

export default statisticsSchema;
