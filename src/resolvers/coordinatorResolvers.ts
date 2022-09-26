import { ApolloError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import Cohort from '../models/cohort.model';
import { Organization, User } from '../models/user';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import { checkLoggedInOrganization } from '../helpers/organization.helper';
import { Context } from './../context';
import Program from '../models/program.model';

const manageStudentResolvers = {
  Query: {
    getCoordinatorTrainees: async (
      _: any,
      { orgToken }: any,
      context: Context
    ) => {
      try {
        // coordinator validation
        const { userId, role } = (await checkUserLoggedIn(context))([
          'coordinator',
        ]);

        // get the organization if someone  logs in
        let org: InstanceType<typeof Organization>;
        org = await checkLoggedInOrganization(orgToken);

        return (
          await User.find({ role: 'trainee' }).populate({
            path: 'cohort',
            match: role === 'coordinator',
            strictPopulate: false,
            populate: {
              path: 'program',
              strictPopulate: false,
              populate: {
                path: 'organization',
                strictPopulate: false,
              },
            },
          })
        ).filter((user: any) => {
          return (
            user.cohort?.program?.organization.name == org?.name &&
            JSON.stringify(user.cohort?.coordinator).replace(/['"]+/g, '') ==
              userId
          );
        });
      } catch (error) {
        const { message } = error as { message: any };
        throw new ApolloError(message.toString(), '500');
      }
    },

  

    async getCoordinatorCohorts(_: any, { orgToken }: any, context: any) {
      // coordinator validation
      const { userId, role } = (await checkUserLoggedIn(context))([
        'coordinator',
      ]);

      // get the organization if someone  logs in
      let org: InstanceType<typeof Organization>;
      org = await checkLoggedInOrganization(orgToken);

      const allCoordinatorCohorts = await Cohort.find({
        coordinator: context.userId,
      }).populate({
        path: 'program',
        match: role === 'coordinator',
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      });

      return allCoordinatorCohorts.filter((cohort: any) => {
        return (
          cohort.program?.organization.name == org?.name &&
          JSON.stringify(cohort.coordinator).replace(/['"]+/g, '') == userId
        );
      });
    },
  },
  Mutation: {
    async addMemberToCohort(
      _: any,
      { cohortName, email, orgToken }: any,
      context: any
    ) {
      // coordinator validation
      const { userId, role } = (await checkUserLoggedIn(context))([
        'coordinator',
      ]);

      // get the organization if someone  logs in
      let org: InstanceType<typeof Organization>;
      org = await checkLoggedInOrganization(orgToken);

      const checkMember: any = await User.findOne({ email }).populate({
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

      let memberId: any;

      if (checkMember.cohort?.coordinator) {
        if (
          JSON.stringify(checkMember.cohort?.coordinator).replace(
            /['"]+/g,
            ''
          ) == userId &&
          checkMember.cohort?.program?.organization?.name == org?.name
        ) {
          const memberCheck = checkMember.cohort?.members.filter(
            (member: any) => {
              return (
                JSON.stringify(member).replace(/['"]+/g, '') == checkMember.id
              );
            }
          );
          if (memberCheck.length > 0) {
            throw new Error(
              `This member is already added to ${checkMember.cohort.name} cohort you coordinate!`
            );
          }
        }
      } else {
        memberId = checkMember.id;
      }

      const isMemberOfCohort = await Cohort.find({
        members: memberId,
        coordinator: userId,
      }).populate({
        path: 'program',
        match: role == 'coordinator',
        model: Program,
        strictPopulate: false,
        populate: {
          path: 'organization',
          model: Organization,
          strictPopulate: false,
        },
      });
      const isMember: any = isMemberOfCohort.filter((cohort: any) => {
        return (
          cohort.program?.organization.name == org?.name &&
          JSON.stringify(cohort.coordinator).replace(/['"]+/g, '') == userId
        );
      });
      

      const cohort: any = await Cohort.findOne({ name: cohortName }).populate({
        path: 'program',
        match: role === 'coordinator',
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      });

      let cohortExists: any;
      if (cohort) {
        if (
          cohort.program?.organization.name == org?.name &&
          JSON.stringify(cohort?.coordinator).replace(/['"]+/g, '') == userId
        ) {
          cohortExists = cohort;
        }
      } else {
        cohortExists = false;
      }

      if (!cohortExists) {
        throw new Error('This cohort does not exist! ');
      } else if (isMember.length > 0) {
        
        throw new Error(
          `This member is already added to ${isMember[0].name} you coordinate!`
        );
      } else {
        if (!checkMember.cohort) {
          checkMember.cohort = cohortExists.id;
          await checkMember.save();
        }
        //@ts-ignore
        cohortExists.members.push(checkMember.id);
        await cohortExists.save();
        return `member with email ${email} is successfully added to cohort ${cohortExists.name}`;
      }
    },
    async removeMemberFromCohort(
      _: any,
      { cohortName, email, orgToken }: any,
      context: any
    ) {
      // coordinator validation
      const { userId, role } = (await checkUserLoggedIn(context))([
        'coordinator',
      ]);

      // get the organization if someone  logs in
      let org: InstanceType<typeof Organization>;
      org = await checkLoggedInOrganization(orgToken);

      const checkMember: any = await User.findOne({ email }).populate({
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

      let memberId: any;
      if(!checkMember){
        throw new Error ('This member does not exist ')
      }

      if (checkMember.cohort?.coordinator) {
         
        if (
          JSON.stringify(checkMember.cohort?.coordinator).replace(
            /['"]+/g,
            ''
          ) == userId &&
          checkMember.cohort?.program?.organization?.name == org?.name && checkMember.cohort?.name == cohortName
        ) {
        
          const memberCheck = checkMember.cohort?.members.filter(
            (member: any) => {
              
              return (
                JSON.stringify(member).replace(/['"]+/g, '') == checkMember.id
              );
            }
          );
        
          if (JSON.stringify(memberCheck[0]).replace(/['"]+/g, '') == checkMember.id) {

          
            (checkMember.cohort.members = checkMember.cohort?.members.filter((member: any) => {
                    return JSON.stringify(member).replace(/['"]+/g, '') !== checkMember.id
                  })),
                    await checkMember.cohort.save();

            checkMember.coordinator = null;
            checkMember.cohort = null;
            await checkMember.save();
            return `member with email ${email} is successfully removed from cohort`;
          }
        }
      } else {
       throw new Error ('This member is not in this cohort')
      }
    },

    async editMember(
      _: any,
      { removedFromcohortName, addedTocohortName, email, orgToken }: any,
      context: any
    ) {

      // coordinator validation
      const { userId, role } = (await checkUserLoggedIn(context))([
        'coordinator',
      ]);

      

      // get the organization if someone  logs in
      let org: InstanceType<typeof Organization>;
      org = await checkLoggedInOrganization(orgToken);

      const checkMember: any = await User.findOne({ email }).populate({
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

      let memberId: any;
      if(!checkMember){
        throw new Error ('This member does not exist ')
      }
      
      if (checkMember.cohort?.coordinator) {
       
        if (
         
          JSON.stringify(checkMember.cohort?.coordinator).replace(
            /['"]+/g,
            ''
          ) == userId &&
          checkMember.cohort?.program?.organization?.name == org?.name && checkMember.cohort?.name == removedFromcohortName
        ) {
         
          const memberCheck = checkMember.cohort?.members.filter(
            (member: any) => {
              return (
                JSON.stringify(member).replace(/['"]+/g, '') == checkMember.id
              );
            }
          );
         

          if (JSON.stringify(memberCheck[0]).replace(/['"]+/g, '') == checkMember.id) {

              
            (checkMember.cohort.members = checkMember.cohort?.members.filter((member: any) => {
                    return JSON.stringify(member).replace(/['"]+/g, '') !== checkMember.id
                  })),
                    await checkMember.cohort.save();

                }
            
            const cohort: any = await Cohort.findOne({ name: addedTocohortName }).populate({
              path: 'program',
              match: role === 'coordinator',
              strictPopulate: false,
              populate: {
                path: 'organization',
                strictPopulate: false,
              },
            });

            let cohortExists: any;
      if (cohort) {
        
        if (
          
          cohort.program?.organization.name == org?.name &&
          JSON.stringify(cohort?.coordinator).replace(/['"]+/g, '') == userId
        ) {
          cohortExists = cohort;
        }
      } else {
        throw new Error('This cohort does not exist! ');
       
      }

      if (!cohortExists) {
        throw new Error('This cohort does not exist! ');
      } else if (cohort.members.filter((member:any) =>{
        
        return JSON.stringify(member).replace(/['"]+/g, '') == checkMember.id 
      }).length > 0 ) {
        
        throw new Error(
          `This member is already added to ${cohort.name} cohort you coordinate!`
        );
      } else {
       
          checkMember.cohort = cohort.id;
          await checkMember.save();
     
        //@ts-ignore
        cohort.members.push(checkMember.id);
        await cohort.save();

        return `member with email ${email} is successfully added to cohort ${cohort.name}`;
          }
        }
      } else {
       throw new Error ('This member is not in this cohort')
      }
    }   
  },
};

export default manageStudentResolvers;
