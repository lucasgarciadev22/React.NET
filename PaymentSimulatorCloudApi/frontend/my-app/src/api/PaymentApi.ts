import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7223/",
});

export default api;
