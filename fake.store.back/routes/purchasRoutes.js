const express = require("express");
const purchasController = require("../controllers/purchasController");
const purchasRoutes = express.Router();

purchasRoutes.put("/:id", purchasController.purchas);
purchasRoutes.get("/:id", purchasController.purchasIndex);
// cartRoutes.get("/carts", CartController.carts);

module.exports = purchasRoutes;
