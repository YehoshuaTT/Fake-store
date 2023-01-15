const categorycontroller = require("../DL/category/category.controller");

const fullCategoryList = async () => {
  let allCat = await categorycontroller.read({});
  let procceced = [];
  for (i of allCat) {
    procceced.push(i.title);
  }
  return procceced;
};

const newCategory = async (data) => {
  const doesExict = await categorycontroller.findOne({ title: data.title });
  if (doesExict) throw { msg: "category name allredy excist" };
  else {
    return await categorycontroller.creat(data);
  }
};

const updateCategory = async (data) => {
  const doesExict = await categorycontroller.findOne({ id: data.id });

  if (!doesExict) throw { msg: "no such category" };
  else {
    return await categorycontroller.update(data.id, data.changes);
  }
};

module.exports = { fullCategoryList, newCategory, updateCategory };
