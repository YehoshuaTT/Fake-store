import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CartTable from "../Table/CartTable";
function AdminSales() {
  const [carts, setCarts] = useState(null);
  const baseURL = "http://localhost:3001";

  useEffect(() => {
    const getCarts = async () => {
      const { data } = await axios.get(`${baseURL}/auth/users/carts`);
      console.log(data);
      setCarts(data);
    };
    getCarts();
  }, []);

  return (
    <div className="admin-sales">
      AdminSales
      {carts && <CartTable data={carts} />}
    </div>
  );
}

export default AdminSales;
