"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

 function LoanInputs() {
  const { amount, setAmount, rate, setRate, tenure, setTenure } =
    useContext(AppContext);

  return (
    <div className="bg-white rounded-xl shadow p-4 min-h-[540px]">
      <h2 className="text-lg font-semibold">Loan Details</h2>

      <p className="text-xs text-gray-500 mb-4">
        Adjust and watch every tab update
      </p>

      
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-600">
            Loan Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-28 border border-gray-300 rounded-lg px-2 py-1 text-right text-sm"
          />
        </div>

        <input
          type="range"
          min="10000"
          max="5000000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹10k</span>
          <span>₹50L</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-600">
            Interest Rate(p.a)
          </label>

          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-28 border border-gray-300 rounded-lg px-2 py-1 text-right text-sm"
          />
        </div>

        <input
          type="range"
          min="1"
          max="36"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1%</span>
          <span>30%</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-600">
            Tenure
          </label>

          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-28 border border-gray-300 rounded-lg px-2 py-1 text-right text-sm"
          />
        </div>

        <input
          type="range"
          min="1"
          max="120"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>7yr</span>
        </div>
      </div>
    </div>
  );
}

export default LoanInputs;
