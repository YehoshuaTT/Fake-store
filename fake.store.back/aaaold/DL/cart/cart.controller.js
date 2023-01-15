const cart = require("./cart.model");

async function creat(data) {
  return await cart.create(data);
}

async function read(filter) {
  return await cart.find(filter);
}
async function findOne(filter) {
  return await cart.findOne(filter);
}

async function readOne(filter) {
  return await cart.read(filter);
}
async function update(cartId, newData) {
  return await cart.updateOne(cartId, newData);
}

async function del(id) {
  return await cart.update(id, { isActive: false });
}

module.exports = { creat, read, update, del, readOne, findOne };
