import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If you want to send cookies with every request
});

// Optional: Add interceptors for auth or error handling
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Attach token if using auth
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
