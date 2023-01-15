const express = require("express");
const CategoryController = require("../controllers/ProductController");
const categoryRoutes = express.Router();
const auth = require("../middleware/auth");

categoryRoutes.post("/", CategoryController.create);
categoryRoutes.get("/all", CategoryController.index);
categoryRoutes.put("/:id", auth, CategoryController.show);
categoryRoutes.delete("/:id", auth, CategoryController.delete);

module.exports = categoryRoutes;
