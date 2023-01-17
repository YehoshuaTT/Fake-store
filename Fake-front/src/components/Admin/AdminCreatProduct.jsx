import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "../Table/Table";
function AdminCreatProduct({ prods, newProd, setNew }) {
  const [newProductState, setNewProductState] = useState(true);

  return (
    <div className="admin-create-product">
      AdminCreatProduct
      {prods && <Table data={prods} newProductState={newProductState} />}
    </div>
  );
}

export default AdminCreatProduct;
