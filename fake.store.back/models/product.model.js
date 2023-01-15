const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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

class ProductClass {
  //Any special Database methods here
}

productSchema.loadClass(ProductClass);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
