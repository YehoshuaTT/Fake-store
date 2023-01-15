const express = require("express");
const ProductController = require("../controllers/ProductController");
const productRoutes = express.Router();
const auth = require("../middleware/auth");

productRoutes.post("/", ProductController.create());

productRoutes.get("/:id", auth, ProductController.show());

productRoutes.get("/all", async (req, res) => {
  console.log("Someone wants to call a product");
  try {
    const product = await productsLogic.getAllProducts({});
    if (!product) res.send({ error: 405 });
    else {
      console.log(product);
      res.send(product);
    }
  } catch (e) {
    console.log(e);
    // res.sendStatus(500);
  }
});
productRoutes.get("/all/:catName", async (req, res) => {
  console.log("Someone is calling product by category");
  try {
    const product = await productsLogic.getAllProducts({
      category: req.params.catName,
    });
    if (!product) res.send({ error: 405 });
    else {
      console.log(product);
      res.send(product);
    }
  } catch (e) {
    console.log(e);
    // res.sendStatus(500);
  }
});

productRoutes.put("/", async (req, res) => {
  console.log("Updating a product");
  console.log("req: ", req.body);
  try {
    const product = await productsLogic.updateProduct(req.body);
    if (!product) res.send({ error: 405 });
    console.log("product", product);
    res.send(product);
  } catch (e) {
    console.log(e);
    // res.sendStatus(500);
  }
});

productRoutes.put("/meny", async (req, res) => {
  console.log("Updating meny product");
  console.log("req: ", req.body);
  try {
    const product = await productsLogic.updateMenyProduct(
      req.body.id,
      req.body
    );
    if (!product) res.send({ error: 405 });
    console.log("product", product);
    // res.send(product);
  } catch (e) {
    console.log(e);
    // res.sendStatus(500);
  }
});

module.exports = productRoutes;
