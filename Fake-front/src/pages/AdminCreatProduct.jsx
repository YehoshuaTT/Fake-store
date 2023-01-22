import { useState } from "react";
import CreatProductTable from "../components/Tables/CreatProductTable";
function AdminCreatProduct({}) {
  return <div className="admin-create-product">{<CreatProductTable />}</div>;
}

export default AdminCreatProduct;
