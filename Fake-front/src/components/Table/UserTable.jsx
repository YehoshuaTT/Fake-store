import "./table.css";
import React, { useEffect, useState } from "react";

const UserTable = ({ data }) => {
  console.log(data);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editMode, setEditMode] = useState({});
  const [tempValues, setTempValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const baseURL = "http://localhost:3001";

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

  const [items, setItems] = useState(sortedData);
  const handleEdit = (index, field) => {
    setTempValues({ ...tempValues, [index]: { ...items[index] } });
    setEditMode({ ...editMode, [index]: field });
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
    const options = {
      method: "PUT",
      url: `${baseURL}/products'`,
      data: items[index],
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("theprodect: ", items[index]);
    // sendUpdate();
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

  const handleCart = () => {
    return;
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
            Name
          </th>
          <th
            onClick={() => {
              setSortBy("lastName");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Last Name
          </th>
          <th>Email</th>
          <th>Date Of Birth</th>
          <th>Password</th>
          <th>Permission</th>
          <th>Cart</th>
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
                    value={item.fName}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.fName
                )}
              </td>
              <td onClick={() => handleEdit(index, "lastName")}>
                {editMode[index] === "lastName" ? (
                  <input
                    type="text"
                    name="lastName"
                    value={item.lName}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.lName
                )}
              </td>
              <td onClick={() => handleEdit(index, "email")}>
                {editMode[index] === "email" ? (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={item.email}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </>
                ) : (
                  item.email
                )}
              </td>
              <td onClick={() => handleEdit(index, "dob")}>
                {editMode[index] === "dob" ? (
                  <input
                    type="date"
                    name="dob"
                    value={item.dob}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.dob.slice(0, 10)
                  // "sa"
                )}
              </td>
              <td onClick={() => handleEdit(index, "pass")}>
                {editMode[index] === "pass" ? (
                  <input
                    type="text"
                    name="pass"
                    value={item.password}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.password
                )}
              </td>
              <td onClick={() => handleEdit(index, "permissions")}>
                {editMode[index] === "permissions" ? (
                  <select
                    type="text"
                    name="permissions"
                    value={item.permission}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value={"admin"}>Admin</option>;
                    <option value={"costumer"}>Costumer</option>;
                    <option value={"editor"}>Editor</option>;
                  </select>
                ) : (
                  item.permissions
                )}
              </td>
              <td>
                <button onClick={() => handleCart()}>User cart</button>
              </td>
              <td>
                {editMode[index] && (
                  <>
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => handleCancel(index)}>Cancel</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default UserTable;
