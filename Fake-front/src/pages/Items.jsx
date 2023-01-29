import { observer } from "mobx-react-lite";
import { React } from "react";
import { Link } from "react-router-dom";
import fakestore from "../stores/main";

function Items({ catItems }) {
  const { increase, decrease, cartItem } = fakestore;
  return (
    <div className="category-name-container">
      <div className="opend-category">
        {catItems.map((v, i) => {
          return (
            <div className="item-in-category" key={i + Math.random()}>
              <Link to={`/layout/single-item/${v._id}`} className="link">
                <img
                  alt={v.title}
                  className="img-in-category"
                  src={v.image}
                  hight="200px"
                ></img>
              </Link>
              <div className="price">{v.price} $</div>
              {cartItem.find((item) => item.id === v.id) ? (
                <div className="buttons-in-item">
                  <img
                    src="https://findicons.com/files/icons/1014/ivista/128/plus.png"
                    alt="plus"
                    className="inc-dec-category"
                    onClick={() => increase(v)}
                  />
                  {cartItem.find((item) => item.id === v.id).amount}
                  <img
                    alt="minus"
                    src="https://findicons.com/files/icons/1014/ivista/128/minus.png"
                    className="inc-dec-category"
                    onClick={() =>
                      decrease(
                        v,
                        cartItem.find((item) => item.id === v.id).amount
                      )
                    }
                  />
                </div>
              ) : (
                <button
                  className="ATC-bottun"
                  onClick={() => {
                    increase(v);
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

export default observer(Items);
