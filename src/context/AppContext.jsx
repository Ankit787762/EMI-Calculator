"use client";

import useUndoSync from "@/hooks/useUndoSync";
import { createContext, useEffect, useRef, useState } from "react";
import useURLState from "@/hooks/useURLState";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(11);
  const [tenure, setTenure] = useState(36);
  const [mode, setMode] = useState("single");
  const [view, setView] = useState("table");
  const [theme, setTheme] = useState("light");
  const [prepayments, setPrepayments] = useState([]);
  const [activeTabs, setActiveTabs] = useState(1);
  const [tabId, setTabId] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const [tabNumber, setTabNumber] = useState(1);

  const channelRef = useRef(null);
  const presenceRef = useRef({});
  const isSyncingRef = useRef(false);
  const historyRef = useRef([]);
  const stateRef = useRef({});
  const myIdRef = useRef("");

  useURLState(amount, rate, tenure, setAmount, setRate, setTenure);

  useEffect(() => {
    stateRef.current = { amount, rate, tenure, mode, view, theme, prepayments };
  }, [amount, rate, tenure, mode, view, theme, prepayments]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function pushHistory() {
    historyRef.current.push({ ...stateRef.current });
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
    }
  }

  function checkAndSetLeader() {
    const allTabIds = Object.keys(presenceRef.current).sort();
    const amILeader = allTabIds[0] === myIdRef.current;
    setIsLeader(amILeader);

    const myPosition = allTabIds.indexOf(myIdRef.current) + 1;
    setTabNumber(myPosition);

    return amILeader;
  }

  useUndoSync(
    historyRef,
    isSyncingRef,
    setAmount,
    setRate,
    setTenure,
    setMode,
    setView,
    setTheme,
    setPrepayments,
  );

  useEffect(() => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const shortId = Math.random().toString(36).slice(2, 6).toUpperCase();

    myIdRef.current = id;
    setTabId(shortId); //  UI mein short id dikhao

    const channel = new BroadcastChannel("loan-sync");
    channelRef.current = channel;

    presenceRef.current[id] = Date.now();
    setActiveTabs(1);

    // pehla tab khula 200ms baad check karo leader kaun
    setTimeout(() => {
      checkAndSetLeader();
    }, 200);

    channel.postMessage({ type: "TAB_JOIN", id });

    const heartbeat = setInterval(() => {
      presenceRef.current[id] = Date.now();
      channel.postMessage({ type: "HEARTBEAT", id, timestamp: Date.now() });
    }, 2000);

    const cleanup = setInterval(() => {
      const now = Date.now();
      Object.keys(presenceRef.current).forEach((tab) => {
        if (now - presenceRef.current[tab] > 3000) {
          delete presenceRef.current[tab];
        }
      });
      setActiveTabs(Object.keys(presenceRef.current).length);
      checkAndSetLeader(); // tab band hone pe bhi check karo
    }, 1000);

    channel.onmessage = (event) => {
      const data = event.data;

      if (data.type === "TAB_JOIN") {
        presenceRef.current[data.id] = Date.now();
        channel.postMessage({ type: "HEARTBEAT", id, timestamp: Date.now() });
        setActiveTabs(Object.keys(presenceRef.current).length);

        // 100ms baad check karo presenceRef update hone do
        setTimeout(() => {
          const amILeader = checkAndSetLeader();
          // agar main leader hun toh naye tab ko state bhejo
          if (amILeader) {
            channel.postMessage({
              type: "STATE_SYNC",
              targetId: data.id,
              ...stateRef.current,
            });
          }
        }, 300);
        return;
      }

      if (data.type === "HEARTBEAT") {
        presenceRef.current[data.id] = data.timestamp;
        setActiveTabs(Object.keys(presenceRef.current).length);
        checkAndSetLeader(); // heartbeat pe bhi leader check karo
        return;
      }

      // naya tab leader se state leta hai
      if (data.type === "STATE_SYNC" && data.targetId === id) {
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
        }, 500);
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
        }, 500);
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
    if (isSyncingRef.current) return;
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
        isLeader,
        tabNumber,
        pushHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
