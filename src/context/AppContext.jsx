"use client";

import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(2);
  const [tenure, setTenure] = useState(36);
  const [mode,setMode] = useState("");

  return (
    <AppContext.Provider
      value={{
        amount,
        setAmount,
        rate,
        setRate,
        tenure,
        setTenure,
        mode,
        setMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;