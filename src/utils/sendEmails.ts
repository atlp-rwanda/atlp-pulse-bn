import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailForTrainee.helper'
 
const mode = process.env.NODE_ENV  || 'development'

export const sendEmails = async( senderEmail:any, senderPassword:any, receiver: any, subject: any, content: any, title:any) => {
    const transportOptions: any = {
        production:{
            host:'mail.privateemail.com',
            port: 587,
            secure: false,
            auth: {
                user:senderEmail,
                pass:senderPassword,
            },
            tls: {
                rejectUnauthorized: false,
            },
        },
        development:{
            host:'mail.privateemail.com',
            port:587,
            secure: false, // use SSL
            requireTLS: true,
            auth:{
                user:senderEmail,
                pass:senderPassword
            },
        },
    }
    
    const transport =nodemailer.createTransport(transportOptions[mode] || transportOptions.development)

    const mailOptions = {
        from:senderEmail,
        to:receiver,
        subject:subject,
        html: generateTemplate(content,title),
    }
  
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
        
}