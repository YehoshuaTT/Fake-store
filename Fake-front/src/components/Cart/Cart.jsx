import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
function Cart({ cartItem, setCartItem, decrease, increase }) {
  const cart_user_id = localStorage.getItem("email");

  useEffect(() => {
    const getTheCart = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/cart/${cart_user_id}`
      );
      console.log(data);
      setCartItem(data.products);
    };
    getTheCart();
    console.log("this is what i got from the DB", cartItem);
  }, []);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const updateTotal = () => {
      let calc = 0;
      cartItem.forEach((e) => {
        calc += e.price * e.amount;
      });
      setTotal(calc);
    };
    updateTotal();
  }, [cartItem]);

  const emptyTheCart = async () => {
    setCartItem([]);
  };

  return (
    <nav id="cart">
      <div className="cart-top-part">
        <h3>Cart: {cartItem.length} items </h3>
        <h3>Total {total.toFixed(2)} $</h3>
        <button className="empty" onClick={() => emptyTheCart()}>
          empty the cart
        </button>
      </div>
      <div className="items-in-cart">
        {cartItem.map((i, i2) => {
          return (
            <div className="cart-items" key={i2}>
              <img className="img-in-cart" src={i.image} width="40px"></img>
              <>
                <div className="cart-title">{`${i.title
                  .split(" ", 4)
                  .join(" ")}...`}</div>
                <div className="cart-amount">{`amount: ${i.amount}`}</div>
                <div className="cart-price">{`price: ${(
                  i.price * i.amount
                ).toFixed(2)} $`}</div>
              </>
              <div className="cart-buttons">
                <img
                  src="https://findicons.com/files/icons/1014/ivista/128/plus.png"
                  className="inc-dec"
                  onClick={() => increase(i, i.amount)}
                />
                {cartItem[i2].amount}
                <img
                  src="https://findicons.com/files/icons/1014/ivista/128/minus.png"
                  className="inc-dec"
                  onClick={() => decrease(i, i.amount)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default Cart;
