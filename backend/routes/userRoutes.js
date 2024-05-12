const express = require("express");
const {
  registerUser,
  loginUser,
  userList,
  changePassword
} = require("../controllers/userController");

const router = express.Router();

// Register user Route
router.post("/", registerUser);

// Login user Route
router.post("/login", loginUser);
//change Passsword
router.post("/Change_Password",changePassword)

// get user Route
router.get("/userList", userList);




module.exports = router;
