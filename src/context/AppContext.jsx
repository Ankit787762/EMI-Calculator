"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(2);
  const [tenure, setTenure] = useState(36);
  const [mode, setMode] = useState("single");
  const [view, setView] = useState("table");
  const [theme, setTheme] = useState("light");
  const [prepayments, setPrepayments] = useState([]);
  const [activeTabs, setActiveTabs] = useState(1);
  const [tabId, setTabId] = useState("");

  const channelRef = useRef(null);
  const presenceRef = useRef({});
  const isSyncingRef = useRef(false); // ← ADD THIS

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
        isSyncingRef.current = true;
        setAmount(data.amount);
        setRate(data.rate);
        setTenure(data.tenure);
        setMode(data.mode);
        setView(data.view);
        setTheme(data.theme);
        setPrepayments(data.prepayments ?? []);
        setTimeout(() => {
          isSyncingRef.current = false;
        }, 100); // ← change 0 to 100
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
    if (isSyncingRef.current) return; // ← SKIP broadcast if we just received one
    channelRef.current.postMessage({
      type: "STATE_UPDATE",
      amount,
      rate,
      tenure,
      mode,
      view,
      theme,
      prepayments,
    });
  }, [amount, rate, tenure, mode, view, theme, prepayments]);

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
        theme,
        setTheme,
        prepayments,
        setPrepayments,
        activeTabs,
        tabId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
