import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { oauth2Client } from '../config/auth2Client';

export const sendMail = async (username: string, email: string, token: string) => {
    const accessToken = await oauth2Client.getAccessToken();
    // const html = `<p>Hi <strong>${username}</strong>,</p> 
    // <p>Thank you for registering with <strong>[S & S]</strong>.</p> 
    // <p>Please use the following token to complete your registration:</p> 
    // <p style="font-size: 18px; color: blue;"><strong>Token: ${token} </strong></p> 
    // <p>If you did not request this, please ignore this email.</p> 
    // <p>Best regards,<br>S & S</p>`; //token

    const html = `<p>Hi <strong>${username}</strong>,</p> 
    <p>Thank you for registering with <strong>[S & S]</strong>.</p> 
    <p>Please use the following link to complete your registration:</p> 
    <p style="font-size: 18px; color: blue;"> 
        <a href="http://localhost:3000/register/confirm?token=${token}" target="_blank">
            Complete Registration
        </a>
    </p> 
    <p>If you did not request this, please ignore this email.</p> 
    <p>Best regards,<br>S & S</p>`; //link 

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2', 
            user: process.env.MY_GMAIL as string,
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            refreshToken: process.env.REFRESH_TOKEN as string,
            accessToken: accessToken
        }
    } as SMTPTransport.Options);
    const mailOptions = { 
        from: process.env.MY_GMAIL as string, 
        to: email,
        subject: 'Confirmation Email', 
        html: html
    }
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId); 
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}