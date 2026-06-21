import { useEffect } from "react";

function useUndoSync(historyRef, isSyncingRef, setAmount, setRate, setTenure, setMode, setView, setTheme, setPrepayments) {

  useEffect(() => {
    
    function handleKeyPress(e) {
      // Ctrl+Z ya Cmd+Z check karo
      const isUndo = (e.ctrlKey || e.metaKey) && e.key === "z";
      if (!isUndo) return;

      // History se last state nikalo
      const previousState = historyRef.current.pop();
      if (!previousState) return; // kuch nahi hai undo karne ko

      // Purani state wapas lagao
      isSyncingRef.current = false;
      setAmount(previousState.amount);
      setRate(previousState.rate);
      setTenure(previousState.tenure);
      setMode(previousState.mode);
      setView(previousState.view);
      setTheme(previousState.theme);
      setPrepayments(previousState.prepayments);
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
}

export default useUndoSync;