"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(2);
  const [tenure, setTenure] = useState(36);
  const [mode,setMode] = useState("");
  const [view, setView] = useState("table");

  const channelRef = useRef(null);

  useEffect(() => {
  channelRef.current = new BroadcastChannel("loan-sync");

  channelRef.current.onmessage = (event) => {
    const data = event.data;

    setAmount(data.amount);
    setRate(data.rate);
    setTenure(data.tenure);
    setMode(data.mode);
    setView(data.view);
  };

  return () => {
    channelRef.current.close();
  };
}, []);

  useEffect(() => {
  if (!channelRef.current) return;

  channelRef.current.postMessage({
    amount,
    rate,
    tenure,
    mode,
    view,
  });
}, [amount, rate, tenure, mode, view]);

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
        view,
        setView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;