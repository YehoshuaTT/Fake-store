const { ProductData } = require("./product.model");

async function create(data) {
  return await ProductData.create(data);
}

async function read(filter, specificField) {
  if (filter == undefined) filter = {};
  return await ProductData.find(filter, specificField);
}

async function updateMany(ProductId, newData) {
  return await ProductData.updateMany(ProductId, newData);
}
async function findOne(filter) {
  return await ProductData.findOne(filter);
}
async function del(ProductId) {
  return ProductData.updateOne(ProductId, { isActive: false });
}
async function update(newData) {
  console.log("newData", newData);
  return ProductData.updateOne(newData);
}

module.exports = { del, updateMany, read, create, findOne, update };
