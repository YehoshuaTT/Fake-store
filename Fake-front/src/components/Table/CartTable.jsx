import "./table.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

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

  const baseURL = "http://localhost:3001";
  const [items, setItems] = useState(sortedData);
  const [editMode, setEditMode] = useState({});
  const [tempValues, setTempValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  let photoInput = useRef();

  const handleEdit = (index, field) => {
    setTempValues({ ...tempValues, [index]: { ...items[index] } });
    setEditMode({ ...editMode, [index]: field });
  };

  const handleNewProduct = (e, prop) => {
    const newItems = product;
    newItems[prop] = e.target.value;
    console.log(newItems);
    setProduct(newItems);
  };

  const handleChange = (e, index) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const handleSave = (index) => {
    setItems([
      ...items.slice(0, index),
      tempValues[index],
      ...items.slice(index + 1),
    ]);
    setEditMode({ ...editMode, [index]: null });
    setTempValues({ ...tempValues, [index]: null });
  };

  const handleCancel = (index) => {
    setItems([
      ...items.slice(0, index),
      tempValues[index],
      ...items.slice(index + 1),
    ]);
    setEditMode({ ...editMode, [index]: null });
    setTempValues({ ...tempValues, [index]: null });
  };

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
            <tr key={item.id}>
              <td>({index + 1})</td>

              <td onClick={() => handleEdit(index, "name")}>
                {editMode[index] === "name" ? (
                  <input
                    type="text"
                    name="name"
                    value={item.fName + item.lName}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.fName + " " + item.lName
                )}
              </td>
              <td>{item.email}</td>

              <td onClick={() => handleEdit(index, "purchases")}>
                {editMode[index] === "purchases" ? (
                  <input
                    type="text"
                    name="price"
                    // value={item.purchases.length}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  "NA"
                  // item.purchases.length
                )}
              </td>
              <td onClick={() => handleEdit(index, "total")}>
                {
                  editMode[index] === "total" ? (
                    <input
                      type="text"
                      name="total"
                      // value={item.purchases.total}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : null
                  // sortedData
                  //   .map((v) => {
                  //     return v.purchases.total;
                  //   })
                  //   .reduce(function (acc, val) {
                  //     return acc + val;
                  //   }, 0)

                  // item.purchases.total
                }
              </td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default Table;
