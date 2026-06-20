"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(2);
  const [tenure, setTenure] = useState(36);
  const [mode,setMode] = useState("");
  const [view, setView] = useState("table");
  const [activeTabs, setActiveTabs] = useState(1);

  const channelRef = useRef(null);

  useEffect(() => {
  channelRef.current = new BroadcastChannel("loan-sync");
 

   channelRef.current.postMessage({
    type: "TAB_OPEN",
    id: tabId.current,
  });

channelRef.current.onmessage = (event) => {
  const data = event.data;

  if (data.type === "TAB_OPEN") {
    setActiveTabs((prev) => prev + 1);
    return;
  }

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

  const tabId = useRef(crypto.randomUUID());

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
        activeTabs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;