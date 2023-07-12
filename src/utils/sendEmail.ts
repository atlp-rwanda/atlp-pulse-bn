import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailTemplate.helper'
export const sendEmail = async (
  receiver: any,
  subject: any,
  content: any,
  link: any,
  senderEmail: any,
  senderPassword: any
): Promise<any> => {
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
    to: receiver,
    subject: subject,
    html: generateTemplate({
      message: content,
      title: subject,
      link: link,
    }),
    from: {
      name: 'Devpulse',
      address: senderEmail as string,
    },
  }
  return new Promise((res, rej) => {
    transport.sendMail(mailOptions, (error: any) => {
      if (error) rej('Unable to send request!!!')
      res('')
    })
  })
}