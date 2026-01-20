import axios from "axios";

// Base API client
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // sesuaikan dengan backend
});

// Menambahkan JWT token otomatis jika ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
