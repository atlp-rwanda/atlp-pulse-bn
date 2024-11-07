import { GraphQLError } from 'graphql'
import User, { IUser, IUserMethods, IOrgUserData, RoleOfUser } from '../models/user'
import { Context } from './../context'
import * as jwt from 'jsonwebtoken'
import { IOrganization } from '../models/organization.model'
import { HydratedDocument } from 'mongoose'
import Cohort from '../models/cohort.model'
import Program from '../models/program.model'
import { Profile } from '../models/profile.model'
import { sendEmail } from '../utils/sendEmail'
import suspiciousActivityTemplate from '../utils/templates/suspiciousActivityTemplate'

const SECRET: string = process.env.SECRET || "secret"

export const generateToken = (payload: Object, expiresIn: number) => {
  try{
    return jwt.sign(payload, SECRET, { expiresIn })
  }catch(err: any){
    console.log(err)
    throw new GraphQLError("Server error",{
      extensions: {
        code: "SERVER_ERROR"
      }
    })
  }
}

export const verifyToken = (token: string)=>{
  try{
    return jwt.verify(token, SECRET)
  }catch(err: any){
    throw new GraphQLError(err.message,{
      extensions: {
        code: "SERVER_ERROR"
      }
    })
  }
}


export const emailExpression =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export async function checkUserLoggedIn(
  org: HydratedDocument<IOrganization>,
  context: Context
): Promise<(a?: Array<string>) => { user: HydratedDocument<IUser, IUserMethods>, orgUserData: HydratedDocument<IOrgUserData> }> {
  const { userId, role } = context

  if (!userId) {
    throw new GraphQLError('You are not logged in!!', {
      extensions: {
        code: 'VALIDATION_ERROR',
      },
    })
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new GraphQLError('User with this token no longer exist!!', {
      extensions: {
        code: 'VALIDATION_ERROR',
      },
    })
  }

  const orgUserData = user.organizations.find(data=>data.orgId.toString()===org._id.toString())
  if(!orgUserData){
    throw new GraphQLError(`User ${user.email} is not part of ${org.name}`, {
      extensions: {
        CODE: 'FORBIDDEN',
      },
    })
  }

  if (orgUserData.status?.status !== 'active') {
    throw new GraphQLError('User is not active', {
      extensions: {
        CODE: 'USER_NOT_ACTIVE',
      },
    })
  }

  return (inputRoles: Array<string> = [RoleOfUser.ADMIN]) => {
    if (inputRoles && !inputRoles.includes(role as string)) {
      throw new GraphQLError(
        `Request ${inputRoles.join(' or ')} permission!!`,
        {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        }
      )
    }

    return { user, orgUserData }
  }
}

export async function isAssignedToAnEntity(user: HydratedDocument<IUser, IUserMethods>, org: HydratedDocument<IOrganization>) {
  const orgUserData = user.organizations.find(data=>data.orgId.toString()===org._id.toString())
  if(!orgUserData){
    throw new GraphQLError(`User ${user.email} is not part of ${org.name}`,{
      extensions:{
        code: "FORBIDDEN"
      }
    })
  }
  switch(orgUserData.role){
    case RoleOfUser.SUPER_ADMIN:
    case RoleOfUser.ADMIN:
      break
    case RoleOfUser.MANAGER:
      const programs = await Program.find({
        manager: user._id,
        organization: org._id,
      })
      if(!programs.length){
        throw new GraphQLError(`User ${user.email} does not manage any programs`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      break
    case RoleOfUser.COORDINATOR:
      // if(!orgUserData.program){
      //   throw new GraphQLError(`User ${user.email} is not assigned to a program`,{
      //     extensions: {
      //       code: "FORBIDDEN"
      //     }
      //   })
      // }
      const cohorts = await Cohort.find({
        coordinator: user._id,
        organization: org._id,
      })
      if(!cohorts.length){
        throw new GraphQLError(`User ${user.email} does not manage any cohorts`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      break
    case RoleOfUser.TTL:
      if(!orgUserData.program){
        throw new GraphQLError(`User ${user.email} is not assigned to a program`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      if(!orgUserData.cohort){
        throw new GraphQLError(`User ${user.email} is not assigned to a cohort`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      if(!orgUserData.team){
        throw new GraphQLError(`User ${user.email} does not manage any team`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      break
    case RoleOfUser.TRAINEE:
      if(!orgUserData.program){
        throw new GraphQLError(`User ${user.email} is not assigned to a program`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      if(!orgUserData.cohort){
        throw new GraphQLError(`User ${user.email} is not assigned to a cohort`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      if(!orgUserData.team){
        throw new GraphQLError(`User ${user.email} is not assigned to a team`,{
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }
      break
      default:
        throw new GraphQLError("User role is not valid",{
          extensions: {
            code: "FORBIDDEN"
          }
        })
  }
}

export const checkloginAttempts = async (user: HydratedDocument<IUser, IUserMethods>, org: HydratedDocument<IOrganization>) => {
  const orgUserData = user.organizations.find(data=>data.orgId.toString()===org._id.toString())
  if(!orgUserData){
    throw new GraphQLError(`User ${user.email} is not part of ${org.name}`,{
      extensions: {
        code: "FORBIDDEN"
      }
    })
  }
  const profile = await Profile.findOne({
    user: user._id,
    orgId: org._id,
  })
  if(!profile){
    throw new GraphQLError(`User ${user.email} does not have a profile associated with ${org.name}`,{
      extensions: {
        code: "FORBIDDEN"
      }
    })
  }
  const { activity } = profile
  if (activity && activity?.length > 1) {
    const inline = activity[activity.length - 1]
    const recent = Number(inline.failed) + 1 || 0
    if (
      recent >= 3 ||
      inline.country_name != activity[activity.length - 2].country_name
    ) {
      await sendEmail(
        user.email,
        'SUSPICIOUS ACTIVITY DETECTED ON YOUR ACCOUNT',
        suspiciousActivityTemplate(recent, inline.date, inline.country_name, inline.city),
        '',
        process.env.COORDINATOR_EMAIL,
        process.env.COORDINATOR_PASS
      )
    }
    return recent
  }
}

export async function checkUserAccountStatus(user: HydratedDocument<IUser, IUserMethods>, org:HydratedDocument<IOrganization>): Promise<'active' | 'drop' | 'suspended' | any> {
const orgUserData = user.organizations.find(data=> data.orgId.toString()===org._id.toString())
if(!orgUserData){
  throw new GraphQLError(`User ${user.email} is not part of ${org.name}`,{
    extensions:{
      code: "FORBIDDEN"
    }
  })
}
return orgUserData.status?.status
}