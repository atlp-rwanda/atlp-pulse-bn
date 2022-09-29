import { ApolloError, ValidationError } from 'apollo-server'
import { differenceInHours, isAfter, isPast } from 'date-fns'
import differenceInDays from 'date-fns/differenceInDays'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import Cohort from '../models/cohort.model'
import Program from '../models/program.model'
import { Organization, User } from '../models/user'
import { Context } from './../context'
import { ProgramType } from './program.resolvers'
import { OrganizationType } from './userResolver'

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
                    const org = (item.program as InstanceType<typeof Program>)
                        ?.organization
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
            context: Context
        ) => {
            try {
                const {
                    name,
                    coordinatorEmail,
                    phase,
                    programName,
                    startDate,
                    endDate,
                } = args;

                // some validations
                (await checkUserLoggedIn(context))(['superAdmin', 'admin', 'manager'])
                const coordinator = await User.findOne({
                    email: coordinatorEmail,
                })
                const program = await Program.findOne({ name: programName })

                // validate inputs
                if (await Cohort.findOne({ name })) {
                    throw new ValidationError(`Cohort with name ${name} already exist`)
                }
                if (!coordinator) {
                    throw new ValidationError(
                        `Coordinator with email ${coordinatorEmail} doesn't exist`
                    )
                }
                if (!program) {
                    throw new ValidationError(
                        `Program with name ${programName} doesn't exist`
                    )
                }
                if (differenceInDays(new Date(startDate), Date.now()) < 0) {
                    throw new ValidationError('Start Date can\'t be in the past')
                }
                if (
                    endDate &&
          isAfter(new Date(startDate.toString()), new Date(endDate.toString()))
                ) {
                    throw new ValidationError('End Date can\'t be before Start Date')
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
        updateCohort: async (
            _: any,
            { id, orgToken, name, phase, startDate, endDate }: any,
            context: Context
        ) => {
            const { userId, role } = (await checkUserLoggedIn(context))([
                'superAdmin',
                'admin',
                'manager',
                'coordinator',
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
                throw new ValidationError(`Cohort with id "${id}" doesn't exist`)
            }
            const cohortProgram = cohort.program as ProgramType
            const cohortOrg = cohortProgram.organization as OrganizationType

            if (name && name !== cohort.name && (await Cohort.findOne({ name }))) {
                throw new ValidationError(`Cohort with name ${name} already exist`)
            }
            if (startDate && differenceInDays(new Date(startDate), Date.now()) < 0) {
                throw new ValidationError('Start Date can\'t be in the past')
            }
            if (
                endDate &&
        (isAfter(
            new Date(startDate.toString()),
            new Date(endDate.toString())
        ) ||
          isAfter(new Date(cohort.startDate.toString()), new Date(endDate)))
            ) {
                throw new ValidationError('End Date can\'t be before Start Date')
            }

            if (role !== 'superAdmin') {
                const org = await checkLoggedInOrganization(orgToken)

                if (cohortOrg.id.toString() !== org.id.toString()) {
                    throw new ValidationError(
                        `Cohort with id "${cohort?.id}" doesn't exist in this organization`
                    )
                }
                if (
                    role === 'admin' &&
          cohortOrg.admin.toString() !== userId?.toString()
                ) {
                    throw new ValidationError(
                        `Cohort with id "${id}" doesn't exist in your organization`
                    )
                }
                if (
                    role === 'manager' &&
          cohortProgram.manager.toString() !== userId?.toString()
                ) {
                    throw new ValidationError(
                        `Cohort with id "${id}" doesn't exist in your program`
                    )
                }
                if (
                    role === 'coordinator' &&
          cohort.coordinator.toString() !== userId?.toString()
                ) {
                    throw new ValidationError('You are not assigned this cohort!')
                }
            }

            name && (cohort.name = name)
            phase && (cohort.phase = phase)
            startDate && (cohort.startDate = startDate)
            endDate && (cohort.endDate = endDate)

            await cohort.save()

            return cohort
        },
        deleteCohort: async (_: any, { id, orgToken }: any, context: Context) => {
            const { userId, role } = (await checkUserLoggedIn(context))([
                'superAdmin',
                'admin',
                'manager',
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
                throw new ValidationError(`Cohort with id "${id}" doesn't exist`)
            }
            const cohortProgram = cohort.program as ProgramType
            const cohortOrg = cohortProgram.organization as OrganizationType

            if (role !== 'superAdmin') {
                const org = await checkLoggedInOrganization(orgToken)

                if (cohortOrg.id.toString() !== org.id.toString()) {
                    throw new ValidationError(
                        `Cohort with id "${cohort?.id}" doesn't exist in this organization`
                    )
                }
                if (
                    role === 'admin' &&
          cohortOrg.admin.toString() !== userId?.toString()
                ) {
                    throw new ValidationError(
                        `Cohort with id "${id}" doesn't exist in your organization`
                    )
                }
                if (
                    role === 'manager' &&
          cohortProgram.manager.toString() !== userId?.toString()
                ) {
                    throw new ValidationError(
                        `Cohort with id "${id}" doesn't exist in your program`
                    )
                }
            }

            return cohort.delete()
        },
    },
}

export default resolvers
