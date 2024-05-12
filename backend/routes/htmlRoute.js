const express = require("express");

const {htmlContent}=  require("../controllers/htmlContrller");
const router = express.Router();

router.get("/", htmlContent);

module.exports = router;