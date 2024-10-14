import { GraphQLError } from 'graphql'
import 'dotenv/config'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'
import { checkUserAccountStatus } from './helpers/logintracker'

const SECRET = process.env.SECRET || 'test_secret'

export interface AuthTokenPayload {
  userId: string
  role: string
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    throw new GraphQLError('Missing or expired token', {
      extensions: {
        code: 'JWT_MISSING',
      },
    })
  }
  try {
    const data = jwt.verify(token, SECRET)
    return data as AuthTokenPayload
  } catch (error: any) {
    throw new GraphQLError('Missing or expired token', {
      extensions: {
        code: 'JWT_EXPIRED',
      },
    })
  }
}

export interface Context {
  userId?: string
  role?: string
}

export const context = async ({ req }: { req: Request }): Promise<Context> => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null
  if (
    !token &&
    !req.body.variables.organisationInput &&
    !req.body.variables.organizationInput &&
    !req.body.variables.loginInput &&
    !req.body.variables.orgToken &&
    !req.body.variables.orgInput
  ) {
    throw new GraphQLError('User account does not exist or has been suspended')
  } else {
    if (token?.userId) {
      const accountStatus = await checkUserAccountStatus(token?.userId)
      if (!accountStatus || accountStatus !== 'active') {
        throw new GraphQLError(
          'User account does not exist or has been suspended'
        )
      }
    }

    return {
      userId: token?.userId,
      role: token?.role,
    }
  }
}
