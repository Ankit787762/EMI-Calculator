"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import calculateEMI from "@/utils/emi";
import RatioBar from "./RatioBar";

 function SummaryCards() {
  const { amount, rate, tenure } = useContext(AppContext);
  const emi = calculateEMI(amount, rate, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;
  const Principalshare = (amount / totalPayable) * 100;
  const Interestshare = (totalInterest / totalPayable) * 100;

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Header */}
      <div className="border-b p-3">
        <h2 className="text-lg font-semibold">Summary</h2>
      </div>

      {/* Cards */}
   
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4">
  <div className="border rounded-xl p-4">
    <p className="text-xs text-gray-500 uppercase">Monthly EMI</p>
    <h3 className="text-xl font-bold text-blue-600 mt-2 break-all">
      ₹{emi.toFixed(2)}
    </h3>
  </div>

  <div className="border rounded-xl p-4">
    <p className="text-xs text-gray-500 uppercase">Total Interest</p>
    <h3 className="text-xl font-bold mt-2 break-all">
      ₹{totalInterest.toFixed(2)}
    </h3>
  </div>

  <div className="border rounded-xl p-4">
    <p className="text-xs text-gray-500 uppercase">Total Payable</p>
    <h3 className="text-xl font-bold mt-2 break-all">
      ₹{totalPayable.toFixed(2)}
    </h3>
  </div>
</div>

      {/* Principal vs Interest */}
      <RatioBar
        Principalshare={Principalshare}
        Interestshare={Interestshare}
        amount={amount}
        totalInterest={totalInterest}
      />
    </div>
  );
}

export default SummaryCards;
