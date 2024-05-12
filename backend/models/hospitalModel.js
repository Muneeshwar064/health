const mongoose = require("mongoose");
const hospitalEmDeModel = mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emergencyContactNumber: {
        type: String,
        required: true,
    },
    familyDoctorContact: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    aadharNumber: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    }
},)

module.exports = mongoose.model("EmergencyDetail", hospitalEmDeModel)