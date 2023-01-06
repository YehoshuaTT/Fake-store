import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "../Admin/Admin";
import AdminProduct from "../Admin/AdminProduct";
import Header from "../Header/Header";
import { useState } from "react";
import AdminCreatProduct from "../Admin/AdminCreatProduct";
import AdminUsers from "../Admin/AdminUsers";
import AdminSales from "../Admin/AdminSales";

function ProjectContainer({ isAdmin }) {
  const [showCat, setShowCat] = useState(true);

  return (
    <div className="project-container">
      <BrowserRouter>
        <Header setShowCat={setShowCat} />
        {isAdmin && <Admin />}
        <Routes>
          {isAdmin && (
            <Route path="/">
              <Route path="editproduct" element={<AdminProduct />} />
              <Route path="creat" element={<AdminCreatProduct />} />
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
