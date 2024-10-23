import { GraphQLError } from 'graphql'
import 'dotenv/config'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'
import requestIp from 'request-ip'

const SECRET = process.env.SECRET

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
    const data = jwt.verify(token, SECRET as string)
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
  clientIpAdress?: string
}

export const context = async ({ req }: { req: Request }): Promise<Context> => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null

  //get Ip
  const clientIpAdress = requestIp.getClientIp(req) || undefined
  if (
    !token &&
    !req.body.variables.organisationInput &&
    !req.body.variables.loginInput
  ) {
    return { clientIpAdress }
  } else {
    return {
      userId: token?.userId,
      role: token?.role,
      clientIpAdress,
    }
  }
}
