import { useState } from "react";
import Table from "../Table/Table";
function AdminCreatProduct({ prods, newProd, setNew }) {
  const [newProductState, setNewProductState] = useState(true);

  return (
    <div className="admin-create-product">
      {prods && <Table data={prods} newProductState={newProductState} />}
    </div>
  );
}

export default AdminCreatProduct;
