import { GraphQLUpload } from 'graphql-upload-ts'
import { GraphQLError } from 'graphql'
import { Invitation } from '../models/invitation.model'
import { IResolvers } from '@graphql-tools/utils'
import { checkUserLoggedIn } from '../helpers/user.helpers'
import { checkLoggedInOrganization } from '../helpers/organization.helper'
import { sendEmail } from '../utils/sendEmail'
import { User } from '../models/user'
import sendInvitationEmail from '../helpers/sendInvitaitonEmail'
import sendCancelInvitationEmail from '../helpers/cancelInvitationEmail'
import jwt from 'jsonwebtoken'
import inviteUserTemplate from '../utils/templates/inviteUserTemplate'
import { extractFileData } from '../utils/extractFileData'
import generateInvitationTokenAndLink from '../helpers/generateInvitationToken.helper'

const SECRET: string = process.env.SECRET ?? 'test_secret'

const ROLE = {
  TRAINEE: 'trainee',
  ADMIN: 'admin',
  TTL: 'ttl',
  COORDINATOR: 'coordinator',
} as const
export type Role = typeof ROLE[keyof typeof ROLE]

const invitationResolvers: IResolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    sendInvitation: async (
      _,
      {
        invitees,
        orgToken,
        orgName,
      }: {
        invitees: { email: string; role: string }[]
        orgName: string
        orgToken: string
      },
      context
    ) => {
      try {
        const { userId } = (await checkUserLoggedIn(context))(['admin'])
        if (!userId) {
          throw new GraphQLError('User is not logged in', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          })
        }

        const org = await checkLoggedInOrganization(orgToken)
        if (!org) {
          throw new GraphQLError('Invalid organization token', {
            extensions: {
              code: 'FORBIDDEN',
            },
          })
        }
        const email = invitees.map((invitee) => invitee?.email)[0]
        const role = invitees.map((invitee) => invitee?.role)[0] as Role
        const userExists: any = await User.findOne({ email })

        if (userExists) {
          throw new Error(`This user already exists in ${org.name}`)
        } else {
          const newInvitation = new Invitation({
            inviterId: userId.toString(),
            invitees: invitees.map((invitee) => ({
              email: invitee.email,
              role: invitee.role,
            })),
            orgToken,
            orgName,
          })

          const { newToken, webLink, mobileLink } =
            await generateInvitationTokenAndLink(email, role, org.name)
          newInvitation.invitationToken = newToken
          const result = await sendInvitationEmail(
            email,
            org.name,
            webLink,
            mobileLink
          )

          if (result.success) {
            await newInvitation.save()
            return newInvitation
          }
        }
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        })
      }
    },
    cancelInvitation: async (
      _,
      { id, orgToken }: { id: string; orgToken: string },
      context
    ) => {
      try {
        const { userId } = (await checkUserLoggedIn(context))(['admin'])
        if (!userId) {
          throw new GraphQLError('User is not logged in', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          })
        }

        const org = await checkLoggedInOrganization(orgToken)
        if (!org) {
          throw new GraphQLError('Invalid organization token', {
            extensions: {
              code: 'FORBIDDEN',
            },
          })
        }

        const invitation = await Invitation.findById(id)
        if (!invitation) {
          throw new GraphQLError('Invitation not found', {
            extensions: {
              code: 'NOT_FOUND',
            },
          })
        }

        if (invitation.inviterId.toString() !== userId.toString()) {
          throw new GraphQLError(
            'You are not authorized to cancel this invitation',
            {
              extensions: {
                code: 'FORBIDDEN',
              },
            }
          )
        }

        if (invitation.status === 'cancelled') {
          throw new GraphQLError('Invitation already cancelled', {
            extensions: {
              code: 'BAD_REQUEST',
            },
          })
        }

        invitation.status = 'cancelled'
        await invitation.save()

        const email = invitation.invitees[0].email as string
        const orgName = org.name
        const result = await sendCancelInvitationEmail(email, orgName)

        if (result.success) {
          await invitation.save()
          return invitation
        }
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        })
      }
    },

    async uploadInvitationFile(
      _: any,
      {
        file,
        orgName,
        orgToken,
      }: { file: any; orgName: string; orgToken: string },
      context: any
    ) {
      const { userId } = (await checkUserLoggedIn(context))(['admin'])
      if (!userId) {
        throw new GraphQLError('User is not logged in', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      const org = await checkLoggedInOrganization(orgToken)
      if (!org) {
        throw new GraphQLError('Invalid organization token', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const { invitees, invalidRows, filename } = await extractFileData(file)

      if (invitees.length === 0) {
        throw new GraphQLError('No valid invitees found in the file.')
      }

      const existingUsers = await User.find({
        email: { $in: invitees.map((invitee) => invitee.email) },
      })
      const existingEmails = existingUsers.map((user) => user.email)

      // Separate valid invitees from already registered ones
      const validInvitees = invitees.filter(
        (invitee) => !existingEmails.includes(invitee.email)
      )

      if (validInvitees.length === 0) {
        throw new GraphQLError('No valid invitees found in the file.')
      }
      let sentEmails = 0
      const results = await Promise.all(
        validInvitees.map(async (invitee) => {
          const { email, role } = invitee
          const newInvitation = new Invitation({
            inviterId: userId.toString(),
            invitees: [{ email, role }],
            orgName,
            orgToken,
          })

          const { newToken, webLink, mobileLink } =
            await generateInvitationTokenAndLink(email, role, org.name)
          newInvitation.invitationToken = newToken
          const result = await sendInvitationEmail(
            email,
            org.name,
            webLink,
            mobileLink
          )

          if (result.success) {
            await newInvitation.save()
            sentEmails++
          }
          return result
        })
      )

      return {
        filename,
        data: results,
        invalidRows,
        sentEmails,
        message: `Invitations sent to ${sentEmails} invitees`,
      }
    },

    async updateInvitation(
      _: any,
      {
        orgToken,
        invitationId,
        newEmail,
        newRole,
      }: {
        orgToken: string
        invitationId: string
        newEmail?: string
        newRole?: string
      },
      context: any
    ) {
      try {
        const { userId } = (await checkUserLoggedIn(context))(['admin'])
        if (!userId) {
          throw new GraphQLError('User is not logged in', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          })
        }

        const org = await checkLoggedInOrganization(orgToken)
        if (!org) {
          throw new GraphQLError('Invalid organization token', {
            extensions: {
              code: 'FORBIDDEN',
            },
          })
        }

        const invitation = await Invitation.findById(invitationId)
        if (!invitation) {
          throw new GraphQLError('Invitation not found')
        }

        if (invitation.inviterId.toString() !== userId.toString()) {
          throw new GraphQLError(
            'You are not authorized to delete this invitation',
            {
              extensions: {
                code: 'FORBIDDEN',
              },
            }
          )
        }

        const userExists: any = await User.findOne({
          email: invitation.invitees[0].email,
        })

        if (userExists || invitation.status !== 'pending') {
          throw new Error('This invitation has already received a response.')
        }

        const email = newEmail || invitation.invitees[0]?.email
        const role = newRole || invitation.invitees[0]?.role

        invitation.invitees[0] = { email, role }

        if (email) {
          const { newToken, webLink, mobileLink } =
            await generateInvitationTokenAndLink(email, role, org.name)
          invitation.invitationToken = newToken
          await sendInvitationEmail(email, org.name, webLink, mobileLink, true)
        }

        await invitation.save()
        return invitation
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        })
      }
    },

    async deleteInvitation(
      _: any,
      { invitationId }: { invitationId: string },
      context: any
    ) {
      const { userId } = (await checkUserLoggedIn(context))(['admin'])
      if (!userId) {
        throw new GraphQLError('User is not logged in', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      const invitation = await Invitation.findById(invitationId)

      if (!invitation) {
        throw new GraphQLError('Invitation not found', {
          extensions: {
            code: 'NOT_FOUND',
          },
        })
      }

      if (invitation.inviterId.toString() !== userId.toString()) {
        throw new GraphQLError(
          'You are not authorized to delete this invitation',
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        )
      }

      await Invitation.findByIdAndDelete(invitationId)
      return { message: 'Invitation deleted successfully ' }
    },
  },
}

export default invitationResolvers
