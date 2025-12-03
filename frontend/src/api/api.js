import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",   // ✅ apna backend port yahin rakho
});

// ✅ AUTO TOKEN ATTACH TO EVERY REQUEST (POST, GET, PUT, DELETE)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
