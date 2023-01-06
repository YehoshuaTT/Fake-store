const express = require("express");
const categoryRouter = express.Router();
const categoryLogic = require("../../BL/category.logic");
const auth = require("../../auth.js");

categoryRouter.get("/", auth.validToken, async (req, res) => {
  console.log("Someone wants to call category names");
  // console.log("req: ", req.query);
  try {
    const product = await categoryLogic.fullCategoryList({});
    if (!product) res.send({ error: 405 });
    console.log(product);

    res.send(product);
  } catch (e) {
    console.log(e);
    // res.sendStatus(500);
  }
});

module.exports = categoryRouter;
