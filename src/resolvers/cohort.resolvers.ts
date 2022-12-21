import { ApolloError, ValidationError } from 'apollo-server';
import { differenceInHours, isAfter, isPast } from 'date-fns';
import differenceInDays from 'date-fns/differenceInDays';
import { checkLoggedInOrganization } from '../helpers/organization.helper';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import Cohort from '../models/cohort.model';
import Program from '../models/program.model';
import Phase from '../models/phase.model';
import { Organization, User } from '../models/user';
import { Context } from './../context';
import { ProgramType } from './program.resolvers';
import { OrganizationType } from './userResolver';

export type CohortType = InstanceType<typeof Cohort>;

const resolvers = {
  Cohort: {
    async coordinator(parent: any) {
      return await User.findById(parent.coordinator);
    },
    async program(parent: any) {
      return await Program.findById(parent.program);
    },
    async phase(parent: any) {
      return await Phase.findById(parent.phase);
    }
  },
  Query: {
    getAllCohorts: async (_: any, { orgToken }: any, context: Context) => {
      try {
        // some validations
        const { userId, role }: any = (await checkUserLoggedIn(context))([
          'superAdmin',
          'admin',
          'manager',
        ]);

        // get the organization if a superAdmin logs in
        let org;
        if (role !== 'superAdmin') {
          org = await checkLoggedInOrganization(orgToken);
        }

        const managerMatch = { organization: org?.id, manager: userId };
        const adminMatch = { _id: org?.id, admin: userId };

        return (
          await Cohort.find().populate({
            path: 'program',
            match: role === 'manager' && managerMatch,
            model: Program,
            strictPopulate: false,
            populate: {
              path: 'organization',
              match: role === 'admin' && adminMatch,
              model: Organization,
              strictPopulate: false,
            },
          })
        ).filter((item) => {
          const org = (item.program as InstanceType<typeof Program>)
            ?.organization;
          return item.program !== null && org !== null;
        });
      } catch (error) {
        const { message } = error as { message: any };
        throw new ApolloError(message.toString(), '500');
      }
    },
  },
  Mutation: {
    addCohort: async (
      _: any,
      args: {
        name: string;
        phaseName: string;
        coordinatorEmail: string;
        programName: string;
        startDate: Date;
        endDate?: Date;
        orgToken: string;
      },
      context: Context
    ) => {
      try {
        const {
          name,
          coordinatorEmail,
          phaseName,
          programName,
          startDate,
          endDate,
          orgToken 
        } = args;

        // some validations
        (await checkUserLoggedIn(context))(['superAdmin', 'admin', 'manager']);
        const coordinator = await User.findOne({
          email: coordinatorEmail,
        });
        const organ = await checkLoggedInOrganization(orgToken);
        const program = await Program.findOne({ name: programName });
        const phase = await Phase.findOne({ name: phaseName });

        // validate inputs
        if (!phase) {
          throw new ValidationError(
            `Phase with name ${phaseName} doesn't exist`
          );
        }

        if (!coordinator) {
          throw new ValidationError(
            `Coordinator with email ${coordinatorEmail} doesn't exist`
          );
        }
        if (!program) {
          throw new ValidationError(
            `Program with name ${programName} doesn't exist`
          );
        }
        if (differenceInDays(new Date(startDate), Date.now()) < 0) {
          throw new ValidationError("Start Date can't be in the past");
        }
        if (
          endDate &&
          isAfter(new Date(startDate.toString()), new Date(endDate.toString()))
        ) {
          throw new ValidationError("End Date can't be before Start Date");
        }

        const findCohort = await Cohort.find({ name, organization: organ?.id });
        if (findCohort.length) {
          throw new ValidationError(`Cohort with name ${name} already exist`);
        }

        const org = new Cohort({
          name,
          coordinator: coordinator.id,
          phase: phase.id,
          program: program.id,
          startDate,
          endDate,
          organization: organ?.id
        });

        return org.save();
      } catch (error) {
        const { message } = error as { message: any };
        throw new ApolloError(message.toString(), '500');
      }
    },
    updateCohort: async (
      _: any,
      args: {
        id: any;
        orgToken: string;
        name: string;
        phaseName: string;
        coordinatorEmail: string;
        programName: string;
        startDate: Date;
        endDate?: Date;
      },
      context: Context
    ) => {
      const {
        id,
        orgToken,
        name,
        coordinatorEmail,
        phaseName,
        programName,
        startDate,
        endDate,
      } = args;

      const { userId, role }: any = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
        'manager',
        'coordinator',
      ]);
      const coordinator = await User.findOne({
        email: coordinatorEmail,
      });

      const organ = await checkLoggedInOrganization(orgToken);
      const program = await Program.findOne({ name: programName });
      const phase = await Phase.findOne({ name: phaseName });

      const cohort = await Cohort.findById(id).populate({
        path: 'program',
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      });
      const cohortProgram = cohort?.program as ProgramType;
      const cohortOrg = cohortProgram.organization as OrganizationType;

      if (!cohort) {
        throw new ValidationError(`Cohort with id "${id}" doesn't exist`);
      }
      if (!coordinator) {
        throw new ValidationError(
          `Coordinator with email ${coordinatorEmail} doesn't exist`
        );
      }
      if (!phase) {
        throw new ValidationError(
          `Phase with name ${phaseName} doesn't exist`
        );
      }
      if (!program) {
        throw new ValidationError(
          `Program with name ${programName} doesn't exist`
        );
      }
      if (name && name !== cohort.name && (await Cohort.findOne({ name, organization: organ?.id }))) {
        throw new ValidationError(`Phase with name ${name} already exist`);
      }

      if (startDate && differenceInDays(new Date(startDate), Date.now()) < 0) {
        throw new ValidationError("Start Date can't be in the past");
      }
      if (
        endDate &&
        (isAfter(
          new Date(startDate.toString()),
          new Date(endDate.toString())
        ) ||
          isAfter(new Date(cohort.startDate.toString()), new Date(endDate)))
      ) {
        throw new ValidationError("End Date can't be before Start Date");
      }

      if (role !== 'superAdmin') {
        const org = await checkLoggedInOrganization(orgToken);

        if (cohortOrg.id.toString() !== org.id.toString()) {
          throw new ValidationError(
            `Cohort with id "${cohort?.id}" doesn't exist in this organization`
          );
        }
        if (role === 'admin' && !cohortOrg?.admin?.includes(userId)) {
          throw new ValidationError(
            `Cohort with id "${id}" doesn't exist in your organization`
          );
        }
        if (
          role === 'manager' &&
          cohortProgram.manager.toString() !== userId?.toString()
        ) {
          throw new ValidationError(
            `Cohort with id "${id}" doesn't exist in your program`
          );
        }
        if (
          role === 'coordinator' &&
          cohort.coordinator.toString() !== userId?.toString()
        ) {
          throw new ValidationError('You are not assigned this cohort!');
        }
      }

      name && (cohort.name = name);
      phaseName && (cohort.phase = phase.id);
      startDate && (cohort.startDate = startDate);
      endDate && (cohort.endDate = endDate);
      coordinatorEmail && (cohort.coordinator = coordinator.id);
      programName && (cohort.program = program.id);

      await cohort.save();

      return cohort;
    },
    deleteCohort: async (_: any, { id, orgToken }: any, context: Context) => {
      const { userId, role } = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
        'manager',
      ]);

      const cohort = await Cohort.findById(id).populate({
        path: 'program',
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      });
      if (!cohort) {
        throw new ValidationError(`Cohort with id "${id}" doesn't exist`);
      }
      const cohortProgram = cohort.program as ProgramType;
      const cohortOrg = cohortProgram.organization as OrganizationType;

      if (role !== 'superAdmin') {
        const org = await checkLoggedInOrganization(orgToken);

        if (cohortOrg.id.toString() !== org.id.toString()) {
          throw new ValidationError(
            `Cohort with id "${cohort?.id}" doesn't exist in this organization`
          );
        }
        if (
          role === 'admin' &&
          cohortOrg.admin.toString() !== userId?.toString()
        ) {
          throw new ValidationError(
            `Cohort with id "${id}" doesn't exist in your organization`
          );
        }
        if (
          role === 'manager' &&
          cohortProgram.manager.toString() !== userId?.toString()
        ) {
          throw new ValidationError(
            `Cohort with id "${id}" doesn't exist in your program`
          );
        }
      }

      return Cohort.disactivate(cohort?.id);
    },
  },
};

export default resolvers;