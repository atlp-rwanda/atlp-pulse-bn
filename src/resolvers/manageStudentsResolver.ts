import { ApolloError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import Cohort from '../models/cohort';
import { User } from '../models/user';

const manageStudentResolvers = {
  Query: {
    async getTrainees(_: any, _args: any, context: any) {
      if (!context.role) {
        throw new Error('Please login!');
      } else if (context.role !== 'coordinator') {
        throw new Error('Only coordinators can perform this task.');
      }
      const trainees = await User.find({
        coordinator: context.userId,
      }).populate('cohort');
      return trainees;
    },

    async getAllCohorts(_: any, _args: any, context: any) {
      if (!context.role) {
        throw new Error('Please login!');
      } else if (context.role !== 'coordinator') {
        throw new Error('Only coordinators can perform this task.');
      }

      const allCohorts = await Cohort.find({ coordinator: context.userId })
        .populate('members')
        .populate('coordinator');

      return allCohorts;
    },
    async getCohort(_: any, { cohortName }: any) {
      const getCohort = await Cohort.findOne({ name: cohortName })
        .populate('members')
        .populate('coordinator');
      if (!cohortName) {
        throw new ApolloError('Please provide a cohort name');
      }
      if (!getCohort) {
        throw new ApolloError('no such cohort found');
      }
      return getCohort;
    },
  },
  Mutation: {
    async createCohort(_: any, { name, coordinator, phase }: any) {
      const cohortExists = await Cohort.findOne({ name });
      if (cohortExists) {
        throw new Error('This cohort already exists ');
      }
      const newCohort = await Cohort.create({
        name,
        coordinator,
        phase,
        members: [],
      });
      return newCohort;
    },

    async addMemberToCohort(_: any, { cohortName, email }: any, context: any) {
      if (!context.role) {
        throw new Error('Please log in first!');
      } else if (context.role !== 'coordinator') {
        throw new Error('only coordinators can perform this task!');
      }

      const user = await User.findOne({ email });
      const userId = user._id.toString();
      const isMember = await Cohort.findOne({
        members: userId,
        coordinator: context.userId,
      });
      const cohortExists = await Cohort.findOne({ name: cohortName });

      if (!cohortExists) {
        throw new Error('This cohort does not exist ');
      } else if (isMember) {
        throw new Error(
          `This member is already added to ${isMember.name} cohort you coordinate!`
        );
      } else {
        const updateUser = await User.findOne({ email: email });
        updateUser.cohort = cohortExists.id;
        updateUser.coordinator = context.userId;
        await updateUser.save();
        //@ts-ignore
        cohortExists.members.push(userId);
        await cohortExists.save();
        return `member with email ${email} is successfully added to cohort ${cohortExists.name}`;
      }
    },

    async removeMemberFromCohort(
      _: any,
      { cohortName, email }: any,
      context: any
    ) {
      if (!context.role) {
        throw new Error('Please log in first!');
      } else if (context.role !== 'coordinator') {
        throw new Error('only coordinators can perform this task!');
      }
      const user = await User.findOne({ email });
      const userId = user._id.toString();
      const isMember = await Cohort.findOne({
        name: cohortName,
        members: userId,
        coordinator: context.userId,
      });
      const cohortExists = await Cohort.findOne({ name: cohortName });

      if (!cohortExists) {
        throw new Error('This cohort does not exist ');
      } else if (!isMember) {
        throw new Error('This member is not in this cohort');
      } else {
        user.coordinator = null;
        user.cohort = null;
        await user.save();
        (isMember.members = isMember?.members.filter((member) => {
          return member.toString() !== new ObjectId(userId).toString();
        })),
        await isMember.save();
        return `member with email ${email} is successfully removed from cohort`;
      }
    },

    async editMember(
      _: any,
      { removedFromcohortName, addedTocohortName, email }: any,
      context: any
    ) {
      const user = await User.findOne({ email: email });
      const userId = user._id.toString();
      const removeFromCohort = await Cohort.findOne({
        name: removedFromcohortName,
        members: userId,
        coordinator: context.userId,
      });
      removeFromCohort.members = removeFromCohort?.members.filter((member) => {
        return member.toString() !== new ObjectId(userId).toString();
      });
      await removeFromCohort.save();
      const addedTocohort = await Cohort.findOne({
        name: addedTocohortName,
        coordinator: context.userId,
      });
      user.cohort = addedTocohort.id;
      await user.save();
      addedTocohort.members.push(user.id);
      await addedTocohort.save();
      return `member with email ${email} is successfully added to cohort ${addedTocohort.name}`;
    },
  },
};
export default manageStudentResolvers;
