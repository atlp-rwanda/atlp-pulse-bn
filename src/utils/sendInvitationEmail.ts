import nodemailer from 'nodemailer';
import generateTemplate from './templates/sendCalendarInvitationTemplate';
export async function sendInvitationEmail(guestEmail: any, eventName: any, start:any, id: any , host:string, timeToStart:any,  timeToEnd:any) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //Define The Email content

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: guestEmail,
    subject: 'Invitation to event',
    html: generateTemplate(eventName, 'you are invited in', start, id, host,timeToStart,timeToEnd   ),
    // text: `You have been invited to the event "${eventName}"`,
  };
  try {
    //Send the email

    const info = await transporter.sendMail(mailOptions);
    console.log('Email Sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
