const Purchas = require("../models/schemas/purchasesSchema");
const User = require("../models/UserModel");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
class Purchases {
  static async purchas(req, res) {
    try {
      //creating
      const purchas = await Purchas.create({
        userId: req.params.id,
        products: req.body.purchases,
      });
      //updating the stock
      const stock = req.body.purchases.forEach(async (v) => {
        await Product.findByIdAndUpdate(v, {
          $inc: { inStock: -1 },
        });
      });
      // ref for user
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
