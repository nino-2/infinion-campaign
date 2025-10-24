// src/api/axiosIntegration.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://infinion-test-int-test.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
