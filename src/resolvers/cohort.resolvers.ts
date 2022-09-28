import { ApolloError, ValidationError } from 'apollo-server'
import { isAfter, isPast } from 'date-fns'
import { Date } from 'mongoose'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Cohort from '../models/cohort.model'
import Program from '../models/program.model'
import { Organization, User } from '../models/user'
import { Context } from './../context'

const resolvers = {
    Cohort: {
        async coordinator(parent: any) {
            return await User.findById(parent.coordinator)
        },
        async program(parent: any) {
            return await Program.findById(parent.program)
        },
    },
    Query: {
        getAllCohorts: async (_: any, { orgToken }: any, context: Context) => {
            try {
                // some validations
                const { userId, role } = (await checkUserLoggedIn(context))([
                    'superAdmin',
                    'admin',
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
                    const org = (item.program as InstanceType<typeof Program>)?.organization
                    return item.program !== null && org !== null
                })
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },
    },
    Mutation: {
        addCohort: async (
            _: any,
            args: {
				name: string;
				phase: string;
				coordinatorEmail: string;
				programName: string;
				startDate: Date;
				endDate?: Date;
			},
            context: Context,
        ) => {
            try {
                const { name, coordinatorEmail, phase, programName, startDate, endDate } = args;

                // some validations
                (await checkUserLoggedIn(context))(['superAdmin', 'admin', 'manager'])
                const coordinator = await User.findOne({ email: coordinatorEmail })
                const program = await Program.findOne({ name: programName })

                // validate inputs
                if (await Cohort.findOne({ name })) {
                    throw new ValidationError(`Cohort with name ${name} already exist`)
                }
                if (!coordinator) {
                    throw new ValidationError(`Coordinator with email ${coordinatorEmail} doesn't exist`)
                }
                if (!program) {
                    throw new ValidationError(`Program with name ${programName} doesn't exist`)
                }
                if (isPast(new Date(startDate.toString()))) {
                    throw new ValidationError('Start Date can\'t be in the past')
                }
                if (endDate && isAfter(new Date(startDate.toString()), new Date(endDate.toString()))) {
                    throw new ValidationError('Start Date can\'t be after End Date')
                }

                const org = new Cohort({
                    name,
                    coordinator: coordinator.id,
                    phase,
                    program: program.id,
                    startDate,
                    endDate,
                })

                return org.save()
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },
    },
}

export default resolvers

