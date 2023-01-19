const { Schema } = require("mongoose");
const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [],
  total: {
    type: Number,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = userSchema;
