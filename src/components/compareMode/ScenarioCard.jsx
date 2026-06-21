"use client";

import calculateEMI from "@/utils/emi";

function ScenarioCard({
  scenario,
  index,
  onChange,
  onRemove,
  isBest,
  canRemove,
}) {
  const emi = calculateEMI(scenario.amount, scenario.rate, scenario.tenure);
  const totalPayable = emi * scenario.tenure;
  const totalInterest = totalPayable - scenario.amount;

  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div
      className={`relative bg-white rounded-xl p-4 flex-1 min-w-[260px] border-2 transition-all
      ${isBest ? "border-green-500 bg-green-50" : "border-gray-200"}`}
    >
      {isBest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-0.5 rounded-full font-semibold whitespace-nowrap">
          BEST VALUE
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          {scenario.name || `Scenario ${index + 1}`}
        </h3>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 text-xl font-bold leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Amount */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs text-gray-500">Amount</label>
          <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
            <span className="text-xs text-gray-400">₹</span>
            <input
              type="number"
              value={scenario.amount}
              onChange={(e) =>
                onChange({ ...scenario, amount: Number(e.target.value) })
              }
              className="w-24 text-sm text-right outline-none bg-transparent"
            />
          </div>
        </div>
        <input
          type="range"
          min="10000"
          max="5000000"
          value={scenario.amount}
          onChange={(e) =>
            onChange({ ...scenario, amount: Number(e.target.value) })
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>₹10k</span>
          <span>₹50.00L</span>
        </div>
      </div>

      {/* Rate */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs text-gray-500">Rate</label>
          <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
            <input
              type="number"
              value={scenario.rate}
              step="0.1"
              onChange={(e) =>
                onChange({ ...scenario, rate: Number(e.target.value) })
              }
              className="w-16 text-sm text-right outline-none bg-transparent"
            />
            <span className="text-xs text-gray-400">%</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="36"
          step="0.1"
          value={scenario.rate}
          onChange={(e) =>
            onChange({ ...scenario, rate: Number(e.target.value) })
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>1%</span>
          <span>36%</span>
        </div>
      </div>

      {/* Tenure */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs text-gray-500">Tenure</label>
          <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
            <input
              type="number"
              value={scenario.tenure}
              onChange={(e) =>
                onChange({ ...scenario, tenure: Number(e.target.value) })
              }
              className="w-16 text-sm text-right outline-none bg-transparent"
            />
            <span className="text-xs text-gray-400">mo</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="84"
          value={scenario.tenure}
          onChange={(e) =>
            onChange({ ...scenario, tenure: Number(e.target.value) })
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>1 mo</span>
          <span>7 yr</span>
        </div>
      </div>

      {/* Results */}
      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Monthly EMI</span>
          <span className="font-bold text-blue-600">{fmt(emi)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Interest</span>
          <span className="font-semibold text-gray-800">
            {fmt(totalInterest)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Payable</span>
          <span className="font-bold text-gray-900">{fmt(totalPayable)}</span>
        </div>
      </div>
    </div>
  );
}

export default ScenarioCard;
