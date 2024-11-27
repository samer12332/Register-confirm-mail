"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const auth2Client_1 = require("../config/auth2Client");
const sendMail = (username, email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield auth2Client_1.oauth2Client.getAccessToken();
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
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2',
            user: process.env.MY_GMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
    const mailOptions = {
        from: process.env.MY_GMAIL,
        to: email,
        subject: 'Confirmation Email',
        html: html
    };
    const info = yield transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
});
exports.sendMail = sendMail;
