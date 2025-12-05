import axios from "axios";

const API = axios.create({
  baseURL: "https://task-5tje.onrender.com",   // ✅ apna backend port yahin rakho
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
