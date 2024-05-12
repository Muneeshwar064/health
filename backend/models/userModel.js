const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"]
    },
    gender: {
      type: String,
      required: [true, "Please add a gender"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
