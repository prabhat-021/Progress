const nodemailer = require("nodemailer");

const generateOTP = () => {
    let otp = ''
    for (let i = 0; i <= 3; i++) {
        const rendVal = Math.round(Math.random() * 9);
        otp = otp + rendVal;
    }
    return otp;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports 
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    }
})

module.exports = { generateOTP };


