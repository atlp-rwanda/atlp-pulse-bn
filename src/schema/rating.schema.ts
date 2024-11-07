import gql from "graphql-tag"

const ratingSchema = gql`

enum RatingAction{
    approve
    reject
}

type Feedback {
    id: ID!
    sender: User!
    content: String
    createdAt: String
  }

  type Rating {
    id: ID!
    user: User!
    sprint: Int!
    phase: String!
    quantity: String!
    quality: String!
    attendance: String
    professional_Skills: String!
    approved: Boolean!
    cohort: Cohort!
    average: String
    feedbacks: [Feedback]!
  }

  type RejectedRows{
    email: String
    quantity: Int
    quality: Int
    professional_skills: Int
    feedBacks: String
  }
  
  type AddRatingsByFileData{
    NewRatings: [Rating]!
    UpdatedRatings: [Rating]!
    RejectedRatings: [RejectedRows]!
  }

  type Query{
    FetchRatings(orgToken: String!): [Rating]!

    FetchRatingByCohort(
      cohortId: String!,
      orgToken: String!
    ):[Rating]!

    FetchRatingUpdates(orgToken: String!): Rating!

    FetchRatingsBySprint(
      sprintId: String!,
      orgToken: String!
    ): [Rating]!
  }

  type Mutation{
    AddRatings(
      userId: String!
      sprintId: String!
      quantity: Int!
      quality: Int!
      professional_Skills: Int!
      orgToken: String!
    ): Rating!

    AddRatingsByFile(
      file: Upload!
      sprintId: String!
      orgToken: String!
    ):AddRatingsByFileData!

    UpdateRating(
      userId: String!
      sprintId: Int!
      quantity: Int!
      quality: Int!
      professional_Skills: Int!
      feedbacks: String!
      orgToken: String!
    ): Rating!

    AddRatingFeedback(
      ratingId: String!
      feedback: String!
      orgToken: String
    ): Rating!

    ApproveOrRejectRating(
      ratingId: String!,
      action: String!
      orgToken: String!
    ): Rating!

  }
`
export default ratingSchema