import { Request } from 'express'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

const SECRET = process.env.SECRET || 'test_secret'
export interface AuthTokenPayload {
  userId: string;
  role: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
    const token = authHeader.replace('Bearer ', '')
    if (!token) {
        throw new Error('No token was found')
    }
    try {
        const data = jwt.verify(token, SECRET)
        return data as AuthTokenPayload
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export interface Context {
  userId?: string;
  role?: string;
}

export const context = ({ req }: { req: Request }): Context => {
    const token =
    req && req.headers.authorization
        ? decodeAuthHeader(req.headers.authorization)
        : null

    return {
        userId: token?.userId,
        role: token?.role,
    }
}
