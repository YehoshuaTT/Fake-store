const Product = require("../models/product.model");
class ProductController {
  static create() {
    return async (req, res) => {
      try {
        const newProduct = await Product.create(req.body);
        console.log(newProduct);
        res.send(newProduct);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    };
  }

  static show() {
    return async (req, res) => {
      try {
        const user = req.user;
        const product = await Product.findById(req.params.id);
        if (!product) return null;
        else {
          res.send(product);
        }
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    };
  }
}
module.exports = ProductController;
