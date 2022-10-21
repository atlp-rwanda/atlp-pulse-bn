/* eslint-disable prefer-const */
import { ApolloError } from 'apollo-server-errors';
import * as jwt from 'jsonwebtoken';
import mongoose, { Error } from 'mongoose';
import generateRandomPassword from '../helpers/generateRandomPassword';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import { checkLoggedInOrganization } from '../helpers/organization.helper';
import Cohort from '../models/cohort.model';
import Program from '../models/program.model';
import { Organization, Profile, User, UserRole } from '../models/user';
import { sendEmail } from '../utils/sendEmail';
import organizationCreatedTemplate from '../utils/templates/organizationCreatedTemplate';
import registrationRequest from '../utils/templates/registrationRequestTemplate';
import { EmailPattern } from '../utils/validation.utils';
import { Context } from './../context';

const SECRET: string = process.env.SECRET || 'test_secret';
export type OrganizationType = InstanceType<typeof Organization>;

const resolvers: any = {
  Query: {
    async getOrganizations(_: any, __: any, context: Context) {
      (await checkUserLoggedIn(context))(['superAdmin']);

      return Organization.find();
    },
    async getOrganization(_: any, { name }: any, context: Context) {
      const { userId, role } = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
      ]);

      const where = role === 'superAdmin' ? {} : { admin: userId, name };

      const organization = await Organization.find(where);
      return organization[0];
    },

    async getSignupOrganization(_: any, { orgToken }: any, context: Context) {
      let org: InstanceType<typeof Organization>;
      org = await checkLoggedInOrganization(orgToken);
      return Organization.findOne({ name: org.name });
    },
  },
  Mutation: {
    async createUser(
      _: any,
      {
        email,
        password,
        role,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        orgToken,
      }: any
    ) {
      let org: InstanceType<typeof Organization>;
      // checkLoggedInOrganization checks if the organization token passed was valid
      org = await checkLoggedInOrganization(orgToken);

      const userExists = await User.findOne({ email: email });
      if (userExists)
        throw new ApolloError(
          'User with a such email already exists',
          'UserInputError'
        );

      const emailExpression =
        /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValidEmail = emailExpression.test(String(email).toLowerCase());
      if (!isValidEmail)
        throw new ApolloError('invalid email format', 'ValidationError');
      if (password.length < 6)
        throw new ApolloError(
          'password should be minimum 6 characters',
          'ValidationError'
        );

      const user = await User.create({
        role: role || 'user',
        email: email,
        password,
        organizations: org.name,
      });
      const token = jwt.sign({ userId: user._id, role: user?.role }, SECRET, {
        expiresIn: '2h',
      });

      const newProfile = await Profile.create({
        user,
        firstName,
        lastName,
        dateOfBirth,
        gender,
      });

      const newUser: string | null = await User.findByIdAndUpdate(
        user.id,
        {
          profile: newProfile,
        },
        { new: true }
      );

      return { token, user: newUser };
    },
    async createProfile(_: any, args: any, context: { userId: any }) {
      if (!context.userId) throw new Error('Unauthorized');
      if (!mongoose.isValidObjectId(context.userId))
        throw new Error('Invalid user id');
      const userExists = await User.findOne({ _id: context.userId });
      if (!userExists) throw new Error('This user does not exists');
      const profile = await Profile.findOneAndUpdate(
        { user: context.userId },
        args,
        {
          upsert: true,
          new: true,
        }
      );

      return profile.toJSON();
    },
    async loginUser(
      _: any,
      { loginInput: { email, password, orgToken } }: any
    ) {
      // get the organization if someone  logs in
      let org: InstanceType<typeof Organization>;
      org = await checkLoggedInOrganization(orgToken);

      const user: any = await User.findOne({ email }).populate({
        path: 'cohort',
        model: Cohort,
        strictPopulate: false,
        populate: {
          path: 'program',
          model: Program,
          strictPopulate: false,
          populate: {
            path: 'organization',
            model: Organization,
            strictPopulate: false,
          },
        },
      });

      if (await user?.checkPass(password)) {
        if (
          user?.role === 'trainee' &&
          user?.cohort?.program?.organization?.name == org?.name
        ) {
          const token = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          );
          const data = {
            token: token,
            user: user.toJSON(),
          };
          return data;
        }
        const organization: any = await Organization.findOne({
          name: org?.name,
          admin: user.id,
        });

        if (user?.role === 'admin' && organization) {
          const token = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          );
          const data = {
            token: token,
            user: user.toJSON(),
          };
          return data;
        } else if (user?.role === 'manager') {
          const program: any = await Program.find({
            manager: user.id,
          }).populate({
            path: 'organization',
            model: Organization,
            strictPopulate: false,
          });
          let checkProgramOrganization: any = false;

          for (let i = 0; i < program.length; i++) {
            if (program[i].organization.name == org?.name) {
              checkProgramOrganization = true;
            }
          }
          if (checkProgramOrganization) {
            const managerToken = jwt.sign(
              { userId: user._id, role: user._doc?.role || 'user' },
              SECRET,
              {
                expiresIn: '2h',
              }
            );
            const managerData = {
              token: managerToken,
              user: user.toJSON(),
            };
            return managerData;
          } else {
            throw new Error('You logged into a different organization');
          }
        } else if (user?.role === 'coordinator') {
          const cohort: any = await Cohort.find({
            coordinator: user.id,
          }).populate({
            path: 'program',
            model: Program,
            strictPopulate: false,
            populate: {
              path: 'organization',
              model: Organization,
              strictPopulate: false,
            },
          });
          let checkCohortOrganization: any = false;

          for (let i = 0; i < cohort.length; i++) {
            if (cohort[i].program.organization.name == org?.name) {
              checkCohortOrganization = true;
            }
          }

          if (checkCohortOrganization) {
            const coordinatorToken = jwt.sign(
              { userId: user._id, role: user._doc?.role || 'user' },
              SECRET,
              {
                expiresIn: '2h',
              }
            );
            const coordinatorData = {
              token: coordinatorToken,
              user: user.toJSON(),
            };
            return coordinatorData;
          } else {
            throw new Error(
              'You are not part of the organization you logged in.'
            );
          }
        } else if (user?.role === 'superAdmin') {
          const superAdminToken = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          );
          const superAdminData = {
            token: superAdminToken,
            user: user.toJSON(),
          };
          return superAdminData;
        } else {
          throw new Error(
            'You are not part of the organization you logged in.'
          );
        }
      } else {
        throw new ApolloError('Invalid credential', 'UserInputError');
      }
    },

    async updateUserRole(_: any, { id, name }: any) {
      // Checking user privilege

      const roleExists = await UserRole.findOne({ name: name });
      if (!roleExists) throw new Error("This role doesn't exist");
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            role: name,
          },
        },
        { new: true }
      );
      return updatedUser;
    },
    async createUserRole(_: any, { name }: any) {
      const newRole = await UserRole.create({ name });
      return newRole;
    },

    async loginOrg(_: any, { orgInput: { name } }: any) {
      const organization: any = await Organization.findOne({ name });
      if (organization) {
        const token = jwt.sign({ name: organization.name }, SECRET, {
          expiresIn: '2h',
        });
        const data = {
          token: token,
          organization: organization.toJSON(),
        };
        return data;
      } else {
        throw new ApolloError('Invalid Organization Name', 'UserInputError');
      }
    },

    async requestOrganization(
      _: any,
      { organizationInput: { name, email, description } }: any
    ) {
      const orgExists = await Organization.findOne({ name: name });
      if (orgExists) {
        throw new ApolloError(
          'Organization Name already taken ' + name,
          'UserInputError'
        );
      }

      const emailExpression = EmailPattern;
      const isValidEmail = emailExpression.test(String(email).toLowerCase());
      if (!isValidEmail)
        throw new ApolloError('invalid email format', 'ValidationError');

      const user = await User.findOne({ email, role: { $ne: 'admin' } });
      if (user) {
        throw new ApolloError(
          `User with email ${email} exists and is not an admin, user another email`
        );
      }

      const superAdmin = await User.find({ role: 'superAdmin' });

      const content = registrationRequest(email, name, description);
      const link: any = 'https://king-prawn-app-au5ls.ondigitalocean.app';
      return sendEmail(
        superAdmin[0].email,
        'Organisation registration request',
        content,
        link,
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASS
      )
        .then(() => 'Organisation registration request sent successfully')
        .catch((error) => error);
    },

    async addOrganization(
      _: any,
      { organizationInput: { name, email, description } }: any,
      context: Context
    ) {
      // the below commented line help to know if the user is an superAdmin to perform an action of creating an organization
      (await checkUserLoggedIn(context))(['superAdmin']);

      const orgExists = await Organization.findOne({ name: name });
      if (orgExists) {
        throw new ApolloError(
          'Organization Name already taken ' + name,
          'UserInputError'
        );
      }

      // check if the requester is already an admin, if not create him
      const admin = await User.findOne({ email, role: 'admin' });
      let password: any = undefined;
      let newAdmin: any = undefined;
      if (!admin) {
        password = generateRandomPassword();
        newAdmin = await User.create({
          email,
          password,
          role: 'admin',
        });
      }

      // create the organization
      const org = await Organization.create({
        admin: admin ? admin._id : newAdmin?._id,
        name,
        description,
      });

      // send the requester an email with his password
      const content = organizationCreatedTemplate(org.name, email, password);
      const link: any = 'https://king-prawn-app-au5ls.ondigitalocean.app';
      // send an email to the user who desire the organization
      await sendEmail(
        email,
        'Organization created notice',
        content,
        link,
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASS
      );

      return org;
    },

    async deleteOrganization(_: any, { id }: any, context: Context) {
      const { userId } = (await checkUserLoggedIn(context))(['admin']);

      const organizationExists = await Organization.findOne({ id });
      if (!organizationExists)
        throw new Error("This Organization doesn't exist");
      const deleteOrg = await Organization.findOneAndDelete({
        admin: userId,
        _id: id,
      });
      return deleteOrg;
    },
  },

  User: {
    async profile(parent: any) {
      const profile = await Profile.findOne({ user: parent.id.toString() });
      if (!profile) {
        return null;
      } else {
        return profile;
      }
    },
  },
  Profile: {
    async user(parent: any) {
      const user = await User.findOne({ _id: parent.user.toString() });
      if (!user) return null;
      return user;
    },
  },
  Organization: {
    async admin(parent: any) {
      return User.findById(parent.admin);
    },
  },
};
export default resolvers;
