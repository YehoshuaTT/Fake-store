import { useState } from "react";
import { React } from "react";
import { Link } from "react-router-dom";

function Items({ catItems, increase, decrease, cartItem }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="category-name-container">
      <div className="opend-category">
        {catItems.map((v, i) => {
          return (
            <div className="item-in-category">
              <Link
                to={`/layout/single-item/${v._id}`}
                key={i}
                className="link"
              >
                <img
                  className="img-in-category"
                  src={v.image}
                  hight="200px"
                ></img>
              </Link>
              <div className="price">{v.price} $</div>
              {cartItem.includes(v) ? (
                <div className="buttons-in-item">
                  <img
                    src="https://findicons.com/files/icons/1014/ivista/128/plus.png"
                    className="inc-dec-category"
                    onClick={() => increase(v)}
                  />
                  {catItems[i].amount}
                  <img
                    src="https://findicons.com/files/icons/1014/ivista/128/minus.png"
                    className="inc-dec-category"
                    onClick={() => decrease(v, v.amount)}
                  />
                </div>
              ) : (
                <button
                  className="ATC-bottun"
                  onClick={() => {
                    increase(v);
                    setAdded(true);
                  }}
                >
                  Add to Cart
                </button>
              )}
              <h5 className="h3-item-title"> {v.title}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Items;
