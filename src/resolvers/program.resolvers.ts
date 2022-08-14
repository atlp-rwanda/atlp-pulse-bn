import { ApolloError, ValidationError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Program from '../models/program.model'
import { Organization, User } from '../models/user'
import { Context } from './../context'

const resolvers = {
    Query: {
        getAllPrograms: async (_: any, { orgToken }: any, context: Context) => {
            try {
                const { role } = (await checkUserLoggedIn(context))(['superAdmin', 'admin'])
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

                return Program.findOne({ manager: userId, organization: org?.id }).populate('cohorts')
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
            context: Context,
        ) => {
            try {
                (await checkUserLoggedIn(context))(['superAdmin', 'admin'])

                const { name, description, managerEmail, orgToken } = args

                const org = await checkLoggedInOrganization(orgToken)
                const manager = await User.findOne({ email: managerEmail })

                // check manager exists
                if (!manager) {
                    throw new ValidationError(`A manager with email ${managerEmail} doesn't exist`)
                }
                if (await Program.findOne({ name })) {
                    throw new ValidationError(`Organization with name ${name} already exist`)
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

