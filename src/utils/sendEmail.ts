import { ApolloError } from 'apollo-server'
import nodemailer from 'nodemailer'
import { promisify } from 'util'
import generateTemplate from '../helpers/emailTemplate.helper'

export const sendEmail = async (receiver: any, subject: any, content: any): Promise<any> => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRETE,
            user: process.env.FROM_EMAIL,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: process.env.GMAIL_ACCESS_TOKEN,
            expires: 1484314697598,
        },
    })

    const mailOptions = {
        to: receiver,
        subject: subject,
        html: generateTemplate({
            message: content,
            title: subject,
        }),
        from: {
            name: 'Devpulse',
            address: process.env.FROM_EMAIL as string,
        },
    }

    return new Promise((res, rej) => {
        transport.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                rej('Unable to send request!!')
            }
            console.log('Message sent: %s', info)
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
            res('')
        })
    })
}

