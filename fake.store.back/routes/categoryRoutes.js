const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const categoryRoutes = express.Router();
const auth = require("../middleware/auth");

categoryRoutes.post("/", CategoryController.create);
categoryRoutes.get("/all", CategoryController.index);
categoryRoutes.put("/*", CategoryController.update);
categoryRoutes.delete("/:id", auth, CategoryController.delete);

module.exports = categoryRoutes;
