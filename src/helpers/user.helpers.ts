import { ValidationError } from 'apollo-server'
import { User } from '../models/user'
import { Context } from './../context'

export async function checkUserLoggedIn(context: Context): Promise<(a?: Array<string>) => Context> {
    const { userId, role } = context

    if (!userId) {
        throw new ValidationError('You are not logged in!!')
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ValidationError('User with this token no longer exist!!')
    }

    return (inputRoles: Array<string> = ['admin']) => {
        if (inputRoles && !inputRoles.includes(role as string)) {
            throw new ValidationError(`Request ${inputRoles.join(' or ')} permission!!`)
        }

        return { userId, role }
    }
}

