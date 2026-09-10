import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const host = process.env.EMAIL_HOST || "localhost";
const port = parseInt(process.env.EMAIL_PORT, 10) || 1025;
const secure = process.env.EMAIL_SECURE === "true";

const transportOptions = {
    host,
    port,
    secure,
    tls: {
        rejectUnauthorized: false
    }
};

// Include authentication only if credentials are provided (MailHog doesn't require auth)
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transportOptions.auth = {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    };
}

const transporter = nodemailer.createTransport(transportOptions);

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error("Mailer Configuration Warning (MailHog/SMTP may not be running yet):", error.message);
    } else {
        console.log(`Mailer connected successfully to ${host}:${port} ✅`);
    }
});

export default transporter;