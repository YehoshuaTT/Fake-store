const express = require("express");
const ProductController = require("../controllers/ProductController");
const productRoutes = express.Router();
const auth = require("../middleware/auth");

productRoutes.post("/", ProductController.create);
productRoutes.get("/all", ProductController.index);
productRoutes.get("/all/:catName", ProductController.catProducts);
productRoutes.get("/:id", ProductController.show);
productRoutes.put("/:id", ProductController.update);

module.exports = productRoutes;
