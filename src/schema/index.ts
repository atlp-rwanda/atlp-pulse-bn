import { gql } from 'apollo-server'

const Schema = gql`
  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    profile: Profile
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
    name: String
    address: String
    city: String
    country: String
    phoneNumber: String
    biography: String
    avatar: String
    coverImage: String
  }

  type UserRole {
    id: ID!
    name: String!
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getProfile: Profile
    getAllRoles: [UserRole]
    getRole(id: ID!): UserRole
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
    createUserRole(name: String!): UserRole!
    createUser(email: String!, password: String!, role: String): RegisteredUser!
    loginUser(loginInput: LoginInput): Login!
    updateProfile(
      lastName: String
      firstName: String
      address: String
      city: String
      country: String
      phoneNumber: String
      biography: String
      fileName: String
      cover: String
    ): Profile
    updateUserRole(id: ID!, name: String): User!
  }
`

export default Schema
