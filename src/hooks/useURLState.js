import { useEffect } from "react";

function useURLState(amount, rate, tenure, setAmount, setRate, setTenure) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("amount")) {
      setAmount(Number(params.get("amount")));
    }
    if (params.get("rate")) {
      setRate(Number(params.get("rate")));
    }
    if (params.get("tenure")) {
      setTenure(Number(params.get("tenure")));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("amount", amount);
    params.set("rate", rate);
    params.set("tenure", tenure);
    window.history.replaceState(null, "", "?" + params.toString());
  }, [amount, rate, tenure]);
}

export default useURLState;
