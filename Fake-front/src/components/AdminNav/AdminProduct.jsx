import { useEffect, useState } from "react";
import Table from "../Table/Table";

function AdminProduct() {
  const [prods, setProds] = useState();

  useEffect(() => {
    apiCalls("get", `/product/all`).then(({ data }) => {
      setProds(data);
    });
  }, []);

  return (
    <div className="admin-update">
      <div className="get-pruduct"></div>
      {prods && <Table data={prods} />}
    </div>
  );
}

export default AdminProduct;
