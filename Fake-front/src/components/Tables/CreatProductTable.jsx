import "./table.css";
import apiCalls from "../../functions/apiRequest";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Table = () => {
  const [newCat, setNewCat] = useState(false);

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});

  let photoInput = useRef();

  useEffect(() => {
    const fetchCategorys = async () => {
      apiCalls("get", `/category/all`).then(({ data }) => {
        setCategories(data);
      });
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
    apiCalls("post", `/product`, product).then(({ data }) => {
      console.log(data);
    });
  };

  return (
    <table id="edit-all-products-table">
      <thead>
        <tr>
          <th>image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>In Stock</th>
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
                  <button onClick={() => SendNew()}>Creat</button>
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
