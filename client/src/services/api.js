
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers.set("Content-Type", "application/json");
  } else {
    config.headers.delete("Content-Type");
  }

  return config;
});

export default api;
