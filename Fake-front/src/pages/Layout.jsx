import "../styels/style.css";
import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import CategoryList from "../components/CategoryList/CategoryList";
import SingleItem from "./SingleItem";
import Items from "./Items";
import apiCalls from "../functions/apiRequest";

function Layout() {
  const [categories, setCategories] = useState([]);
  const [catItems, setCatItems] = useState([]);
  const [showCat, setShowCat] = useState(true);

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
  };

  return (
    <div className="main-container">
      <Cart />
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
          <Route path="/single-item/:itemID" element={<SingleItem />} />
          <Route path="/:category" element={<Items catItems={catItems} />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
