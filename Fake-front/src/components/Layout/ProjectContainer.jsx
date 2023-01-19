import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "../Admin/Admin";
import AdminProduct from "../Admin/AdminProduct";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import AdminCreatProduct from "../Admin/AdminCreatProduct";
import AdminUsers from "../Admin/AdminUsers";
import AdminSales from "../Admin/AdminSales";
import axios from "axios";
const baseURL = "http://localhost:3001";
function ProjectContainer({ isAdmin, setCanLog }) {
  const [showCat, setShowCat] = useState(true);
  const [prods, setProds] = useState();
  const [newProductState, setNewProductState] = useState(true);
  useEffect(() => {
    const getAllproducts = async () => {
      const { data } = await axios.get(`${baseURL}/product/all/`);
      setProds(data);
    };

    getAllproducts();
  }, []);

  return (
    <div className="project-container">
      <BrowserRouter>
        <Header setShowCat={setShowCat} setCanLog={setCanLog} />
        {isAdmin && <Admin />}
        <Routes>
          {isAdmin && (
            <Route path="/">
              <Route path="editproduct" element={<AdminProduct />} />
              <Route
                path="creat"
                element={
                  <AdminCreatProduct
                    setNew={setNewProductState}
                    prods={prods}
                    newProd={newProductState}
                  />
                }
              />
              <Route path="users" element={<AdminUsers />} />
              <Route path="sales" element={<AdminSales />} />
            </Route>
          )}
          <Route
            path="layout/*"
            element={<Layout setShowCat={setShowCat} showCat={showCat} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default ProjectContainer;
