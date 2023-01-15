const User = require("../models/UserModel");
class AuthController {
  static async register(req, res) {
    console.log("Someone is trying to register");
    try {
      const newUser = await User.register(req.body);
      res.send(newUser);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const isAUser = await User.login(req.body);
      console.log("isAUser", isAUser);
      if (isAUser) {
        res.status(200).send(isAUser);
        console.log("user is logged in");
      } else res.send({ message: "worng email or password" });
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
}

module.exports = AuthController;
