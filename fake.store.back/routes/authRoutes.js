const express = require("express");
const AuthController = require("../controllers/AuthController");
const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/users", AuthController.users);
authRouter.get("/users/carts", AuthController.carts);
authRouter.put("/purchas/:email", AuthController.purchas);
authRouter.get("/purchas/:email", AuthController.purchasIndex);

module.exports = authRouter;
