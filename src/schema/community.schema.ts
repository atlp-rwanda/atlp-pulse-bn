import { gql } from 'graphql-tag'

const CommunitySchema = gql`
  scalar DateTime

  type User {
    id: ID!
    email: String
    profile: Profile
  }

  type Profile {
    id: ID!
    avatar: String
    bio: String
  }

  type Question {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: DateTime!
    answers: [Answer]
  }

  type Answer {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    question: Question!
  }

  type Query {
    getAllQuestions: [Question!]
    getQuestionById(id: ID!): Question
  }

  type Mutation {
    createQuestion(title: String!, content: String!): Question!
    createAnswer(questionId: ID!, content: String!): Answer!
    deleteQuestion(id: ID!): Question
    deleteAnswer(id: ID!): Answer
  }
`

export default CommunitySchema
