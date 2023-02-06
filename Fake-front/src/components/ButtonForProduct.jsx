import React from "react";

function ButtonForProduct({ item, cartItem }) {
  return (
    <div className="buttons-in-item">
      <img
        src="https://findicons.com/files/icons/1014/ivista/128/plus.png"
        alt="plus"
        className="inc-dec-category"
        onClick={() => increase(item)}
      />
      <img
        alt="minus"
        src="https://findicons.com/files/icons/1014/ivista/128/minus.png"
        className="inc-dec-category"
        onClick={() =>
          decrease(v, cartItem.find((item) => item.id === v.id).amount)
        }
      />
    </div>
  );
}

export default ButtonForProduct;
