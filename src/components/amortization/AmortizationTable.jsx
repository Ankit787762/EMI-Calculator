"use client";

import { AppContext } from "@/context/AppContext";
import calculateEMI from "@/utils/emi";
import { useContext, useState } from "react";
import ChartView from "./ChartView";
import exportCSV from "@/utils/exportCSV";

function AmortizationTable() {
  const { view, setView, amount, rate, tenure } = useContext(AppContext);
  const emi = calculateEMI(amount, rate, tenure);
  let balance = amount;
  const schedule = [];

 for (let month = 1; month <= tenure; month++) {
  const interest = (balance * rate) / 12 / 100;
  const principal = emi - interest;
  balance = Math.max(balance - principal, 0);
  schedule.push({ month, emi, principal, interest, balance });
}

const breakEvenMonth =
  schedule.findIndex((row) => row.principal >= row.interest) + 1;

  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 12;
  const totalPages = Math.ceil(schedule.length / rowsPerPage);
  const startIndex = (currPage - 1) * rowsPerPage;
  const currRows = schedule.slice(startIndex, startIndex + rowsPerPage);

  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Amortization Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Month-by-month Principal & Interest breakdown
          </p>
        </div>
        <button
          onClick={() => exportCSV(schedule)}
          data-btn="gray"
          className="px-4 py-2 text-xs border rounded-lg flex items-center gap-1"
        >
          ↓ Export CSV
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setView("table")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            view === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Table
        </button>
        <button
          onClick={() => setView("chart")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            view === "chart"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Chart
        </button>
        <span className="text-xs text-gray-500">
          Break-even at{" "}
          <span className="text-blue-600 font-medium">
            month {breakEvenMonth}
          </span>
        </span>
      </div>

      {/* Table / Chart */}
      {view === "table" && (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  Month
                </th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">
                  EMI
                </th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">
                  Principal
                </th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">
                  Interest
                </th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">
                  Prepayment
                </th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {currRows.map((row) => (
                <tr
                  key={row.month}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    row.month === breakEvenMonth ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    <div className="flex items-center gap-2">
                      {row.month}
                      {row.month === breakEvenMonth && (
                        <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                          b/e
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {fmt(row.emi)}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-600 font-medium">
                    {fmt(row.principal)}
                  </td>
                  <td className="px-4 py-3 text-right text-orange-500 font-medium">
                    {fmt(row.interest)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400">—</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {fmt(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "chart" && <ChartView schedule={schedule} />}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 text-xs gap-2 text-gray-500">
        <span>
          Showing {startIndex + 1}–
          {Math.min(startIndex + rowsPerPage, schedule.length)} of{" "}
          {schedule.length} months
        </span>
        <div className="flex items-center gap-2">
          <button
            data-btn="gray"
            onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded"
          >
            ‹ Prev
          </button>
          <span>
            {currPage} / {totalPages}
          </span>
          <button
            data-btn="gray"
            onClick={() =>
              setCurrPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 border rounded"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default AmortizationTable;
