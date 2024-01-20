import axios from "axios";
const baseURL = "https://sophwe.theowpc.com/api/";

const Instance = axios.create({ baseURL });

Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sophwe_token");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log(error);
  }
);

export default Instance;