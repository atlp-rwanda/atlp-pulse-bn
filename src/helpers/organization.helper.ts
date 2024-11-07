import { GraphQLError } from 'graphql'
import 'dotenv/config'
import { JwtPayload, verify } from 'jsonwebtoken'
import { IOrganization, Organization } from '../models/organization.model'
import { IOrgUserData, IUser, IUserMethods} from '../models/user'
import { HydratedDocument } from 'mongoose'

export async function checkLoggedInOrganization(token?: string) {
  const SECRET = process.env.SECRET as string

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

    if(org.isDeleted){
      throw new GraphQLError(`Organization named ${name} was deleted`, {
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

export function isPartOfOrganization(user: HydratedDocument<IUser, IUserMethods>, org: HydratedDocument<IOrganization>): HydratedDocument<IOrgUserData>{
  const orgUserData = user.organizations.find(data=>data.orgId.toString()===org._id.toString())
  if(!orgUserData){
    throw new GraphQLError(`User ${user.email} is not part of ${org.name}`,{
      extensions: {
        code: "FORBIDDEN"
      }
    })
  }
  return orgUserData
}
