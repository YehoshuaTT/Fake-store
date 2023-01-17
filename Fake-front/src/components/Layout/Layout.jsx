import "./style.css";
import CategoryList from "../CategoryList/CategoryList";
import SingleItem from "../SingleItem/SingleItem";
import Items from "../Items/Items";
import Cart from "../Cart/Cart";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

function Layout({ token, showCat, setShowCat }) {
  const [cartItem, setCartItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [catItems, setCatItems] = useState([]);
  const cart_user_id = localStorage.getItem("email");

  useEffect(() => {
    const fetchCategorys = async () => {
      const { data } = await axios.get("http://localhost:3001/category/all  ", {
        headers: { autherization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategories(data);
    };
    fetchCategorys();
  }, []);

  const getCategoryItems = async (e) => {
    console.log(e);
    const { data: res } = await axios.get(
      `http://localhost:3001/product/all/${e}`
    );
    const items = res.filter((v) => v.category === e);
    setCatItems(items);
    setCategory(e);
    console.log(items);
  };

  const increase = (e) => {
    let allItems = [...cartItem];
    const todo = allItems.findIndex((i) => i.id === e.id);
    if (todo === -1) allItems.push(e);
    else ++allItems[todo].amount;

    setCartItem(allItems);
  };

  const decrease = (item, amount) => {
    const id = cartItem.findIndex((v) => v.id === item.id);
    if (id == -1) return;
    if (amount === 1) {
      let toBeChange = [...cartItem];
      toBeChange.splice(id, 1);
      setCartItem(toBeChange);
    } else {
      item.amount = amount - 1;
      let toBeChange = [...cartItem];
      toBeChange[id] = item;

      setCartItem(toBeChange);
    }
  };

  return (
    <div className="main-container">
      <Cart
        cartItem={cartItem}
        setCartItem={setCartItem}
        token={token}
        increase={increase}
        decrease={decrease}
      />
      <div className="cat-and-drop-container ">
        <CategoryList
          categories={categories}
          getCatItems={getCategoryItems}
          setShowCat={setShowCat}
          showCat={showCat}
        />

        <div className="spread-category-container">
          {showCat &&
            categories.map((cat, i) => (
              <Link to={`/layout/${cat}`} key={i}>
                <div
                  className="spread-category"
                  onClick={() => {
                    getCategoryItems(cat);
                    setShowCat(false);
                  }}
                >
                  {cat}
                </div>
              </Link>
            ))}
        </div>

        <Routes>
          <Route
            path="/single-item/:itemID"
            element={<SingleItem addToCart={increase} cartItem={cartItem} />}
          />
          <Route
            path="/:category"
            element={
              <Items
                category={category}
                increase={increase}
                catItems={catItems}
                getCatItems={getCategoryItems}
                cartItem={cartItem}
                setCartItem={setCartItem}
                decrease={decrease}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
