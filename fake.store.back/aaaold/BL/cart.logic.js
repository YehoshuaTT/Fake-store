const cartData = require("../DL/cart/cart.controller");

const cartUpdat = async (token, body) => {
  const cart = await cartLogic.restorCart(token);
  if (!cart) await cartLogic.createCart(token);
  return (rescart = await cartLogic.updateCart(token, body));
};

const createCart = async (user_id) => {
  const cartinfo = {
    id: user_id,
  };
  return await cartData.creat(cartinfo);
};
const restorCart = async (user_id) => {
  return cartData.findOne({ id: user_id });
};

const updateCart = async (id, cart) => {
  console.log("logic    ", id, cart);
  return cartData.update({ id }, { products: cart.products });
};

const deleteCart = async (user_id) => {
  return cartData.del(user_id);
};

module.exports = { createCart, updateCart, deleteCart, restorCart, cartUpdat };
