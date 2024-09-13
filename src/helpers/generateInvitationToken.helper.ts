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
  const link = `${process.env.REGISTER_FRONTEND_URL}/${newToken}`;

  return { newToken, link };
}
