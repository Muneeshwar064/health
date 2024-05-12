const express = require("express");
const router = express.Router();
const { createPatientDetails,deleteUser, getPatient, getPatientDetails, UpdatePatientDetails, GetUserDetailIdBased } = require("../controllers/patientDetail");
const { protect } = require("../middleware/authMiddleware");

// Protected Route
router.get("/", getPatientDetails);

router.get('/patient', getPatient)

// Protected Route
router.post("/", protect, createPatientDetails);

// Update User
router.patch("/admin", UpdatePatientDetails);

router.get("/admin", GetUserDetailIdBased);
router.post("/patient" , deleteUser)


module.exports = router;
