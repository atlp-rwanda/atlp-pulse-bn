import { gql } from 'apollo-server';

const Schema = gql`
  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    role: String
  }
  input LoginInput {
    email: String
    password: String
  }
  type Profile {
    id: ID!
    user: User!
    firstName: String
    lastName: String
    address: String!
    name: String
  }

  type UserRole {
    id: ID!
    name: String!
  }

  type Query {
    getUser(id: ID!): User
    user(username: String!): String
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

  type RegisteredUser {
    token: String
    user: User
  }
  type Login {
    token: String
    user: User
  }
  type Mutation {
    createUser(email: String!, password: String!, role: String): RegisteredUser!
    loginUser(loginInput: LoginInput): Login!
  }

  type Query {
    getAllRoles: [UserRole]
    getRole(id: ID!): UserRole
  }

  type Mutation {
    createUserRole(name: String!): UserRole!
    updateUserRole(id: ID!, name: String): User!
    createProfile(
      lastName: String
      firstName: String
      address: String!
    ): Profile
  }
`;

export default Schema;
