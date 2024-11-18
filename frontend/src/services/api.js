import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL if deployed
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the Authorization token dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// API helper functions

// User APIs
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

// Car APIs
// export const createCar = (carData) => api.post("/cars", carData);
export const createCar = (carData) =>
  api.post("/cars", carData, {
    headers: { "Content-Type": "multipart/form-data" }, // Explicit for FormData
  });
export const getCars = (search = "") => api.get(`/cars?keyword=${search}`);
export const getCarById = (id) => api.get(`/cars/${id}`);
// export const updateCar = (id, carData) => api.put(`/cars/${id}`, carData);
export const updateCar = (id, carData) =>
  api.put(`/cars/${id}`, carData, {
    headers: { "Content-Type": "multipart/form-data" }, // Explicit for FormData
  });
export const deleteCarById = (id) => api.delete(`/cars/${id}`);

export default api;
