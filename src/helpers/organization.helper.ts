import { AuthenticationError } from 'apollo-server-core'
import 'dotenv/config'
import { JwtPayload, verify } from 'jsonwebtoken'
import { Organization } from '../models/user'

export async function checkLoggedInOrganization(token?: string) {
    const SECRET = process.env.SECRET || 'test_secret'

    if (!token) {
        throw new AuthenticationError('Not logged in an organization')
    }

    try {
        const { name } = verify(token, SECRET) as JwtPayload

        const org = await Organization.findOne({ name })

        if (!org) {
            throw new AuthenticationError(`No organization with name ${name} exists`)
        }

        return org
    } catch (error) {
        throw new AuthenticationError('Missing or expired organization token')
    }
}

