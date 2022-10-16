import { ApolloError, ValidationError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Program from '../models/program.model'
import { Organization, User } from '../models/user'
import { Context } from './../context'
import { OrganizationType } from './userResolver'

export type ProgramType = InstanceType<typeof Program>;

const resolvers = {
    Query: {
        getAllPrograms: async (_: any, { orgToken }: any, context: Context) => {
            try {
                const { role } = (await checkUserLoggedIn(context))([
                    'superAdmin',
                    'admin',
                ])
                let org
                let where = {}
                if (role === 'admin') {
                    org = await checkLoggedInOrganization(orgToken)
                    where = { organization: org.id }
                }

                return Program.find(where).populate('cohorts')
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },
        getProgram: async (_: any, { orgToken }: any, context: Context) => {
            try {
                const { userId } = (await checkUserLoggedIn(context))(['manager'])
                const org = await checkLoggedInOrganization(orgToken)

                return Program.findOne({
                    manager: userId,
                    organization: org?.id,
                }).populate('cohorts')
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },
    },
    Mutation: {
        addProgram: async (
            _: any,
            args: {
        name: string;
        description: string;
        managerEmail: string | ObjectId;
        orgToken: string;
      },
            context: Context
        ) => {
            try {
                (await checkUserLoggedIn(context))(['superAdmin', 'admin'])

                const { name, description, managerEmail, orgToken } = args

                const org = await checkLoggedInOrganization(orgToken)
                const manager = await User.findOne({ email: managerEmail })

                // check manager exists
                if (!manager) {
                    throw new ValidationError(
                        `A manager with email ${managerEmail} doesn't exist`
                    )
                }
                if (await Program.findOne({ name })) {
                    throw new ValidationError(`Program with name ${name} already exist`)
                }

                return (
                    await Program.create({
                        name,
                        description,
                        manager: manager?.id,
                        organization: org?.id,
                    })
                ).populate('cohorts')
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },
        deleteProgram: async (_: any, { id, orgToken }: any, context: Context) => {
            const { userId, role } = (await checkUserLoggedIn(context))([
                'superAdmin',
                'admin',
            ])

            const program = await Program.findById(id).populate('organization')
            if (!program) {
                throw new ValidationError(`Program with id "${id}" doesn't exist`)
            }
            const deleteOrganization = program?.organization as OrganizationType

            if (role !== 'superAdmin') {
                const org = await checkLoggedInOrganization(orgToken)

                if (deleteOrganization.id.toString() !== org.id.toString()) {
                    throw new ValidationError(
                        `Program with id "${program?.id}" doesn't exist in this organization`
                    )
                }
                if (deleteOrganization.admin.toString() !== userId) {
                    throw new ValidationError('You are not assigned this program!')
                }
            }

            return await program?.delete()
        },
        updateProgram: async (
            _: any,
            { id, name, description, orgToken }: any,
            context: Context
        ) => {
            const { userId, role } = (await checkUserLoggedIn(context))([
                'superAdmin',
                'admin',
                'manager',
            ])

            // get the program and its organization from the id and checks if it exists
            const program = await Program.findById(id).populate('organization')
            if (!program) {
                throw new ValidationError(`Program with id "${id}" doesn't exist`)
            }
            const programOrg = program?.organization as OrganizationType

            // check program with that name exists
            if (name && name !== program.name && (await Program.findOne({ name }))) {
                throw new ValidationError(`Program with name ${name} already exist`)
            }

            // check if a given user have priviledges to update this program
            if (role !== 'superAdmin') {
                const org = await checkLoggedInOrganization(orgToken)

                if (programOrg.id.toString() !== org.id.toString()) {
                    throw new ValidationError(
                        `Program with id "${program?.id}" doesn't exist in this organization`
                    )
                }
                if (role === 'admin' && programOrg.admin.toString() !== userId) {
                    throw new ValidationError(
                        `Program with id "${program?.id}" doesn't exist in your organization`
                    )
                }
                if (role === 'manager' && program.manager.toString() !== userId) {
                    throw new ValidationError('You are not assigned this program')
                }
            }

            name && (program.name = name)
            description && (program.description = description)

            await program.save()

            return program
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
