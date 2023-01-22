import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import AdminNav from "../components/AdminNav/AdminNav";
import Header from "../components/Header/Header";
import AdminProduct from "./AdminProduct";
import AdminUsers from "./AdminUsers";
import AdminSales from "./AdminSales";
import AdminCreatProduct from "./AdminCreatProduct";

function ProjectContainer({ isAdmin, setCanLog }) {
  return (
    <div className="project-container">
      <BrowserRouter>
        <Header setCanLog={setCanLog} />
        {isAdmin && <AdminNav />}
        <Routes>
          {isAdmin && (
            <Route path="/">
              <Route path="adminproducts" element={<AdminProduct />} />
              <Route path="creat" element={<AdminCreatProduct />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="sales" element={<AdminSales />} />
            </Route>
          )}
          <Route path="layout/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default ProjectContainer;
