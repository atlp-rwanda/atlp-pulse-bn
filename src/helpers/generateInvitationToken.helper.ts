import jwt from 'jsonwebtoken';

const SECRET: string = process.env.SECRET ?? 'test_secret'

export default async function generateInvitationTokenAndLink(
  email: string,
  role: string,
  orgName: string
): Promise<{ newToken: string; link: string }> {

  const token = jwt.sign(
    {
      name: orgName,
      email,
      role,
    },
    SECRET,
    { expiresIn: '2d' }
  );

  const newToken = token.replace(/\./g, '*');

  // Generate the invitation link
  const link = `${process.env.REGISTER_FRONTEND_URL}/redirect?token=${newToken}&dest=app&path=/auth/register&fallback=/register/${newToken}`;

  return { newToken, link };
}
