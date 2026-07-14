import React, { createContext, useContext, useMemo, useState } from "react";

const JoinModalContext = createContext(null);

export const JoinModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openJoinModal: () => setIsOpen(true),
      closeJoinModal: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <JoinModalContext.Provider value={value}>
      {children}
    </JoinModalContext.Provider>
  );
};

export const useJoinModal = () => {
  const context = useContext(JoinModalContext);
  if (!context) {
    throw new Error("useJoinModal must be used within a JoinModalProvider");
  }
  return context;
};
