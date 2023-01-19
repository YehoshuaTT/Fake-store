const Cart = require("../models/cart.model");
const User = require("../models/UserModel");

class CartController {
  static async index(req, res) {
    try {
      const cart = await Cart.findOne({ id: req.params.user_id }).populate();
      if (cart) res.send(cart);
      else res.sendStatus(400);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
  // cartWithPopulatedProduct = myModel.cart.map(function(item) {
  // return MyProductModel.populate(item, {path: 'product'});

  static async update(req, res) {
    try {
      if (req.body.type === "empty") {
        const remove = await Cart.updateOne(
          { id: req.body.id },
          { products: [] }
        );
      } else if (req.body.type === "remove") {
        const remove = await Cart.updateOne(
          { id: req.body.id },
          { $pull: { products: req.body.products } }
        );
        if (remove) res.status(200);
      } else {
        const add = await Cart.findOneAndUpdate(
          { id: req.body.id },
          { $push: { products: req.body.products } }
        );
        if (add) res.status(200);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }

  static async carts(req, res) {
    try {
      const carts = await User.index();
      if (carts) res.status(200).send(carts);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }

  static async creat(id) {
    const carts = await Cart.create({ id: id });
    if (carts) return carts;
    else return null;
  }
}

module.exports = CartController;

// remove;
// clear;
// call;
