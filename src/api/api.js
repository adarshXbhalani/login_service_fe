import axios from "axios";
import { getToken } from "../services/tokenService";

const api = axios.create({
  baseURL: "http://localhost:8081"
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    // ❌ Do NOT attach token to auth APIs
    if (token && !config.url.includes("/auth")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
