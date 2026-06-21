"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import calculateEMI from "@/utils/emi";

function SensitivityTable() {
  const { amount, rate, tenure } = useContext(AppContext);

  const rates = [];

  for (let i = -3; i <= 3; i++) {
    const newRate = Math.max(1, rate + i);

    if (!rates.includes(newRate)) {
      rates.push(newRate);
    }
  }

  const tenures = [];

  const offsets = [-24, -12, -6, 0, 6, 12, 24];

  offsets.forEach((offset) => {
    const newTenure = Math.max(1, tenure + offset);

    if (!tenures.includes(newTenure)) {
      tenures.push(newTenure);
    }
  });

  const formatTenure = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} mo`;
    }

    if (remainingMonths === 0) {
      return `${years} yr`;
    }

    return `${years} yr ${remainingMonths} mo`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Sensitivity Analysis
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          EMI across rate × tenure — current values highlighted
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="text-left px-5 py-3 font-medium text-gray-500 min-w-[160px]">
                Tenure \ Rate
              </th>

              {rates.map((r) => (
                <th
                  key={r}
                  className={`px-4 py-3 text-center font-medium ${
                    r === rate ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {r}%
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tenures.map((t) => (
              <tr key={t} className="border-b border-gray-100 last:border-0">
                {/* Tenure Column */}
                <td
                  className={`px-5 py-3 font-medium ${
                    t === tenure ? "text-indigo-600" : "text-gray-600"
                  }`}
                >
                  {formatTenure(t)}
                </td>

                {/* EMI Cells */}
                {rates.map((r) => {
                  const isSelected = t === tenure && Number(r) === Number(rate);

                  return (
                    <td key={`${t}-${r}`} className="px-3 py-1 text-center">
                      <div
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          min-w-[90px]
                          px-3
                          py-1
                          rounded-lg
                          transition-all
                          duration-200
                          ${
                            isSelected
                              ? "bg-indigo-600 text-white font-semibold shadow-sm"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                        `}
                      >
                        ₹
                        {Math.round(calculateEMI(amount, r, t)).toLocaleString(
                          "en-IN",
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensitivityTable;
