const express = require("express");
const CartController = require("../controllers/cartController");
const cartRoutes = express.Router();

cartRoutes.post("/:user_id", CartController.update);
cartRoutes.get("/:user_id", CartController.index);
// cartRoutes.put("/purchas/:id", CartController.purchas);
// cartRoutes.get("/purchas/:id", CartController.purchasIndex);
// cartRoutes.get("/carts", CartController.carts);

module.exports = cartRoutes;
