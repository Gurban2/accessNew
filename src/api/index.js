import axios from "axios";
import { AppPaths } from "../constants/appPaths";

const apiClient = axios.create({
  baseURL: "https://access-api.zenstore.az/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location = AppPaths.login;
    }
    return Promise.reject(error);
  },
);

export default apiClient;
