import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailForTrainee.helper'

const mode = process.env.NODE_ENV || 'development'

export const sendEmails = async (
  senderEmail: any,
  senderPassword: any,
  receiver: any,
  subject: any,
  content: any,
  title: any
) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: receiver,
    subject: subject,
    html: generateTemplate(content, title),
  }

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  })
}
