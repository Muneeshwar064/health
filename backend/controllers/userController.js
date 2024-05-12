const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const PatientDetails = require("../models/patientDetail");
const bcrypt = require("bcryptjs");

const changePassword = asynchandler(async (req, res) => {
  const { oldPassword, newPassword, email } = req?.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User doesn't exist" });
  }
  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ error: "Incorrect old password" });
  }
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.status(200).json({ value: "success" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

// Register user controller
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password, gender, phoneNumber, role } = req.body;
  console.log(name, email, password, gender, phoneNumber, role)
  if (!name || !email || !password || !gender || !phoneNumber || !role) {
    res.status(400).json({ error: "Please enter all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "User already exists" });
  }

  // hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    gender: gender,
    phoneNumber: phoneNumber,
    role: role
  });

  console.log(user)

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  }

  res.status(200).json({ name: "Register user" });
});


// Login user controller
const loginUser = asynchandler(async (req, res) => {
  const { email, password, roleIdentification } = req.body;

  if (!email || !password || !roleIdentification) {
    res.status(400).json({ error: "Please enter all fields" });
  }

  const user = await User.findOne({ email });

  if (user && user.role === roleIdentification && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    if (user.role === roleIdentification) {
      res.status(204).json({ error: "No Account Found" })
    }
    else {
      res.status(400).json({ error: "Check your email or password" });
    }
  }

});

// get me controller
const userList = asynchandler(async (req, res) => {

  const role = req.query.role;
  const userRoleList = await User.find({ role: role })

  if (userRoleList && userRoleList.find(val => val.role !== "")) {
    console.log(userRoleList)
    const userRoleLists = await PatientDetails.find({ role: userRoleList.role });
    console.log(userRoleLists);
    res.status(200).json(userRoleList);
  }
  res.status(400).json({ error: "Please enter all fields" });

});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  userList,
  changePassword
};
