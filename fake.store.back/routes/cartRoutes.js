const express = require("express");
const CartController = require("../controllers/cartController");
const cartRoutes = express.Router();

cartRoutes.post("/:user_id", CartController.update);
cartRoutes.get("/:user_id", CartController.index);

module.exports = cartRoutes;
