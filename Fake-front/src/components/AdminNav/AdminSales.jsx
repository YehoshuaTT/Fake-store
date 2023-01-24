import { useState, useEffect } from "react";
import CartTable from "../Tables/CartTable";
function AdminSales() {
  const [carts, setCarts] = useState(null);

  useEffect(() => {
    apiCalls("get", `/auth/users`).then(({ data }) => {
      const sales = data.filter((v) => {
        return v.purchases.length > 0;
      });
      setCarts(sales);
    });
    console.log(data);
  }, []);

  return (
    <div className="admin-sales">{carts && <CartTable data={carts} />}</div>
  );
}

export default AdminSales;
