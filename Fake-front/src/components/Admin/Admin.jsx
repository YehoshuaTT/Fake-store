import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
function Admin() {
  return (
    <div className="admin-nav-bar-container">
      <nav className="admin-nav-bar">
        <ul>
          <Link to="/editproduct"> products </Link>
        </ul>
        <ul>
          <Link to="/creat"> New Product </Link>
        </ul>
        <ul>
          <Link to="/sales"> Sales </Link>
        </ul>
        <ul>
          <Link to="/users"> users </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Admin;
