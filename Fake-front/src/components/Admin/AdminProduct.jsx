import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../Table/Table";

function AdminProduct() {
  const baseURL = "http://localhost:3001";

  const [pId, setpId] = useState("");
  const [pTitle, setpTitle] = useState("nail");
  const [pPrice, setpPrice] = useState(500);
  const [pDescription, setpDescription] = useState("no description");
  const [pCategory, setpCategory] = useState("hardwear");
  const [pImage, setpImage] = useState(
    "https://www.ironwirenails.com/img/concrete-nail.jpg"
  );
  const [pInStock, setpInStock] = useState(1);
  const [pDiscount, setPDiscount] = useState(0);
  const [gotProduct, setGotProduct] = useState(null);
  const [input, setInput] = useState(null);
  let updateButton = "find product";
  async function now() {
    return;
    // console.log("all", await axios.get(`${baseURL}/product/all`) )
  }
  now();
  const updateProduct = async () => {
    console.log(input);
    let { data } = await axios.get(`${baseURL}/product?id=${input}`);
    console.log(data);
    if (data.error) alert("cant find the request");
    else {
      setpId(data.id);
      setpTitle(data.title);
      setpPrice(data.price);
      setpDescription(data.description);
      setpCategory(data.category);
      setpImage(data.image);
      setpInStock(data.inStock);
      setPDiscount(data.discount);
      let updateProduct = {
        id: pId,
        title: pTitle,
        price: pPrice,
        description: pDescription,
        category: pCategory,
        image: pImage,
        inStock: pInStock,
      };
      setGotProduct(updateProduct);
      //  let respons = await axios.post (`${baseURL}/product`, updateProduct)
      //  console.log(respons);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    let updateProduct = {
      id: pId,
      title: pTitle,
      price: pPrice,
      description: pDescription,
      category: pCategory,
      image: pImage,
      inStock: pInStock,
    };
    let respons = await axios.put(`${baseURL}/product`, updateProduct);
    console.log(respons);
  };
  const submitnew = async (e) => {
    e.preventDefault();
    let updateProduct = {
      id: pId + 1,
      title: pTitle,
      price: pPrice,
      description: pDescription,
      category: pCategory,
      image: pImage,
      inStock: pInStock,
    };
    let respons = await axios.post(`${baseURL}/product`, updateProduct);
    console.log(respons);
  };

  const [prods, setProds] = useState();
  const getAllproducts = async () => {
    const { data } = await axios.get(`${baseURL}/product/all/`);
    setProds(data);
    console.log(prods);
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  console.log(prods);

  return (
    <div className="admin-update">
      <div className="get-pruduct"></div>
      {prods && <Table data={prods} />}
    </div>
  );
}

export default AdminProduct;
