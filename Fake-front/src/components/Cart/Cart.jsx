import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import apiCalls from "../../functions/apiRequest";
import main from "../../stores/main";
const { productsData } = main;
console.log("dsfsd*******", productsData);

function Cart() {
  const [total, setTotal] = useState(0);
  const [firstTime, setFirstTime] = useState(true);

  const { cartItem, cart_user_id, decrease, increase, setCartItem, empy } =
    productsData;

  const getTheCart = () => {
    apiCalls("get", `/cart/${cart_user_id}`).then(({ data }) => {
      console.log("data", data);
      setCartItem(data.products);
      setFirstTime(false);
    });
  };

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

  const endOfBuyingCycle = async () => {
    const items1 = cartItem.map((v) => {
      let double = [];
      for (let i = v.amount; i > 0; i--) {
        double.push(v._id);
      }
      return double;
    });

    let items = items1.flat();
    console.log(items);
    apiCalls("put", `/purchas/${cart_user_id}`, {
      purchases: items,
    }).then(({ data }) => {
      if (data) {
        console.log(data);
        alert("your purchaces was sent to delivery");

        empy();
      }
    });
  };

  return (
    <nav id="cart">
      <div className="cart-top-part">
        <h3>Cart: {cartItem.length} items </h3>
        <h3>Total {total.toFixed(2)} $</h3>
        {cartItem.length === 0 && firstTime ? (
          <button className="empty" onClick={() => getTheCart()}>
            click for your cart items
          </button>
        ) : (
          cartItem.length !== 0 && (
            <button className="empty" onClick={() => empy()}>
              empty the cart
            </button>
          )
        )}
      </div>
      <div className="items-in-cart">
        {cartItem.map((i, i2) => {
          return (
            <div className="cart-items" key={i2}>
              <img
                className="img-in-cart"
                src={i.image}
                width="40px"
                alt={i.title}
              ></img>
              <div className="text-in-cart-item">
                <div className="cart-title">{`${i.title
                  .split(" ", 4)
                  .join(" ")}...`}</div>
                <div className="cart-price">{`price: ${(
                  i.price * i.amount
                ).toFixed(2)} $`}</div>
              </div>
              <div className="cart-buttons">
                <img
                  alt="plus"
                  src="https://findicons.com/files/icons/1014/ivista/128/plus.png"
                  className="inc-dec"
                  onClick={() => increase(i, i.amount)}
                />
                {cartItem[i2].amount}
                <img
                  alt="minus"
                  src="https://findicons.com/files/icons/1014/ivista/128/minus.png"
                  className="inc-dec"
                  onClick={() => decrease(i, i.amount)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => endOfBuyingCycle()} id="buy-button">
        Buy
      </button>
    </nav>
  );
}

export default observer(Cart);
