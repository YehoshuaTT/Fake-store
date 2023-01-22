import axios from "axios";
import { useState, useEffect } from "react";
import CartTable from "../Tables/CartTable";
function AdminSales() {
  const [carts, setCarts] = useState(null);
  const baseURL = "http://localhost:3001";

  useEffect(() => {
    const getCarts = async () => {
      const { data } = await axios.get(`${baseURL}/auth/users`);
      const sales = data.filter((v) => {
        return v.purchases.length > 0;
      });
      setCarts(sales);
      console.log(data);
    };
    getCarts();
  }, []);

  return (
    <div className="admin-sales">{carts && <CartTable data={carts} />}</div>
  );
}

export default AdminSales;
