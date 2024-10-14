const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScema = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  links: {
    type: Array,
    default: [],
  },
  otp: {
    type: String,
  },
  forgotpassToken: {
    type: String,
  },
  sec_token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userScema);
