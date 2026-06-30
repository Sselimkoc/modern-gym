import React, { createContext, useContext, useState } from "react";

const GymContext = createContext();

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error("useGym must be used within a GymProvider");
  }
  return context;
};

export const GymProvider = ({ children }) => {
  const [selectedGym, setSelectedGym] = useState(null);

  return (
    <GymContext.Provider value={{ selectedGym, setSelectedGym }}>
      {children}
    </GymContext.Provider>
  );
};

export default GymContext;
