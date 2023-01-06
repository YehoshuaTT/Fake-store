require("dotenv").config();
const express = require("express");
const userRouter = require("./DL/Routers/userRouts");
const cartRouter = require("./DL/Routers/cartRouts");
const productRouter = require("./DL/Routers/productRouts");
const categoryRouter = require("./DL/Routers/categoryRouts");
const PORT = process.env.PORT || 3456;
require("./DL/db.js").connect();

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    exposedHeaders: "Authorization",
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
