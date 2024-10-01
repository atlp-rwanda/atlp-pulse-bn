import { sendEmail } from '../utils/sendEmail'
import cancelInvitationTemplate from '../utils/templates/cancelInvitationTemplate'

export default async function sendCancelInvitationEmail(
  email: string,
  orgName: string
) {
  try {
    const content = cancelInvitationTemplate(orgName)
    await sendEmail(
      email,
      'Invitation Cancelled',
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
