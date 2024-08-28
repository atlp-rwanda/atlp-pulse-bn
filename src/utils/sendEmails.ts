import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailTemplate.helper'

export const sendEmails = async (
  senderEmail: any,
  senderPassword: any,
  receiver: any,
  subject: any,
  content: any
) => {
  console.log('1', receiver)
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  })

  const mailOptions = {
    from: {
      name: 'Devpulse',
      address: senderEmail,
    },
    to: receiver,
    subject: subject,
    html: generateTemplate({ message: content }),
  }
  console.log('2', receiver)
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  })
  console.log('3', receiver)
}
