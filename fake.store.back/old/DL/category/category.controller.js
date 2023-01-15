const category = require("./category.model");

async function creat(data) {
  return await category.create({ title: data });
}

async function read(filter) {
  return await category.find(filter);
}
async function findOne(filter) {
  return await category.findOne(filter);
}

async function readOne(filter) {
  return await category.read(filter);
}
async function update(catId, newData) {
  return await category.updateOne({ id: catId, newData });
}

async function del(id) {
  return await category.update(id, { isActive: false });
}

module.exports = { creat, read, update, del, readOne, findOne };
