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
const SECRET: string = process.env.SECRET ?? 'test_secret'
export default async function sendInvitationEmail(
  email: string,
  orgName: string,
  webLink: string,
  mobileLink: string,
  updateInvitation = false
) {
  try {
    const content = updateInvitation
      ? updateInvitationTemplate(orgName || '', webLink, mobileLink)
      : inviteUserTemplate(orgName || '', webLink, mobileLink)

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
