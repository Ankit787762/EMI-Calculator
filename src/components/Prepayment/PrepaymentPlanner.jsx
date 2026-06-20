"use client";

import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import calculateEMI from "@/utils/emi";
import PrepaymentSchedule from "./PrepaymentSchedule";

function buildSchedule(amount, rate, tenure, prepayments) {
  const r = rate / 12 / 100;
  const emi = calculateEMI(amount, rate, tenure);
  const prepMap = {};

  prepayments.forEach(({ month, amount: amt }) => {
    const m = Number(month);
    prepMap[m] = (prepMap[m] || 0) + Number(amt);
  });

  const schedule = [];
  let balance = amount;
  let month = 1;

  while (balance > 0 && month <= tenure + 12) {
    // apply prepayment before interest
    if (prepMap[month]) {
      balance = Math.max(0, balance - prepMap[month]);
    }

    if (balance === 0) {
      schedule.push({ month, emi: 0, principal: 0, interest: 0, prepayment: prepMap[month] || 0, balance: 0 });
      break;
    }

    const interest = balance * r;
    const principal = Math.min(emi - interest, balance);
    balance = Math.max(0, balance - principal);

    schedule.push({
      month,
      emi: principal + interest,
      principal,
      interest,
      prepayment: prepMap[month] || 0,
      balance,
    });

    if (balance === 0) break;
    month++;
  }

  return schedule;
}

function PrepaymentPlanner() {
  const { amount, rate, tenure, prepayments, setPrepayments } = useContext(AppContext);

  const [inputMonth, setInputMonth] = useState(12);
  const [inputAmount, setInputAmount] = useState(100000);

  const emi = calculateEMI(amount, rate, tenure);
  const originalInterest = emi * tenure - amount;

  const schedule = buildSchedule(amount, rate, tenure, prepayments);
  const newTenure = schedule.length;
  const newInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const interestSaved = originalInterest - newInterest;
  const tenureReduced = tenure - newTenure;

  const fmt = (n) => "₹" + Math.abs(Math.round(n)).toLocaleString("en-IN");

  const addPrepayment = () => {
    const m = Number(inputMonth);
    const a = Number(inputAmount);
    if (!m || !a || m < 1 || m > tenure) return;
    setPrepayments((prev) => [...prev, { month: m, amount: a }]);
  };

  const removePrepayment = (index) => {
    setPrepayments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Top Section */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-base font-semibold text-gray-900">Prepayment Planner</h2>
        <p className="text-xs text-gray-500 mt-0.5 mb-4">
          Schedule lump-sum payments and see interest saved
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Add Prepayment */}
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-medium text-gray-600 mb-3">Add a one-time prepayment</p>

            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Month</label>
                <input
                  type="number"
                  value={inputMonth}
                  min={1}
                  max={tenure}
                  onChange={(e) => setInputMonth(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Amount (₹)</label>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addPrepayment}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Prepayment List */}
            {prepayments.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">
                No prepayments yet. Add one above to see the impact.
              </p>
            ) : (
              <div className="space-y-2 mt-2">
                {prepayments.map((p, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border border-gray-100 rounded-lg px-3 py-2">
                    <span className="text-gray-600">Month {p.month}</span>
                    <span className="font-medium">{fmt(p.amount)}</span>
                    <button onClick={() => removePrepayment(i)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Impact Summary */}
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Prepayment Impact
            </p>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Interest Saved</span>
              <span className="font-bold text-green-600">{fmt(interestSaved)}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">Tenure Reduced By</span>
              <span className="font-bold text-green-600">
                {tenureReduced > 0 ? `${tenureReduced} months` : "—"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400">Original Tenure</p>
                <p className="text-sm font-semibold mt-0.5">
                  {Math.floor(tenure / 12) > 0 ? `${Math.floor(tenure / 12)} yr` : ""} {tenure % 12 > 0 ? `${tenure % 12} mo` : ""}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">New Tenure</p>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">
                  {Math.floor(newTenure / 12) > 0 ? `${Math.floor(newTenure / 12)} yr` : ""} {newTenure % 12 > 0 ? `${newTenure % 12} mo` : ""}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Original Interest</p>
                <p className="text-sm font-semibold mt-0.5">{fmt(originalInterest)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">New Interest</p>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">{fmt(newInterest)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adjusted Schedule */}
      <PrepaymentSchedule schedule={schedule} />
    </div>
  );
}

export default PrepaymentPlanner;