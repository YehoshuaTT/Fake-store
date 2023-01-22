import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiCalls from "../functions/apiRequest";
function SingleItem({ addToCart }) {
  const [item, setItem] = useState([]);

  const param = useParams();

  useEffect(() => {
    const getItem = async () => {
      apiCalls("get", `/product/${param.itemID}`).then(({ data }) =>
        setItem(data)
      );
    };
    getItem();
  }, []);

  return (
    <>
      <div className="single-item">
        <img className="single-img" src={item.image}></img>
        <div className="single-title">{item.title}</div>
        <div>
          <button className="ATC-bottun" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
        <div className="single-item-price">{`${item.price} $`}</div>
        <div className="decription">{item.description}</div>
      </div>
    </>
  );
}

export default SingleItem;
