const express = require("express");

const {
    mailSend
} = require("../controllers/mailController");
const router = express.Router();

router.post("/", mailSend);

module.exports = router;