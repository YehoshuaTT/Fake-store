require("dotenv").config();
const PORT = process.env.PORT || 3456;

const express = require("express");
const authRouter = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

require("./services/db.js").connect();

const cors = require("cors");
const purchasRoutes = require("./routes/purchasRoutes.js");
const app = express();
app.use(cors({ origin: "*", exposedHeaders: "Authorization" }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/purchas", purchasRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
