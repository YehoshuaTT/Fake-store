import Layout from "./Layout";
import Admin from "../Admin/Admin";
import AdminProduct from "../Admin/AdminProduct";
import Header from "../Header/Header";
import AdminCreatProduct from "../Admin/AdminCreatProduct";
import AdminUsers from "../Admin/AdminUsers";
import AdminSales from "../Admin/AdminSales";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import makeRequest from "../../function/request.js";

function ProjectContainer({ isAdmin }) {
  const baseURL = "http://localhost:3001";
  const [showCat, setShowCat] = useState(true);
  const [prods, setProds] = useState();
  const [newProductState, setNewProductState] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    const getAllproducts = async () => {
      const { data } = await axios.get(`${baseURL}/product/all/`);
      setProds(data);
    };

    getAllproducts();
  }, []);

  useEffect(() => {
    async function trying() {
      const options = {
        method: "get",
        path: "/user/all",
      };
      const data = await makeRequest(options);
      console.log(data);
      setUsers(data);
    }
    trying();
  }, []);

  return (
    <div className="project-container">
      <BrowserRouter>
        <Header setShowCat={setShowCat} isAdmin={isAdmin} />
        {isAdmin && <Admin />}
        <Routes>
          {isAdmin && (
            <Route path="admin/">
              <Route
                path="editproduct"
                element={
                  <AdminProduct
                    prods={prods}
                    newProd={newProductState}
                    setNew={setNewProductState}
                  />
                }
              />
              <Route
                path="creat"
                element={
                  <AdminCreatProduct
                    prods={prods}
                    newProd={newProductState}
                    setNew={setNewProductState}
                  />
                }
              />
              <Route path="users" element={<AdminUsers users={users} />} />
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
