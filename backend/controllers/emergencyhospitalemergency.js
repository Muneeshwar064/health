const EmHoDe = require("../models/hospitalModel");
const asynchandler = require("express-async-handler");
const PatientDetails = require("../models/patientDetail");

const ParticularDetailsDelete = asynchandler(async (req, res) => {
    const datails = req?.body;
    if (req.body.email) {
        try {
            const deleteId = await EmHoDe.deleteOne({ email: req?.body?.email }).then((response) => {
                console.log(res);
                if (response?.deletedCount === 1) {
                    res.send(200).Json({ value: "deleted" });
                }
                else {
                    res.send(200).json({ error: 'No Data Found' });
                }
            }).catch((err) => {
                res.send(200).json({ error: 'Document not found' });
            })
        }
        catch (err) {
            res.status(400).json({ error: 'Error Found' });
        }
    }
})


const PostAlluserDetailsEmergency = asynchandler(async (req, res) => {
    if (req?.body?.email) {
        try {

            const emailValidate = await EmHoDe.find({ email: req?.body?.email }).then((response) => {
                return response;
                // console.log(response);
            }).catch((err) => {
                // console.log(err);
            })


            if (emailValidate && emailValidate[0]?.email === req?.body?.email) {
                // console.log("hit");
                res.sendStatus(409).send({ email: "Already Exist" });
            }
            else {
                if (!req?.body) {
                    return res.status(400).send("Bad Request");
                }
                else {
                    try {
                        const emergencyRefData = await PatientDetails.find({ email: req?.body?.email }).then((res) => {
                            return res;
                        }).catch((err) => {
                            // console.log(err);
                        })
                        if (emergencyRefData) {
                            try {
                                const detail = await EmHoDe.create({
                                    longitude: req?.body?.longitude,
                                    latitude: req?.body?.latitude,
                                    aadharNumber: emergencyRefData[0].aadharNumber,
                                    lastName: emergencyRefData[0].lastName,
                                    firstName: emergencyRefData[0].firstName,
                                    familyDoctorContact: emergencyRefData[0].familyDoctorContact,
                                    emergencyContactNumber: emergencyRefData[0].emergencyContactNumber,
                                    email: emergencyRefData[0].email,
                                    bloodGroup: emergencyRefData[0].bloodGroup,
                                    contactNumber: emergencyRefData[0].contactNumber,
                                }).then((res) => {
                                    return res;

                                }).catch((err) => {
                                    console.log(err);
                                    res.send("sucess");
                                })
                                if (detail) {
                                    res.sendStatus(201).send("successfully created");
                                }

                            }
                            catch (err) {
                                console.log(err);
                                res.send("failed")
                            }

                        }

                    }
                    catch (err) {
                        console.log(err);
                    }






                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
})

const GetuserDetailsEmergency = asynchandler(async (req, res) => {
    try {
        const Value = await EmHoDe.find({}).then((value) => {
            if (value) {
                res.status(200).send(value);
            }
            else {
                res.send(204);
            }

        }).catch((err) => {
            res.send(400)
        })
    }
    catch (err) {
        res.send(400)
    }
})

module.exports = {
    PostAlluserDetailsEmergency,
    ParticularDetailsDelete,
    GetuserDetailsEmergency
};