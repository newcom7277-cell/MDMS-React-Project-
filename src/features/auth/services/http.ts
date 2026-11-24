
import axios from "axios";

// Common backend URL
const http = axios.create({
  baseURL: "http://localhost:5178/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
