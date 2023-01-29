import "./table.css";
import { useState } from "react";

const Table = ({ data }) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedData = data.sort((a, b, i) => {
    if (sortBy === "name") {
      if (a.title < b.title) return sortOrder === "asc" ? -1 : 1;
      if (a.title > b.title) return sortOrder === "asc" ? 1 : -1;
      return 0;
    } else {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return i;
    }
  });

  return (
    <table id="edit-all-products-table">
      <thead>
        <tr>
          <th>#</th>
          <th
            onClick={() => {
              setSortBy("name");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            User Name
          </th>
          <th
            onClick={() => {
              setSortBy("email");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Email
          </th>
          <th
            onClick={() => {
              setSortBy("Purchases");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            # Purchases
          </th>
          <th
            onClick={() => {
              setSortBy("total");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <>
          {sortedData.map((item, index) => (
            <tr key={index + Math.random()}>
              <td>({index + 1})</td>

              <td>{item.fName + " " + item.lName}</td>
              <td>{item.email}</td>

              <td>{item.purchases.length}</td>
              <td>
                {`${sortedData
                  .flatMap((v) => v.purchases)
                  .flatMap((v) => v.products)
                  .map((v) => v.price)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)} $`}
              </td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default Table;
