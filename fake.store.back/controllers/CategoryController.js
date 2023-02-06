const Category = require("../models/category.model");
const Product = require("../models/product.model");

class CategoryController {
  static async index(req, res) {
    try {
      const allCat = await Category.find();
      let onlyTitles = [];
      allCat.forEach((v) => onlyTitles.push(v._doc.title));
      res.status(200).send(onlyTitles);
      return onlyTitles;
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      const doesExict = await Category.findOne({ title: req.body.title });
      if (!doesExict)
        return await Category.create({
          title: req.body.title,
          img: req.body.img,
        });
      res.status(200).send(doesExict);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      const doesExict = await Category.findById(req.params[0]);
      if (doesExict) {
        const updating = await Category.findByIdAndUpdate(
          req.params[0],
          req.body
        );
        res.status(200).send(updating);
      } else res.status(401);
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
        res.sendStatus(201);
      }
      return doesExict;
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = CategoryController;
