import axios from "axios";

const baseURL = "http://localhost:3001";
const apiCalls = async (method, url, data) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  try {
    const res = await axios({
      method: method,
      url: `${baseURL}${url}`,
      data: data,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default apiCalls;
