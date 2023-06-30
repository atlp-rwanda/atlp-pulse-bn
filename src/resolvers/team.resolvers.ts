import { ApolloError, ValidationError } from 'apollo-server'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Team from '../models/team.model'
import Program from '../models/program.model'
import Cohort from '../models/cohort.model'
import { Organization, User } from '../models/user'
import { Context } from '../context'
import { ProgramType } from './program.resolvers'
import { OrganizationType } from './userResolver'

const resolvers = {
  Team: {
    async cohort(parent: any) {
      return await Cohort.findById(parent.cohort)
    },
  },
  Query: {
    getAllTeams: async (_: any, { orgToken }: any, context: Context) => {
      try {
        // some validations
        const { userId, role } = (await checkUserLoggedIn(context))([
          'superAdmin',
          'admin',
          'manager',
          'coordinator',
        ])

        // get the organization if a superAdmin logs in
        let org
        if (role !== 'superAdmin') {
          org = await checkLoggedInOrganization(orgToken)
        }

        const managerMatch = { organization: org?.id, manager: userId }
        const adminMatch = { _id: org?.id, admin: userId }

        return (
          await Team.find({ organization: org }).populate({
            path: 'cohort',
            match: role === 'manager' && managerMatch,
            model: Cohort,
            strictPopulate: false,
            populate: {
              path: 'organization',
              match: role === 'admin' && adminMatch,
              model: Organization,
              strictPopulate: false,
            },
          })
        ).filter((item: any) => {
          const org = (item.program as InstanceType<typeof Program>)
            ?.organization
          return item.program !== null && org !== null
        })
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(message.toString(), '500')
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
          'superAdmin',
          'admin',
          'coordinator',
          'manager',
        ])

        // get the organization if a superAdmin logs in
        let org
        if (role !== 'superAdmin') {
          org = await checkLoggedInOrganization(orgToken)
        }

        const managerMatch = { organization: org?.id, manager: userId }
        const adminMatch = { _id: org?.id, admin: userId }

        return (
          await Team.find({ organization: org }).populate({
            path: 'cohort',
            match: role === 'manager' && managerMatch,
            model: Cohort,
            strictPopulate: false,
            populate: {
              path: 'organization',
              match: role === 'admin' && adminMatch,
              model: Organization,
              strictPopulate: false,
            },
          })
        ).filter((item: any) => {
          const org = (item.program as InstanceType<typeof Program>)
            ?.organization
          const itemCohort = item.cohort.name === cohort
          return item.program !== null && org !== null && itemCohort
        })
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(message.toString(), '500')
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
          'admin',
          'manager',
          'coordinator',
        ])

        // get the organization if someone  logs in
        const org: InstanceType<typeof Organization> =
          await checkLoggedInOrganization(orgToken)

        return (
          await User.find({ role: 'trainee' }).populate({
            path: 'team',

            strictPopulate: false,
            populate: {
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
          })
        ).filter((user: any) => {
          if (role === 'admin') {
            return (
              user.team?.name == team &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              user.team?.cohort?.program?.organization.admin.includes(userId)
            )
          }
          if (role === 'manager') {
            return (
              user.team.name == team &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.program?.manager).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
          if (role === 'coordinator') {
            return (
              user.team.name == team &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.coordinator).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
        })
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(message.toString(), '500')
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
      },
      context: Context
    ) => {
      try {
        const { name, cohortName, orgToken } = args

        // some validations
        ;(await checkUserLoggedIn(context))(['superAdmin', 'admin', 'manager'])
        const cohort = await Cohort.findOne({ name: cohortName })

        const organ = await checkLoggedInOrganization(orgToken)

        // validate inputs
        if (await Team.findOne({ name, organization: organ?.id })) {
          throw new ValidationError(`Team with name ${name} already exist`)
        }
        if (!cohort) {
          throw new ValidationError(
            `Cohort with name ${cohortName} doesn't exist`
          )
        }

        const org = new Team({
          name,
          cohort: cohort.id,
          organization: organ?.id,
        })
        cohort.teams = cohort.teams + 1
        cohort.save()

        return org.save()
      } catch (error) {
        const { message } = error as { message: any }
        throw new ApolloError(message.toString(), '500')
      }
    },
    deleteTeam: async (parent: any, args: any, context: Context) => {
      ;(await checkUserLoggedIn(context))(['admin'])
      const findTeam = await Team.findById(args.id)
      if (!findTeam)
        throw new Error('The Team you want to delete does not exist')

      if (findTeam.members.length > 0) {
        throw new ValidationError(
          `you can't delete ${findTeam.name} becouse it has members`
        )
      }

      const cohort = await Cohort.findById(findTeam.cohort)

      await Team.findByIdAndDelete({ _id: args.id })
      cohort ? (cohort.teams = cohort.teams - 1) : null
      cohort?.save()
      return 'Team deleted successfully'
    },
    updateTeam: async (
      _: any,
      args: {
        id: any
        orgToken: string
        name: string
      },
      context: Context
    ) => {
      const { id, name, orgToken } = args

      const { userId, role }: any = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
        'manager',
        'coordinator',
      ])

      const team: any = await Team.findById(id).populate({
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

      const cohortProgram = team?.cohort?.program as ProgramType
      const cohortOrg = cohortProgram.organization as OrganizationType
      const org = await checkLoggedInOrganization(orgToken)

      if (!team) {
        throw new ValidationError(`team with id "${id}" doesn't exist`)
      }

      if (
        name &&
        name !== team.name &&
        (await Team.findOne({ name, organization: org?.id }))
      ) {
        throw new ValidationError(`Team with name ${name} already exist`)
      }

      if (role !== 'superAdmin') {
        const org = await checkLoggedInOrganization(orgToken)

        if (cohortOrg.id.toString() !== org.id.toString()) {
          throw new ValidationError(
            `Team with id "${team?.id}" doesn't exist in this organization`
          )
        }
        if (role === 'admin' && !cohortOrg.admin.includes(userId)) {
          throw new ValidationError(
            `Team with id "${id}" doesn't exist in your organization`
          )
        }
        if (
          role === 'manager' &&
          cohortProgram?.manager?.toString() !== userId?.toString()
        ) {
          throw new ValidationError(
            `Team with id "${id}" doesn't exist in your program`
          )
        }
        if (
          role === 'coordinator' &&
          team?.cohort?.coordinator.toString() !== userId?.toString()
        ) {
          throw new ValidationError('You are not assigned to this Team!')
        }
      }

      name && (team.name = name)

      await team.save()

      return team
    },
  },
}

export default resolvers
