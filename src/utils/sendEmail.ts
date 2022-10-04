import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailTemplate.helper'

export const sendEmail = async (
    receiver: any,
    subject: any,
    content: any,
    link: any
): Promise<any> => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
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
            address: process.env.EMAIL_USER as string,
        },
    }

    return new Promise((res, rej) => {
        transport.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                console.log(error)
                rej('Unable to send request!!')
            }
            console.log('Message sent: %s', info)
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
            res('')
        })
    })
}
