import nodemailer from 'nodemailer';

export const createTransporter = () => {
  // Create reusable transporter using SMTP options
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.ADMIN_EMAIL as string,
      pass: process.env.ADMIN_PASS as string,
    },
    debug: true, // Enable debugging for Nodemailer
  });

  // Verify the transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP configuration error:', error);
    } else {
      console.log('Server is ready to send emails:', success);
    }
  });

  return transporter;
};

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

const sendEmaile = async (options: SendEmailOptions) => {
  try {
    // Use previously created transporter
    const transporter = createTransporter();

    // Send email
    const info = await transporter.sendMail({
      from: `"Andela" <${process.env.ADMIN_EMAIL}>`, // Set a friendly "from" name
      to: options.to,
      subject: options.subject,
      text: options.text,
    });

    console.log('Email sent:', info);

    return info;
  } catch (error) {
    console.error('Error sending email:', error); // Log the error message
    throw new Error('Failed to send email');
  }
};

export default sendEmaile;
