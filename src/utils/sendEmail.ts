import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailTemplate.helper'

export const sendEmail = async (
    receiver: any,
    subject: any,
    content: any,
    link: any,
    senderEmail:any, 
    senderPassword:any
): Promise<any> => {
    const transport = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 587,
        secure: false,
        auth: {
            user:senderEmail,
            pass:senderPassword,
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
