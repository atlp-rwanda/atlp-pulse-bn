import { gql } from 'apollo-server';

const Schema = gql`
  type Cohort {
    name: String
    phase: String
    coordinator: User
  }

  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    profile: Profile
    cohort: Cohort
    organizations: [String!]!
  }
  input RegisterInput {
    email: String!
    password: String!
    role: String
  }

  input LoginInput {
    email: String
    password: String
    orgToken: String
  }

  input OrgInput {
    name: String
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

  type RegisteredUser {
    token: String
    user: User
  }
  type Login {
    token: String
    user: User
  }
  type OrgLogin {
    token: String
    organization: Organization
  }

  type Organization {
    id: ID!
    name: String!
    description: String
    admin: User
  }

  input OrganizationInput {
    email: String!
    name: String!
    description: String
  }

  type Rating {
    user: User!
    sprint: Int!
    reply:[Notifications]
    quantity: String!
    quantityRemark: String
    quality: String!
    qualityRemark: String
    professional_Skills: String!
    professionalRemark: String
    approved: Boolean!
    coordinator: String!
  }

  type AddRating {
    user: String!
    sprint: Int!
    quantity: String!
    quantityRemark: String
    quality: String!
    qualityRemark: String
    professional_Skills: String!
    professionalRemark: String
    approved: Boolean!
  }

  type updateRating {
    user: String
    sprint: Int
    quantity: [String]
    quantityRemark: [String]
    quality: [String]
    qualityRemark: [String]
    professional_Skills: [String]
    professionalRemark: [String]
    approved: Boolean
  }

  type FetchRatingForAdmin {
    user: User!
    sprint: Int
    quantity: [String]
    quantityRemark: [String]
    quality: [String]
    qualityRemark: [String]
    professional_Skills: [String]
    professionalRemark: [String]
    approved: Boolean
  }

  type ApproveRating {
    user: String!
    sprint: Int!
    quantity: String!
    quantityRemark: String
    quality: String!
    qualityRemark: String
    professional_Skills: String!
    professionalRemark: String
    approved: Boolean!
  }

  type Query {
    getAllUsers: [User]
    getUsers(orgToken: String):[User]
    getProfile: Profile
    getAllRoles: [UserRole]
    getRole(id: ID!): UserRole
    getOrganizations: [Organization]!
    getOrganization(name: String!): Organization
    getSignupOrganization(orgToken: String!): Organization
    fetchRatings(orgToken: String): [Rating]
    fetchTrainees: [Cohort]
    fetchRatingsForAdmin(orgToken: String): [FetchRatingForAdmin]
    fetchRatingsTrainee: [Rating]
    fetchCohortsCoordinator(cohortName: ID!): [Cohort]
  }

  type Mutation {
    createUserRole(name: String!): UserRole!
    createUser(
      firstName: String!
      lastName: String!
      dateOfBirth: DateTime!
      gender: String!
      email: String!
      password: String!
      orgToken: String!
      role: String
    ): RegisteredUser!
    loginUser(loginInput: LoginInput): Login!
    loginOrg(orgInput: OrgInput): OrgLogin!
    requestOrganization(organizationInput: OrganizationInput!): String!
    addOrganization(organizationInput: OrganizationInput): Organization!
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

    createProfile(
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
    deleteOrganization(id: ID!): Organization
    addRatings(
      user: String!
      sprint: Int!
      quantity: String!
      quantityRemark: String
      quality: String!
      qualityRemark: String
      professional_Skills: String!
      professionalRemark: String
      orgToken: String!
    ): AddRating
    updateRating(
      user: String!
      sprint: Int!
      quantity: [String]
      quantityRemark: [String]
      quality: [String]
      qualityRemark: [String]
      professional_Skills: [String]
      professionalRemark: [String]
      orgToken: String!
    ): updateRating
    approveRating(user: String!, sprint: Int!): ApproveRating
    rejectRating(user: String!, sprint: Int!): String!
  }
  type ratingSystem {
    id: ID!
    name: String!
    grade: [Int]!
    description: [String]!
    percentage: [String]!
    userId: String!
  }
  type Mutation {
    createRatingSystem(
      name: String!
      grade: [Int]!
      description: [String]!
      percentage: [String]!
    ): ratingSystem!
    deleteRatingSystem(id: ID!): String!
  }
  type Query {
    getRatingSystems: [ratingSystem]
    getRatingSystem(id: ID!): ratingSystem!
  }
  type Notifications {
		id: ID!
		user: String!
        sprint: Int!
		quantityRemark: String!
		qualityRemark: String!
		professionalRemark: String!
		bodyQuantity: String
		bodyQuality: String
		bodyProfessional: String
		createdAt: String!
	
	}
	type Query {
		getReplies: [Notifications]
		getRepliesByUser(userId:String): [Notifications]
	}
	
	type Mutation{
		addReply(
			sprint: Int!
			bodyQuantity: String
			bodyQuality: String
			bodyProfessional: String
		): Notifications!
		deleteReply(id: ID): String!
	}
  
`;
export default Schema;
