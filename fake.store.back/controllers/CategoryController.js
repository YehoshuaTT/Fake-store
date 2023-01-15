const Category = require("../models/category.model");
const Product = require("../models/product.model");

class CategoryController {
  static async index(req, res) {
    try {
      const allCat = await Category.read({});
      let onlyTitles = [];
      for (i of allCat) {
        onlyTitles.push(i.title);
      }
      return onlyTitles;
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async creat(req, res) {
    try {
      const doesExict = await Category.findOne({ title: req.body.title });
      if (!doesExict) return await Category.create(req.body.title);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      const doesExict = await Category.findOne({ id: req.params.id });
      if (!doesExict) return await Category.updateOne(req.params.id, req.body);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  static async delete(req, res) {
    try {
      const doesExict = await Category.findOneAndDelete({ id: req.params.id });
      if (doesExict) {
        await Product.updateMany(
          { category: req.body.title },
          { category: "general" }
        );
        this.creat({ title: "general" });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = CategoryController;
