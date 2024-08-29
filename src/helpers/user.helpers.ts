import { GraphQLError } from 'graphql'
import { User } from '../models/user'
import { Context } from './../context'

export async function checkUserLoggedIn(
  context: Context
): Promise<(a?: Array<string>) => Context> {
  const { userId, role } = context

  if (!userId) {
    throw new GraphQLError('You are not logged in!!', {
      extensions: {
        code: 'VALIDATION_ERROR',
      },
    })
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new GraphQLError('User with this token no longer exist!!', {
      extensions: {
        code: 'VALIDATION_ERROR',
      },
    })
  }

  return (inputRoles: Array<string> = ['admin']) => {
    if (inputRoles && !inputRoles.includes(role as string)) {
      throw new GraphQLError(
        `Request ${inputRoles.join(' or ')} permission!!`,
        {
          extensions: {
            code: 'VALIDATION_ERROR',
          },
        }
      )
    }

    return { userId, role }
  }
}
