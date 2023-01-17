const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/cart.model");

class CartController {
  static async index(req, res) {
    try {
      const cart = await Cart.findOne({ id: req.params.user_id });
      if (cart) res.send(cart);
      else res.sendStatus(400);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      const cart = await Cart.findOne({ id: req.params.user_id });
      if (!cart) {
        await Cart.create(req.params.user_id);
        res.sendStatus(200);
      } else if (req.body.products.length == 0) res.sendStatus(200);
      else {
        const reCart = await Cart.updateOne({
          id: req.params.user_id,
          products: req.body.products,
        });
        res.sendStatus(200);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
}

module.exports = CartController;
