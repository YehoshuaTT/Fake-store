const express = require("express");
const userRouter = express.Router();
const userLogic = require("../../BL/user.logic");

userRouter.post("/register", async (req, res) => {
  console.log("Someone is trying to register");
  try {
    const newUser = await userLogic.register(req.body);
    res.send(newUser);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const isAUser = await userLogic.login(req.body);
    console.log("isAUser", isAUser);
    if (isAUser) {
      res.status(200).send(isAUser);
      console.log("user is logged in");
    } else res.send({ message: "worng email or password" });
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
});

userRouter.get("/all", async (req, res) => {
  console.log(req.headers);
  try {
    const userList = await userLogic.info(req);
    console.log("userList", userList);
    if (userList) {
      res.status(200).send(userList);
    } else res.send({ message: "bad request" });
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
});

module.exports = userRouter;
