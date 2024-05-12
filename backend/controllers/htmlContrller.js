const asynchandler = require("express-async-handler");
const PatientDetails = require("../models/patientDetail");
const os = require('os');
const crypto = require('crypto');


const htmlContent = asynchandler(async (req, res) => {

    const decryptText=(encryptedText, password)=> {
        const decipher = crypto.createDecipher('aes-256-cbc', password);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    const emailName = decryptText(req?.query?.unique_Id,"hospital_management_system");

    const logo = "data:image/png;base64,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";

    if (!req) {
        res.status(400).json({ error: "Please enter all fields" });
    }
    else {
        const patientDetailsIdDetail = await PatientDetails.find({ email: emailName });
        console.log(patientDetailsIdDetail);
        if (patientDetailsIdDetail) {
            const detail = {
                "email": patientDetailsIdDetail[0].email,
                "emergencyNumber": patientDetailsIdDetail[0].emergencyContactNumber,
                "firstName": patientDetailsIdDetail[0].firstName,
                "lastName": patientDetailsIdDetail[0].lastName,
                "contactNumber": patientDetailsIdDetail[0].contactNumber,
                "BloodGroup": patientDetailsIdDetail[0].bloodGroup,
                "aadharCard": patientDetailsIdDetail[0].aadharNumber,
                "imageSrc": logo,
                "hostName": req.headers.host,
            };
            console.log(req.headers.host);

            res.render('index', { detail });

        }
        else {
            if (!patientDetailsIdDetail) {
                res.status(204);
            }
        }
    }
})



module.exports = {
    htmlContent
};