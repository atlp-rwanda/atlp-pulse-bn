import { gql } from "apollo-server";

const Schema = gql`
  type Comment {
    id: ID!
    author: User!
    body: String!
    reply: [Reply]
  }

  type Reply {
    id: ID!
    author: User
    body: String!
    comment: Comment!
  }

  type Query {
    getComments: [Comment]
    getReplies: [Reply]
  }
  type Mutation {
    addComment (body: String!, ): Comment!
  }
`;
