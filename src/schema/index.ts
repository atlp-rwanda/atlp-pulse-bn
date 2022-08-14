import { gql } from 'apollo-server'

const Schema = gql`
  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    profile: Profile!
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
  }

  type Query {
    getUser(id: ID!): User
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
    createUser(registerInput: RegisterInput): RegisteredUser!
    loginUser(loginInput: LoginInput): Login!
    createProfile(
      lastName: String
      firstName: String
      address: String!
      user: ID
    ): Profile
  }
`

export default Schema
