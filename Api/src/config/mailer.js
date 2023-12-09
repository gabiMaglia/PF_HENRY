const nodemailer = require('nodemailer');
require("dotenv").config();

const { PASSWORD_MAILER, EMAIL_MAILER } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_MAILER,
        pass: PASSWORD_MAILER,
    },
});

transporter.verify().then(() => {
    console.log('Ready to send emails');
});

module.exports = transporter;