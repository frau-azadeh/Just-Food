import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1", // Base URL for all API requests
  timeout: 5000, // Optional: Set a timeout for requests
});

export default api;
