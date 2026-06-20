"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(2);
  const [tenure, setTenure] = useState(36);
  const [mode, setMode] = useState("");
  const [view, setView] = useState("table");
  const [theme, setTheme] = useState("light"); // ← ADD THIS

  const [activeTabs, setActiveTabs] = useState(1);
  const [tabId, setTabId] = useState("");

  const channelRef = useRef(null);
  const presenceRef = useRef({});

  // Apply theme to document root whenever it changes
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

  useEffect(() => {
    const id = crypto.randomUUID().slice(0, 6);
    setTabId(id);

    const channel = new BroadcastChannel("loan-sync");
    channelRef.current = channel;

    presenceRef.current[id] = Date.now();
    setActiveTabs(1);

    channel.postMessage({ type: "TAB_JOIN", id });

    const heartbeat = setInterval(() => {
      presenceRef.current[id] = Date.now();
      channel.postMessage({ type: "HEARTBEAT", id, timestamp: Date.now() });
    }, 2000);

    const cleanup = setInterval(() => {
      const now = Date.now();
      Object.keys(presenceRef.current).forEach((tab) => {
        if (now - presenceRef.current[tab] > 5000) {
          delete presenceRef.current[tab];
        }
      });
      setActiveTabs(Object.keys(presenceRef.current).length);
    }, 2000);

    channel.onmessage = (event) => {
      const data = event.data;

      if (data.type === "TAB_JOIN") {
        presenceRef.current[data.id] = Date.now();
        channel.postMessage({ type: "HEARTBEAT", id, timestamp: Date.now() });
        setActiveTabs(Object.keys(presenceRef.current).length);
        return;
      }

      if (data.type === "HEARTBEAT") {
        presenceRef.current[data.id] = data.timestamp;
        setActiveTabs(Object.keys(presenceRef.current).length);
        return;
      }

      if (data.type === "STATE_UPDATE") {
        setAmount(data.amount);
        setRate(data.rate);
        setTenure(data.tenure);
        setMode(data.mode);
        setView(data.view);
        setTheme(data.theme); // ← ADD THIS
        return;
      }
    };

    return () => {
      clearInterval(heartbeat);
      clearInterval(cleanup);
      delete presenceRef.current[id];
      channel.close();
    };
  }, []);

  useEffect(() => {
    if (!channelRef.current) return;
    channelRef.current.postMessage({
      type: "STATE_UPDATE",
      amount,
      rate,
      tenure,
      mode,
      view,
      theme, // ← ADD THIS
    });
  }, [amount, rate, tenure, mode, view, theme]); // ← ADD theme here

  return (
    <AppContext.Provider
      value={{
        amount, setAmount,
        rate, setRate,
        tenure, setTenure,
        mode, setMode,
        view, setView,
        theme, setTheme, // ← ADD THIS
        activeTabs,
        tabId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;