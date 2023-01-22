import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../Tables/Table";

function AdminProduct() {
  const baseURL = "http://localhost:3001";

  const [prods, setProds] = useState();

  const getAllproducts = async () => {
    const { data } = await axios.get(`${baseURL}/product/all/`);
    setProds(data);
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  return (
    <div className="admin-update">
      <div className="get-pruduct"></div>
      {prods && <Table data={prods} />}
    </div>
  );
}

export default AdminProduct;
