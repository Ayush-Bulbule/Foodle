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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST, // Replace with the SMTP server address
        port: process.env.SMTP_PORT, // Replace with the SMTP server port (e.g., 587 for TLS, 465 for SSL)
        secure: false, // Set to true if using SSL
        auth: {
            user: process.env.SMTP_USERNAME, // Replace with your email address
            pass: process.env.SMTP_PASSWORD, // Replace with your email password or an app-specific password
        },
    });
    const mailOptions = {
        from: process.env.SMTP_SENDER, // Replace with the sender email address
        to: to, // Replace with the recipient's email address
        subject: subject,
        html: html,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        return true;
    }
    catch (err) {
        console.error('Error sending email:', err);
        return false;
    }
});
exports.default = sendMail;
