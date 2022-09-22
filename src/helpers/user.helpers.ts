import { AuthenticationError } from 'apollo-server'
import { User } from '../models/user'
import { Context } from './../context'

export async function checkUserLoggedIn(context: Context): Promise<(a: Array<string>) => Context> {
    const { userId, role } = context

    if (!userId) {
        throw new AuthenticationError('You are not logged in!!')
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new AuthenticationError('User with this token no longer exist!!')
    }

    return (inputRole: Array<string> = ['admin']) => {
        if (!inputRole.includes(role as string)) {
            throw new AuthenticationError(`Request ${inputRole.join(' or ')} permission!!`)
        }

        return { userId, role }
    }
}

