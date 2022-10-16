import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailForTrainee.helper'
 
const mode = process.env.NODE_ENV  || 'development'

export const sendEmail = async( senderEmail:any, senderPassword:any, receiver: any, subject: any, content: any) => {
    const testAccount = await nodemailer.createTestAccount()
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
    
    // transportOptions.development = transportOptions.test
    const transport =nodemailer.createTransport(transportOptions[mode] || transportOptions.development)

    const mailOptions = {
        from:process.env.SENDER_EMAIL,
        to:receiver,
        subject:subject,
        html: generateTemplate(),
    }
  
    
        
}

