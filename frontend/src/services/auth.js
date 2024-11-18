import axios from 'axios';

// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Clear token from localStorage
export const clearToken = () => {
  localStorage.removeItem("token");
};

// Set the Authorization token dynamically for API requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Check if the user is logged in (if token exists in localStorage)
export const isLoggedIn = () => {
  return !!getToken();
};
