const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    type: Array,
    default: [],
  },
});

const CartData = mongoose.model("cart", cartSchema);

module.exports = CartData;
