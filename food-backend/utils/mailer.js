import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Often needed for cloud environments
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error("Mailer Configuration Error:", error);
    } else {
        console.log("Mailer is ready to send emails");
    }
});

export default transporter;