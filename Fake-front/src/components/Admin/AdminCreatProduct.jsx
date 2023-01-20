import { useState } from "react";
import CreatProductTable from "../Table/CreatProductTable";
function AdminCreatProduct({ prods, newProd, setNew }) {
  const [newProductState, setNewProductState] = useState(true);

  return (
    <div className="admin-create-product">
      {prods && (
        <CreatProductTable data={prods} newProductState={newProductState} />
      )}
    </div>
  );
}

export default AdminCreatProduct;
