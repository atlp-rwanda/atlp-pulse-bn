import { sendEmail } from '../utils/sendEmail'
import contactFormTemplate from '../utils/templates/contactFormTemplate'

export const sendMessage = async (
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<string> => {
  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required!');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const subject = 'DevPulse New Contact Us Form Submission';
  const content = contactFormTemplate({ name, email, phone, message });

  const senderEmail = process.env.ADMIN_EMAIL;
  const senderPassword = process.env.ADMIN_PASS;

  try {
    const response = await sendEmail(
      adminEmail,
      subject,
      content,
      '',
      senderEmail,
      senderPassword
    );
    return 'Message sent successfully!';
  } catch (error) {
    throw new Error('Error sending message');
  }
};