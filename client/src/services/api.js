import axios from "axios";

// ✅ Create axios instance for backend
const API = axios.create({
  baseURL: "https://camera-rental-backend.onrender.com"
});

// 🔐 AUTH APIs
export const registerUser = (data) =>
  API.post("/api/auth/register", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

// 📸 CAMERA APIs (your existing ones)
export const addCamera = (data) =>
  API.post("/cameras", data);

export const getCameras = () =>
  API.get("/cameras");
