import React, { createContext, useState } from "react";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setAuthToken(newToken); // Set the token for all future API requests
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthToken(null); // Remove the token from API requests
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
