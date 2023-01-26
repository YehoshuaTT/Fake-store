import "../styels/style.css";
import CategoryList from "../components/CategoryList/CategoryList";
import SingleItem from "./SingleItem";
import Items from "./Items";
import Cart from "../components/Cart/Cart";
import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import apiCalls from "../functions/apiRequest";

function Layout({ token }) {
  const [cartItem, setCartItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [catItems, setCatItems] = useState([]);
  const [showCat, setShowCat] = useState(true);

  const cart_user_id = localStorage.getItem("id");

  useEffect(() => {
    setShowCat(true);
  }, []);

  useEffect(() => {
    const fetchCategorys = async () => {
      apiCalls("get", "/category/all").then(({ data }) => setCategories(data));
    };
    fetchCategorys();
  }, []);

  const getCategoryItems = async (e) => {
    apiCalls("get", `/product/all/${e}`).then(({ data }) => setCatItems(data));
    setCategory(e);
  };

  // const increase = (e) => {
  //   sendCartToDB(e._id, "add");
  //   let allItems = [...cartItem];
  //   const todo = allItems.findIndex((i) => i._id === e._id);
  //   if (todo === -1) allItems.push(e);
  //   else ++allItems[todo].amount;

  //   setCartItem(allItems);
  // };

  // const decrease = (item, amount) => {
  //   sendCartToDB(item._id, "remove");
  //   const id = cartItem.findIndex((v) => v._id === item._id);
  //   if (id == -1) return;
  //   if (amount === 1) {
  //     let toBeChange = [...cartItem];
  //     toBeChange.splice(id, 1);
  //     setCartItem(toBeChange);
  //   } else {
  //     item.amount = amount - 1;
  //     let toBeChange = [...cartItem];
  //     toBeChange[id] = item;
  //     setCartItem(toBeChange);
  //   }
  // };

  // const sendCartToDB = async (product, AddOrRemove) => {
  //   const theCart = {
  //     id: cart_user_id,
  //     products: product,
  //     type: AddOrRemove,
  //   };
  //   console.log(theCart);
  //   apiCalls("post", `/cart/${cart_user_id}`, theCart);
  // };

  return (
    <div className="main-container">
      <Cart
        cartItem={cartItem}
        setCartItem={setCartItem}
        token={token}
        // increase={increase}
        // decrease={decrease}
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
            element={<SingleItem props={{ cartItem }} />}
          />
          <Route
            path="/:category"
            element={
              <Items
                category={category}
                // increase={increase}
                catItems={catItems}
                getCatItems={getCategoryItems}
                cartItem={cartItem}
                setCartItem={setCartItem}
                // decrease={decrease}
              />
            }
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
