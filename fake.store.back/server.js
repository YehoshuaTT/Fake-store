require("dotenv").config();
const express = require("express");
// const userRouter = require("./DL/Routers/userRouts");
// const cartRouter = require("./DL/Routers/cartRouts");
// const productRouter = require("./DL/Routers/productRouts");
// const categoryRouter = require("./DL/Routers/categoryRouts");
const authRouter = require("./routes/authRoutes.js");

const PORT = process.env.PORT || 3456;
require("./services/db.js").connect();

const cors = require("cors");
const productRoutes = require("./routes/productRoutes.js");
const app = express();

app.use(
  cors({
    origin: "*",
    exposedHeaders: "Authorization",
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", productRoutes);

// app.use("/user", userRouter);
// app.use("/cart", cartRouter);
// app.use("/product", productRouter);
// app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
