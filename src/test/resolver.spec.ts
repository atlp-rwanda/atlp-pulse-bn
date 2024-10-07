import { expect } from 'chai';
import resolvers from '../resolvers/resolver';
import { User } from '../models/user';

describe('Resolver Tests', () => {
  describe('Mutation: createUser', () => {
    it('should create a new user with valid input', async () => {
      const registerInput = {
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user',
      };

      const result = await resolvers.Mutation.createUser(null, { registerInput });

      const createdUser = await User.findOne({ email: 'testuser@example.com' });

      expect(createdUser).to.not.be.null;
      expect(result.token).to.be.a('string');
      expect(result.user.email).to.equal('testuser@example.com');
    });

    it('should throw error when email already exists', async () => {
      const registerInput = {
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user',
      };

      try {
        await resolvers.Mutation.createUser(null, { registerInput });
      } catch (error: any) {
        expect(error.message).to.equal('Email is taken');
      }
    });
  });

});
describe('Mutation: loginUser', () => {
  it('should login a user with valid credentials', async () => {
    const loginInput = {
      email: 'devpulse@proton.me',
      password: 'Test@12345',
    };

    const result = await resolvers.Mutation.loginUser(null, { loginInput });

    expect(result.token).to.be.a('string');
    expect(result.user.email).to.equal('devpulse@proton.me');
  });

  it('should throw error for invalid credentials', async () => {
    const loginInput = {
      email: 'testuser@example.com',
      password: 'wrongpassword',
    };

    try {
      await resolvers.Mutation.loginUser(null, { loginInput });
    } catch (error: any) {
      expect(error.message).to.equal('Invalid credential');
    }
  });
});
describe('Query: getAllProfiles', () => {
  it('should return all profiles if authorized', async () => {
    const context = { userId: 'some-valid-user-id' };

    const result = await resolvers.Query.getAllProfiles(null, {}, context);

    expect(result).to.be.an('array');
    expect(result.length).to.be.greaterThan(0);
  });

  it('should throw error if unauthorized', async () => {
    const context = { userId: null };

    try {
      await resolvers.Query.getAllProfiles(null, {}, context);
    } catch (error: any) {
      expect(error.message).to.equal('Unauthorized');
    }
  });
});

