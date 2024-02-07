import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL;

const BulkInstance = axios.create({ baseURL });

BulkInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("sophwe_token"));

    if (token?.tokens?.access_token) {
      config.headers["Authorization"] = "Bearer " + token?.tokens?.access_token;
    }
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log(error);
  }
);
export default BulkInstance;
