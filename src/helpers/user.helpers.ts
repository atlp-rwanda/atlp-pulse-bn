import { GraphQLError } from 'graphql'
import { RoleOfUser, User } from '../models/user'
import { Context } from './../context'
import * as jwt from 'jsonwebtoken'


const SECRET: string = process.env.SECRET ?? 'test_secret'

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, SECRET, { expiresIn: '2h' })
}
export const generateTokenUserExists = (email: string) => {
  return jwt.sign({ email }, SECRET, { expiresIn: '2d' })
}
export const generateTokenOrganization = (name: string) => {
  return jwt.sign({ name }, SECRET, { expiresIn: '336h' })
}

export const emailExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export async function checkUserLoggedIn(
  context: Context
): Promise<(a?: Array<string>) => Context> {
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

  if(user.status?.status !== "active"){
    throw new GraphQLError("User is not active",{
      extensions: {
        CODE: 'USER_NOT_ACTIVE'
      }
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

    return { userId, role }
  }
}
