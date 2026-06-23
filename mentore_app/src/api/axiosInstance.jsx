import axios from "axios";

const axiosInstance = axios.create({
  // import.meta.env.VITE_API_BASE_URL
  baseURL: "http://localhost:5000/api",
  withCredentials: true,

  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   timeout: 10000,
});

export default axiosInstance;

// with JWT Token

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
