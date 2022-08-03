import { gql } from "apollo-server";

const Schema = gql`
  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    profile: Profile!
  }

  type Profile {
    id: ID!
    user: User!
    firstName: String
    lastName: String
    address: String!
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    hello: String
    user(username: String!): String
  }

  type Query {
    getAllProfiles: [Profile]
    getProfile(id: ID!): Profile
  }

  type Mutation {
    createUser(email: String!, password: String): User!
    createProfile(
      lastName: String
      firstName: String
      address: String!
      user: ID
    ): Profile
  }
`;

export default Schema;
