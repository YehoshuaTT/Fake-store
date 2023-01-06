const express = require("express");
const cartRouter = express.Router();
const cartLogic = require("../../BL/cart.logic");

cartRouter.get("/:token", async (req, res) => {
  console.log("a cart is beeing asked for");
  try {
    const cart = await cartLogic.restorCart(req.params.token);
    if (cart) res.send(cart);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

cartRouter.post("/:token", async (req, res) => {
  try {
    cartUpdat(req.params.token, req.body);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = cartRouter;
