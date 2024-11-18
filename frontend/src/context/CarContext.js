import React, { createContext, useState } from "react";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
};
