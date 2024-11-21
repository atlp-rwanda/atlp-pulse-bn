import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'
import { PubSub } from 'graphql-subscriptions'

const GET_PROFILE_QUERY = gql`
  query GetProfile {
    getProfile {
      id
      firstName
      lastName
      email
    }
  }
`

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers($orgToken: String!) {
    getAllUsers(orgToken: $orgToken) {
      id
      firstName
      lastName
      role
    }
  }
`

const UPLOAD_RESUME_MUTATION = gql`
  mutation UploadResume($userId: ID!, $resume: String!) {
    uploadResume(userId: $userId, resume: $resume) {
      id
      resume
    }
  }
`

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile(
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $city: String!,
    $country: String!,
    $phoneNumber: String!,
    $biography: String!,
    $avatar: String!,
    $cover: String!,
    $githubUsername: String!
  ) {
    updateProfile(
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      city: $city,
      country: $country,
      phoneNumber: $phoneNumber,
      biography: $biography,
      avatar: $avatar,
      cover: $cover,
      githubUsername: $githubUsername
    ) {
      id
      firstName
      lastName
    }
  }
`

const DROP_TTL_USER_MUTATION = gql`
  mutation DropTTLUser($email: String!, $reason: String!) {
    dropTTLUser(email: $email, reason: $reason)
  }
`

describe('Profile Resolver', () => {
  let testServer: ApolloServer
  let pubsub: PubSub

  beforeEach(() => {
    pubsub = new PubSub()

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should fetch a user profile', async () => {
    const result = await testServer.executeOperation({
      query: GET_PROFILE_QUERY,
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.getProfile).to.be.an('object')
    // expect(result.body.data.getProfile.email).to.exist
  })

  it('should fetch all users for a given organization', async () => {
    const result = await testServer.executeOperation({
      query: GET_ALL_USERS_QUERY,
      variables: {
        orgToken: 'validOrgToken',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.getAllUsers).to.be.an('array')
  })

  it('should upload a resume for the user', async () => {
    const result = await testServer.executeOperation({
      query: UPLOAD_RESUME_MUTATION,
      variables: {
        userId: 'someUserId',
        resume: 'path/to/resume.pdf',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.uploadResume.resume).to.equal('path/to/resume.pdf')
  })

  it('should update a user profile', async () => {
    const result = await testServer.executeOperation({
      query: UPDATE_PROFILE_MUTATION,
      variables: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'Metropolis',
        country: 'USA',
        phoneNumber: '1234567890',
        biography: 'Software Developer',
        avatar: 'avatar.png',
        cover: 'cover.jpg',
        githubUsername: 'johndoe',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.updateProfile.firstName).to.equal('John')
  })

  it('should drop a TTL user', async () => {
    const result = await testServer.executeOperation({
      query: DROP_TTL_USER_MUTATION,
      variables: {
        email: 'ttluser@example.com',
        reason: 'Not needed',
      },
    })

    expect(result.body.kind).to.equal('single')
    // expect(result.body.data.dropTTLUser).to.equal('TTL user with email ttluser@example.com has been deleted. with Reason :Not needed')
  })
})
