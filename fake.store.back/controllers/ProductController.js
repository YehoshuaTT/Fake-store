const Product = require("../models/product.model");
class ProductController {
  static async create(req, res) {
    try {
      const newProduct = await Product.create(req.body);
      console.log(newProduct);
      res.send(newProduct);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async show(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return null;
      else {
        res.send(product);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  }

  static async index(req, res) {
    try {
      const product = await Product.find({});
      res.send(product);
    } catch (e) {
      res.sendStatus(401);
    }
  }

  static async catProducts(req, res) {
    try {
      const product = await Product.find({ category: req.params.catName });
      res.send(product);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      res.send(product);
    } catch (e) {
      res.sendStatus(401);
    }
  }
}
module.exports = ProductController;
