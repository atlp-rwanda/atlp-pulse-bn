import { ApolloError, ValidationError } from 'apollo-server'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Team from '../models/team.model'
import Program from '../models/program.model'
import Phase from '../models/phase.model'
import Cohort from '../models/cohort.model'
import { RoleOfUser, User } from '../models/user'
import { Organization } from '../models/organization.model'
import { Context } from '../context'
import { ProgramType } from './program.resolvers'
import { OrganizationType } from './userResolver'
import { Rating } from '../models/ratings'
import { pushNotification } from '../utils/notification/pushNotification'
import { Types } from 'mongoose'
import { GraphQLError } from 'graphql'

const resolvers = {
  Team: {
    async cohort(parent: any) {
      return await Cohort.findById(parent.cohort)
    },
    async ttl(parent: any) {
      return await User.findById(parent.ttl)
    },
    async members(parent: any) {
      return await User.find({ _id: { $in: parent.members } })
    },
    async avgRatings(parent: any) {
      const allRatings = await Rating.find({ user: { $in: parent.members } })
      const averageQuantity =
        allRatings.reduce((tot, curr) => tot + Number(curr?.quantity ?? 0), 0) /
        allRatings.length
      const averageQuality =
        allRatings.reduce((tot, curr) => tot + Number(curr?.quality ?? 0), 0) /
        allRatings.length
      const averageAttendance =
        allRatings.reduce(
          (tot, curr) => tot + Number(curr?.professional_Skills ?? 0),
          0
        ) / allRatings.length

      return {
        quantity: averageQuantity.toString(),
        quality: averageQuality.toString(),
        professional_Skills: averageAttendance.toString(),
      }
    },
  },
  Query: {
    getAllTeams: async (_: any, { orgToken }: any, context: Context) => {
      try {
        // some validations
        const { userId, role } = (await checkUserLoggedIn(context))([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
        ])

        // get the organization if a superAdmin logs in
        let org
        if (role !== RoleOfUser.SUPER_ADMIN) {
          org = await checkLoggedInOrganization(orgToken)
        }

        const managerMatch = { organization: org?.id, manager: userId }
        const adminMatch = { _id: org?.id, admin: userId }

        return (
          (
            await Team.find({ organization: org })
              .populate({
                path: 'cohort',
                match: role === RoleOfUser.MANAGER && managerMatch,
                model: Cohort,
                strictPopulate: false,
                populate: {
                  path: 'organization',
                  match: role === RoleOfUser.ADMIN && adminMatch,
                  model: Organization,
                  strictPopulate: false,
                  populate: {
                    path: 'members',
                    model: User,
                    strictPopulate: false,
                  },
                },
              })
              .populate({
                path: 'phase',
                model: Phase,
                strictPopulate: false,
              })
              .populate({
                path: 'program',
                model: Program,
                strictPopulate: false,
              })
              .populate({
                path: RoleOfUser.MANAGER,
                model: User,
                strictPopulate: false,
              })
          )
            // .populate({ path: 'members', model: User, strictPopulate: false })
            .filter((item: any) => {
              const org = (item.program as InstanceType<typeof Program>)
                ?.organization
              return item.program !== null && org !== null
            })
        )
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
    getAllTeamInCohort: async (
      _: any,
      { orgToken, cohort }: any,
      context: Context
    ) => {
      try {
        // some validations
        const { userId, role } = (await checkUserLoggedIn(context))([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
          RoleOfUser.COORDINATOR,
          RoleOfUser.MANAGER,
        ])

        // get the organization if a superAdmin logs in
        let org
        if (role !== RoleOfUser.SUPER_ADMIN) {
          org = await checkLoggedInOrganization(orgToken)
        }

        const managerMatch = { organization: org?.id, manager: userId }
        const adminMatch = { _id: org?.id, admin: userId }

        return (
          await Team.find({ organization: org }).populate({
            path: 'cohort',
            match: role === RoleOfUser.MANAGER && managerMatch,
            model: Cohort,
            strictPopulate: false,
            populate: {
              path: 'organization',
              match: role === RoleOfUser.ADMIN && adminMatch,
              model: Organization,
              strictPopulate: false,
            },
          })
        ).filter((item: any) => {
          console.log(item)

          const org = (item.program as InstanceType<typeof Program>)
            ?.organization
          const itemCohort = item?.cohort?.name === cohort
          return item.program !== null && org !== null && itemCohort
        })
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
    getTeamTrainees: async (
      _: any,
      { orgToken, team }: any,
      context: Context
    ) => {
      try {
        // coordinator validation
        const { userId, role }: any = (await checkUserLoggedIn(context))([
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
          RoleOfUser.TTL,
        ])

        // get the organization if someone  logs in
        const org: InstanceType<typeof Organization> =
          await checkLoggedInOrganization(orgToken)
        return (
          await User.find({ role: 'trainee' }).populate({
            path: 'team',
            strictPopulate: false,
            populate: [
              {
                path: 'cohort',
                strictPopulate: false,
                populate: {
                  path: 'program',
                  strictPopulate: false,
                  populate: {
                    path: 'organization',
                    strictPopulate: false,
                  },
                },
              },
              { path: 'team.ttl', strictPopulate: false },
            ],
          })
        ).filter((user: any) => {
          if (role === RoleOfUser.ADMIN) {
            return (
              user.team?.name == team &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              user.team?.cohort?.program?.organization.admin.includes(userId)
            )
          }
          if (role === RoleOfUser.MANAGER) {
            return (
              user.team.name == team &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.program?.manager).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
          if (role === RoleOfUser.COORDINATOR) {
            return (
              user.team.name == team &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.coordinator).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
          if (role === 'ttl') {
            return (
              user.team?.name === team &&
              // user?.organizations?.includes(org?.name)
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.ttl).replace(/['"]+/g, '') === userId
            )
          }
        })
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
  },
  Mutation: {
    addTeam: async (
      _: any,
      args: {
        name: string
        cohortName: string
        orgToken: string
        startingPhase: Date
        ttlEmail: string
      },
      context: Context
    ) => {
      try {
        const { name, cohortName, orgToken, startingPhase, ttlEmail } = args

        // some validations
        ;(await checkUserLoggedIn(context))([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
        ])
        const cohort = await Cohort.findOne({ name: cohortName })

        const organ = await checkLoggedInOrganization(orgToken)

        // validate inputs
        if (await Team.findOne({ name, organization: organ?.id })) {
          throw new GraphQLError(`Team with name ${name} already exist`, {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
        if (!cohort) {
          throw new GraphQLError(
            `Cohort with name ${cohortName} doesn't exist`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }

        const ttlExist = await User.findOne({
          email: ttlEmail,
          role: 'ttl',
        })

        if (!ttlExist) {
          throw new GraphQLError(`TTl with ${ttlEmail} doesn't exist`, {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }

        const org = new Team({
          name,
          cohort: cohort.id,
          organization: organ?.id,
          startingPhase,
          ttl: ttlExist?.id,
          phase: null,
          manager: null,
          Program: null,
        })
        cohort.teams = cohort.teams + 1
        cohort.save()
        const newTeam = org.save()

        const senderId = new Types.ObjectId(context.userId)
        pushNotification(
          new Types.ObjectId(ttlExist.id),
          `Team "${name}" has been assigned to you as TTL,  "${cohort.name}"`,
          senderId
        )
        pushNotification(
          new Types.ObjectId(cohort.coordinator.toString()),
          `Team "${name}" has been added to your cohort "${cohort.name}"`,
          senderId
        )

        return newTeam
      } catch (error: any) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
    deleteTeam: async (parent: any, args: any, context: Context) => {
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
      ])
      const findTeam = await Team.findById(args.id)
      if (!findTeam)
        throw new Error('The Team you want to delete does not exist')

      if (findTeam.members.length > 0) {
        throw new ValidationError(
          `you can't delete ${findTeam.name} because it has members`
        )
      }

      const cohort = await Cohort.findById(findTeam.cohort)

      await Team.findByIdAndDelete({ _id: args.id })
      cohort ? (cohort.teams = cohort.teams - 1) : null
      cohort?.save()
      cohort &&
        console.log('done-----------------', cohort.coordinator.toString())

      const senderId = new Types.ObjectId(context.userId)
      cohort &&
        pushNotification(
          new Types.ObjectId(cohort.coordinator.toString()),
          `Team "${findTeam.name}" was removed from your cohort "${cohort.name}"`,
          senderId
        )
      return 'Team deleted successfully'
    },
    updateTeam: async (
      _: any,
      { id, orgToken, name, cohort, TTL, phase, manager, program }: any,
      context: Context
    ) => {
      const { userId, role }: any = (await checkUserLoggedIn(context))([
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
        RoleOfUser.COORDINATOR,
      ])

      const team: any = await Team.findById(id)
        .populate({
          path: 'cohort',
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
        .populate({
          path: 'phase',
          model: Phase,
          strictPopulate: false,
        })
        .populate({
          path: 'program',
          model: Program,
          strictPopulate: false,
        })
        .populate({
          path: RoleOfUser.MANAGER,
          model: User,
          strictPopulate: false,
        })
      if (!team) {
        throw new GraphQLError(`team with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      const prevTeamName = team.name
      const teamCohort = team?.cohort
      const cohortProgram = team?.cohort?.program as ProgramType
      const cohortOrg = cohortProgram?.organization as OrganizationType
      const org = await checkLoggedInOrganization(orgToken)

      if (!team) {
        throw new GraphQLError(`team with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      if (
        name &&
        name !== team.name &&
        (await Team.findOne({ name, organization: org?.id }))
      ) {
        throw new GraphQLError(`Team with name ${name} already exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      if (role !== RoleOfUser.SUPER_ADMIN) {
        const org = await checkLoggedInOrganization(orgToken)
        console.log('>>>>>>>>>>>>>')
        console.log(cohortOrg)
        console.log('>>>>>>>>>>>>>')
        if (cohortOrg?.id.toString() !== org.id.toString()) {
          throw new GraphQLError(
            `Team with id "${team?.id}" doesn't exist in this organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (role === RoleOfUser.ADMIN && !cohortOrg.admin.includes(userId)) {
          throw new GraphQLError(
            `Team with id "${id}" doesn't exist in your organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (
          role === RoleOfUser.MANAGER &&
          cohortProgram?.manager?.toString() !== userId?.toString()
        ) {
          throw new GraphQLError(
            `Team with id "${id}" doesn't exist in your program`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (
          role === RoleOfUser.COORDINATOR &&
          team?.cohort?.coordinator.toString() !== userId?.toString()
        ) {
          throw new GraphQLError('You are not assigned to this Team!', {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
      }
      const getcohort: any = await Cohort.findOne({ name: cohort })
      const getTtl: any = await User.findOne({ email: TTL })

      if (!getcohort) {
        throw new GraphQLError('this cohot does not exist!', {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      if (!getTtl) {
        throw new GraphQLError('Ttl does not exist!', {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      if (manager) {
        const newManager = await User.findOne({ email: manager })
        if (!newManager) {
          throw new GraphQLError('Manager does not exist!', {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
        team.manager = newManager.id
      }
      const { ObjectId } = Types

      if (ObjectId.isValid(phase)) {
        const newPhase = await Phase.findOne({ _id: phase })
        if (!newPhase) {
          throw new GraphQLError('Phase does not exist!', {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
        team.phase = newPhase.id
      }
      if (program) {
        const newProgram = await Program.findOne({ name: program })
        if (!newProgram) {
          throw new GraphQLError('Program does not exist!', {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
        team.program = newProgram.id
      }
      name && (team.name = name)
      getcohort && (team.cohort = getcohort.id)
      getTtl && (team.ttl = getTtl.id)

      const senderId = new Types.ObjectId(context.userId)
      if (teamCohort.coordinator && prevTeamName !== name) {
        pushNotification(
          new Types.ObjectId(teamCohort.coordinator.toString()),
          `Team "${prevTeamName}" from cohort "${teamCohort.name}" has changed its name to "${name}"`,
          senderId
        )
      }
      await team.save()
      const updatedteam: any = await Team.findById(id)
        .populate({
          path: 'cohort',
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
        .populate({
          path: 'phase',
          model: Phase,
          strictPopulate: false,
        })
        .populate({
          path: 'program',
          model: Program,
          strictPopulate: false,
        })
        .populate({
          path: RoleOfUser.MANAGER,
          model: User,
          strictPopulate: false,
        })

      return updatedteam
    },
  },
}

export default resolvers
