import "./table.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

const Table = ({ data, newProductState }) => {
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [newCat, setNewCat] = useState(false);

  const sortedData = data.sort((a, b, i) => {
    if (sortBy === "title") {
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
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  let photoInput = useRef();
  useEffect(() => {
    const fetchCategorys = async () => {
      const { data } = await axios.get(`${baseURL}/category/all`);
      setCategories(data);
    };
    fetchCategorys();
  }, []);

  const handleNewProduct = (e, prop) => {
    const newItems = product;
    newItems[prop] = e.target.value;
    console.log(newItems);
    setProduct(newItems);
  };

  const SendNew = async () => {
    console.log("theproduct: ", product);
    const { data } = await axios.post(`${baseURL}/product`, product);
    console.log(data);
  };

  return (
    <table id="edit-all-products-table">
      <thead>
        <tr>
          <th>image</th>
          <th
            onClick={() => {
              setSortBy("title");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Title
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
        {
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
                  />
                  <input
                    ref={(input) => (photoInput = input)}
                    style={{ visibility: "hidden" }}
                    type="file"
                    onInput={(e) => handleNewProduct(e, "image")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => handleNewProduct(e, "title")}
                    placeholder="Title"
                  />
                </td>
                <td>
                  <>
                    <select
                      type="text"
                      name="category"
                      onChange={(e) => {
                        if (e.target.value == "New Category") {
                          setNewCat(true);
                        } else {
                          setNewCat(false);
                          handleNewProduct(e, "category");
                        }
                      }}
                    >
                      <option>Select</option>
                      {categories.map((v) => {
                        return <option value={v}>{v}</option>;
                      })}
                      <option>New Category</option>
                    </select>
                    {newCat && (
                      <input
                        type="text"
                        placeholder="New Category"
                        name="category"
                        onChange={(e) => handleNewProduct(e, "category")}
                      ></input>
                    )}
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
        }
      </tbody>
    </table>
  );
};

export default Table;
