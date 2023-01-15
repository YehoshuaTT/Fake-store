const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  inStock: {
    type: Number,
    required: true,
    default: 1,
  },
  discount: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 1,
  },
  rating: {
    type: Object,
    default: {
      rate: 0,
      count: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const ProductData = mongoose.model("product", ProductSchema);

module.exports = { ProductData };
