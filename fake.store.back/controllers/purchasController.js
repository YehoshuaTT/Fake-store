const Purchas = require("../models/schemas/purchasesSchema");
const User = require("../models/UserModel");
const Cart = require("../models/cart.model");
class Purchases {
  static async purchas(req, res) {
    try {
      const theCart = await Cart.findOne({ id: req.params.id });
      const purchas = await Purchas.create({
        userId: req.params.id,
        products: theCart._doc.products,
      });
      const intoUser = await User.findByIdAndUpdate(req.params.id, {
        $push: { purchases: purchas._id },
      });
      if (intoUser) res.status(200).send(purchas);
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
}
module.exports = Purchases;
