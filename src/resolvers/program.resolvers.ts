import { GraphQLError } from 'graphql'
import { ObjectId } from 'mongodb'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Program from '../models/program.model'
import { User } from '../models/user'
import { Organization } from '../models/organization.model'
import { Context } from './../context'
import { OrganizationType } from './userResolver'

export type ProgramType = InstanceType<typeof Program>

const resolvers = {
  Query: {
    getAllPrograms: async (_: any, { orgToken }: any, context: Context) => {
      try {
        const { role } = (await checkUserLoggedIn(context))([
          'superAdmin',
          'admin',
        ])
        let org
        let where: any = { active: true }
        if (role === 'admin') {
          org = await checkLoggedInOrganization(orgToken)
          where = { ...where, organization: org.id }
        }

        return Program.find(where).populate('cohorts')
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },
    getProgram: async (_: any, { orgToken }: any, context: Context) => {
      try {
        const { userId } = (await checkUserLoggedIn(context))(['manager'])
        const org = await checkLoggedInOrganization(orgToken)

        return Program.findOne({
          manager: userId,
          organization: org?.id,
          active: true,
        }).populate('cohorts')
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
    addProgram: async (
      _: any,
      args: {
        name: string
        description: string
        managerEmail: string | ObjectId
        orgToken: string
      },
      context: Context
    ) => {
      try {
        ;(await checkUserLoggedIn(context))(['superAdmin', 'admin'])

        const { name, description, managerEmail, orgToken } = args

        const org = await checkLoggedInOrganization(orgToken)
        const manager = await User.findOne({ email: managerEmail })

        // check manager exists
        if (!manager) {
          throw new GraphQLError(
            `A manager with email ${managerEmail} doesn't exist`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (await Program.findOne({ name })) {
          throw new GraphQLError(`Program with name ${name} already exist`, {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }

        return await Program.create({
          name,
          description,
          manager: manager?.id,
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
    updateProgram: async (
      _: any,
      { id, name, description, orgToken, managerEmail }: any,
      context: Context
    ) => {
      const { userId, role }: any = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
        'manager',
      ])

      // get the program and its organization from the id and checks if it exists
      const program = await Program.findById(id).populate('organization')
      if (!program) {
        throw new GraphQLError(`Program with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }
      const programOrg = program?.organization as OrganizationType
      const manager = await User.findOne({ email: managerEmail })

      // check program with that name exists and manager with this email exists
      if (!manager) {
        throw new GraphQLError(
          `A manager with email ${managerEmail} doesn't exist`,
          {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          }
        )
      }
      if (name && name !== program.name && (await Program.findOne({ name }))) {
        throw new GraphQLError(`Program with name ${name} already exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }

      // check if a given user have priviledges to update this program
      if (role !== 'superAdmin') {
        const org = await checkLoggedInOrganization(orgToken)

        if (programOrg.id.toString() !== org.id.toString()) {
          throw new GraphQLError(
            `Program with id "${program?.id}" doesn't exist in this organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (role === 'admin' && !programOrg.admin.includes(userId)) {
          throw new GraphQLError(
            `Program with id "${program?.id}" doesn't exist in your organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (role === 'manager' && program.manager.toString() !== userId) {
          throw new GraphQLError(
            'You are not assigned this program',

            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
      }

      name && (program.name = name)
      description && (program.description = description)
      managerEmail && (program.manager = manager.id)

      await program.save()

      return program
    },
    deleteProgram: async (_: any, { id, orgToken }: any, context: Context) => {
      const { userId, role } = (await checkUserLoggedIn(context))([
        'superAdmin',
        'admin',
      ])

      const program = await Program.findById(id).populate('organization')
      if (!program) {
        throw new GraphQLError(`Program with id "${id}" doesn't exist`, {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      }
      const deleteOrganization = program?.organization as OrganizationType

      if (role !== 'superAdmin') {
        const org = await checkLoggedInOrganization(orgToken)

        if (deleteOrganization.id.toString() !== org.id.toString()) {
          throw new GraphQLError(
            `Program with id "${program?.id}" doesn't exist in this organization`,
            {
              extensions: {
                code: 'VALIDATION_ERROR',
              },
            }
          )
        }
        if (deleteOrganization.admin.toString() !== userId) {
          throw new GraphQLError('You are not assigned this program!', {
            extensions: {
              code: 'VALIDATION_ERROR',
            },
          })
        }
      }

      return await Program.disactivate(program.id)
    },
  },
  Program: {
    async manager(parent: any) {
      return User.findById(parent.manager)
    },
    async organization(parent: any) {
      return Organization.findById(parent.organization)
    },
  },
}

export default resolvers
