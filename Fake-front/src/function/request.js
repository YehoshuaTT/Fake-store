import axios from "axios";

const baseURL = "http://localhost:3001";

const makeRequest = async (options) => {
  try {
    const { method, path, data } = options;
    const response = await axios({
      url: `${baseURL}${path}`,
      method,
      data,
      headers: { autherization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default makeRequest;
