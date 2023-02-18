import { observer } from "mobx-react-lite";
import { React } from "react";
import { Link } from "react-router-dom";
import ButtonForProduct from "../components/ButtonForProduct/ButtonForProduct";
import main from "../stores/main";
const { productsData } = main;

function Items({ catItems }) {
  const { cartItem } = productsData;
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
              <ButtonForProduct cartItem={cartItem} item={v} />
              <h5 className="h3-item-title"> {v.title}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default observer(Items);
