const express = require("express");
const productRouts = express.Router();
const productsLogic = require("../../BL/product.logic");

productRouts.post("/", async (req, res) => {
  console.log("Someone is trying to send a new product", req.body);
  try {
    const newProduct = await productsLogic.createProduct(req.body);
    if (!newProduct) {
      // res.sendStatus(405);
      console.log(newProduct);
    } else {
      res.send(newProduct);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productRouts.get("/", async (req, res) => {
  console.log("Someone wants to call a product");
  console.log("req: ", req.query);
  try {
    const product = await productsLogic.getProduct(req.query.id);
    if (!product) console.log(product);
    else {
      console.log(product);
      res.send(product);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productRouts.get("/all", async (req, res) => {
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
productRouts.get("/all/:catName", async (req, res) => {
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

productRouts.put("/", async (req, res) => {
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

productRouts.put("/meny", async (req, res) => {
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

module.exports = productRouts;
