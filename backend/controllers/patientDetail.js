const asynchandler = require("express-async-handler");
const PatientDetails = require("../models/patientDetail");

const getPatientDetails = asynchandler(async (req, res) => {
  const patientDetails = await PatientDetails.find({ user: req.user.id });
  res.status(200).json(patientDetails);
});

const deleteUser = asynchandler(async (req, res) => {
  const value = req?.body;
  console.log(value);
  const patientDetails = await PatientDetails.deleteOne({ email: value?.email });
  console.log(patientDetails);
  if (patientDetails.deletedCount === 1) {
    res.status(200).json("success");

  }

});


const getPatient = asynchandler(async (req, res) => {
  const patientDetails = await PatientDetails.find({});
  res.status(200).json(patientDetails);
});


const UpdatePatientDetails = asynchandler(async (req, res) => {
  const email = req?.body?.email;
  console.log(req.body);
  const { firstName, lastName, contactNumber, emergencyContactNumber, bloodGroup, familyDoctorContact } = req.body;
  if (!req.body) {
    res.status(400).json({ error: "Please enter all fields" });
  }
  const id = await PatientDetails.find({ email: email });
  console.log(id[0]._id)
  const patientDetails = await PatientDetails.findByIdAndUpdate(id[0]._id, { firstName, lastName, contactNumber, emergencyContactNumber, bloodGroup, familyDoctorContact }, { new: true });
  if (patientDetails) {
    res.status(200).json({ value: "sucessfully edited" })
  }
})

const createPatientDetails = asynchandler(async (req, res) => {

  if (!req.body) {
    res.status(400).json({ error: "Please enter all fields" });
  }

  const todo = await PatientDetails.create({
    user: req.user.id,
    bloodGroup: req.body.bloodGroup,
    contactNumber: req.body.contactNumber,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    familyDoctorContact: req.body.familyDoctorContact,
    emergencyContactNumber: req.body.emergencyContactNumber,
    email: req.body.email,
    role: req.body.role,
    aadharNumber: req.body.aadharNumber,
  });

  res.status(200).json(todo);
});

const GetUserDetailIdBased = asynchandler(async (req, res) => {
  const emailName = req?.query?.email;

  if (!req) {
    res.status(400).json({ error: "Please enter all fields" });
  }
  else {
    const patientDetailsIdDetail = await PatientDetails.find({ email: emailName });
    if (patientDetailsIdDetail) {
      res.status(200).send(patientDetailsIdDetail);
    }
    else {
      if (!patientDetailsIdDetail) {
        res.status(204);
      }
    }
  }



})

module.exports = {
  getPatientDetails,
  deleteUser,
  getPatient,
  createPatientDetails,
  UpdatePatientDetails,
  GetUserDetailIdBased
};
