/* eslint-disable prefer-const */
import { ApolloError } from 'apollo-server-errors'
import * as jwt from 'jsonwebtoken'
import { JwtPayload, verify } from 'jsonwebtoken'
import mongoose, { Error } from 'mongoose'
import generateRandomPassword from '../helpers/generateRandomPassword'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import Cohort from '../models/cohort.model'
import Program from '../models/program.model'
import { User, UserRole } from '../models/user'
import { Organization } from '../models/organization.model'
import { Profile } from '../models/profile.model'
import { sendEmail } from '../utils/sendEmail'
import organizationCreatedTemplate from '../utils/templates/organizationCreatedTemplate'
import organizationApprovedTemplate from '../utils/templates/organizationApprovedTemplate'
import organizationRejectedTemplate from '../utils/templates/organizationRejectedTemplate'
import registrationRequest from '../utils/templates/registrationRequestTemplate'
import { EmailPattern } from '../utils/validation.utils'
import { Context } from './../context'
import forgotPasswordTemplate from '../utils/templates/forgotPasswordTemplate'
import bcrypt from 'bcryptjs'
import Team from '../models/team.model'
import Phase from '../models/phase.model'
import { Octokit } from '@octokit/rest'
import { checkloginAttepmts } from '../helpers/logintracker'
import { Rating } from '../models/ratings'
import { Invitation } from '../models/invitation.model'
const octokit = new Octokit({ auth: `${process.env.GH_TOKEN}` })

const SECRET: string = process.env.SECRET ?? 'test_secret'
export type OrganizationType = InstanceType<typeof Organization>
export type UserType = InstanceType<typeof User>

enum Status {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

const resolvers: any = {
  Query: {
    async getOrganizations(_: any, __: any, context: Context) {
      ;(await checkUserLoggedIn(context))(['superAdmin'])

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
        'superAdmin',
        'admin',
      ])

      const where = role === 'superAdmin' ? {} : { admin: userId, name }

      const organization = await Organization.find(where)
      return organization[0]
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
        'admin',
        'coordinator',
        'trainee',
        'manager',
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
        throw new ApolloError(
          'Organization Not found On GitHub',
          'UserInputError'
        )
      }
      const { data: checkUser } = await octokit.users.getByUsername({
        username: username,
      })
      if (!checkUser) {
        throw new ApolloError('User Not found On Github', 'UserInputError')
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
            throw new ApolloError(
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
        invitationId,
      }: any
    ) {
      // checkLoggedInOrganization checks if the organization token passed was valid
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      const userExists = await User.findOne({ email: email })
      if (userExists)
        throw new ApolloError(
          'User with a such email already exists',
          'UserInputError'
        )

      const emailExpression =
        /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isValidEmail = emailExpression.test(String(email).toLowerCase())
      if (!isValidEmail)
        throw new ApolloError('invalid email format', 'ValidationError')
      if (password.length < 6)
        throw new ApolloError(
          'password should be minimum 6 characters',
          'ValidationError'
        )
        let invitee;
        const invitation = await Invitation.findOne({ 'invitees.email': email });
        if (invitation) {
          invitee = invitation.invitees.find(invitee => invitee.email === email);
        }
      const user = await User.create({
        role: role || invitee?.role || 'user',
        email: email,
        password,
        organizations: org.name,
        invitationId,
      })
      const token = jwt.sign({ userId: user._id, role: user?.role }, SECRET, {
        expiresIn: '2h',
      })

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
      if (invitationId) {
        await Invitation.findByIdAndUpdate(invitationId, {
          accepted: true,
        })
      }

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
      { loginInput: { email, password, orgToken, activity } }: any
    ) {
      //get location
      const newActivity = activity || null
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
      let attempts = await checkloginAttepmts(Profile, user)

      if (await user?.checkPass(password)) {
        await Profile.findOneAndUpdate(
          { user },
          {
            $push: {
              activity: { $each: [{ failed: 0, ...newActivity }] },
            },
          }
        )
        await Profile.findOneAndUpdate(
          { user },
          { $push: { activity: { $each: [newActivity] } } }
        )
        if (
          user?.role === 'trainee' &&
          user?.organizations?.includes(org?.name)
        ) {
          const token = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          )
          const data = {
            token: token,
            user: user.toJSON(),
          }
          return data
        }

        if (user?.role === 'ttl' && user?.organizations?.includes(org?.name)) {
          const token = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          )
          const data = {
            token: token,
            user: user.toJSON(),
          }
          return data
        }
        const organization: any = await Organization.findOne({
          name: org?.name,
          admin: user.id,
        })

        if (user?.role === 'admin' && organization) {
          const token = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          )
          const data = {
            token: token,
            user: user.toJSON(),
          }
          return data
        } else if (user?.role === 'manager') {
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
            const managerToken = jwt.sign(
              { userId: user._id, role: user._doc?.role || 'user' },
              SECRET,
              {
                expiresIn: '2h',
              }
            )
            const managerData = {
              token: managerToken,
              user: user.toJSON(),
            }
            return managerData
          } else {
            throw new Error('You are not assigned to any program yet.')
          }
        } else if (user?.role === 'coordinator') {
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
            const coordinatorToken = jwt.sign(
              { userId: user._id, role: user._doc?.role || 'user' },
              SECRET,
              {
                expiresIn: '2h',
              }
            )
            const coordinatorData = {
              token: coordinatorToken,
              user: user.toJSON(),
            }
            return coordinatorData
          } else {
            throw new Error('You are not assigned to any cohort yet.')
          }
        } else if (user?.role === 'superAdmin') {
          const superAdminToken = jwt.sign(
            { userId: user._id, role: user._doc?.role || 'user' },
            SECRET,
            {
              expiresIn: '2h',
            }
          )
          const superAdminData = {
            token: superAdminToken,
            user: user.toJSON(),
          }
          return superAdminData
        } else {
          await Profile.findOneAndUpdate(
            { user },
            { $push: { activity: { $each: [newActivity] } } }
          )
          throw new Error('Please wait to be added to a program or cohort')
        }
      } else {
        await Profile.findOneAndUpdate(
          { user },
          {
            $push: {
              activity: { $each: [{ failed: attempts, ...newActivity }] },
            },
          }
        )
        throw new ApolloError('Invalid credential', 'UserInputError')
      }
    },

    async updateUserRole(_: any, { id, name, orgToken }: any) {
      const allRoles = [
        'trainee',
        'coordinator',
        'manager',
        'admin',
        'superAdmin',
        'ttl',
      ]
      const org = await checkLoggedInOrganization(orgToken)
      const roleExists = allRoles.includes(name)
      if (!roleExists) throw new Error("This role doesn't exist")
      const userExists = await User.findById(id)
      if (!userExists) throw new Error("User doesn't exist")

      const getAllUsers = await User.find({
        role: 'admin',
      })

      let checkUserOrganization = 0

      getAllUsers.forEach((user) => {
        if (user.organizations.includes(org?.name || '')) {
          checkUserOrganization++
        }
      })

      if (checkUserOrganization == 1 && userExists.role == 'admin') {
        throw new Error('There must be at least one admin in the organization')
      }

      if (userExists.role == 'coordinator') {
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
      } else if (userExists.role == 'manager') {
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
      } else if (userExists.role == 'admin') {
        const userOrg: any = await Organization.find({ admin: userExists?.id })
        if (userOrg) {
          await Organization.findByIdAndUpdate(userOrg.id, {
            admin: userOrg[0].admin.filter(
              (item: any) => item != userExists.id
            ),
          })
        }
      }
      if (name == 'admin') {
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
          throw new ApolloError(
            'Your organization is not approved yet',
            'UserInputError'
          )
        }
      }

      if (organization) {
        const token = jwt.sign({ name: organization.name }, SECRET, {
          expiresIn: '336h',
        })
        const data = {
          token: token,
          organization: organization.toJSON(),
        }
        return data
      } else {
        throw new ApolloError(
          `We do not recognize this organization ${name}`,
          'UserInputError'
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
          throw new ApolloError(
            `Organization name '${name}' already taken`,
            'UserInputError'
          )
        }

        // Validate email format
        const emailExpression = EmailPattern
        const isValidEmail = emailExpression.test(String(email).toLowerCase())
        if (!isValidEmail) {
          throw new ApolloError('Invalid email format', 'ValidationError')
        }

        const existingUser = await User.findOne({
          email,
          role: { $ne: 'admin' },
        })
        const admin = await User.findOne({ email, role: 'admin' })
        if (existingUser) {
          throw new ApolloError(
            `User with email '${email}' exists and is not an admin. Please use another email.`,
            'UserInputError'
          )
        }
        if (admin)
          throw new ApolloError(
            `User with ${email} exists.  Please use another email`,
            'UserInputError'
          )

        const password: any = generateRandomPassword()
        let newAdmin: any = undefined
        if (!admin) {
          newAdmin = await User.create({
            email: email,
            password: password,
            role: 'admin',
            organizations: name,
          })

          // Create the organization with 'pending' status
          await Organization.create({
            admin: newAdmin._id,
            name,
            description,
            status: 'pending',
          })

          const superAdmin = await User.find({ role: 'superAdmin' })
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
      ;(await checkUserLoggedIn(context))(['superAdmin'])
      const orgExists = await Organization.findOne({ name: name, email: email })
      if (action == 'approve') {
        if (!orgExists) {
          throw new ApolloError('Organization Not found ', 'UserInputError')
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
      ;(await checkUserLoggedIn(context))(['superAdmin'])
      if (action == 'new') {
        const orgExists = await Organization.findOne({ name: name })
        if (orgExists) {
          throw new ApolloError(
            'Organization Name already taken ' + name,
            'UserInputError'
          )
        }
      }

      // check if the requester is already an admin, if not create him
      const admin = await User.findOne({ email, role: 'admin' })
      // if (!admin) {
      //   console.log('admin exist')
      // }
      const password: any = generateRandomPassword()
      let newAdmin: any = undefined
      // if (!admin) {
      //   newAdmin = await User.create({
      //     email,
      //     password,
      //     role: 'admin',
      //   })
      // }

      let org: any = await Organization.findOne({ admin: admin?._id })

      if (action == 'new') {
        // create the organization
        org = await Organization.create({
          admin: admin ? admin._id : newAdmin?._id,
          name,
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
      ;(await checkUserLoggedIn(context))(['admin', 'superAdmin'])

      const org = await Organization.findOne({ name: name })
      if (!org) {
        throw new ApolloError('Organization Not found', 'UserInputError')
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
      // const { userId } = (await checkUserLoggedIn(context))(['admin','superAdmin']);

      const checkOrg = await Organization.findOne({ name: name })
      if (!checkOrg) {
        throw new ApolloError('Organization Not found', 'UserInputError')
      }

      const allRepos = checkOrg.activeRepos
      if (allRepos.includes(repoUrl)) {
        throw new ApolloError('Repository Already Exists', 'UserInputError')
      }

      checkOrg.activeRepos.push(repoUrl)
      await checkOrg.save()

      return {
        admin: checkOrg.admin,
        name: checkOrg.name,
        description: checkOrg.description,
        status: checkOrg.status,
      }
    },

    async deleteActiveRepostoOrganization(_: any, { name, repoUrl }: any) {
      // const { userId } = (await checkUserLoggedIn(context))(['admin','superAdmin']);

      const org = await Organization.findOne({ name: name })
      if (!org) {
        throw new ApolloError('Organization Not found', 'UserInputError')
      }

      const allRepos = org.activeRepos
      if (!allRepos.includes(repoUrl)) {
        throw new ApolloError('Repository Not Found', 'UserInputError')
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
      ;(await checkUserLoggedIn(context))(['admin', 'superAdmin'])

      const organizationExists = await Organization.findOne({ _id: id })

      if (!organizationExists)
        throw new Error("This Organization doesn't exist")
      await Cohort.deleteMany({ organization: id })
      await Team.deleteMany({ organization: id })
      await Phase.deleteMany({ organization: id })
      await User.deleteMany({
        organizations: organizationExists.name,
        role: { $ne: 'superAdmin' },
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
        const token: any = jwt.sign({ email }, SECRET, {
          expiresIn: '2d',
        })
        const newToken: any = token.replaceAll('.', '*')
        const link = `${process.env.FRONTEND_LINK}/forgot-password/${newToken}`
        const content = forgotPasswordTemplate(link)
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
