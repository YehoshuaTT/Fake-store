import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
function Admin({ setNew }) {
  //   const baseURL = "http://localhost:3001";

  // const sendNewProduct = async () => {
  //   let newProduct = {
  //     id: Math.random(),
  //     title: pTitle,
  //     price: pPrice,
  //     description: pDescription,
  //     category: pCategory,
  //     image: pImage,
  //     inStock: pInStock,
  //   };
  //   let respons = await axios.post(`${baseURL}/product`, newProduct);
  //   console.log(respons);
  // };

  return (
    <div className="admin-nav-bar-container">
      <nav className="admin-nav-bar">
        <ul>
          <Link to="admin/editproduct">products</Link>
        </ul>
        <ul>
          <Link to="admin/creat">New Product</Link>
        </ul>
        <ul>
          <Link to="admin/sales"> Sales </Link>
        </ul>
        <ul>
          <Link to="admin/users"> users </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Admin;
