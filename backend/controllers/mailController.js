const asynchandler = require("express-async-handler");
const nodemailer = require('nodemailer');
const PatientDetails = require("../models/patientDetail");
const QRCode = require('qrcode')
const fs = require('fs');
const crypto = require('crypto');

const mailSend = asynchandler(async (req, res) => {

    const encryptText = (text, password) => {
        const cipher = crypto.createCipher('aes-256-cbc', password);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    const emails = req.body.email;
    console.log(encryptText(emails, "hospital_management_system"));

    const userDetail = await PatientDetails.find({ email: emails });
    console.log(userDetail);
    if (userDetail.length === 1) {
        const hostUrl = "http://" + req.headers.host + "/api/html?unique_Id=" + encryptText(emails, "hospital_management_system")
        console.log(hostUrl);
        QRCode.toFile('qrcode.png', hostUrl, (err) => {
            if (err) {
                console.error('Error generating QR code:', err);
                return;
            }
            console.log('QR code generated successfully.');
            // Read the generated QR code image as Base64
            const qrCodeImage = fs.readFileSync('qrcode.png', { encoding: 'base64' });
            console.log(qrCodeImage);
            if (qrCodeImage) {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.HOST_MAIL_NAME, // Your email address
                        pass: process.env.HOST_MAIL_PASS // Your email password or app password if using Gmail
                    }
                });
                const htmlContent = `
        <p>Dear ${userDetail[0].firstName} ${userDetail[0].lastName}</p>
        <p>
          Greetings from AEIS 
        </p>
          <p> Welcome to AEIS - Accidental Emergency Information System</p>
          <p>  You have successfully registered with AEIS - Accidental Emergency System </p>
            <p> Please find your AEIS Account Details Below </p>
            <p> username: ${userDetail[0].firstName} ${userDetail[0].lastName}</p>
        <p>Qr code</p>
        <p></p>
            <p>  Please find attachment QR Code /Scanner for your ready reference</p>
            <p> kindly place QR code /Scanner on appropriate place to access emergency information.</p>
            <p>
              Reach out to <a href="mailto:support@aeis.net">Support@aeis.net</a> in case of any query.
            </p>
            <p>Many Thanks,</p>
            <p>Best Regrad's</p>
            <p><b>Team AEIS </b></p>
        <p> <b>A</b>ccidental <b>Emergency</b> <b> I</b> nformation <b>S</b>sytem</p>
        `
                const mailOptions = {
                    from: process.env.HOST_MAIL_NAME, // Sender address
                    to: emails, // List of recipients
                    subject: 'Welcome to AEIS- Registration', // Subject line
                    html: htmlContent,
                    attachments: [
                        {
                            filename: `${userDetail[0].firstName + userDetail[0].lastName} qrcode.png`,
                            content: qrCodeImage,
                            encoding: 'base64',
                        },
                    ],
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
            }
        }
        )
    }
    else {
        res.sendStatus(204);
    }
})

module.exports = {
    mailSend
};