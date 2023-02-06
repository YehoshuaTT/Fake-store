const Product = require("../models/product.model");
const CategoryController = require("../controllers/CategoryController");
const { errMessage } = require("../errController");
class ProductController {
  static async create(req, res) {
    try {
      const data = await CategoryController.index(req, res);
      if (!data.includes(req.body.category)) {
        let editedReq = req;
        editedReq.body.title = req.body.category;
        const newCat = await CategoryController.create(editedReq, res);
      }
      const newProduct = await Product.create(req.body);
      res.send(newProduct);
    } catch (e) {
      console.log(e);
      // res.sendStatus(500);
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
    const product = await Product.find({ category: req.params.catName });
    if (!product) throw errMessage.INTERNAL_ERROR;
    res.send(product);
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
