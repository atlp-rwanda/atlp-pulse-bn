import jwt from 'jsonwebtoken'

const SECRET: string = process.env.SECRET ?? 'test_secret'

export default async function generateInvitationTokenAndLink(
  email: string,
  role: string,
  orgName: string
): Promise<{ newToken: string; webLink: string; mobileLink: string }> {
  // Generate the JWT token
  const token = jwt.sign(
    {
      name: orgName,
      email,
      role,
    },
    SECRET,
    { expiresIn: '2d' }
  )

  const newToken = token.replace(/\./g, '*')

  // Generate the web invitation link
  const mobileLink = `${process.env.REGISTER_FRONTEND_URL}/redirect?token=${newToken}&dest=app&path=/auth/register&fallback=/register/${newToken}`

  // Generate the mobile invitation link
  const webLink = `${process.env.REGISTER_FRONTEND_URL}/register/${newToken}`

  // Return both links and the token
  return { newToken, webLink, mobileLink }
}
