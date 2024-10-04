import { GraphQLError } from 'graphql'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { Context } from './../context'
import { OrganizationType } from './userResolver'
import Phase from '../models/phase.model'
import Cohort from '../models/cohort.model'

const phaseResolver = {
  Query: {
    getAllPhases: async (_: any, { orgToken }: any, context: Context) => {
      const org = await checkLoggedInOrganization(orgToken)

      ;(await checkUserLoggedIn(context))(['admin', 'coordinator'])

      const allphases = await Phase.find({ organization: org })

      return allphases
    },
  },

  Mutation: {
    addPhase: async (
      _: any,
      args: {
        name: string
        description: string
        orgToken: string
      },
      context: Context
    ) => {
      try {
        ;(await checkUserLoggedIn(context))(['superAdmin', 'admin'])

        const { name, description, orgToken } = args
        const org = await checkLoggedInOrganization(orgToken)
        const findPhase = await Phase.find({ name, organization: org?.id })

        if (findPhase.length) {
          throw new GraphQLError(`a phase with name ${name} already exist`, {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }

        return await Phase.create({
          name,
          description,
          organization: org?.id,
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
    updatePhase: async (
      _: any,
      { id, name, description, orgToken }: any,
      context: Context
    ) => {
      const { userId, role } = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
        'manager',
      ])

      // get the phase and its organization from the id and checks if it exists
      const phase = await Phase.findById(id).populate('organization')
      if (!phase) {
        throw new GraphQLError(`Phase with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      const phaseOrg = phase?.organization as OrganizationType

      if (name && name !== phase.name && (await Phase.findOne({ name }))) {
        throw new GraphQLError(`Phase with name ${name} already exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      // check if a given user have priviledges to update this phase
      if (role !== 'superAdmin') {
        const org = await checkLoggedInOrganization(orgToken)

        if (phaseOrg.id.toString() !== org.id.toString()) {
          throw new GraphQLError(
            `Phase with id "${phase?.id}" doesn't exist in this organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (role === 'admin' && phaseOrg.admin.toString() !== userId) {
          throw new GraphQLError(
            `Phase with id "${phase?.id}" doesn't exist in your organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
      }

      name && (phase.name = name)
      description && (phase.description = description)

      await phase.save()

      return phase
    },

    async deletePhase(parent: any, args: any, context: Context) {
      ;(await checkUserLoggedIn(context))(['superAdmin', 'admin'])

      const findPhase = await Phase.findById(args.id)
      const findPhaseInCohort = await Cohort.findOne({ phase: args.id })

      if (!findPhase) throw new Error('This phase does not exist')

      if (findPhaseInCohort)
        throw new Error(
          "You can't delete this phase! Some cohorts belongs to it."
        )

      const deletedPhase = await Phase.findByIdAndRemove({ _id: args.id })

      return deletedPhase
    },
  },
}

export default phaseResolver
