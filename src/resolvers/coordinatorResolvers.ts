import { GraphQLError } from 'graphql'
import * as jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { Attendance } from '../models/attendance.model'
import Cohort from '../models/cohort.model'
import { Organization } from '../models/organization.model'
import { Profile } from '../models/profile.model'
import Program from '../models/program.model'
import Team from '../models/team.model'
import { RoleOfUser, User } from '../models/user'
import { pushNotification } from '../utils/notification/pushNotification'
import { sendEmail } from '../utils/sendEmail'
import generalTemplate from '../utils/templates/generalTemplate'
import getOrganizationTemplate from '../utils/templates/getOrganizationTemplate'
import inviteUserTemplate from '../utils/templates/inviteUserTemplate'
import RemoveTraineeTemplate from '../utils/templates/removeTraineeTamplete'
import { Context } from './../context'

const SECRET: string = process.env.SECRET as string

interface TraineeStatus {
  days: string
  value: number
}

interface Trainee {
  traineeId: string
  traineeEmail: string
  status: TraineeStatus[]
}

enum UserRoles {
  TTL = 'ttl',
}

const manageStudentResolvers = {
  Query: {
    getAllCoordinators: async (_: any, { orgToken }: any, context: Context) => {
      try {
        // coordinator validation
        ;(await checkUserLoggedIn(context))([
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
        ])
        const selectedOrganization = await checkLoggedInOrganization(orgToken)
        // Fetch coordinators based on the role
        const coordinators = await User.find({
          role: RoleOfUser.COORDINATOR,
          organizations: selectedOrganization.name,
        })
        return coordinators || []
      } catch (error) {
        const { message } = error as { message: any }
        throw new GraphQLError(
          'An error occurred while fetching coordinators.',
          {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
            },
          }
        )
      }
    },

    getUsers: async (_: any, { orgToken }: any, context: Context) => {
      try {
        // coordinator validation
        ;(await checkUserLoggedIn(context))([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
        ])

        const org: InstanceType<typeof Organization> =
          await checkLoggedInOrganization(orgToken)

        return (
          await User.find({
            $or: [{ role: 'user' }, { role: 'trainee' }],
            organizations: org?.name,
          })
        ).filter((user: any) => {
          return user.cohort == null || user.cohort == undefined
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

    getTrainees: async (_: any, { orgToken }: any, context: Context) => {
      try {
        const { userId, role }: any = (await checkUserLoggedIn(context))([
          RoleOfUser.SUPER_ADMIN,
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
          RoleOfUser.TTL,
        ])

        const org: InstanceType<typeof Organization> =
          await checkLoggedInOrganization(orgToken)

        const query: any = {
          role: RoleOfUser.TRAINEE,
          organizations: org.name,
        }

        let teamId: Types.ObjectId | undefined

        if (role === 'ttl') {
          const userTeam = await Team.findOne({
            members: new Types.ObjectId(userId),
          })
          if (!userTeam) {
            return []
          }

          teamId = userTeam._id
          query['team'] = teamId
        }
        const trainees = await User.find(query).populate({
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
        if (role === RoleOfUser.TTL) {
          return trainees
        }

        return trainees.filter((user: any) => {
          if (role === RoleOfUser.ADMIN) {
            return (
              user.team?.cohort?.program?.organization.name == org?.name &&
              user.team?.cohort?.program?.organization.admin.includes(userId)
            )
          }
          if (role === RoleOfUser.MANAGER) {
            return (
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.program?.manager).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
          if (role === RoleOfUser.COORDINATOR) {
            return (
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.coordinator).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
          return false
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

    getCohortTrainees: async (
      _: any,
      { orgToken, cohort }: any,
      context: Context
    ) => {
      try {
        // coordinator validation
        const { userId, role } = (await checkUserLoggedIn(context))([
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
          if (role === RoleOfUser.ADMIN) {
            return (
              user.team?.cohort?.name == cohort &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              user.team?.cohort?.program?.organization.admin.includes(userId)
            )
          }
          if (role === RoleOfUser.MANAGER) {
            return (
              user.team?.cohort?.name == cohort &&
              user.team?.cohort?.program?.organization.name == org?.name &&
              JSON.stringify(user.team?.cohort?.program?.manager).replace(
                /['"]+/g,
                ''
              ) == userId
            )
          }
          if (role === RoleOfUser.COORDINATOR) {
            return (
              user.team?.cohort?.name == cohort &&
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
        throw new GraphQLError(message.toString(), {
          extensions: {
            code: '500',
          },
        })
      }
    },

    async getCohorts(_: any, { orgToken }: any, context: any) {
      // coordinator validation
      const { userId, role } = (await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
        RoleOfUser.COORDINATOR,
      ])

      // get the organization if someone  logs in
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      if (role === RoleOfUser.COORDINATOR) {
        const allCohorts = await Cohort.find({
          coordinator: context.userId,
        }).populate({
          path: 'program',
          match: role === RoleOfUser.COORDINATOR,
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
        match: role === RoleOfUser.COORDINATOR,
        strictPopulate: false,
        populate: {
          path: 'organization',
          strictPopulate: false,
        },
      })
      return allCohorts.filter((cohort: any) => {
        if (role === RoleOfUser.ADMIN) {
          return (
            cohort.program?.organization.name == org?.name &&
            cohort.program?.organization?.admin.includes(userId)
          )
        }
        if (role === RoleOfUser.MANAGER) {
          return (
            cohort.program?.organization.name == org?.name &&
            JSON.stringify(cohort.program?.manager).replace(/['"]+/g, '') ==
              userId
          )
        }
        if (role === RoleOfUser.COORDINATOR) {
          return (
            cohort.program?.organization.name == org?.name &&
            JSON.stringify(cohort.coordinator).replace(/['"]+/g, '') == userId
          )
        }
      })
    },
  },
  Mutation: {
    async addMemberToTeam(
      _: any,
      { teamName, email, orgToken }: any,
      context: any
    ) {
      try {
        // coordinator validation
        const { userId, role } = (await checkUserLoggedIn(context))([
          RoleOfUser.ADMIN,
          RoleOfUser.MANAGER,
          RoleOfUser.COORDINATOR,
        ])

        // get the organization if someone  logs in
        const org: InstanceType<typeof Organization> =
          await checkLoggedInOrganization(orgToken)

        const team: any = await Team.findOne({
          organization: org?.id,
          name: teamName,
        }).populate({
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

        const user: any = await User.findOne({ email }).populate({
          path: 'team',
          model: Team,
          strictPopulate: false,
          populate: {
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
          },
        })

        if (team && user) {
          if (team.cohort.program.organization.name !== org?.name) {
            throw new Error(
              " You logged into an organization that doesn't have such a team"
            )
          }
          const programId = team.cohort.program.id

          const checkTeam = await Team.find({}).populate({
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
          const results: any[] = checkTeam.filter((team: any) => {
            return (
              team?.cohort?.program?.id === programId &&
              team?.cohort?.program?.organization?.name === org?.name
            )
          })

          const checkTeamMember = results.reduce((prev: any, next: any) => {
            const members = next.members?.filter((member: any) => {
              return member.toString() === user.id.toString()
            })
            if (members.length > 0) {
              next.members = members
              prev.push(next)
            }
            return prev
          }, [])

          if (checkTeamMember.length > 0) {
            throw new Error(
              `This member is already added to '${checkTeamMember[0].name}' cohort`
            )
          }

          if (!user.team) {
            // add trainee to attendance

            if (role === RoleOfUser.COORDINATOR) {
              const attendanceRecords: any = Attendance.find({
                coordinatorId: userId,
              })

              const traineeArray = (await attendanceRecords).map(
                (data: any) => data.trainees
              )

              let traineeEmailExists = false
              for (const weekTrainees of traineeArray) {
                for (const trainee of weekTrainees) {
                  if (trainee.traineeEmail === email) {
                    traineeEmailExists = true
                    break
                  }
                }
              }
              if (!traineeEmailExists) {
                // create new trainee
                const newTrainee: Trainee = {
                  traineeId: user.id,
                  traineeEmail: email,
                  status: [],
                }

                const attendanceLength: any = await Attendance.find({
                  coordinatorId: userId,
                })

                if (attendanceLength.length > 0) {
                  for (const attendData of attendanceLength) {
                    attendData.trainees.push(newTrainee)
                    await attendData.save()
                  }
                } else {
                  const newAttendRecord = new Attendance({
                    week: 1,
                    coordinatorId: [userId],
                    trainees: [newTrainee],
                  })
                  await newAttendRecord.save()
                }
              }
            }

            user.team = team.id
            user.cohort = team.cohort.id
            user.role = 'trainee'
            await user.save()
            await team.members.push(user.id)
            await team.save()

            // Send Email
            try {
              const content = getOrganizationTemplate(
                org!.name,
                `${process.env.FRONTEND_LINK}/login/org`
              )
              await sendEmailOnMembershipActions(
                role,
                org,
                userId,
                user,
                content
              )
            } catch (error: any) {
              throw new Error(
                'Tranee added but there was an error sending email to him. Find other way to notify him/her.'
              )
            }

            return `Member with email ${email} is successfully added to cohort '${team.cohort.name}' in team '${team.name}'`
          }

          if (user.cohort) {
            if (
              user.cohort.program.id.toString() === programId.toString() &&
              user.cohort.program.organization.name === org?.name
            ) {
              throw new Error(
                ` This user is already part of another team '${user.team.cohort.name}' in program '${team.cohort.program.name}'`
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

        // CATCH ERROR
      } catch (error: any) {
        console.log(error)
        throw new GraphQLError(error.message, {
          extensions: {
            code: '500',
          },
        })
      }
    },

    async dropTrainee(_: any, args: any, context: Context) {
      try {
        // coordinator validation
        const { userId, role } = (await checkUserLoggedIn(context))([
          RoleOfUser.ADMIN,
          RoleOfUser.COORDINATOR,
        ])

        // traineeId: String!, reason: String!, date: DateTime!, these are the arges am getting from the resolver

        const loggedInUserOrg = await User.findById(context.userId).select(
          'organizations'
        )
        const orgName = loggedInUserOrg?.organizations[0]
        const organization = await Organization.findOne({ name: orgName })

        const trainee = await User.findOneAndUpdate(
          { _id: args.traineeId, organizations: orgName },
          {
            status: {
              status: 'drop',
              reason: args.reason,
              date: args.date,
            },
          },
          { new: true }
        )

        // Send a notification to the admin
        const admin = await User.findOne({ role: RoleOfUser.ADMIN }) // Assuming there's a single admin
        if (admin && trainee) {
          await pushNotification(
            admin._id,
            `Trainee ${trainee.email} was dropped from the program.`,
            new Types.ObjectId(context.userId) // sender is the ID of the one who removed the trainee
          )
        }

        return 'Trainee dropped successfully!'
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: '500',
          },
        })
      }
    },
    async undropTrainee(_: any, args: any, context: Context) {
      try {
        const { userId, role } = (await checkUserLoggedIn(context))([
          'admin',
          'coordinator',
        ])

        const loggedInUserOrg = await User.findById(context.userId).select(
          'organizations'
        )
        const orgName = loggedInUserOrg?.organizations[0]
        const organization = await Organization.findOne({ name: orgName })

        const trainee = await User.findOneAndUpdate(
          { _id: args.traineeId, organizations: orgName },
          {
            status: {
              status: 'active',
              reason: null,
              date: null,
            },
          },
          { new: true }
        )

        const admin = await User.findOne({ role: 'admin' })
        if (admin && trainee) {
          await pushNotification(
            admin._id,
            `Trainee ${trainee.email} has been restored to the program.`,
            new Types.ObjectId(context.userId)
          )
        }

        return 'Trainee restored successfully!'
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: '500',
          },
        })
      }
    },

    async removeMemberFromCohort(
      _: any,
      { teamName, email, orgToken }: any,
      context: any
    ) {
      // coordinator validation
      const { userId, role } = (await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
        RoleOfUser.COORDINATOR,
      ])

      // get the organization if someone  logs in
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      const checkMember: any = await User.findOne({ email }).populate({
        path: 'team',
        model: Team,

        strictPopulate: false,
        populate: {
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
        },
      })

      if (!checkMember) {
        throw new Error('This member does not exist ')
      }
      if (
        (checkMember.team.cohort?.program?.organization?.admin.includes(
          userId
        ) &&
          checkMember.team.cohort?.program?.organization?.name == org?.name &&
          checkMember.team?.name == teamName) ||
        (checkMember.team.cohort?.program?.manager?._id.toString() ===
          userId?.toString() &&
          checkMember.team.cohort?.program?.organization?.name == org?.name &&
          checkMember.team?.name == teamName) ||
        (checkMember.team?.cohort?.coordinator._id.toString() ===
          userId?.toString() &&
          checkMember.team.cohort?.program?.organization?.name == org?.name &&
          checkMember.team?.name == teamName)
      ) {
        const memberCheck = checkMember.team?.members.filter((member: any) => {
          return member.toString() == checkMember.id.toString()
        })

        if (memberCheck[0].toString() == checkMember.id.toString()) {
          // remove trainee to attendance
          if (role === RoleOfUser.COORDINATOR) {
            const traineeAttendance: any = await Attendance.findOne({
              coordinatorId: userId,
            })
            const Attendances: any[] = await Attendance.find({
              coordinatorId: userId,
            })
            const traineeExist = traineeAttendance.trainees.findIndex(
              (data: any) => data.traineeEmail === email
            )

            if (traineeExist !== -1) {
              for (const attendance of Attendances) {
                for (let i = 0; i < attendance.trainees.length; i++) {
                  if (attendance.trainees[i].traineeEmail === email) {
                    attendance.trainees.splice(i, 1)
                    await attendance.save()
                  }
                }
              }
            }
          }

          checkMember.team.members = checkMember.team?.members.filter(
            (member: any) => {
              return member.toString() !== checkMember.id.toString()
            }
          )

          const cohortObj = await Cohort.findOne({ _id: checkMember.cohort })
          const cohortName = cohortObj?.name

          await checkMember.team.save()
          checkMember.role = 'user'
          checkMember.coordinator = null
          checkMember.cohort = null
          checkMember.team = null
          await checkMember.save()

          // Send Email
          const userProfile = await Profile.findOne({ user: checkMember.id })
          const name = `${userProfile?.firstName} ${userProfile?.lastName}`
          try {
            const content = RemoveTraineeTemplate(
              cohortName,
              name,
              teamName,
              org.name
            )
            await sendEmailOnMembershipActions(
              role,
              org,
              userId,
              checkMember,
              content
            )
          } catch (error: any) {
            throw new Error(
              'Tranee added but there was an error sending email to him. Find other way to notify him/her.'
            )
          }

          return `Member with email ${email} is successfully removed from cohort`
        } else {
          throw new Error('This member is not in this cohort')
        }
      }
    },

    async editMember(
      _: any,
      { removedFromTeamName, addedToTeamName, email, orgToken }: any,
      context: Context
    ) {
      // Coordinator validation
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
        RoleOfUser.COORDINATOR,
      ])

      // Get the organization if someone logs in
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      if (!org.name) {
        throw new Error('You are not logged into an organization')
      }

      const newTeam = await Team.findOne({
        organization: org?.id,
        name: addedToTeamName,
      })

      const member = await User.findOne({ email }).populate({
        path: 'team',
        model: Team,
        strictPopulate: false,
      })

      if (member && newTeam) {
        // Check if the new team contains a TTL user
        const existingTTL = await User.findOne({
          team: newTeam.id,
          role: UserRoles.TTL,
        })

        if (existingTTL && member.role !== 'trainee') {
          throw new Error('This team already has a TTL assigned.')
        }

        member.team = newTeam?.id
        member.cohort = newTeam?.cohort
        await member.save()
        newTeam.ttl = member.id
        await newTeam.save()
        if (removedFromTeamName !== '') {
          const teamToChange = await Team.findOne({
            organization: org?.id,
            name: removedFromTeamName,
          })

          if (teamToChange) {
            teamToChange.members = teamToChange?.members.filter((user: any) => {
              return user.toString() !== member?.id.toString()
            })
            await teamToChange?.save()
          }
        }
        pushNotification(
          member.id,
          `You've been moved to a new team ${newTeam.name}`,
          new Types.ObjectId(context.userId)
        )
        const content = generalTemplate({
          message: `Hey there, just here to inform you that your account has been updated, and you've been moved ${
            removedFromTeamName ? `from team ${removedFromTeamName} ` : ''
          }to team ${
            newTeam?.name
          }. If you think this is a mistake or have any questions about this move, please open a ticket under your account and an attendant will get back to you.`,
        })

        newTeam?.members.push(member?.id)
        await newTeam?.save()
        await sendEmail(
          email,
          'Team changed notice',
          content,
          '',
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )
        return `Member with email ${email} is successfully moved ${
          removedFromTeamName ? `from team '${removedFromTeamName}' ` : ''
        }to team '${newTeam?.name}'`
      } else {
        throw new Error('This member does not exist')
      }
    },

    async inviteUser(_: any, { email, orgToken, type }: any, context: any) {
      const { userId, role } = (await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.MANAGER,
      ])

      // get the organization if someone  logs in
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      const userExists: any = await User.findOne({ email })

      if (userExists) {
        throw new Error(`This user already exists in ${org.name}`)
      } else {
        const token: any = jwt.sign({ name: org.name, email: email }, SECRET, {
          expiresIn: '2d',
        })
        const newToken: any = token.replace(/\./g, '*')
        const link =
          type == 'user'
            ? `${process.env.FRONTEND_LINK}/redirect?token=${newToken}&dest=app&path=/auth/register&fallback=/register/${newToken}`
            : `${process.env.REGISTER_ORG_FRONTEND_URL}`
        const content = inviteUserTemplate(org?.name || '', link, role || '')
        const someSpace = process.env.FRONTEND_LINK + '/login/org'

        await sendEmail(
          email,
          'Invitation',
          content,
          someSpace,
          role === RoleOfUser.MANAGER
            ? process.env.MANAGER_EMAIL
            : process.env.ADMIN_EMAIL,
          role === RoleOfUser.MANAGER
            ? process.env.MANAGER_PASSWORD
            : process.env.ADMIN_PASS
        )
      }
      return 'Invitation sent successfully!'
    },
  },
}

async function sendEmailOnMembershipActions(
  role: string | any,
  org: any,
  userId: string | any,
  user: any,
  content: string
) {
  if (role === RoleOfUser.ADMIN) {
    const organization: any = await Organization.findOne({
      _id: org.id,
    })
    if (!organization) {
      throw new Error("You don't have an organization yet")
    }
    if (organization.admin.includes(userId) && organization.name == org.name) {
      const link: any = process.env.FRONTEND_LINK + '/login/org'
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

  if (role === RoleOfUser.MANAGER) {
    const program: any = await Program.findOne({ manager: userId })
    if (!program) {
      throw new Error("You dont't have a program yet")
    }
    if (program.organization._id.toString() == org?.id.toString()) {
      const content = getOrganizationTemplate(
        org!.name,
        `${process.env.FRONTEND_LINK}/login/org`
      )
      const link: any = process.env.FRONTEND_LINK + '/login/org'
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
  }

  if (role === RoleOfUser.COORDINATOR) {
    const cohort: any = await Cohort.findOne({ coordinator: userId })
    if (!cohort) {
      throw new Error("You don't have a coordinator yet")
    }
    const program: any = await Program.findOne({
      _id: cohort.program,
    })
    if (program.organization._id.toString() == org?.id.toString()) {
      const content = getOrganizationTemplate(
        org!.name,
        `${process.env.FRONTEND_LINK}/login/org`
      )
      const link: any = process.env.FRONTEND_LINK + '/login/org'
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

export default manageStudentResolvers
