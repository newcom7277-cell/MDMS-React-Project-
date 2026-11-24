
import axios from "axios";

// Common base URL for all backend APIs
export const API_BASE_URL = "http://localhost:5178/api";

// Common Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
