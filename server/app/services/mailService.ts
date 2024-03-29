"use strict";
import nodemailer, { TransportOptions } from 'nodemailer';
const sendMail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Replace with the SMTP server address
        port: process.env.SMTP_PORT, // Replace with the SMTP server port (e.g., 587 for TLS, 465 for SSL)
        secure: false, // Set to true if using SSL
        auth: {
            user: process.env.SMTP_USERNAME, // Replace with your email address
            pass: process.env.SMTP_PASSWORD, // Replace with your email password or an app-specific password
        },
    } as TransportOptions);

    const mailOptions = {
        from: process.env.SMTP_SENDER, // Replace with the sender email address
        to: to, // Replace with the recipient's email address
        subject: subject,
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        return true;
    } catch (err) {
        console.error('Error sending email:', err);
        return false;
    }
}


export default sendMail;
