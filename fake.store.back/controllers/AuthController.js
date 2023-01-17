const User = require("../models/UserModel");
const { createToken } = require("../services/authService");
class AuthController {
  static async register(req, res) {
    console.log("Someone is trying to register");
    try {
      const newUser = await User.register(req.body);
      if (newUser) {
        let token = await createToken(newUser.email);
        res.send({ newUser, token });
      } else res.status(400).send("There is a problem with the details");
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const isAUser = await User.login(req.body);
      if (isAUser) {
        res.status(200).send(isAUser);
        console.log("user is logged in");
      } else res.send({ message: "worng email or password" });
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
  static async users(req, res) {
    try {
      const users = await User.index();
      if (users) res.status(200).send(users);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
  static async purchas(req, res) {
    try {
      const user = await User.findOne({ id: req.params.email });
      const purchas = await User.findByIdAndUpdate(user._id, {
        $push: { purchases: req.body.purchases },
      });
      if (purchas) res.status(200).send(purchas);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
  static async purchasIndex(req, res) {
    try {
      const purchas = await User.findOne({ id: req.params.email });
      if (purchas) res.status(200).send(purchas._doc.purchases);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }

  static async carts(req, res) {
    try {
      const carts = await User.index();
      if (carts) res.status(200).send(carts);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
}

module.exports = AuthController;
