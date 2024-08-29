import { GraphQLError } from 'graphql'
import 'dotenv/config'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'

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

  return {
    userId: token?.userId,
    role: token?.role,
  }
}
