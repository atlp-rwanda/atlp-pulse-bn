/* eslint-disable prefer-const */
import { Octokit } from '@octokit/rest'
import  { compareSync, hashSync } from 'bcryptjs'
import { GraphQLError } from 'graphql'
// import * as jwt from 'jsonwebtoken'
import { JwtPayload, verify } from 'jsonwebtoken'
import { HydratedDocument } from 'mongoose'
import generateRandomPassword from '../helpers/generateRandomPassword'
import { checkLoggedInOrganization, isPartOfOrganization } from '../helpers/organization.helper'
import {
  checkUserLoggedIn,
  emailExpression,
  generateToken,
  verifyToken,
  isAssignedToAnEntity,
  checkloginAttempts,
  checkUserAccountStatus
} from '../helpers/user.helpers'
import Cohort from '../models/cohort.model'
import { Invitation } from '../models/invitation.model'
import { IOrganization, ORG_STATUS, Organization } from '../models/organization.model'
import { Profile } from '../models/profile.model'
import Program from '../models/program.model'
import Team from '../models/team.model'
import User, { IUser, IUserMethods, RoleOfUser, USER_STATUS_ENUM} from '../models/user'
import { pushNotification } from '../utils/notification/pushNotification'
import { sendEmail } from '../utils/sendEmail'
import forgotPasswordTemplate from '../utils/templates/forgotPasswordTemplate'
import organizationApprovedTemplate from '../utils/templates/organizationApprovedTemplate'
import organizationCreatedTemplate from '../utils/templates/organizationCreatedTemplate'
import organizationRejectedTemplate from '../utils/templates/organizationRejectedTemplate'
import registrationRequest from '../utils/templates/registrationRequestTemplate'
import { Context } from './../context'
import { validateEmail, validatePasswordField, validateStringField, validateURLField } from '../validations'
const octokit = new Octokit({ auth: `${process.env.Org_Repo_Access}` })

const SECRET: string = process.env.SECRET || "secret"
// export type OrganizationType = InstanceType<typeof Organization>
// export type UserType = InstanceType<typeof User>

enum ACTION_ENUM{
  APPROVE='approve',
  REJECT='reject'
}

interface InvitationToken{
  email: string
  role: string
  orgName: string
  userExists: boolean
}

async function logGeoActivity(user: HydratedDocument<IUser, IUserMethods>,org: HydratedDocument<IOrganization>,clientIpAdress?: string) {
  const response = await fetch(`https://ipapi.co/${clientIpAdress}/json/`)
  const geoData = await response.json()
  const profile = await Profile.findOne({user: user._id, orgId: org._id})
  if (!profile) {
    return
  }

  if (geoData.country_code && geoData.city) {
    profile.activity.push({
      country_code: geoData.country_code,
      country_name: geoData.country_name,
      IPv4: clientIpAdress,
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
    console.log('No data found in Geo API')
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
    async getOrganizations(_: any, {orgToken}: {orgToken: string}, context: Context) {
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))([RoleOfUser.SUPER_ADMIN])
      const organizations = await Organization.find()
      return organizations
    },
//     async getUpdatedEmailNotifications(_: any, { id }: any, context: Context) {
//       const user: any = await User.findOne({ _id: id })
//       if (!user) {
//         throw new Error('User not found')
//       }
//       return user.emailNotifications
//     },
//     async getUpdatedPushNotifications(_: any, { id }: any, context: Context) {
//       const user: any = await User.findOne({ _id: id })
//       if (!user) {
//         throw new Error('User not found')
//       }
//       return user.pushNotifications
//     },
    async getOrganization(_: any, { name, orgToken }: {name: string, orgToken: string}, context: Context) {
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))([
        RoleOfUser.SUPER_ADMIN,
      ])

      const organization = await Organization.findOne({ name }).populate('admin')

      if (!organization) {
        throw new GraphQLError('Organization not found',{
          extensions: {
            code: "ORG_NOT_FOUND"
          }
        })
      }
      return organization
    },

    async getCurrentOrganization(_: any, { orgToken }: {orgToken: string}, context: Context) {
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))(Object.values(RoleOfUser))

      return org
    },
//     async verifyResetPasswordToken(_: any, { token }: any) {
//       const { email } = verify(token, SECRET) as JwtPayload
//       const user: any = await User.findOne({ email })
//       if (!user) {
//         throw new Error('Unauthorized to access the page! ')
//       }
//     },

    async gitHubActivity(
      _: any,
      { orgToken}: { orgToken: string},
      context: Context
    ) {
      const org = await checkLoggedInOrganization(orgToken)
      const {user, orgUserData} = (await checkUserLoggedIn(org, context))([
        RoleOfUser.ADMIN,
        RoleOfUser.COORDINATOR,
        RoleOfUser.MANAGER,
        RoleOfUser.TTL,
        RoleOfUser.TRAINEE,
      ])

      await orgUserData.populate('profile')

      const { data: checkOrg } = await octokit.orgs.get({ org: org.gitHubOrganisation || "" })
      if (!checkOrg) {
        throw new GraphQLError('Organization Not found On GitHub', {
          extensions: {
            code: 'ORG_NOT_FOUND',
          },
        })
      }
      const { data: checkUser } = await octokit.users.getByUsername({
        username: (orgUserData.profile as any).githubUsername || "",
      })
      if (!checkUser) {
        throw new GraphQLError('User Not found On Github', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }

      let pullRequestOpen = 0
      let pullRequestClosed = 0
      let pullRequestMerged = 0
      let pullRequestTotal = 0
      try {
        for (const repo of org.activeRepos) {
          const response = await octokit.pulls.list({
            owner: org.gitHubOrganisation || "",
            repo: repo,
            state: 'all',
            sort: 'created',
            direction: 'desc',
            per_page: 200,
          })
          const pullRequests = response.data.filter(
            (pullRequest: any) => pullRequest.user.login === (orgUserData.profile as any).githubUsername
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
        }
      } catch (error) {
        throw new GraphQLError("Error retrieving repository information", {
          extensions: {
            code: "SERVER_ERROR"
          }
        })
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
//   Login: {
//     user: async (parent: any) => {
//       const user = await User.findById(parent.user.id)
//       return user
//     },
  },
  Mutation: {
    async createUser(
      _: any,
      {
        email,
        password,
        verifyPassword,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        orgToken,
      }: {
        email: string,
        password: string,
        verifyPassword: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        gender: string,
        orgToken: string
      }
    ) {
      // checkLoggedInOrganization checks if the organization token passed was valid
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)

      const userExists = await User.findOne({ email: email, organizations: {
        $elemMatch: {
          orgId: org._id
        }
      } })
      if (userExists)
        throw new GraphQLError(`User already exists in ${org.name}`, {
          extensions: {
            code: 'USER_INPUT_ERROR',
          },
      })

      const isValidEmail = emailExpression.test(String(email).toLowerCase())
      if (!isValidEmail)
        throw new GraphQLError('invalid email format', {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        })
      // use regular expression to validate password
      if (password.length < 6)
        throw new GraphQLError('password should be minimum 6 characters', {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
      })
      if (password !== verifyPassword)
        throw new GraphQLError('passwords do not match', {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
      })
      const invitation = await Invitation.findOne({ 'invitees.email': email })
        .sort({ createdAt: -1 })
        .exec()
      if (!invitation) {
        throw new GraphQLError("User was not invitated",{
          extensions: {
            code: 'INVITATION_NOT_FOUND'
          }
        })
      }
      const invitee = invitation.invitees.find((invitee) => invitee.email === email)
      if(!invitee){
        throw new GraphQLError("User is not an invitee",{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        organizations: [
          {
            orgId: org._id,
            role: invitee.role
          }
        ]
      })
      const token = generateToken({
        userId: user._id.toString(),
        role:user.organizations[0].role
      }, 7200)

      if (user && invitation) {
        invitation.status = 'accepted'
        await invitation.save()
      }
      const newProfile = await Profile.create({
        user: user._id,
        orgId: org._id,
      })
      user.organizations[0].profile = newProfile._id
      await user.save()
      return { token, user }
    },

    addUserToOrganization: async(_: any, {invitationToken}: {invitationToken: string})=>{
      const {email, role, orgName, userExists} = verifyToken(invitationToken) as InvitationToken
      if(typeof email !=="string" || !email || typeof role!=="string" || !role || typeof orgName !=="string" || !orgName || typeof userExists !== "boolean"){
        throw new GraphQLError("Invalid token payload",{
          extensions:{
            code: "USER_INPUT_ERROR"
          }
        })
      }
      const user = await User.findOne({
        email
      })
      if(!user){
        throw new GraphQLError("No such user was found",{
          extensions: {
            code: "USER_NOT_FOUND"
          }
        })
      }
      const organization = await Organization.findOne({
        name: orgName
      })
      if(!organization){
        throw new GraphQLError("No such organization was found",{
          extensions: {
            code: "ORG_NOT_FOUND"
          }
        })
      }
      const invitation = await Invitation.findOne({
        invitees: {
          $elemMatch:{
            email: user.email,
            exists: true,
          }
        }
      })
      if(!invitation){
        throw new GraphQLError("No such invitation was found",{
          extensions: {
            code: "INVITATION_NOT_FOUND"
          }
        })
      }
      user.organizations.push({
        orgId: organization._id,
        role: role
      })
      await user.save()
    },

    async updateProfile(_: any, {biography, cover, avatar, githubUsername, resume, orgToken}:
      { 
        biography: string,
        cover: string,
        avatar: string,
        githubUsername: string,
        resume: string,
        orgToken: string
      },
        context: Context)
      {
      validateStringField(biography, "Please enter a valid biography")
      validateURLField(cover, "Please enter a valid cover url")
      validateURLField(avatar, "Please enter a valid avatar url")
      validateStringField(githubUsername, "please enter a valid githubUsername")
      validateURLField(resume, "Please enter a valid resume url")
      const org = await checkLoggedInOrganization(orgToken)
      const {user} = (await checkUserLoggedIn(org, context))(Object.values(RoleOfUser))

      const profile = await Profile.findOneAndUpdate(
        { user: user._id },
        {
          biography,
          cover,
          avatar,
          githubUsername,
          resume,
        },
        {
          upsert: true,
          new: true,
        }
      )

      return profile
    },

    async loginUser(
      _: any,
      { email, password, orgToken }: {email: string, password: string, orgToken: string},
      context: Context
    ) {
      validateEmail(email, "Please enter a valid email address")
      const { clientIpAdress } = context
      // get the organization if someone  logs in
      const org: InstanceType<typeof Organization> =
        await checkLoggedInOrganization(orgToken)
      const user: any = await User.findOne({ email })
      if (!user) {
        throw new GraphQLError(`User ${email} does not exist`, {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        })
      }
      const orgUserData = user.organizations.find((data: any)=>data.orgId.toString()===org._id.toString())
      if(!orgUserData){
        throw new GraphQLError(`User ${user.email} is not part of ${org.name}`,{
            extensions: {
                code: "FORBIDDEN"
            }
        })
      }
      if (orgUserData.status?.status !== 'active') {
        throw new GraphQLError(
          `Your account have been ${
            orgUserData.status?.status
          }, please contact your organization admin for assistance`,
          {
            extensions: {
              code: 'ACCOUNT_INACTIVE',
            },
          }
        )
      }
      await checkloginAttempts(user, org)
      const geoData = await logGeoActivity(user,org,clientIpAdress)

      if(!await user?.checkPass(password)) {
        throw new GraphQLError('Invalid credential', {
            extensions: {
              code: 'UserInputError',
            },
          })
      }

      await isAssignedToAnEntity(user,org)

      return {
        token: generateToken({ userId: user._id, role: orgUserData.role}, 7200),
        user: user.toJSON(),
        geoData,
      }
    },

    async deleteUser(_: any, { userId, reason , orgToken}: {userId: string, reason?: string, orgToken: string}, context: Context) {
      if(reason){
        validateStringField(reason, "Please provide a valid reason")
      }
      const org = await checkLoggedInOrganization(orgToken)
      const {user} = (await checkUserLoggedIn(org,context))([RoleOfUser.ADMIN, RoleOfUser.SUPER_ADMIN])
      if (!user) {
        throw new GraphQLError('Requester does not exist',{
          extensions: {
            code: 'USER_NOT_FOUND'
          }
        })
      }

      const userToSuspend = await User.findById(userId)
      if (!userToSuspend) {
        throw new GraphQLError('User to be suspended does not exist',{
          extensions: {
            code: 'USER_NOT_FOUND'
          }
        })
      }

      const userData = isPartOfOrganization(userToSuspend, org)
      if (userData.status?.status == 'suspended') {
        throw new GraphQLError('User is already suspended',{
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }
      // Handle coordinator suspension
      if (userData.role === RoleOfUser.COORDINATOR) {
        const cohorts = await Cohort.find({ coordinator: userToSuspend._id, organization: org._id })
        for(const cohort of cohorts){
          cohort.coordinator = undefined
          await cohort.save()
          await pushNotification(
            user._id,
            `The coordinator of ${cohort.name} has been suspended. Please assign a new coordinator.`,
            user._id,
            org._id
          )
        }
      }
      // Handle TTL suspension
      else if (userData.role === RoleOfUser.TTL) {
        const hasTeam = await Team.findOne({ ttl: userToSuspend._id, organization: org._id })
        if (hasTeam) {
          hasTeam.ttl = undefined
          await hasTeam.save()
          await pushNotification(
            user._id,
            `The TTL of ${hasTeam.name} has been suspended. Please assign a new TTL.`,
            user._id,
            org._id
          )
        }
      }
      // Suspend user by updating their status
      userData.status={
        status: USER_STATUS_ENUM.SUSPENDED,
        reason: reason ? reason : 'Not specified',
        date: new Date()
      }
      await userToSuspend.save()
      // Send suspension notification to the user
      await pushNotification(
        userToSuspend._id,
        'Your account has been suspended and  will no longer be able to access the system.',
        user._id,
        org._id
      )
      // Send confirmation notification to the requester/admin
      await pushNotification(
        user._id,
        `You have successfully suspended the user with email: ${userToSuspend.email}.`,
        user._id,
        org._id,
      )

      return {
        message: 'User suspended successfully'
      }
    },

    async updateUserRole(_: any, { userId, role, orgToken }: {userId: string, role: RoleOfUser, orgToken: string}, context: Context) {
      const org = await checkLoggedInOrganization(orgToken)
      const { user }= (await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN, RoleOfUser.SUPER_ADMIN])
      if (!Object.values(RoleOfUser).includes(role)) {
        throw new GraphQLError("This role doesn't exist", {
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      const userExists = await User.findById(userId)
      if (!userExists){
        throw new GraphQLError("User doesn't exist",{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }

      if(user._id.toString()===userExists._id.toString()){
        throw new GraphQLError("User cannot edit their own role",{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }

      const userData = isPartOfOrganization(userExists, org)

      if (userData.role == RoleOfUser.COORDINATOR) {
        const cohorts = await Cohort.find({
          coordinator: userExists._id,
          organization: org._id,
        })
        for(const cohort of cohorts){
          cohort.coordinator = undefined
          await cohort.save()
        }
      }
      if (userData.role == RoleOfUser.MANAGER) {
        const userPrograms = await Program.find({ manager: userExists._id, organization: org._id })
        for(const userProgram of userPrograms) {
          userProgram.manager = undefined
          await userProgram.save()
        }
      } 
      if (userData.role == RoleOfUser.TTL) {
        const teamttl = await Team.findOne({ ttl: userExists._id, organization: org._id })
        if (teamttl) {
          teamttl.ttl = undefined
          await teamttl.save()
        }
      } 
      if (userData.role == RoleOfUser.ADMIN) {
        const admins = org.admin.filter(admin=>admin.toString()!==userExists._id.toString())
        org.admin = admins
        await org.save()
      }
      userData.role = role
      userExists.save()
      return userExists
    },

    //This section is to make org name login to be case insensitive
    async loginOrg(_: any, { name }: { name: String }) {
      const organization: any = await Organization.findOne({
        name: { $regex: new RegExp('^' + name + '$', 'i') },
      })
      if (!organization) {
        throw new GraphQLError(
          `We do not recognize this organization ${name}`,
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        )
      }
      if (organization.status == ORG_STATUS.PENDING) {
        throw new GraphQLError('Your organization is not approved yet', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      if (organization.status == ORG_STATUS.REJECTED) {
        throw new GraphQLError('Your organization was not approved', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      const token = generateToken({ name: organization.name }, 7200)
      const data = {
        token: token,
        organization: organization.toJSON(),
      }
      return data
    },

    // end of making org name to be case insensitive

    async requestOrganization(
      _: any,
      { organizationInput: { name, email, description } }: { organizationInput: {name: string, email: string, description: string}}
    ) {

      validateEmail(email, "Please enter a valid email address")
      validateStringField(name, "Please enter a valid organization name")
      validateStringField(description, "Please enter a valid organization description")
        // Check if organization name already exists
        const orgExists = await Organization.findOne({ name })
        if (orgExists) {
          throw new GraphQLError(`Organization name '${name}' already taken`, {
            extensions: {
              code: 'FORBIDDEN',
            },
          })
        }
        // 
        const existingUser = await User.findOne({email})
        if(existingUser){
          throw new GraphQLError(`User ${existingUser.email} already exists, please use another email`,{
            extensions: {
              code: "FORBIDDEN"
            }
          })
        }

        // Create the organization with 'pending' status
        const newOrg =await Organization.create({
          name,
          description,
          status: ORG_STATUS.PENDING,
        })

        //Create admin and assign them to the requested organization
        const password: any = generateRandomPassword()
        const admin = await User.create({
            email: email,
            password: password,
            organizations: [{
              orgId: newOrg._id,
              role: RoleOfUser.ADMIN
            }]
        })

        const profile = await Profile.create({
          orgId: newOrg._id,
          user: admin._id,
        })
        admin.organizations[0].profile = profile._id
        await admin.save()

        // add admin to new organization
        newOrg.admin = [admin._id]
        await newOrg.save()
        await newOrg.populate('admin')

      //add new org to all superAdmins
      const superAdmins = await User.find({
        organizations: {
          $elemMatch: { role: RoleOfUser.SUPER_ADMIN }
        }
      })
      if (!superAdmins.length) {
        throw new GraphQLError("Server Error", {
          extensions: {
            code: "SERVER_ERROR"
          }
        })
      }
      for (const superAdmin of superAdmins) {
        const profile = await Profile.create({
          orgId: newOrg._id,
          user: superAdmin._id,
        })
        superAdmin.organizations.push({
          orgId: newOrg._id,
          role: RoleOfUser.SUPER_ADMIN,
          profile: profile._id
        })
        await superAdmin.save()
      }

      const newOrgToken = generateToken({
        name: newOrg.name,
        admin: newOrg.admin[0],
        description: newOrg.description,
        email: admin.email
      }, 7200)

      // Get the email content
      const link = process.env.FRONTEND_LINK ?? ""
      const content = registrationRequest(email, name, description, link, newOrgToken)

      // Send registration request email to super admin
      for(const superAdmin of superAdmins){
        await sendEmail(
          superAdmin.email,
          'Organization registration request',
          content,
          link,
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )
      }

      return {
        message: 'Organization registration request sent successfully',
        org: newOrg.toJSON()
      }
    },

    async RegisterNewOrganization(
      _: any,
      { name, action , orgToken}: { name: string, action: ACTION_ENUM, orgToken: string},
      context: Context
    ) {
      validateStringField(name, "Please enter a valid organization name")
      const org = await checkLoggedInOrganization(orgToken)
      // check if requester is super admin
      const user = (await checkUserLoggedIn(org, context))([RoleOfUser.SUPER_ADMIN])
      const orgExists = await Organization.findOne({ name: name }).populate('admin')
      if(!orgExists){
        throw new GraphQLError("No such organization found",{
          extensions: {
            code: "ORG_NOT_FOUND"
          }
        })
      }
      if(action === ACTION_ENUM.APPROVE){
        if(orgExists.status === ORG_STATUS.ACTIVE){
          throw new GraphQLError("Organization is already  active",{
            extensions: {
              code: "FORBIDDEN"
            }
          })
        }
        const admin = (orgExists as any).admin[0]
        const password = generateRandomPassword()
        admin.password = hashSync(password, 10)
        await admin.save()
        orgExists.status = ORG_STATUS.ACTIVE
        await orgExists.save()
        await sendEmail(
          admin.email,
          'Organization Approved and created notice',
          organizationApprovedTemplate(
            orgExists.name,
            admin.email,
            password,
          ),
          process.env.FRONTEND_LINK || "link",
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )
      }else if(action === ACTION_ENUM.REJECT){
        if(orgExists.status === ORG_STATUS.REJECTED){
          throw new GraphQLError("Organization was already rejected",{
            extensions: {
              code: "FORBIDDEN"
            }
          })
        }
        const admin = (orgExists as any).admin[0]
        orgExists.status = ORG_STATUS.REJECTED
        await orgExists.save()
        await sendEmail(
          admin.email,
          'Organization Request rejected notice',
          organizationRejectedTemplate(orgExists.name),
          process.env.FRONTEND_LINK || 'link',
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASS
        )
      }else{
        throw new GraphQLError("Invalid action, Please approve or reject an organization",{
          extensions: {
            code: "USER_INPUT_ERROR"
          }
        })
      }
      return orgExists.toJSON()
    },

    async addOrganization(
      _: any,
      { organizationInput: { name, email, description }, orgToken }: {organizationInput: { name: string, email: string, description: string}, orgToken: string},
      context: Context
    ) {
      validateEmail(email, "Please enter a valid email address")
      validateStringField(name, "Please enter a valid organization name")
      validateStringField(description, "Please enter a valid organization description")

      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))([RoleOfUser.SUPER_ADMIN])
      const orgExists = await Organization.findOne({ name: name })
      if (orgExists) {
        throw new GraphQLError(`Organization Name ${orgExists.name} already taken`, {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }
      const newOrg = await Organization.create({
        name,
        description,
        status: ORG_STATUS.ACTIVE
      })
      const userExists = await User.findOne({email})
      if (userExists) {
        const userExistsProfile = await Profile.create({
          user: userExists._id,
          org: newOrg._id,
        })
        userExists.organizations.push({
          orgId: org._id,
          role: RoleOfUser.ADMIN,
          profile: userExistsProfile._id,
        })
        await userExists.save()
        return newOrg.toJSON()
      }
      const password: string = generateRandomPassword()

      const admin = await User.create({
        email,
        password: password,
        organizations: [{
          orgId: newOrg._id,
          role: RoleOfUser.ADMIN
        }]
      })
      const profile = await Profile.create({
        user: admin._id,
        orgId: newOrg._id
      })

      admin.organizations[0].profile = profile._id
      await admin.save()
      newOrg.admin = [admin._id]
      await newOrg.save()
      await newOrg.populate('admin')

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

      return org.toJSON()
    },

    async updateGithubOrganisation(
      _: any,
      { gitHubOrganisation, orgToken }: { gitHubOrganisation: string, orgToken: string},
      context: Context
    ) {
      validateStringField(gitHubOrganisation, "Please enter a valid organization githubOrganization")
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))([
        RoleOfUser.ADMIN,
        RoleOfUser.SUPER_ADMIN,
      ])
      org.gitHubOrganisation = gitHubOrganisation
      await org.save()
      await org.populate('admin')
      return org.toJSON()
    },

    async addActiveRepostoOrganization(_: any, { repoUrl, orgToken}: {repoUrl: string, orgToken: string}, context: Context) {
      validateURLField(repoUrl, "Please provide a valid repoUrl")
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))([RoleOfUser.ADMIN, RoleOfUser.SUPER_ADMIN])

      const allRepos = org.activeRepos
      if (allRepos.includes(repoUrl)) {
        throw new GraphQLError('Repository Already Exists', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      org.activeRepos.push(repoUrl)
      await org.save()

      return org.toJSON()
    },

    async deleteActiveRepostoOrganization(_: any, { repoUrl, orgToken}: {repoUrl: string, orgToken: string}, context: Context) {
      validateURLField(repoUrl, "Please provide a valid repo URL")
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org,context))([RoleOfUser.ADMIN,RoleOfUser.SUPER_ADMIN]);

      const allRepos = org.activeRepos
      if (!allRepos.includes(repoUrl)) {
        throw new GraphQLError('Repository Not Found', {
          extensions: {
            code: 'REPO_NOT_FOUND',
          },
        })
      }

      const index = allRepos.indexOf(repoUrl)
      allRepos.splice(index, 1)

      await org.save()

      return org.toJSON()
    },

    async deleteOrganization(_: any, { orgId, orgToken }: {orgId: string, orgToken: string}, context: Context) {
      const org = await checkLoggedInOrganization(orgToken)
      ;(await checkUserLoggedIn(org, context))([
        RoleOfUser.SUPER_ADMIN,
      ])
      const organizationExists = await Organization.findById(orgId)
      if (!organizationExists){
        throw new GraphQLError("This Organization doesn't exist",{
          extensions: {
            code: "ORG_NOT_FOUND"
          }
        })
      }
      organizationExists.isDeleted = true
      await organizationExists.save()
      return organizationExists.toJSON()
    },

    async forgotPassword(_: any, { email }: { email: string }) {
      validateEmail(email, "Please provide a valid email")
      const userExists: any = await User.findOne({ email })
      if (!userExists) {
        throw new GraphQLError("No such user found",{
          extensions: {
            code: "USER_NOT_FOUND"
          }
        })
      }
        const token: any = generateToken({ email }, 7200)
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

        return {
          message: 'Check Your Email To Proceed!'
        }
    },

    async updateEmailNotifications(_: any, { orgToken }: { orgToken: string}, context: Context) {
      const org =  await checkLoggedInOrganization(orgToken)
      const { user, orgUserData } = (await checkUserLoggedIn(org, context))(Object.values(RoleOfUser))
      orgUserData.emailNotifications = !orgUserData.emailNotifications
      await user.save()
      
      return {
        message: 'updated successfully'
      }
    },

    async updatePushNotifications(_: any, { orgToken}: {orgToken: string}, context: Context) {
      const org =  await checkLoggedInOrganization(orgToken)
      const { user, orgUserData } = (await checkUserLoggedIn(org, context))(Object.values(RoleOfUser))
      orgUserData.pushNotifications = !orgUserData.pushNotifications
      await user.save()
      return {
        message: 'updated successfully'
      }
    },

    async resetUserPassword(
      _: any,
      { password, confirmPassword, resetToken }: { password: string, confirmPassword: string, resetToken: string}
    ) {
      validatePasswordField(password, "Please enter a valid new password")
      validatePasswordField(confirmPassword, "Please enter a valid confirmation password")
      const { email } = verify(resetToken, SECRET) as JwtPayload
      if (password !== confirmPassword) {
        throw new GraphQLError("Passwords do not match",{
          extensions: {
            code: "USER_INPUT_ERROR"
          }
        })
      }
        const user = await User.findOne({ email })
        if (!user) {
          throw new GraphQLError("User doesn't exist! ",{
            extensions: {
              code: "USER_NOT_FOUND"
            }
          })
        }
        user.password = password
        await user.save()

        return {
          message: 'Your password was reset successfully! '
        }
    },
    async changeUserPassword(
      _: any,
      { currentPassword, newPassword, confirmPassword, orgToken }: { currentPassword: string, newPassword: string, confirmPassword: string, orgToken: string},
      context: Context
    ) {
      validatePasswordField(currentPassword, "Please enter a valid current password")
      validatePasswordField(newPassword, "Please enter a valid new password")
      validatePasswordField(confirmPassword, "Please enter a valid confirmation password")
      const org = await checkLoggedInOrganization(orgToken)
      const { user } = (await checkUserLoggedIn(org, context))(Object.values(RoleOfUser))
      if (newPassword !== confirmPassword) {
        throw new GraphQLError("Passwords do not match",{
          extensions: {
            code: "USER_INPUT_ERROR"
          }
        })
      }

      if (!compareSync(currentPassword, user.password)) {
        throw new GraphQLError("Incorrect credentials", {
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      user.password = newPassword
      await user.save()
      return {
        message: 'Your password was reset successfully! '
      }
    }
    },
  }

//   User: {
//     async profile(parent: any) {
//       const profile = await Profile.findOne({ user: parent.id.toString() })
//       if (!profile) {
//         return null
//       } else {
//         return profile
//       }
//     },
//     async program(parent: any) {
//       const program = await Program.findOne({ manager: parent.id.toString() })
//       if (!program) {
//         return null
//       } else {
//         return program
//       }
//     },
//     async cohort(parent: any) {
//       const cohort = await Cohort.findById(parent.cohort.toString())

//       if (!cohort) {
//         return null
//       } else {
//         return cohort
//       }
//     },
//     async team(parent: UserType) {
//       const team = await Team.findOne({ members: parent._id })
//       if (!team) {
//         return null
//       } else {
//         return team
//       }
//     },
//     async ratings(parent: UserType) {
//       const ratings = await Rating.find({ user: parent._id }).populate([
//         'user',
//         'cohort',
//         {
//           path: 'feedbacks',
//           populate: 'sender',
//         },
//       ])
//       if (!ratings) {
//         return null
//       } else {
//         return ratings
//       }
//     },
//   },
//   Profile: {
//     async user(parent: any) {
//       const user = await User.findOne({ _id: parent.user.toString() })
//       if (!user) return null
//       return user
//     },
//   },
//   Organization: {
//     async admin(parent: any) {
//       return User.findById(parent.admin)
//     },
//  },
//}
export default resolvers
