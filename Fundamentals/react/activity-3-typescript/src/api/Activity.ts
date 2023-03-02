import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5011/api/",
});

export default api;
