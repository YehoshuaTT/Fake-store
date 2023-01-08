import "./table.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

const Table = ({ data, newProd }) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editMode, setEditMode] = useState({});
  const [tempValues, setTempValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const baseURL = "http://localhost:3001";
  let photoInput = useRef();

  useEffect(() => {
    const fetchCategorys = async () => {
      const { data } = await axios.get("http://localhost:3001/category/", {
        headers: { autherization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategories(data);
    };
    fetchCategorys();
  }, []);

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

  const SendNew = () => {
    const toUpdate = product;
    if (!product.category) {
      alert("no category");
      return;
    }

    const options = {
      method: "PUT",
      url: `${baseURL}/products'`,
      data: product,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("theproduct: ", product);
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

  return (
    <table id="edit-all-products-table">
      <thead>
        <tr>
          {!newProd && (
            <>
              <th>#</th>
              <th>ID</th>
            </>
          )}
          <th>image</th>
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
              setSortBy("category");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Category
          </th>
          <th
            onClick={() => {
              setSortBy("price");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Price
          </th>
          <th
            onClick={() => {
              setSortBy("instock");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            In Stock
          </th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
        {!newProd ? (
          <>
            {sortedData.map((item, index) => (
              <tr key={item.id}>
                <td>({index + 1})</td>
                <td>{item.id}</td>
                <td onClick={() => handleEdit(index, "image")}>
                  {editMode[index] === "image" ? (
                    <input
                      type="image"
                      name="image"
                      value={item.image}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    <img src={item.image} width="30px"></img>
                  )}
                </td>
                <td onClick={() => handleEdit(index, "name")}>
                  {editMode[index] === "name" ? (
                    <input
                      type="text"
                      name="name"
                      value={item.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td onClick={() => handleEdit(index, "category")}>
                  {editMode[index] === "category" ? (
                    <>
                      <select
                        type="text"
                        name="category"
                        value={item.category}
                        onChange={(e) => handleChange(e, index)}
                      >
                        {categories.map((v) => {
                          return <option value={v}>{v}</option>;
                        })}
                      </select>
                    </>
                  ) : (
                    item.category
                  )}
                </td>
                <td onClick={() => handleEdit(index, "price")}>
                  {editMode[index] === "price" ? (
                    <input
                      type="text"
                      name="price"
                      value={item.price}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td onClick={() => handleEdit(index, "inStock")}>
                  {editMode[index] === "inStock" ? (
                    <input
                      type="text"
                      name="inStock"
                      value={item.inStock}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    item.inStock
                  )}
                </td>
                <td onClick={() => handleEdit(index, "description")}>
                  {editMode[index] === "description" ? (
                    <textarea
                      id="description"
                      type="text"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  {editMode[index] && (
                    <>
                      <button onClick={() => handleSave(index)}>Save</button>
                      <button onClick={() => handleCancel(index)}>
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            {
              <tr key={Math.random()}>
                <td>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Noun_project_Upload.svg/100px-Noun_project_Upload.svg.png"
                    type="text"
                    name="image"
                    onClick={(e) => {
                      if (photoInput) photoInput.click();
                    }}
                    // handleNewProduct(e, "image")}
                  />
                  <input
                    ref={(input) => (photoInput = input)}
                    style={{ visibility: "hidden" }}
                    type="file"
                    onInput={(e) => console.log(e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleNewProduct(e, "name")}
                    placeholder="Title"
                  />
                </td>
                <td>
                  <>
                    <select
                      type="text"
                      name="category"
                      onChange={(e) => handleNewProduct(e, "category")}
                    >
                      {categories.map((v) => {
                        return <option value={v}>{v}</option>;
                      })}
                    </select>
                  </>
                </td>
                <td>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => handleNewProduct(e, "price")}
                    placeholder="price"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="inStock"
                    onChange={(e) => handleNewProduct(e, "inStock")}
                  />
                </td>
                <td>
                  <textarea
                    id="description"
                    type="text"
                    name="description"
                    onChange={(e) => handleNewProduct(e, "description")}
                  />
                </td>
                <td>
                  <>
                    <button onClick={() => SendNew()}>Creat</button>
                  </>
                </td>
              </tr>
            }
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
