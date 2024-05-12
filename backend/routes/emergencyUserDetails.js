const express = require("express");
const router = express.Router();
const { PostAlluserDetailsEmergency, GetuserDetailsEmergency, ParticularDetailsDelete } = require("../controllers/emergencyhospitalemergency")


router.post("/userdetail", PostAlluserDetailsEmergency);
router.delete("/userdetail", ParticularDetailsDelete);


router.get("/userdetail", GetuserDetailsEmergency);


module.exports = router;