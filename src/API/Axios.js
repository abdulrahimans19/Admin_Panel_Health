import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

const Instance = axios.create({ baseURL });

Instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("sophwe_token"));

    if (token?.tokens?.access_token) {
      config.headers["Authorization"] = "Bearer " + token?.tokens?.access_token;
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
