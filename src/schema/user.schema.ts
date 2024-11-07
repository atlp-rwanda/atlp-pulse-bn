import gql from "graphql-tag";

const userSchema = gql`

type PullRequest {
    merged: String!
    closed: String!
    opened: String!
}

type GitHubActivity {
    totalCommits: String!
    pullRequest: PullRequest!
}

type RegisteredUser {
    token: String
    user: User
  }

type Query {
    getOrganizations(orgToken: String!): [Organization]!
    getOrganization(name: String!, orgToken: String!): Organization
    getCurrentOrganization(orgToken: String!): Organization
    gitHubActivity(orgToken: String!): GitHubActivity!
}

type OrgLogin {
    token: String
    organization: Organization
}

type Login {
    token: String!
    user: User!
    geoData: Activity!
}

input OrganizationInput {
    email: String!
    name: String!
    description: String!
}

type RequestedOrganization{
    message: String!,
    org: Organization!
}

type Mutation {
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

    addUserToOrganization(
      invitationToken: String!
    ): User!

    updateProfile(
      biography: String
      cover: String
      avatar: String
      githubUsername: String
      resume: String
      orgToken: String!
    ): Profile

    loginUser(
      email: String
      password: String
      orgToken: String
    ): Login!

    deleteUser(
      userId: String!
      reason: String
      orgToken: String!
    ): Message!

    updateUserRole(
      userId: ID!,
      role: String!,
      orgToken: String!
    ): User!

    loginOrg(name: String!): OrgLogin!

    requestOrganization(organizationInput: OrganizationInput!): RequestedOrganization!

    RegisterNewOrganization(
      name: String!,
      action: String!,
      orgToken: String!,
    ): Organization!

    addOrganization(
      organizationInput: OrganizationInput
      orgToken: String!
    ): Organization!

    updateGithubOrganisation(
      gitHubOrganisation: String!
      orgToken: String!
    ): Organization

    deleteOrganization(
      orgId: ID!
      orgToken: String!
    ): Organization

    addActiveRepostoOrganization(
      repoUrl: String!
      orgToken: String!
    ): Organization!

    deleteActiveRepostoOrganization(
      repoUrl: String!
      orgToken: String!
    ): Organization!

    updatePushNotifications(orgToken: String!): Message!
    updateEmailNotifications(orgToken: String!): Message!

    forgotPassword(email: String!): Message!

    resetUserPassword(
      password: String!
      confirmPassword: String!
      resetToken: String!
    ): Message!

    changeUserPassword(
      currentPassword: String!
      newPassword: String!
      confirmPassword: String!
      orgToken: String!
    ): Message!
}

`
export default userSchema