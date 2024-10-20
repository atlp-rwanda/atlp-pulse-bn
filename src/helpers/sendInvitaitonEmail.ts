import { sendEmail } from '../utils/sendEmail'
import inviteUserTemplate from '../utils/templates/inviteUserTemplate'
import updateInvitationTemplate from '../utils/templates/updateInvitationTemplate'
import { Role } from '../resolvers/invitation.resolvers'
import jwt from 'jsonwebtoken'

interface Payload {
  role: Role
  org: { name: string }
  userId: string
  orgToken: string
}

const SECRET: string = process.env.SECRET as string
export default async function sendInvitationEmail(
  email: string,
  orgName: string,
  link: string,
  updateInvitation = false,
  role: string
) {
  try {
    const content = updateInvitation
      ? updateInvitationTemplate(orgName || '', link, role || '')
      : inviteUserTemplate(orgName || '', link, role || '')

    // Send invitation email
    await sendEmail(
      email,
      'Invitation',
      content,
      null,
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASS
    )

    return { success: true, email }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, email, error: error.message }
    } else {
      return { success: false, email, error: 'Unknown error' }
    }
  }
}
