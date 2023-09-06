import nodemailer from 'nodemailer';

export const createTransporter = () => {
  // Create reusable transporter using SMTP options
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
    debug: true, // Enable debugging for Nodemailer
  });

  return transporter;
};

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
  try {
    // Use previously created transporter
    const transporter = createTransporter();

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER as string,
      to: options.to,
      subject: options.subject,
      text: options.text,
    });

    console.log('Email sent:', info);

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for higher-level handling
  }
};
