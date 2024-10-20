/* eslint-disable prefer-const */
import { Octokit } from '@octokit/rest'
import bcrypt from 'bcryptjs'
import { GraphQLError } from 'graphql'
// import * as jwt from 'jsonwebtoken'
import { JwtPayload, verify } from 'jsonwebtoken'
import mongoose, { Error } from 'mongoose'
import generateRandomPassword from '../helpers/generateRandomPassword'
import isAssigned from '../helpers/isAssignedToProgramOrCohort'
import { checkloginAttepmts } from '../helpers/logintracker'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import {
  checkUserLoggedIn,
  emailExpression,
  generateToken,
  generateTokenOrganization,
  generateTokenUserExists,
} from '../helpers/user.helpers'
import Cohort from '../models/cohort.model'
import { Invitation } from '../models/invitation.model'
import { Organization } from '../models/organization.model'
import Phase from '../models/phase.model'
import { Profile } from '../models/profile.model'
import Program from '../models/program.model'
import { Rating } from '../models/ratings'
import Team from '../models/team.model'
import { RoleOfUser, User, UserRole } from '../models/user'
import { pushNotification } from '../utils/notification/pushNotification'
import { sendEmail } from '../utils/sendEmail'
import forgotPasswordTemplate from '../utils/templates/forgotPasswordTemplate'
import organizationApprovedTemplate from '../utils/templates/organizationApprovedTemplate'
import organizationCreatedTemplate from '../utils/templates/organizationCreatedTemplate'
import organizationRejectedTemplate from '../utils/templates/organizationRejectedTemplate'
import registrationRequest from '../utils/templates/registrationRequestTemplate'
import { EmailPattern } from '../utils/validation.utils'
import { Context } from './../context'
const octokit = new Octokit({ auth: `${process.env.Org_Repo_Access}` })

const SECRET: string = process.env.SECRET as string
export type OrganizationType = InstanceType<typeof Organization>
export type UserType = InstanceType<typeof User>

enum Status {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

async function logGeoActivity(user: any) {
  const ipResponse = await fetch('https://api.ipify.org?format=json')
  const { ip: realIp } = await ipResponse.json()

  const response = await fetch(`https://ipapi.co/${realIp}/json/`)
  const geoData = await response.json()

  const profile = await Profile.findOne({ user: user._id })
  if (!profile) {
    throw new Error('Profile not found for the user')
  }

  if (geoData.country_code && geoData.city) {
    profile.activity.push({
      country_code: geoData.country_code,
      country_name: geoData.country_name,
      IPv4: realIp,
      city: geoData.city,
      state: geoData.region,
      postal: geoData.postal,
      latitude: geoData.latitude,
      longitude: geoData.longitude,
      failed: 0,
      date: new Date().toISOString(),
    })
    await profile.save()
  } else {
    console.log('skipping activity due to incomplete geo data')
    profile.activity.push({
      failed: 1,
      date: new Date().toISOString(),
    })
    await profile.save()
  }

  return geoData
}

const resolvers: any = {
  Query: {
    async getOrganizations(_: any, __: any, context: Context) {
      ;(await checkUserLoggedIn(context))([RoleOfUser.SUPER_ADMIN])

      return Organization.find()
    },
    async getUpdatedEmailNotifications(_: any, { id }: any, context: Context) {
      const user: any = await User.findOne({ _id: id })
      if (!user) {
        throw new Error('User not found')
      }
      return user.emailNotifications
    },
    async getUpdatedPushNotifications(_: any, { id }: any, context: Context) {
      const user: any = await User.findOne({ _id: id })
      if (!user) {
        throw new Error('User not found')
      }
      return user.pushNotifications
    },
    async getOrganization(_: any, { name }: any, context: Context) {
      const { userId, role } = (await checkUserLoggedIn(context))([
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.ADMIN,
        'trainee',
      ])

      const organization = await Organization.findOne({ name })

      if (!organization) {
        throw new Error('Organization not found')
      }

      const org = organization.toObject()
      const orgAdmin = await User.findById(org.admin)
      return { ...org, admin: orgAdmin }
    },

    async getSignupOrganization(_: any, { orgToken }: any) {
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)
      return Organization.findOne({ name: org.name })
    },
    async verifyResetPasswordToken(_: any, { token }: any) {
      const { email } = verify(token, SECRET) as JwtPayload
      const user: any = await User.findOne({ email })
      if (!user) {
        throw new Error('Unauthorized to access the page! ')
      }
    },

    async gitHubActivity(
      _: any,
      { organisation, username }: any,
      context: Context
    ) {
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.COORDINATOR,
        'trainee',
        RoleOfUser.MANAGER,
        'ttl',
      ])

      const organisationExists = await Organization.findOne({
        name: organisation,
      })
      if (!organisationExists)
        throw new Error("This Organization doesn't exist")

      organisation = organisationExists.gitHubOrganisation

      const { data: checkOrg } = await octokit.orgs.get({ org: organisation })
      if (!checkOrg) {
        throw new GraphQLError('Organization Not found On GitHub', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }
      const { data: checkUser } = await octokit.users.getByUsername({
        username: username,
      })
      if (!checkUser) {
        throw new GraphQLError('User Not found On Github', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }

      let allRepos: any = []

      allRepos = organisationExists.activeRepos

      let pullRequestOpen = 0
      let pullRequestClosed = 0
      let pullRequestMerged = 0
      let pullRequestTotal = 0
      let allCommits = 0

      try {
        for (const repo of allRepos) {
          try {
            const response = await octokit.pulls.list({
              owner: organisation,
              repo: repo,
              state: 'all',
              sort: 'created',
              direction: 'desc',
              per_page: 200,
            })

            const pullRequests = response.data.filter(
              (pullRequest: any) => pullRequest.user.login === username
            )
            pullRequestTotal += pullRequests.length
            pullRequestOpen += pullRequests.filter(
              (pullRequest: any) => pullRequest.state === 'open'
            ).length
            pullRequestClosed += pullRequests.filter(
              (pullRequest: any) => pullRequest.state === 'closed'
            ).length
            pullRequestMerged += pullRequests.filter(
              (pullRequest: any) => pullRequest.merged_at != null
            ).length
          } catch (error) {
            console.error(
              `Error retrieving commits for repository ${repo.name}:`,
              error
            )
            throw new GraphQLError(
              'Error retrieving commits for repository ${repo.name}:'
            )
          }
        }
      } catch (error) {
        console.error('Error retrieving repositories:', error)
      }
      return {
        totalCommits: pullRequestMerged,
        pullRequest: {
          merged: pullRequestMerged,
          closed: pullRequestClosed,
          opened: pullRequestOpen,
        },
      }
    },
  },
  Mutation: {
    async createUser(
      _: any,
      {
        email,
        password,
        role,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        orgToken,
      }: any
    ) {
      // checkLoggedInOrganization checks if the organization token passed was valid
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      const userExists = await User.findOne({ email: email })
      if (userExists)
        throw new GraphQLError('User with a such email already exists', {
          extensions: {
            code: 'UserInputError',
          },
        })

      const isValidEmail = emailExpression.test(String(email).toLowerCase())
      if (!isValidEmail)
        throw new GraphQLError('invalid email format', {
          extensions: {
            code: 'ValidationError',
          },
        })
      if (password.length < 6)
        throw new GraphQLError('password should be minimum 6 characters', {
          extensions: {
            code: 'ValidationError',
          },
        })
      let invitee
      const invitation = await Invitation.findOne({ 'invitees.email': email })
        .sort({ createdAt: -1 })
        .exec()

      if (invitation) {
        invitee = invitation.invitees.find((invitee) => invitee.email === email)
      }

      const user = await User.create({
        role: role || invitee?.role || 'user',
        email: email,
        password,
        organizations: org.name,
      })
      const token = generateToken(user._id.toString(), user?.role)

      if (user && invitation) {
        invitation.status = 'accepted'
        await invitation.save()
      }

      const newProfile = await Profile.create({
        user,
        firstName,
        lastName,
        dateOfBirth,
        gender,
      })

      const newUser: string | null = await User.findByIdAndUpdate(
        user.id,
        {
          profile: newProfile,
        },
        { new: true }
      )

      return { token, user: newUser }
    },

    async createProfile(_: any, args: any, context: { userId: any }) {
      if (!context.userId) throw new Error('Unauthorized')
      if (!mongoose.isValidObjectId(context.userId))
        throw new Error('Invalid user id')
      const userExists = await User.findOne({ _id: context.userId })
      if (!userExists) throw new Error('This user does not exists')
      const profile = await Profile.findOneAndUpdate(
        { user: context.userId },
        args,
        {
          upsert: true,
          new: true,
        }
      )

      return profile.toJSON()
    },

    async loginUser(
      _: any,
      { loginInput: { email, password, orgToken } }: any
    ) {
      // get the organization if someone  logs in
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

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

      if (!user) {
        throw new GraphQLError('invalid credential', {
          extensions: {
            code: 'AccountNotFound',
          },
        })
      } else if (user?.status?.status !== 'active') {
        throw new GraphQLError(
          `Your account have been ${
            user?.status?.status ?? user?.status
          }, please contact your organization admin for assistance`,
          {
            extensions: {
              code: 'AccountInactive',
            },
          }
        )
      }
      let attempts = await checkloginAttepmts(Profile, user)

      if (await user?.checkPass(password)) {
        if (
          user?.role === RoleOfUser.TRAINEE &&
          user?.organizations?.includes(org?.name)
        ) {
          if (
            !user.cohort ||
            user.cohort === null ||
            !user.team ||
            user.team === null
          ) {
            throw new Error('Please wait to be added to a program or cohort')
          }
          if (await isAssigned(org?.name, user._id)) {
            const token = generateToken(user._id, user._doc?.role || 'user')

            const geoData = await logGeoActivity(user)

            const data = {
              token: token,
              user: user.toJSON(),
              geoData,
            }
            return data
          } else {
            throw new Error(
              'You are not assigned to any valid program or cohort in this organization.'
            )
          }
        } else if (
          user?.role === RoleOfUser.TTL &&
          user?.organizations?.includes(org?.name)
        ) {
          if (user.cohort && user.team) {
            const token = generateToken(user._id, user._doc?.role || 'user')

            const geoData = await logGeoActivity(user)

            const data = {
              token: token,
              user: user.toJSON(),
              geoData,
            }
            return data
          } else {
            throw new Error('You are not assigned to any cohort ot team yet.')
          }
        }
        const organization: any = await Organization.findOne({
          name: org?.name,
          admin: user.id,
        })

        if (user?.role === RoleOfUser.ADMIN) {
          if (user?.organizations?.includes(org?.name)) {
            const token = generateToken(user._id, user._doc?.role || 'user')

            const geoData = await logGeoActivity(user)

            const data = {
              token: token,
              user: user.toJSON(),
              geoData,
            }
            return data
          } else {
            throw new Error('You do not have access to this organization.')
          }
        } else if (user?.role === RoleOfUser.MANAGER) {
          const program: any = await Program.find({
            manager: user.id,
          }).populate({
            path: 'organization',
            model: Organization,
            strictPopulate: false,
          })
          let checkProgramOrganization: any = false

          for (const element of program) {
            if (element.organization.name == org?.name) {
              checkProgramOrganization = true
            }
          }
          if (checkProgramOrganization) {
            const managerToken = generateToken(
              user._id,
              user._doc?.role || 'user'
            )

            const geoData = await logGeoActivity(user)

            const managerData = {
              token: managerToken,
              user: user.toJSON(),
              geoData,
            }
            return managerData
          } else {
            throw new Error('You are not assigned to any program yet.')
          }
        } else if (user?.role === RoleOfUser.COORDINATOR) {
          const cohort: any = await Cohort.find({
            coordinator: user.id,
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
          let checkCohortOrganization: any = false

          for (const element of cohort) {
            if (element.program.organization.name == org?.name) {
              checkCohortOrganization = true
            }
          }

          if (checkCohortOrganization) {
            const coordinatorToken = generateToken(
              user._id,
              user._doc?.role || 'user'
            )

            const geoData = await logGeoActivity(user)

            const coordinatorData = {
              token: coordinatorToken,
              user: user.toJSON(),
              geoData,
            }
            return coordinatorData
          } else {
            throw new Error('You are not assigned to any cohort yet.')
          }
        } else if (user?.role === RoleOfUser.SUPER_ADMIN) {
          const superAdminToken = generateToken(
            user._id,
            user._doc?.role || 'user'
          )

          const geoData = await logGeoActivity(user)

          const superAdminData = {
            token: superAdminToken,
            user: user.toJSON(),
            geoData,
          }
          return superAdminData
        } else {
          throw new Error('Please wait to be added to a program or cohort')
        }
      } else {
        throw new GraphQLError('Invalid credential', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }
    },

    async deleteUser(_: any, { input }: any, context: { userId: any }) {
      const requester = await User.findById(context.userId)
      if (!requester) {
        throw new Error('Requester does not exist')
      }
      if (
        requester.role !== RoleOfUser.ADMIN &&
        requester.role !== RoleOfUser.SUPER_ADMIN
      ) {
        throw new Error('You do not have permission to delete users')
      }

      const userToSuspend = await User.findById(input.id)
      if (!userToSuspend) {
        throw new Error('User to be suspended does not exist')
      }

      if (userToSuspend?.status?.status == 'suspended') {
        throw new Error('User is already suspended')
      }

      // Handle coordinator suspension
      if (userToSuspend.role === RoleOfUser.COORDINATOR) {
        const hasCohort = await Cohort.findOne({ coordinator: input.id })
        if (hasCohort) {
          await Cohort.findOneAndReplace(
            { coordinator: input.id },
            { coordinator: null }
          )
          await pushNotification(
            context.userId,
            `The coordinator of ${hasCohort.name} has been suspended. Please assign a new coordinator.`,
            context.userId
          )
        }
      }
      // Handle TTL suspension
      else if (userToSuspend.role === 'ttl') {
        const hasTeam = await Team.findOne({ ttl: input.id })
        if (hasTeam) {
          await Team.findOneAndReplace({ ttl: input.id }, { ttl: null })
          await pushNotification(
            context.userId,
            `The TTL of ${hasTeam.name} has been suspended. Please assign a new TTL.`,
            context.userId
          )
        }
      }

      // Suspend user by updating their status
      await User.findByIdAndUpdate(input.id, {
        status: { status: 'suspended' },
      })

      // Send suspension notification to the user
      await pushNotification(
        input.id,
        'Your account has been suspended and  will no longer be able to access the system.',
        input.id
      )

      // Send confirmation notification to the requester/admin
      await pushNotification(
        context.userId,
        `You have successfully suspended the user with ID: ${input.id}.`,
        context.userId
      )

      return { message: 'User suspended successfully' }
    },

    async updateUserRole(_: any, { id, name, orgToken }: any) {
      const allRoles = [
        RoleOfUser.TRAINEE,
        RoleOfUser.COORDINATOR,
        RoleOfUser.MANAGER,
        RoleOfUser.ADMIN,
        RoleOfUser.SUPER_ADMIN,
        RoleOfUser.TTL,
      ]
      const org = await checkLoggedInOrganization(orgToken)
      const roleExists = allRoles.includes(name)
      if (!roleExists) throw new Error("This role doesn't exist")
      const userExists = await User.findById(id)
      if (!userExists) throw new Error("User doesn't exist")

      const getAllUsers = await User.find({
        role: RoleOfUser.ADMIN,
      })

      let checkUserOrganization = 0

      getAllUsers.forEach((user) => {
        if (user.organizations.includes(org?.name || '')) {
          checkUserOrganization++
        }
      })

      if (checkUserOrganization == 1 && userExists.role == RoleOfUser.ADMIN) {
        throw new Error('There must be at least one admin in the organization')
      }

      if (userExists.role == RoleOfUser.COORDINATOR) {
        const userCohort: any = await Cohort.find({
          coordinator: userExists?.id,
        })
        if (userCohort) {
          await Cohort.updateMany(
            { coordinator: userExists?.id },
            {
              $set: {
                coordinator: null,
              },
            }
          )
        }
      } else if (userExists.role == RoleOfUser.MANAGER) {
        const userProgram: any = await Program.find({ manager: userExists?.id })
        if (userProgram) {
          await Program.updateMany(
            { manager: userExists?.id },
            {
              $set: {
                manager: null,
              },
            }
          )
        }
      } else if (userExists.role == 'ttl') {
        let teamttl: any = await Team.find({ ttl: userExists?.id })
        if (teamttl) {
          await Team.updateMany(
            { ttl: userExists?.id },
            {
              $set: {
                ttl: null,
              },
            }
          )
        }
      } else if (userExists.role == RoleOfUser.ADMIN) {
        const userOrg: any = await Organization.find({ admin: userExists?.id })
        if (userOrg) {
          await Organization.findByIdAndUpdate(userOrg.id, {
            admin: userOrg[0].admin.filter(
              (item: any) => item != userExists.id
            ),
          })
        }
      }
      if (name == RoleOfUser.ADMIN) {
        org?.admin?.push(id)
        org.save()
      }
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            role: name,
          },
        },
        { new: true }
      )
      return updatedUser
    },

    async createUserRole(_: any, { name }: any) {
      const newRole = await UserRole.create({ name })
      return newRole
    },

    //This section is to make org name login to be case insensitive
    async loginOrg(_: any, { orgInput: { name } }: any) {
      const organization: any = await Organization.findOne({
        name: { $regex: new RegExp('^' + name + '$', 'i') },
      })

      if (organization) {
        if (
          organization.status == Status.pending ||
          organization.status == Status.rejected
        ) {
          throw new GraphQLError('Your organization is not approved yet', {
            extensions: {
              code: 'UserInputError',
            },
          })
        }
      }

      if (organization) {
        const token = generateTokenOrganization(organization.name)
        const data = {
          token: token,
          organization: organization.toJSON(),
        }
        return data
      } else {
        throw new GraphQLError(
          `We do not recognize this organization ${name}`,
          {
            extensions: {
              code: 'UserInputError',
            },
          }
        )
      }
    },

    // end of making org name to be case insensitive

    async requestOrganization(
      _: any,
      { organizationInput: { name, email, description } }: any
    ) {
      try {
        // Check if organization name already exists
        const orgExists = await Organization.findOne({ name })
        if (orgExists) {
          throw new GraphQLError(`Organization name '${name}' already taken`, {
            extensions: {
              code: 'UserInputError',
            },
          })
        }

        // Validate email format
        const emailExpression = EmailPattern
        const isValidEmail = emailExpression.test(String(email).toLowerCase())
        if (!isValidEmail) {
          throw new GraphQLError('Invalid email format', {
            extensions: {
              code: 'ValidationError',
            },
          })
        }

        const existingUser = await User.findOne({
          email,
          role: { $ne: RoleOfUser.ADMIN },
        })
        const admin = await User.findOne({ email, role: RoleOfUser.ADMIN })
        if (existingUser) {
          throw new GraphQLError(
            `User with email '${email}' exists and is not an admin. Please use another email.`,
            {
              extensions: {
                code: 'UserInputError',
              },
            }
          )
        }
        if (admin)
          throw new GraphQLError(
            `User with ${email} exists.  Please use another email`,
            {
              extensions: {
                code: 'UserInputError',
              },
            }
          )

        const password: any = generateRandomPassword()
        let newAdmin: any = undefined
        if (!admin) {
          newAdmin = await User.create({
            email: email,
            password: password,
            role: RoleOfUser.ADMIN,
            organizations: name,
          })

          // Create the organization with 'pending' status
          await Organization.create({
            admin: newAdmin._id,
            name,
            description,
            status: 'pending',
          })

          const superAdmin = await User.find({ role: RoleOfUser.SUPER_ADMIN })
          // Get the email content
          const content = registrationRequest(email, name, description)
          const link = process.env.FRONTEND_LINK

          // Send registration request email to super admin
          await sendEmail(
            superAdmin[0].email,
            'Organization registration request',
            content,
            link,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS
          )

          return 'Organization registration request sent successfully'
        }
      } catch (error) {
        throw error
      }
    },

    async RegisterNewOrganization(
      _: any,
      { organizationInput: { name, email }, action }: any,
      context: Context
    ) {
      // check if requester is super admin
      ;(await checkUserLoggedIn(context))([RoleOfUser.SUPER_ADMIN])
      const orgExists = await Organization.findOne({ name: name })
      if (action == 'approve') {
        if (!orgExists) {
          throw new GraphQLError('Organization Not found ', {
            extensions: {
              code: 'UserInputError',
            },
          })
        }
        const adminUser = await User.findOne({ _id: orgExists.admin[0] })
        if (!adminUser || adminUser.email !== email) {
          throw new GraphQLError('Admin email does not match', {
            extensions: {
              code: 'UserInputError',
            },
          })
        }
        if (orgExists) {
          const password: any = generateRandomPassword()
          const adminID = orgExists.admin
          const admin = await User.findOne({ _id: adminID })
          admin?.organizations.push(name)

          const hash = await bcrypt.hash(password, 10)
          await User.updateOne({ email: email }, { $set: { password: hash } })

          orgExists.status = 'active'
          await orgExists.save()

          const content = organizationApprovedTemplate(
            orgExists?.name as string,
            email,
            password
          )
          const link: any = process.env.FRONTEND_LINK
          await sendEmail(
            email,
            'Organization Approved and created notice',
            content,
            link,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS
          )
        }
      }
      if (orgExists && action == 'reject') {
        orgExists.status = 'rejected'
        await orgExists.save()
        const content = organizationRejectedTemplate(name)
        const link: any = process.env.FRONTEND_LINK
        await sendEmail(
          email,
          'Organization Request rejected notice',
          content,
          link,
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )
      }

      return orgExists
    },

    async addOrganization(
      _: any,
      { organizationInput: { name, email, description }, action: action }: any,
      context: Context
    ) {
      // the below commented line help to know if the user is an superAdmin to perform an action of creating an organization
      ;(await checkUserLoggedIn(context))([RoleOfUser.SUPER_ADMIN])
      if (action == 'new') {
        const orgExists = await Organization.findOne({ name: name })
        if (orgExists) {
          throw new GraphQLError('Organization Name already taken ' + name, {
            extensions: {
              code: 'UserInputError',
            },
          })
        }
      }

      // check if the requester is already an admin, if not create him
      const admin = await User.findOne({ email, role: RoleOfUser.ADMIN })
      // if (!admin) {
      //   console.log('admin exist')
      // }
      const password: any = generateRandomPassword()
      let newAdmin: any = undefined
      if (!admin) {
        newAdmin = await User.create({
          email,
          password,
          role: RoleOfUser.ADMIN,
        })
      }

      let org: any = await Organization.findOne({ admin: admin?._id })

      if (action == 'new') {
        // create the organization
        org = await Organization.create({
          admin: admin ? admin._id : newAdmin?._id,
          name,
          email,
          description,
          status: 'active',
        })
      }
      if (action !== 'new') {
        const hash = await bcrypt.hash(password, 10)
        await User.updateOne({ email: email }, { $set: { password: hash } })
      }

      // send the requester an email with his password
      const content = organizationCreatedTemplate(org.name, email, password)
      const link: any = process.env.FRONTEND_LINK
      // send an email to the user who desire the organization
      await sendEmail(
        email,
        'Organization created notice',
        content,
        link,
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASS
      )

      return org
    },

    async updateGithubOrganisation(
      _: any,
      { name, gitHubOrganisation }: any,
      context: Context
    ) {
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.SUPER_ADMIN,
      ])

      const org = await Organization.findOne({ name: name })
      if (!org) {
        throw new GraphQLError('Organization Not found', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }

      org.gitHubOrganisation = gitHubOrganisation
      await org.save()

      return {
        admin: org.admin,
        name: org.name,
        description: org.description,
        status: org.status,
        gitHubOrganisation: org.gitHubOrganisation,
      }
    },

    async addActiveRepostoOrganization(_: any, { name, repoUrl }: any) {
      const checkOrg = await Organization.findOne({ name: name })
      if (!checkOrg) {
        throw new GraphQLError('Organization Not found', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }

      const allRepos = checkOrg.activeRepos
      if (allRepos.includes(repoUrl)) {
        throw new GraphQLError('Repository Already Exists', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }

      checkOrg.activeRepos.push(repoUrl)
      await checkOrg.save()

      return {
        admin: checkOrg.admin,
        name: checkOrg.name,
        activeRepos: checkOrg.activeRepos,
        description: checkOrg.description,
        status: checkOrg.status,
      }
    },

    async deleteActiveRepostoOrganization(_: any, { name, repoUrl }: any) {
      // const { userId } = (await checkUserLoggedIn(context))([RoleOfUser.ADMIN,RoleOfUser.SUPER_ADMIN]);

      const org = await Organization.findOne({ name: name })
      if (!org) {
        throw new GraphQLError('Organization Not found', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }

      const allRepos = org.activeRepos
      if (!allRepos.includes(repoUrl)) {
        throw new GraphQLError('Repository Not Found', {
          extensions: {
            code: 'UserInputError',
          },
        })
      }

      const index = allRepos.indexOf(repoUrl)

      allRepos.splice(index, 1)

      await org.save()

      return {
        admin: org.admin,
        name: org.name,
        description: org.description,
        status: org.status,
      }
    },

    async deleteOrganization(_: any, { id }: any, context: Context) {
      ;(await checkUserLoggedIn(context))([
        RoleOfUser.ADMIN,
        RoleOfUser.SUPER_ADMIN,
      ])

      const organizationExists = await Organization.findOne({ _id: id })

      if (!organizationExists)
        throw new Error("This Organization doesn't exist")
      await Cohort.deleteMany({ organization: id })
      await Team.deleteMany({ organization: id })
      await Phase.deleteMany({ organization: id })
      await User.deleteMany({
        organizations: organizationExists.name,
        role: { $ne: RoleOfUser.SUPER_ADMIN },
      })
      await User.deleteOne({ _id: organizationExists.admin[0] })
      const deleteOrg = await Organization.findOneAndDelete({
        _id: id,
      })

      if (!deleteOrg)
        throw new Error(
          'Not deleted, something went wrong, please try again later'
        )
      return deleteOrg
    },

    async forgotPassword(_: any, { email }: any) {
      const userExists: any = await User.findOne({ email })

      if (userExists) {
        const token: any = generateTokenUserExists(email)
        const newToken: any = token.replaceAll('.', '*')
        const webLink = `${process.env.FRONTEND_LINK}/forgot-password/${newToken}`
        const appLink = `${process.env.FRONTEND_LINK}/redirect?dest=app&path=/auth/reset-password&fallback=${webLink}&token=${newToken}`
        const content = forgotPasswordTemplate(webLink, appLink)
        const someSpace = process.env.FRONTEND_LINK
        await sendEmail(
          email,
          'Reset your Password',
          content,
          someSpace,
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )

        return 'Check Your Email To Proceed!'
      } else {
        throw new Error('Something went wrong!\nCheck your credentials')
      }
    },

    async updateEmailNotifications(_: any, { id }: any, context: Context) {
      const user: any = await User.findOne({ _id: id })
      if (!user) {
        throw new Error('User not found')
      }
      const updatedEmailNotifications = !user.emailNotifications
      const updateEmailPreference = await User.updateOne(
        { _id: id },
        { emailNotifications: updatedEmailNotifications }
      )
      return 'updated successful'
    },

    async updatePushNotifications(_: any, { id }: any, context: Context) {
      const user: any = await User.findOne({ _id: id })
      if (!user) {
        throw new Error('User not found')
      }
      user.pushNotifications = !user.pushNotifications
      await user.save()
      const updatedPushNotifications = user.pushNotifications
      return 'updated successful'
    },

    async resetUserPassword(
      _: any,
      { password, confirmPassword, token }: any,
      context: any
    ) {
      const { email } = verify(token, SECRET) as JwtPayload
      if (password === confirmPassword) {
        const user: any = await User.findOne({ email })
        if (!user) {
          throw new Error("User doesn't exist! ")
        }
        user.password = password
        await user.save()
        return 'Your password was reset successfully! '
      } else if (password !== confirmPassword) {
        throw new Error('Password mismatch! ')
      } else {
        throw new Error('Oopps! something went wrong')
      }
    },
  },

  User: {
    async profile(parent: any) {
      const profile = await Profile.findOne({ user: parent.id.toString() })
      if (!profile) {
        return null
      } else {
        return profile
      }
    },
    async program(parent: any) {
      const program = await Program.findOne({ manager: parent.id.toString() })
      if (!program) {
        return null
      } else {
        return program
      }
    },
    async cohort(parent: any) {
      const cohort = await Cohort.findById(parent.cohort.toString())

      if (!cohort) {
        return null
      } else {
        return cohort
      }
    },
    async team(parent: UserType) {
      const team = await Team.findOne({ members: parent._id })
      if (!team) {
        return null
      } else {
        return team
      }
    },
    async ratings(parent: UserType) {
      const ratings = await Rating.find({ user: parent._id }).populate([
        'user',
        'cohort',
        {
          path: 'feedbacks',
          populate: 'sender',
        },
      ])
      if (!ratings) {
        return null
      } else {
        return ratings
      }
    },
  },
  Profile: {
    async user(parent: any) {
      const user = await User.findOne({ _id: parent.user.toString() })
      if (!user) return null
      return user
    },
  },
  Organization: {
    async admin(parent: any) {
      return User.findById(parent.admin)
    },
  },
}
export default resolvers
