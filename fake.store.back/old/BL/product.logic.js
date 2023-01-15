const productController = require("../DL/product/product.controller");
const Categorycontroller = require("../DL/category/category.controller");

//check category list and find the category. if null - creat one.

const createProduct = async (data) => {
  const theProduct = await productController.findOne({ id: data.id });
  if (theProduct) return null;
  const category = await Categorycontroller.findOne({ title: data.category });
  if (!category) Categorycontroller.creat(data.category);
  return await productController.create(data);
};

const updateProduct = async (data) => {
  const theProduct = await productController.findOne({ id: data.id });
  if (!theProduct) return null;
  const updating = await productController.update(data);
  if (updating.matchedCount == 0) return null;
  return theProduct;
};
const updateMenyProduct = async (data, newData) => {
  const theProduct = await productController.findOne({ id: data });
  if (!theProduct) return null;
  const updating = await productController.update({ data, newData });
  if (updating.matchedCount == 0) return null;
  return theProduct;
};
const removeProduct = async (data) => {
  const theProduct = await productController.findOne({ id: data.id });
  if (!theProduct) return null;
  return await productController.del(data.id);
};
const getProduct = async (data) => {
  const titleTry = await productController.findOne({ title: data });
  if (titleTry) return titleTry;
  const idTry = await productController.findOne({ id: data });
  return idTry;
};
const getAllProducts = async (data) => {
  return await productController.read({ data });
};
module.exports = {
  createProduct,
  updateProduct,
  removeProduct,
  getProduct,
  getAllProducts,
  updateMenyProduct,
};
