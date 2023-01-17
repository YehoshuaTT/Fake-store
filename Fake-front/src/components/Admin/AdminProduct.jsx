import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import SearchEng from "./SearchEng";

function AdminProduct() {
  const baseURL = "http://localhost:3001";

  const [prods, setProds] = useState();
  const getAllproducts = async () => {
    const { data } = await axios.get(`${baseURL}/product/all/`);
    setProds(data);
    console.log(prods);
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  console.log(prods);

  return (
    <div className="admin-update">
      <div className="get-pruduct"></div>
      <SearchEng props={prods} />
      {prods && <Table data={prods} />}
    </div>
  );
}

export default AdminProduct;
