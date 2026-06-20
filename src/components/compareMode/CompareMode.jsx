"use client";

import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import ScenarioCard from "./ScenarioCard";
import calculateEMI from "@/utils/emi";

function CompareMode() {
  const { amount, rate, tenure } = useContext(AppContext);

  const [scenarios, setScenarios] = useState([
    { amount, rate: 10.5, tenure: 60, name: "Conservative" },
    { amount, rate: 12, tenure: 24, name: "Aggressive" },
  ]);

  const getTotal = (s) => calculateEMI(s.amount, s.rate, s.tenure) * s.tenure;

  const bestIndex = scenarios.reduce(
    (bestIdx, s, i) => (getTotal(s) < getTotal(scenarios[bestIdx]) ? i : bestIdx),
    0
  );

  const updateScenario = (index, updated) => {
    setScenarios((prev) => prev.map((s, i) => (i === index ? updated : s)));
  };

  const addScenario = () => {
    if (scenarios.length >= 3) return;
    setScenarios((prev) => [
      ...prev,
      { amount, rate: 11, tenure: 36, name: `Scenario ${prev.length + 1}` },
    ]);
  };

  const removeScenario = (index) => {
    if (scenarios.length <= 1) return;
    setScenarios((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Compare Scenarios</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure up to 3 scenarios — the lowest total cost is highlighted.
          </p>
        </div>
        {scenarios.length < 3 && (
          <button
            onClick={addScenario}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            + Add Scenario
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="flex gap-4 flex-wrap mt-5">
        {scenarios.map((s, i) => (
          <ScenarioCard
            key={i}
            index={i}
            scenario={s}
            onChange={(updated) => updateScenario(i, updated)}
            onRemove={() => removeScenario(i)}
            isBest={i === bestIndex}
            canRemove={scenarios.length > 1}
          />
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Open this page in a second tab — inputs, theme, and mode stay in sync via the BroadcastChannel API.
      </p>
    </div>
  );
}

export default CompareMode;