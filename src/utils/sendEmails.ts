import nodemailer from 'nodemailer'
<<<<<<< HEAD
import ejs from 'ejs'
=======
import generateTemplate from '../helpers/emailForTrainee.helper'
>>>>>>> 0cc7ed92f7994bfc56f9be4da186025d3539233f
 
const mode = process.env.NODE_ENV  || 'development'

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
            },
            tls: {
                rejectUnauthorized: false,
            },
        },
        development:{
            host:'smtp.ethereal.email',
            port:587,
            secure:false,
            auth:{
                user:testAccount.user,
                pass:testAccount.pass
            },
        },
    }
    
    // transportOptions.development = transportOptions.test
    const transport =nodemailer.createTransport(transportOptions[mode] || transportOptions.development)
<<<<<<< HEAD
    ejs.renderFile(__dirname + '/templates/emailTemplate.ejs', { receiver, content }, (err: any, data: any) => {
        if (err) {
            console.log(err)
        } else {
            const mailOptions = {
                from:process.env.SENDER_EMAIL,
                to:receiver,
                subject:subject,
                html:data
            }
  
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error)
                }
                console.log('Message sent: %s', info)
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
            })
        }
    })
=======

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
        
>>>>>>> 0cc7ed92f7994bfc56f9be4da186025d3539233f
}

