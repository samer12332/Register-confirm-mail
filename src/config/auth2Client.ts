import {google} from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID as string,
    process.env.CLIENT_SECRET as string,
    process.env.REDIRECT_URI as string
);
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

export {oauth2Client}