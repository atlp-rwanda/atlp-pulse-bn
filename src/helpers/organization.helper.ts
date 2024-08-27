import { GraphQLError } from 'graphql'
import 'dotenv/config'
import { JwtPayload, verify } from 'jsonwebtoken'
import { Organization } from '../models/organization.model'

export async function checkLoggedInOrganization(token?: string) {
  const SECRET = process.env.SECRET || 'test_secret'

  if (!token) {
    throw new GraphQLError('Not logged in an organization', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
      },
    })
  }

  try {
    const { name } = verify(token, SECRET) as JwtPayload

    const org = await Organization.findOne({ name })

    if (!org) {
      throw new GraphQLError(`No organization with name ${name} exists`, {
        extensions: {
          code: 'AUTHENTICATION_ERROR',
        },
      })
    }

    return org
  } catch (error: any) {
    if (error.message === 'invalid signature') {
      throw new GraphQLError('Invalid organization token', {
        extensions: {
          code: 'AUTHENTICATION_ERROR',
        },
      })
    } else if (error.message === 'jwt expired') {
      throw new GraphQLError('Expired organization token', {
        extensions: {
          code: 'ORG_JWT_EXPIRED',
        },
      })
    } else {
      throw new GraphQLError('Missing organization token', {
        extensions: {
          code: 'ORG_JWT_EXPIRED',
        },
      })
    }
  }
}
