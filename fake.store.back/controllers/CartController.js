const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/cart.model");

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
      const cart = await Cart.findOne({ id: req.params.user_id });
      if (!cart) {
        await Cart.create({ id: req.params.user_id, products: req.products });
        res.sendStatus(200);
      } else {
        const prod = [...req.body.products];
        console.log(prod);
        const reCart = await Cart.findOneAndUpdate(
          { id: req.params.user_id },
          {
            $addToSet: {
              products: { $each: prod },
            },
          }
        );
        res.sendStatus(200);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }

  static async purchas(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      const purchas = await User.findByIdAndUpdate(user._id, {
        $push: { purchases: req.body.purchases },
      });
      if (purchas) res.status(200).send(purchas);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
  static async purchasIndex(req, res) {
    try {
      const purchas = await User.findOne({ id: req.params.email });
      if (purchas) res.status(200).send(purchas._doc.purchases);
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
}

module.exports = CartController;

// increase;
// decrease;
// add;
// remove;
// clear;
// call;
