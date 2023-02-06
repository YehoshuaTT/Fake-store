const express = require("express");
const AuthController = require("../controllers/AuthController");
const { validToken } = require("../auth");
const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/users", validToken, AuthController.users);

module.exports = authRouter;
