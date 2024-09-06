import { sendEmail } from '../utils/sendEmail';
import inviteUserTemplate from '../utils/templates/inviteUserTemplate';
import { Role } from '../resolvers/invitation.resolvers';
import  jwt  from 'jsonwebtoken';

interface Payload{
  role:Role,
  org:{name:string},
  userId:string,
  orgToken:string
}
const SECRET: string = process.env.SECRET ?? 'test_secret'
export default async function sendInvitationEmail(
  email: string,
  payLoad:Payload
) {
  try {
    // Create a token for the invitation
    const token = jwt.sign(
      {
        name:payLoad.org.name,
        email,
        role:payLoad.role,
      },
      SECRET,
      { expiresIn: '2d' }
    );
  
    const newToken = token.replace(/\./g, '*');
    const link = `${process.env.REGISTER_FRONTEND_URL}/${newToken}`;
    const content = inviteUserTemplate(payLoad.org?.name || '', link);
  
    // Send invitation email
    await sendEmail(
      email,
      'Invitation',
      content,
      null,
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASS
    );

    return { success: true, email };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, email, error: error.message };
    } else {
      return { success: false, email, error: 'Unknown error' };
    }
  }
}
  