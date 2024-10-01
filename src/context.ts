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

// export const context = async ({ req }: { req: Request }): Promise<Context> => {
//   const token =
//     req && req.headers.authorization
//       ? decodeAuthHeader(req.headers.authorization)
//       : null

//   return {
//     userId: token?.userId,
//     role: token?.role,
//   }
// }
// /**
//  *
//  *
export const context = async ({ req }: { req: Request }): Promise<Context> => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null
  if (
    !token &&
    !req.body.variables.organisationInput &&
    !req.body.variables.loginInput
  ) {
    // throw new GraphQLError('User account does not exist or has been deleted');
    return {}
  } else {
    return {
      userId: token?.userId,
      role: token?.role,
    }
  }

  // console.log(req.body.variables);
  //   if (!token && !req.body.variables.organisationInput && !req.body.variables.loginInput) {
  //     throw new GraphQLError('User not authenticated');
  //   }

  // let validToken = token ? decodeAuthHeader(token) : null;

  // if (!validToken?.userId) {
  //   throw new GraphQLError('User not authenticated');
  // }
  // const accountStatus = await checkUserAccountStatus(validToken?.userId);

  // if (!accountStatus) {
  //   throw new GraphQLError('User account does not exist or has been deleted');
  // }

  // return {
  //   userId: validToken.userId,
  //   role: validToken.userId,
  // }
}

//  */
