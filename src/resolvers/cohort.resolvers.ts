import { GraphQLError } from 'graphql'
import { isAfter } from 'date-fns'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Cohort from '../models/cohort.model'
import Program from '../models/program.model'
import Phase from '../models/phase.model'
import { RoleOfUser, User } from '../models/user'
import { Organization } from '../models/organization.model'
import { Context } from './../context'
import { ProgramType } from './program.resolvers'
import { OrganizationType } from './userResolver'
import { pushNotification } from '../utils/notification/pushNotification'
import { Types } from 'mongoose'

export type CohortType = InstanceType<typeof Cohort>

const resolvers = {
  Cohort: {
    async coordinator(parent: any) {
      return await User.findById(parent.coordinator)
    },
    async program(parent: any) {
      return await Program.findById(parent.program)
    },
    async phase(parent: any) {
      return await Phase.findById(parent.phase)
    },
  },
  Query: {
    getAllCohorts: async (_: any, { orgToken }: any, context: Context) => {
      try {
        // some validations
        const { userId, role }: any = (await checkUserLoggedIn(context))([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
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
          await Cohort.find().populate({
            path: 'program',
            match: role === RoleOfUser.MANAGER && managerMatch,
            model: Program,
            strictPopulate: false,
            populate: {
              path: 'organization',
              match: role === RoleOfUser.ADMIN && adminMatch,
              model: Organization,
              strictPopulate: false,
            },
          })
        ).filter((item) => {
          const org = (item.program as InstanceType<typeof Program>)
            ?.organization
          return item.program !== null && org !== null
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
    addCohort: async (
      _: any,
      args: {
        name: string
        phaseName: string
        coordinatorEmail: string
        programName: string
        startDate: Date
        endDate?: Date
        orgToken: string
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
          orgToken,
        } = args

        // some validations
        ;(await checkUserLoggedIn(context))([RoleOfUser.SUPER_ADMIN, RoleOfUser.ADMIN, RoleOfUser.MANAGER])
        const coordinator = await User.findOne({
          email: coordinatorEmail,
        })
        const organ = await checkLoggedInOrganization(orgToken)
        const program = await Program.findOne({ name: programName })
        const phase = await Phase.findOne({ name: phaseName })

        // validate inputs
        if (!phase) {
          throw new GraphQLError(`Phase with name ${phaseName} doesn't exist`, {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }

        if (!coordinator) {
          throw new GraphQLError(
            `Coordinator with email ${coordinatorEmail} doesn't exist`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (!program) {
          throw new GraphQLError(
            `Program with name ${programName} doesn't exist`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }

        if (
          endDate &&
          isAfter(new Date(startDate.toString()), new Date(endDate.toString()))
        ) {
          throw new GraphQLError("End Date can't be before Start Date", {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }

        const findCohort = await Cohort.find({ name, organization: organ?.id })
        if (findCohort.length) {
          throw new GraphQLError(`Cohort with name ${name} already exist`, {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }

        const org = new Cohort({
          name,
          coordinator: coordinator.id,
          phase: phase.id,
          program: program.id,
          startDate,
          endDate,
          organization: organ?.id,
        })

        const newCohort = org.save()
        const senderId = new Types.ObjectId(context.userId)
        pushNotification(
          coordinator.id,
          `You\'ve been assigned a new cohort "${name}"`,
          senderId
        )

        return newCohort
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
    updateCohort: async (
      _: any,
      args: {
        id: any
        orgToken: string
        name: string
        phaseName: string
        coordinatorEmail: string
        programName: string
        startDate: Date
        endDate?: Date
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
      } = args

      const { userId, role }: any = (await checkUserLoggedIn(context))([
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
        RoleOfUser.COORDINATOR,
      ])
      const coordinator = await User.findOne({
        email: coordinatorEmail,
      })

      const organ = await checkLoggedInOrganization(orgToken)
      const program = await Program.findOne({ name: programName })
      const phase = await Phase.findOne({ name: phaseName })

      const cohort = await Cohort.findById(id).populate({
        path: 'program',
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      })
      const cohortProgram = cohort?.program as ProgramType
      const cohortOrg = cohortProgram.organization as OrganizationType

      if (!cohort) {
        throw new GraphQLError(`Cohort with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }
      if (!coordinator) {
        throw new GraphQLError(
          `Coordinator with email ${coordinatorEmail} doesn't exist`,
          {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          }
        )
      }
      if (!phase) {
        throw new GraphQLError(`Phase with name ${phaseName} doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }
      if (!program) {
        throw new GraphQLError(`Program with name ${programName} doesn't exist`)
      }
      if (
        name &&
        name !== cohort.name &&
        (await Cohort.findOne({ name, organization: organ?.id }))
      ) {
        throw new GraphQLError(`Phase with name ${name} already exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      if (
        endDate &&
        (isAfter(
          new Date(startDate.toString()),
          new Date(endDate.toString())
        ) ||
          isAfter(
            new Date(cohort?.startDate?.toString() || ''),
            new Date(endDate)
          ))
      ) {
        throw new GraphQLError("End Date can't be before Start Date", {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      if (role !== RoleOfUser.SUPER_ADMIN) {
        const org = await checkLoggedInOrganization(orgToken)

        if (cohortOrg.id.toString() !== org.id.toString()) {
          throw new GraphQLError(
            `Cohort with id "${cohort?.id}" doesn't exist in this organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (role === RoleOfUser.ADMIN && !cohortOrg?.admin?.includes(userId)) {
          throw new GraphQLError(
            `Cohort with id "${id}" doesn't exist in your organization`,
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
            `Cohort with id "${id}" doesn't exist in your program`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (
          role === RoleOfUser.COORDINATOR &&
          cohort?.coordinator?.toString() !== userId?.toString()
        ) {
          throw new GraphQLError('You are not assigned this cohort!', {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
      }

      const senderId = new Types.ObjectId(context.userId)

      if (coordinatorEmail) {
        if (coordinator.id.toString() !== cohort.coordinator.toString()) {
          pushNotification(
            coordinator.id,
            `You\'ve been assigned a new cohort "${cohort.name}"`,
            senderId
          )
          cohort.coordinator &&
            pushNotification(
              new Types.ObjectId(cohort.coordinator.toString()),
              `You're no longer coordinator of cohort "${cohort.name}"`,
              senderId
            )
        }
        cohort.coordinator = coordinator.id
      }

      const notificationChanges: string[] = []
      if (name && cohort.name !== name) {
        cohort.name = name
        notificationChanges.push('Name')
      }
      if (phaseName && cohort.phase.toString() !== phase.id.toString()) {
        cohort.phase = phase.id
        notificationChanges.push('Phase')
      }

      if (
        (startDate || endDate) &&
        (new Date(cohort.startDate).getTime() !==
          new Date(startDate).getTime() ||
          (cohort.endDate &&
            endDate &&
            new Date(cohort.endDate).getTime() !== new Date(endDate).getTime()))
      ) {
        startDate && (cohort.startDate = startDate)
        endDate && (cohort.endDate = endDate)
        notificationChanges.push('Duration')
      }

      if (
        programName &&
        cohortProgram._id.toString() !== program.id.toString()
      ) {
        programName && (cohort.program = program.id)
        notificationChanges.push('Program')
      }

      if (notificationChanges.length) {
        pushNotification(
          coordinator.id,
          `${
            role[0].toUpperCase() + role.slice(1)
          } has made the following changes to "${
            cohort.name
          }": ${notificationChanges.join(', ')}`,
          senderId
        )
      }

      await cohort.save()

      return cohort
    },
    deleteCohort: async (_: any, { id, orgToken }: any, context: Context) => {
      const { userId, role } = (await checkUserLoggedIn(context))([
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
      ])

      const cohort = await Cohort.findById(id).populate({
        path: 'program',
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      })
      if (!cohort) {
        throw new GraphQLError(`Cohort with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }
      const cohortProgram = cohort.program as ProgramType
      const cohortOrg = cohortProgram.organization as OrganizationType

      if (role !== RoleOfUser.SUPER_ADMIN) {
        const org = await checkLoggedInOrganization(orgToken)

        if (cohortOrg.id.toString() !== org.id.toString()) {
          throw new GraphQLError(
            `Cohort with id "${cohort?.id}" doesn't exist in this organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (
          role === RoleOfUser.ADMIN &&
          cohortOrg.admin.toString() !== userId?.toString()
        ) {
          throw new GraphQLError(
            `Cohort with id "${id}" doesn't exist in your organization`,
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
            `Cohort with id "${id}" doesn't exist in your program`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
      }

      const senderId = new Types.ObjectId(context.userId)
      cohort.coordinator &&
        pushNotification(
          new Types.ObjectId(cohort.coordinator.toString()),
          `Your cohort "${cohort.name}" has been deactivated`,
          senderId
        )

      return Cohort.disactivate(cohort?.id)
    },
  },
}

export default resolvers
