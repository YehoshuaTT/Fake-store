import axios from "axios";
import { useState, useEffect } from "react";
import CartTable from "../components/Tables/CartTable";
import apiCalls from "../functions/apiRequest";
function AdminSales() {
  const [carts, setCarts] = useState(null);

  useEffect(() => {
    const getCarts = async () => {
      apiCalls("get", "/auth/users").then(({ data }) => {
        const sales = data.filter((v) => {
          return v.purchases.length > 0;
        });
        setCarts(sales);
        console.log(data);
      });
    };
    getCarts();
  }, []);

  return (
    <div className="admin-sales">{carts && <CartTable data={carts} />}</div>
  );
}

export default AdminSales;
