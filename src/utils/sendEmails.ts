import nodemailer from 'nodemailer'
import generateTemplate from '../helpers/emailForTrainee.helper'
 
const mode = process.env.NODE_ENV  || 'development'

<<<<<<< HEAD
export const sendEmail = async(receiver: any, subject: any, content: any) => {
    const testAccount = await nodemailer.createTestAccount()
    const transportOptions: any = {
        production:{
            host:'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
=======
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
>>>>>>> develop
            },
            tls: {
                rejectUnauthorized: false,
            },
        },
        development:{
<<<<<<< HEAD
            host:'smtp.ethereal.email',
            port:587,
            secure:false,
            auth:{
                user:testAccount.user,
                pass:testAccount.pass
=======
            host:'mail.privateemail.com',
            port:587,
            secure: false, // use SSL
            requireTLS: true,
            auth:{
                user:senderEmail,
                pass:senderPassword
>>>>>>> develop
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
  
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
        
}

