import axios from "axios";

// export const setToken = async (token) => {
//     // when you do logout pass the parameter as an empty string
//     axios.defaults.headers.common.Authorization = token? `Bearer ${token}`:null;

// }
const baseURL = "http://localhost:3001";
const apiCalls = async (method, url, data) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  console.log(" +++  \n api call - send ", method, url, data);
  try {
    console.log(axios.defaults);
    const res = await axios({
      method: method,
      url: `${baseURL}${url}`,
      data: data,
    });

    console.log(" +++  \n api call - res", res);
    return res;
  } catch (error) {
    // console.log(" +++  \n api call - error", error);
    throw error;
  }
};

export default apiCalls;
