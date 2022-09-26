import { gql } from 'apollo-server'

const Schema = gql`
	type User {
		id: ID!
		role: String!
		email: String!
		password: String!
		profile: Profile
    coordinator:User
    cohort:Cohort
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

	type Query {
		getAllUsers: [User]
		getProfile: Profile
		getAllRoles: [UserRole]
		getRole(id: ID!): UserRole
		getOrganizations: [Organization]!
		getOrganization(name: String!): Organization
	}

	type Mutation {
		createUserRole(name: String!): UserRole!
		createUser(email: String!, password: String!, role: String): RegisteredUser!
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
`
export default Schema

