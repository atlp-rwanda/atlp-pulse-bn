/* eslint-disable prefer-const */
import { ApolloError } from 'apollo-server'
import Cohort from '../models/cohort.model'
import { Organization, User } from '../models/user'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import getOrganizationTemplate from '../utils/templates/getOrganizationTemplate'
import inviteUserTemplate from '../utils/templates/inviteUserTemplate'
import { sendEmail } from '../utils/sendEmail'
import { Context } from './../context'
import Program from '../models/program.model'

const manageStudentResolvers = {
    Query: {
        getUsers: async (_: any, __: any, context: Context) => {
            try {
                // coordinator validation
                const { userId, role } = (await checkUserLoggedIn(context))([
                    'admin',
                    'manager',
                    'coordinator',
                ])
                return (await User.find({ role: 'user' })).filter((user: any) => {
                    return user.cohort == null || user.cohort == undefined
                })
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },
        getTrainees: async (_: any, { orgToken }: any, context: Context) => {
            try {
                // coordinator validation
                const { userId, role } = (await checkUserLoggedIn(context))([
                    'admin',
                    'manager',
                    'coordinator',
                ])

                // get the organization if someone  logs in
                let org: InstanceType<typeof Organization>
                org = await checkLoggedInOrganization(orgToken)

                return (
                    await User.find({ role: 'trainee' }).populate({
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
                ).filter((user: any) => {
                    if (role === 'admin') {
                        return (
                            user.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.cohort?.program?.organization.admin).replace(
                  /['"]+/g,
                  ''
              ) == userId
                        )
                    }
                    if (role === 'manager') {
                        return (
                            user.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.cohort?.program?.manager).replace(
                  /['"]+/g,
                  ''
              ) == userId
                        )
                    }
                    if (role === 'coordinator') {
                        return (
                            user.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.cohort?.coordinator).replace(/['"]+/g, '') ==
                userId
                        )
                    }
                })
            } catch (error) {
                const { message } = error as { message: any }
                throw new ApolloError(message.toString(), '500')
            }
        },

        async getCohorts(_: any, { orgToken }: any, context: any) {
            // coordinator validation
            const { userId, role } = (await checkUserLoggedIn(context))([
                'admin',
                'manager',
                'coordinator',
            ])

            // get the organization if someone  logs in
            let org: InstanceType<typeof Organization>
            org = await checkLoggedInOrganization(orgToken)

            if (role === 'coordinator') {
                const allCohorts = await Cohort.find({
                    coordinator: context.userId,
                }).populate({
                    path: 'program',
                    match: role === 'coordinator',
                    strictPopulate: false,
                    populate: {
                        path: 'organization',
                        strictPopulate: false,
                    },
                })
                return allCohorts.filter((cohort: any) => {
                    return (
                        cohort.program?.organization.name == org?.name &&
            JSON.stringify(cohort.coordinator).replace(/['"]+/g, '') == userId
                    )
                })
            }

            const allCohorts = await Cohort.find({}).populate({
                path: 'program',
                match: role === 'coordinator',
                strictPopulate: false,
                populate: {
                    path: 'organization',
                    strictPopulate: false,
                },
            })
            return allCohorts.filter((cohort: any) => {
                if (role === 'admin') {
                    return (
                        cohort.program?.organization.name == org?.name &&
            JSON.stringify(cohort.program?.organization?.admin).replace(
                /['"]+/g,
                ''
            ) == userId
                    )
                }
                if (role === 'manager') {
                    return (
                        cohort.program?.organization.name == org?.name &&
            JSON.stringify(cohort.program?.manager).replace(/['"]+/g, '') ==
              userId
                    )
                }
                if (role === 'coordinator') {
                    return (
                        cohort.program?.organization.name == org?.name &&
            JSON.stringify(cohort.coordinator).replace(/['"]+/g, '') == userId
                    )
                }
            })
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
                'admin',
                'manager',
                'coordinator',
            ])

            // get the organization if someone  logs in
            let org: InstanceType<typeof Organization>
            org = await checkLoggedInOrganization(orgToken)

            const cohort: any = await Cohort.findOne({ name: cohortName }).populate({
                path: 'program',
                model: Program,
                strictPopulate: false,
                populate: {
                    path: 'organization',
                    model: Organization,
                    strictPopulate: false,
                },
            })

            const user: any = await User.findOne({ email }).populate({
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
            })


            if (cohort && user) {
                if (cohort.program.organization.name !== org?.name) {
                    throw new Error(
                        ' You logged into an organization that doesn\'t have such a cohort'
                    )
                }
                const programId = cohort.program.id

                const checkCohort = await Cohort.find({}).populate({
                    path: 'program',
                    model: 'Program',
                    strictPopulate: false,
                    populate: {
                        path: 'organization',
                        model: Organization,
                        strictPopulate: false,
                    },
                })
                const results: any[] = checkCohort.filter((cohort: any) => {
                    return (
                        cohort.program?.id === programId &&
            cohort.program?.organization?.name === org?.name
                    )
                })

                const checkCohortMember = results.reduce((prev: any, next: any) => {
                    const members = next.members?.filter((member: any) => {
                        return member.toString() === user.id.toString()
                    })
                    if (members.length > 0) {
                        next.members = members
                        prev.push(next)
                    }
                    return prev
                }, [])
                if (checkCohortMember.length > 0) {
                    throw new Error(
                        `This member is already added to '${checkCohortMember[0].name}' cohort`
                    )
                }
                if (!user.cohort) {
                    if(user.cohort === undefined){
                        if (role === 'admin') {
                            const organization: any = await Organization.findOne({ _id: org.id })
                            if (!organization) {
                                throw new Error('You don\'t have an organization yet')
                            }
                            if (
                                organization.admin._id.toString() === userId?.toString() &&
                organization.name == org.name
               
                            ) {
               
                                const content = getOrganizationTemplate(org.name)
                                const link:any = 'https://devpulse-staging.herokuapp.com/org-login'
                                await sendEmail(
                                    user.email,
                                    'Organization membership notice',
                                    content,
                                    link,
                                    process.env.ADMIN_EMAIL,
                                    process.env.ADMIN_PASS
                                )
                            } else {
                                throw new Error('You logged into a different organization')
                            }
                        }
                        if (role === 'manager') {
                            const program: any = await Program.findOne({ manager: userId })
                            if (!program) {
                                throw new Error('You dont\'t have a program yet')
                            }
                            if (program.organization._id.toString() == org?.id.toString()) {
                                const content = getOrganizationTemplate(org.name)
                                const link:any = 'https://devpulse-staging.herokuapp.com/org-login'
                                await sendEmail(
                                    user.email,
                                    'Organization membership notice',
                                    content,
                                    link,
                                    process.env.MANAGER_EMAIL,
                                    process.env.MANAGER_PASSWORD
                                )
             
                            } else {
                                throw new Error('You logged into a different organization')
                            }
                        }if (role === 'coordinator') {
                            const cohort: any = await Cohort.findOne({ coordinator: userId })
                            if (!cohort) {
                                throw new Error('You dont\'t have a coordinator yet')
                            }
                            const program:any = await Program.findOne({ _id:cohort.program  })
                            if (program.organization._id.toString() == org?.id.toString()) {
                                const content = getOrganizationTemplate(org.name)
                                const link:any = 'https://devpulse-staging.herokuapp.com/org-login'
                                await sendEmail(
                                    user.email,
                                    'Organization membership notice',
                                    content,
                                    link,
                                    process.env.COORDINATOR_EMAIL,
                                    process.env.COORDINATOR_PASS

                                )
             
                            } else {
                                throw new Error('You logged into a different organization')
                            }
                        }
                    }

                    user.cohort = cohort.id
                    user.role = 'trainee'
                    await user.save()
                    await cohort.members.push(user.id)
                    await cohort.save()

                    return `member with email ${email} is successfully added to cohort '${cohort.name}'`
                }
                if (user.cohort) {
                    if (
                        user.cohort.program.id.toString() === programId.toString() &&
            user.cohort.program.organization.name === org?.name
                    ) {
                        throw new Error(
                            ` This user is already part of another cohort  '${user.cohort.name}' in program '${cohort.program.name}'`
                        )
                    }
                    if (
                        user.cohort.program.id.toString() === programId.toString() &&
            user.cohort.program.organization.name !== org?.name
                    ) {
                        throw new Error(
                            ` This user is already part of another organization '${user.cohort.program.organization.name}'`
                        )
                    }
                    if (
                        user.cohort.program.id.toString() !== programId.toString() &&
            user.cohort.program.organization.name !== org?.name
                    ) {
                        throw new Error(
                            ` This user is already part of another program in a different organization '${user.cohort.program.organization.name}'`
                        )
                    }
                }
            } else {
                throw new Error(
                    'The cohort or email you provided are not in existance '
                )
            }
        },
        async removeMemberFromCohort(
            _: any,
            { cohortName, email, orgToken }: any,
            context: any
        ) {
            // coordinator validation
            const { userId, role } = (await checkUserLoggedIn(context))([
                'admin',
                'manager',
                'coordinator',
            ])

            // get the organization if someone  logs in
            let org: InstanceType<typeof Organization>
            org = await checkLoggedInOrganization(orgToken)

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
            })

            if (!checkMember) {
                throw new Error('This member does not exist ')
            }

            if (
                (checkMember.cohort?.program.organization.admin._id.toString() ===
          userId?.toString() &&
          checkMember.cohort?.program?.organization?.name == org?.name &&
          checkMember.cohort?.name == cohortName) ||
        (checkMember.cohort?.program.manager._id.toString() ===
          userId?.toString() &&
          checkMember.cohort?.program?.organization?.name == org?.name &&
          checkMember.cohort?.name == cohortName) ||
        (checkMember.cohort?.coordinator._id.toString() ===
          userId?.toString() &&
          checkMember.cohort?.program?.organization?.name == org?.name &&
          checkMember.cohort?.name == cohortName)
            ) {
                const memberCheck = checkMember.cohort?.members.filter(
                    (member: any) => {
                        return member.toString() == checkMember.id.toString()
                    }
                )

                if (memberCheck[0].toString() == checkMember.id.toString()) {
                    (checkMember.cohort.members = checkMember.cohort?.members.filter(
                        (member: any) => {
                            return member.toString() !== checkMember.id.toString()
                        }
                    )),
                    await checkMember.cohort.save()
                    checkMember.role = 'user'
                    checkMember.coordinator = null
                    checkMember.cohort = null
                    await checkMember.save()
                    return `member with email ${email} is successfully removed from cohort`
                } else {
                    throw new Error('This member is not in this cohort')
                }
            }
        },

        async editMember(
            _: any,
            { removedFromcohortName, addedTocohortName, email, orgToken }: any,
            context: any
        ) {
            // coordinator validation
            const { userId, role } = (await checkUserLoggedIn(context))([
                'admin',
                'manager',
                'coordinator',
            ])

            // get the organization if someone  logs in
            let org: InstanceType<typeof Organization>
            org = await checkLoggedInOrganization(orgToken)

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
            })

            const addedToCohort: any = await Cohort.findOne({
                name: addedTocohortName,
            }).populate({
                path: 'program',
                model: Program,
                strictPopulate: false,
                populate: {
                    path: 'organization',
                    model: Organization,
                    strictPopulate: false,
                },
            })

            if (checkMember && addedToCohort) {
                if (
                    (checkMember.cohort?.program.organization.admin._id.toString() ==
            userId?.toString() &&
            checkMember.cohort?.program?.organization?.name == org?.name &&
            checkMember.cohort?.name == removedFromcohortName) ||
          (checkMember.cohort?.program.manager._id.toString() ==
            userId?.toString() &&
            checkMember.cohort?.program?.organization?.name == org?.name &&
            checkMember.cohort?.name == removedFromcohortName) ||
          (checkMember.cohort?.coordinator._id.toString() ==
            userId?.toString() &&
            checkMember.cohort?.program?.organization?.name == org?.name &&
            checkMember.cohort?.name == removedFromcohortName)
                ) {
                    const memberCheck = checkMember.cohort?.members.filter(
                        (member: any) => {
                            return member.toString() == checkMember.id.toString()
                        }
                    )

                    if (memberCheck[0].toString() == checkMember.id.toString()) {
                        (checkMember.cohort.members = checkMember.cohort?.members.filter(
                            (member: any) => {
                                return member.toString() !== checkMember.id.toString()
                            }
                        )),
                        await checkMember.cohort.save()
                    }
                } else {
                    throw new Error('This member is not in this cohort')
                }

                if (addedToCohort.program.organization.name !== org?.name) {
                    throw new Error(
                        ' You logged into an organization that doesn\'t have such a cohort'
                    )
                }
                const programId = addedToCohort.program.id

                const checkCohort = await Cohort.find({}).populate({
                    path: 'program',
                    model: 'Program',
                    strictPopulate: false,
                    populate: {
                        path: 'organization',
                        model: Organization,
                        strictPopulate: false,
                    },
                })
                const results: any[] = checkCohort.filter((cohort: any) => {
                    return (
                        cohort.program?.id === programId &&
            cohort.program?.organization?.name === org?.name
                    )
                })

                const checkCohortMember = results.reduce((prev: any, next: any) => {
                    const members = next.members?.filter((member: any) => {
                        return member.toString() === checkMember.id.toString()
                    })
                    if (members.length > 0) {
                        next.members = members
                        prev.push(next)
                    }
                    return prev
                }, [])
                if (checkCohortMember.length > 0) {
                    throw new Error(
                        `This member is already added to '${checkCohortMember[0].name}' cohort`
                    )
                }
                if (checkMember.cohort) {
                    checkMember.cohort = addedToCohort.id
                    await checkMember.save()
                    await addedToCohort.members.push(checkMember.id)
                    await addedToCohort.save()
                    return `member with email ${email} is successfully added to cohort '${addedToCohort.name}'`
                }
                if (!checkMember.cohort) {
                    throw new Error(
                        'This member is not having a cohort, hence can not be edited'
                    )
                }
            } else {
                throw new Error(
                    'This user does not exist or the cohort is not in existance'
                )
            }
        },
        async inviteUser(_: any, { email, orgToken }: any, context: any) {
            const { userId, role } = (await checkUserLoggedIn(context))([
                'admin',
                'manager',
            ])

            // get the organization if someone  logs in
            let org: InstanceType<typeof Organization>
            org = await checkLoggedInOrganization(orgToken)

            const user:any =  await User.findOne({_id:userId,role:role})

            const userExists:any = await User.findOne({email})

            if(userExists){
                throw new Error(
                    'This user already exists in DevPulse'
                )
            }else{
                const content = inviteUserTemplate(org.name,user.email,user.role)
                const link = 'https://devpulse-staging.herokuapp.com/register'
                await sendEmail(
                    email,
                    'Invitation',
                    content,
                    link,
                    role === 'manager'  ? process.env.MANAGER_EMAIL : process.env.ADMIN_EMAIL,
                    role === 'manager'  ? process.env.MANAGER_PASSWORD : process.env.ADMIN_PASS
                                    
                )
            }
            return 'Invitation sent successfully!'
     
        },
    },
}

export default manageStudentResolvers
