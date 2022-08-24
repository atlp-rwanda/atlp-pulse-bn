import { ApolloServer } from 'apollo-server';
import typeDefs from '../schema/index';
import resolvers from '../resolvers/manageStudentsResolver';
import { expect } from 'chai';
import { server } from '../index';

import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { describe } from 'mocha';
import e from 'express';

export const LoginUser = `
  mutation LoginUser($loginInput: LoginInput) {
  loginUser(loginInput: $loginInput) {
    token
    user {
      role
      id 
    }
  }
}
`;

export const getAllCohorts = `
query GetAllCohorts {
  getAllCohorts {
    id
    name
  }
}
`;
export const getAllUsers = `
query Query {
  getAllUsers {
    id
  }
}
`;

export const createCohort = `
mutation CreateCohort($name: String!, $coordinator: ID!, $phase: String!) {
  createCohort(name: $name, coordinator: $coordinator, phase: $phase) {
    name
  }
}
`;

export const addMemberToCohort = `
mutation AddMemberToCohort($cohortName: String!, $memberId: ID!) {
  addMemberToCohort(cohortName: $cohortName, memberId: $memberId)
}
`;

export const removeMemberFromCohort = `
mutation RemoveMemberFromCohort($cohortName: String!, $memberId: ID!) {
  removeMemberFromCohort(cohortName: $cohortName, memberId: $memberId)
}
`;

describe('Manage students by coordinator TEST', () => {
  let testServer: ApolloServer;
  let coordinatorId: string;
  let traineeId: string;
  let traineeId2: string;
  let coordinatorToken: string;
  let coordinatorRole: string;

  before(async () => {
    testServer = server;
    // login a user
    const { errors: traineeError, data: traineeData } =
      await testServer.executeOperation({
        query: LoginUser,
        variables: {
          loginInput: {
            email: 'trainee@gmail.com',
            password: 'trainee',
          },
        },
      });

    traineeId = traineeData!.loginUser.user.id;
    // login another user
    const { errors: traineeError2, data: traineeData2 } =
      await testServer.executeOperation({
        query: LoginUser,
        variables: {
          loginInput: {
            email: 'testUser@gmail.com',
            password: 'testUser',
          },
        },
      });

    traineeId2 = traineeData2!.loginUser.user.id;

    // login a coordinator
    const { errors: coordinatorError, data: coordinatorData } =
      await testServer.executeOperation({
        query: LoginUser,
        variables: {
          loginInput: {
            email: 'coordinator@gmail.com',
            password: 'coordinator',
          },
        },
      });
    coordinatorId = coordinatorData?.loginUser.user.id;
    coordinatorToken = coordinatorData?.loginUser.token;
    coordinatorRole = coordinatorData?.loginUser.user.role;
    testServer.requestOptions = {
      context: {
        role: coordinatorRole,
      },
    };
  });

  describe('Should get all Cohorts', () => {
    it('Should get all cohorts', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: getAllCohorts,
      });
      expect(data).to.not.be.undefined;
      expect(data).to.haveOwnProperty('getAllCohorts');
      // expect(data!.getAllCohorts[0].to.haveOwnProperty('id'))
    });

    it('Should create cohort', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: createCohort,
        variables: {
          name: `${new Date().toISOString()}`,
          coordinator: coordinatorId,
          phase: 'team-project',
        },
      });
      expect(data).to.not.be.null;
      expect(data).to.haveOwnProperty('createCohort');
    });

    it('should not create cohort if cohort name already exists ', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: createCohort,
        variables: {
          name: 'Strikers',
          coordinator: coordinatorId,
          phase: 'team-project',
        },
      });
      expect(errors).to.not.be.undefined;
      expect(errors![0].message).to.be.equal('This cohort already exists ');
    });

    it('should add a member to cohort', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: addMemberToCohort,
        variables: {
          cohortName: 'Strikers',
          memberId: traineeId,
        },
      });
      expect(data).to.not.be.undefined;
    });

    it('should not add a member to cohort due to to user already already existing', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: addMemberToCohort,
        variables: {
          cohortName: 'Strikers',
          memberId: traineeId,
        },
      });
      expect(data).to.not.be.undefined;
    });

    it('should not add a member to cohort due to wrong name', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: addMemberToCohort,
        variables: {
          cohortName: 'ZZ:)*&%^+-',
          memberId: traineeId,
        },
      });
      expect(errors).to.not.be.undefined;
      expect(errors![0].message).to.be.equal('This cohort does not exist ');
    });

    it('should remove a member from cohort', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: removeMemberFromCohort,
        variables: {
          cohortName: 'Strikers',
          memberId: traineeId,
        },
      });
      expect(data).to.not.be.undefined;
      expect(errors).to.be.undefined;
    });

    it('should not remove a member from cohort due to cohort inexistance', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: removeMemberFromCohort,
        variables: {
          cohortName: 'yyyyyyyyyy1@#',
          memberId: traineeId,
        },
      });

      expect(errors).to.not.be.undefined;
      expect(errors![0].message).to.be.equal('This cohort does not exist ');
    });

    it('should not remove a member from cohort due to no membership', async () => {
      const { errors, data } = await testServer.executeOperation({
        query: removeMemberFromCohort,
        variables: {
          cohortName: 'Strikers',
          memberId: traineeId2,
        },
      });
      expect(errors).to.not.be.undefined;
      expect(errors![0].message).to.be.equal(
        'This member is not in this cohort'
      );
    });
  });
});
