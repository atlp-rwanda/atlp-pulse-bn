import { AuthenticationError } from 'apollo-server-core';
import 'dotenv/config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Organization } from '../models/user';

export async function checkLoggedInOrganization(token?: string) {
  const SECRET = process.env.SECRET || 'test_secret';

  if (!token) {
    throw new AuthenticationError('Not logged in an organization');
  }

  try {
    const { name } = verify(token, SECRET) as JwtPayload;

    const org = await Organization.findOne({ name });

    if (!org) {
      throw new AuthenticationError(`No organization with name ${name} exists`);
    }

    return org;
  } catch (error:any) {
    if(error.message === 'invalid signature'){
      throw new AuthenticationError('Invalid organization token');
    }else if(error.message === 'jwt expired'){
      throw new AuthenticationError('expired organization token');
    }else {
      throw new AuthenticationError('Missing organization token');
    }
  }
}
