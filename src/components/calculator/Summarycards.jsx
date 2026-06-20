"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import calculateEMI from "@/utils/emi";

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
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Summary</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mt-5 p-2">
        <div className="border rounded-xl p-2">
          <p className="text-xs text-gray-500 uppercase">Monthly EMI</p>

          <h3 className="text-xl font-bold text-blue-600 mt-2">
            ₹{emi.toFixed(2)}
          </h3>
        </div>

        <div className="border rounded-xl p-2">
          <p className="text-xs text-gray-500 uppercase">Total Interest</p>

          <h3 className="text-xl font-bold mt-2">
            ₹{totalInterest.toFixed(2)}
          </h3>
        </div>

        <div className="border rounded-xl p-2">
          <p className="text-xs text-gray-500 uppercase">Total Payable</p>

          <h3 className="text-xl font-bold mt-2">₹{totalPayable.toFixed(2)}</h3>
        </div>
      </div>

      {/* Principal vs Interest */}
      <div className="px-4 pb-4">
        <div className="flex justify-between mb-2">
          <p className="font-medium">Principal vs Interest</p>

          <p className="text-gray-500">
            {Principalshare.toFixed(2)}% /{Interestshare.toFixed(2)}%
          </p>
        </div>

        {/* Progress Bar */}
 <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
  <div className="h-full flex">
    <div
      className="bg-blue-600"
      style={{ width: `${Principalshare}%` }}
    />

    <div
      className="bg-orange-400"
      style={{ width: `${Interestshare}%` }}
    />
  </div>
</div>

        {/* Legend */}
        <div className="flex gap-6 mt-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Principal ₹{amount.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span>Interest ₹{totalInterest.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
