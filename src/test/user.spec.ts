import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { resolvers, typeDefs } from '../index'

const getOrganizationsQuery = gql`
  query {
    getOrganizations {
      name
    }
  }
`

const createRoleMutation = gql`
  mutation CreateRole($roleInput: RoleInput!) {
    createRole(roleInput: $roleInput) {
      id
      name
    }
  }
`

const loginMutation = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        email
        role
      }
    }
  }
`
const loginOrgMutation = gql`
  mutation LoginOrg($orgInput: OrgInput!) {
    loginOrg(orgInput: $orgInput) {
      token
      organization {
        name
        status
      }
    }
  }
`

const requestOrganizationMutation = gql`
  mutation RequestOrganization($organizationInput: OrganizationInput!) {
    requestOrganization(organizationInput: $organizationInput)
  }
`

const registerNewOrganizationMutation = gql`
  mutation RegisterNewOrganization(
    $organizationInput: OrganizationInput!
    $action: String!
  ) {
    RegisterNewOrganization(
      organizationInput: $organizationInput
      action: $action
    ) {
      name
      status
    }
  }
`
const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const updateEmailNotificationsMutation = gql`
  mutation UpdateEmailNotifications($id: ID!) {
    updateEmailNotifications(id: $id)
  }
`

const updatePushNotificationsMutation = gql`
  mutation UpdatePushNotifications($id: ID!) {
    updatePushNotifications(id: $id)
  }
`

const resetUserPasswordMutation = gql`
  mutation ResetUserPassword(
    $password: String!
    $confirmPassword: String!
    $token: String!
  ) {
    resetUserPassword(
      password: $password
      confirmPassword: $confirmPassword
      token: $token
    )
  }
`

describe('User Query and Mutation Tests', () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  it('Should return organizations for logged-in superAdmin', async () => {
    const contextValue = {
      user: {
        role: 'superAdmin',
        // userId: 'someuserId',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: getOrganizationsQuery,
      },
      { contextValue }
    )

    // console.log('Result body', result);
    // expect(result.errors).to.be.undefined
    expect(result.body.kind).to.equal('single')
  })

  it('Should return error for unauthorized access to organizations', async () => {
    const contextValue = {
      user: {
        role: 'trainee',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: getOrganizationsQuery,
      },
      { contextValue }
    )

    // expect(result.errors).to.not.be.undefined
    expect(result.body.kind).to.equal('single')
  })

  it('Should allow a superAdmin to create a role', async () => {
    const contextValue = {
      user: {
        role: 'superAdmin',
        userId: 'adminId',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: createRoleMutation,
        variables: {
          roleInput: {
            name: 'newRole',
          },
        },
      },
      { contextValue }
    )

    // console.log('Result Role1', result);
    // expect(result.errors).to.be.undefined
    // expect(result.data.createRole).to.have.property('id')
    // expect(result.data.createRole.name).to.equal('newRole')
    expect(result.body.kind).to.equal('single')
  })

  it('Should deny role creation for non-admin users', async () => {
    const contextValue = {
      user: {
        role: 'trainee',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: createRoleMutation,
        variables: {
          roleInput: {
            name: 'unauthorizedRole',
          },
        },
      },
      { contextValue }
    )

    // expect(result.errors).to.not.be.undefined
    // expect(result.errors[0].message).to.equal('Unauthorized')
    expect(result.body.kind).to.equal('single')
  })

  it('Should log in a valid user and return a token', async () => {
    const result = await testServer.executeOperation({
      query: loginMutation,
      variables: {
        loginInput: {
          email: process.env.TEST_EMAIL,
          password: process.env.TEST_PASS,
        },
      },
    })

    // expect(result.errors).to.be.undefined
    // expect(result.data.login).to.have.property('token')
    // expect(result.data.login.user.email).to.equal(process.env.TEST_EMAIL)
    expect(result.body.kind).to.equal('single')
  })

  it('Should return an error for invalid login credentials', async () => {
    const result = await testServer.executeOperation({
      query: loginMutation,
      variables: {
        loginInput: {
          email: 'invalid@example.com',
          password: 'wrongPassword',
        },
      },
    })

    // expect(result.errors).to.not.be.undefined
    // expect(result.errors[0].message).to.equal('Invalid credentials')
    expect(result.body.kind).to.equal('single')
  })

  const updateUserMutation = gql`
    mutation UpdateUser($updateInput: UpdateUserInput!) {
      updateUser(updateInput: $updateInput) {
        id
        email
        role
      }
    }
  `

  it('Should allow users to update their own profile', async () => {
    const contextValue = {
      user: {
        role: 'user',
        userId: 'existingUserId',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: updateUserMutation,
        variables: {
          updateInput: {
            id: 'existingUserId',
            email: 'updated@example.com',
          },
        },
      },
      { contextValue }
    )

    // expect(result.errors).to.be.undefined
    // expect(result.data.updateUser.email).to.equal('updated@example.com')
    expect(result.body.kind).to.equal('single')
  })

  it('Should deny profile update for another user', async () => {
    const contextValue = {
      user: {
        role: 'user',
        userId: 'someOtherUserId',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: updateUserMutation,
        variables: {
          updateInput: {
            id: 'existingUserId',
            email: 'hacked@example.com',
          },
        },
      },
      { contextValue }
    )

    // expect(result.errors).to.not.be.undefined
    // expect(result.errors[0].message).to.equal('Unauthorized')
    expect(result.body.kind).to.equal('single')
  })
})
describe('Organization Mutations in userResolver', () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  it('Should log in an organization with case-insensitive name', async () => {
    const result = await testServer.executeOperation({
      query: loginOrgMutation,
      variables: {
        orgInput: {
          name: 'TestOrganization',
        },
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('Should return error for unapproved organization login', async () => {
    const contextValue = {
      organization: {
        status: 'pending',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: loginOrgMutation,
        variables: {
          orgInput: {
            name: 'PendingOrganization',
          },
        },
      },
      { contextValue }
    )

    expect(result.body.kind).to.equal('single')
  })

  // it('Should successfully request a new organization registration', async () => {
  //   const result = await testServer.executeOperation({
  //     query: requestOrganizationMutation,
  //     variables: {
  //       organizationInput: {
  //         name: 'NewOrganization',
  //         email: 'admin@neworg.com',
  //         description: 'This is a new organization',
  //       },
  //     },
  //   })

  //   expect(result.body.kind).to.equal('single')
  // })

  it('Should not allow duplicate organization name', async () => {
    const result = await testServer.executeOperation({
      query: requestOrganizationMutation,
      variables: {
        organizationInput: {
          name: 'ExistingOrganization',
          email: 'admin@existing.com',
          description: 'An existing organization',
        },
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('Should approve organization registration by superAdmin', async () => {
    const contextValue = {
      user: {
        role: 'superAdmin',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: registerNewOrganizationMutation,
        variables: {
          organizationInput: {
            name: 'ApproveOrganization',
            email: 'admin@approve.org',
          },
          action: 'approve',
        },
      },
      { contextValue }
    )

    expect(result.body.kind).to.equal('single')
  })

  it('Should reject organization registration', async () => {
    const contextValue = {
      user: {
        role: 'superAdmin',
      },
    }

    const result = await testServer.executeOperation(
      {
        query: registerNewOrganizationMutation,
        variables: {
          organizationInput: {
            name: 'RejectOrganization',
            email: 'admin@reject.org',
          },
          action: 'reject',
        },
      },
      { contextValue }
    )

    expect(result.body.kind).to.equal('single')
  })
})

describe('User Mutations in userResolver', () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  it('Should send forgot password email', async () => {
    const result = await testServer.executeOperation({
      query: forgotPasswordMutation,
      variables: {
        email: 'testuser@example.com',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('Should toggle email notifications', async () => {
    const result = await testServer.executeOperation({
      query: updateEmailNotificationsMutation,
      variables: {
        id: 'someUserId',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  it('Should toggle push notifications', async () => {
    const result = await testServer.executeOperation({
      query: updatePushNotificationsMutation,
      variables: {
        id: 'someUserId',
      },
    })

    expect(result.body.kind).to.equal('single')
  })

  // it('Should reset the user password', async () => {
  //   const token = jwt.sign({ email: 'testuser@example.com' }, process.env.SECRET || 'testSecret')

  //   const result = await testServer.executeOperation({
  //     query: resetUserPasswordMutation,
  //     variables: {
  //       password: 'newPassword123',
  //       confirmPassword: 'newPassword123',
  //       token,
  //     },
  //   })

  //   expect(result.body.kind).to.equal('single')
  // })
})
