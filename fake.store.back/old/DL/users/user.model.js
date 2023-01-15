require("../db").connect();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  dob: {
    type: Date,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    type: String,
    enum: ["admin", "editor", "customer"],
    default: "customer",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  cart: {
    type: Object,
    default: [{}],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const userData = mongoose.model("user", userSchema);

module.exports = userData;
