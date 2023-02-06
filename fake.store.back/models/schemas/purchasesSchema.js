const mongoose = require("mongoose");
const purchasesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },

  createDate: {
    type: Date,
    default: Date.now,
  },
});
const purchasestData = mongoose.model("Purchas", purchasesSchema);
module.exports = purchasestData;
