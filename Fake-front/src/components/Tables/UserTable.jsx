import "./table.css";
import React, { useState } from "react";

const UserTable = ({ data }) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editMode, setEditMode] = useState({});
  const [tempValues, setTempValues] = useState({});

  const sortedData =
    data &&
    data.length > 0 &&
    data.sort((a, b, i) => {
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
    setTempValues({ ...tempValues, [index]: { ...sortedData[index] } });
    setEditMode({ ...editMode, [index]: field });
  };

  const handleChange = (e, index) => {
    const newItems = [...sortedData];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const handleSave = (index) => {
    setItems([
      ...sortedData.slice(0, index),
      tempValues[index],
      ...sortedData.slice(index + 1),
    ]);
    setEditMode({ ...editMode, [index]: null });
    setTempValues({ ...tempValues, [index]: null });
    // const options = {
    //   method: "PUT",
    //   url: `${baseURL}/products'`,
    //   data: items[index],
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log("theprodect: ", items[index]);
    // sendUpdate();
  };

  const handleCancel = (index) => {
    setItems([
      ...sortedData.slice(0, index),
      tempValues[index],
      ...sortedData.slice(index + 1),
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

          <th className="user-password">Password</th>
          <th>Permission</th>
          <th>Purchases</th>
          {editMode[0] && <th>edit</th>}
        </tr>
      </thead>
      <tbody>
        <>
          {sortedData.map((item, index) => (
            <tr key={index + Math.random()}>
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
                  <input
                    type="text"
                    name="email"
                    value={item.email}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td onClick={() => handleEdit(index, "dob")}>
                {editMode[index] === "dob" ? (
                  <input
                    type="text"
                    name="dob"
                    value={item.dob}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.dob.slice(0, 10)
                )}
              </td>
              <td
                className="user-password"
                onClick={() => handleEdit(index, "password")}
              >
                {editMode[index] === "password" ? (
                  <input
                    type="text"
                    name="password"
                    value={item.password}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  item.password
                )}
              </td>
              <td onClick={() => handleEdit(index, "permission")}>
                {editMode[index] === "permission" ? (
                  <>
                    <select
                      type="text"
                      name="permissions"
                      value={item.permissions}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <option value="admin">Admin</option>;
                      <option value="editor">editor</option>;
                      <option value="customer">Customer</option>;
                    </select>
                  </>
                ) : (
                  item.permissions
                )}
              </td>
              <td>{item.purchases.length}</td>
              {editMode[index] && (
                <td>
                  <button onClick={() => handleSave(index)}>Save</button>
                  <button onClick={() => handleCancel(index)}>Cancel</button>
                </td>
              )}
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};

export default UserTable;
