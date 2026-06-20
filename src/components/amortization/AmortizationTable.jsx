"use client";

import { AppContext } from "@/context/AppContext";
import calculateEMI from "@/utils/emi";
import { useContext, useState } from "react";
import ChartView from "./ChartView";

function AmortizationTable() {
  const { view, setView, amount, rate, tenure } = useContext(AppContext);
  const emi = calculateEMI(amount, rate, tenure);
  let balance = amount;
  const schedule = [];

  for (let month = 1; month <= tenure; month++) {
    const interest = (balance * rate) / 12 / 100;

    const principal = emi - interest;
    balance = Math.max(balance - principal, 0);

    schedule.push({
      month,
      emi,
      principal,
      interest,
      balance,
    });
  }

  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 12;
  const totalPages = Math.ceil(schedule.length / rowsPerPage);

  const startIndex = (currPage - 1) * rowsPerPage;
  const currRows = schedule.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Amortization Schedule</h2>

          <p className="text-xs text-gray-500">
            Month-by-month Principal & Interest breakdown
          </p>
        </div>

        <button className="px-4 py-2 text-xs border rounded-lg hover:bg-gray-100">
          Export CSV
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg ${
              view === "table" ? "bg-blue-600 text-white" : "hover:bg-blue-100"
            }`}
          >
            Table
          </button>

          <button
            onClick={() => setView("chart")}
            className={`px-4 py-2 rounded-lg ${
              view === "chart" ? "bg-blue-600 text-white" : "hover:bg-blue-100"
            }`}
          >
            Chart
          </button>
        </div>

        <p className="text-xs text-gray-500">Break-even at month 1</p>
      </div>

      {/* Table / Chart View */}
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden min-w-0">
  {view === "table" && (
    <div className="overflow-auto max-h-[450px]">
            <table className="w-full table-fixed text-xs">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="w-1/6 py-3 text-center">Month</th>
                  <th className="w-1/6 py-3 text-center">EMI</th>
                  <th className="w-1/6 py-3 text-center">Principal</th>
                  <th className="w-1/6 py-3 text-center">Interest</th>
                  <th className="w-1/6 py-3 text-center">Prepayment</th>
                  <th className="w-1/6 py-3 text-center">Balance</th>
                </tr>
              </thead>

              <tbody>
                {currRows.map((row) => (
                  <tr key={row.month} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-center">{row.month}</td>
                    <td className="py-3 text-center">₹{row.emi}</td>
                    <td className="py-3 text-center">₹{row.principal}</td>
                    <td className="py-3 text-center">₹{row.interest}</td>
                    <td className="py-3 text-center">₹0</td>
                    <td className="py-3 text-center">₹{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "chart" && <ChartView schedule={schedule} />}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-xs text-gray-500">
          Showing {startIndex + 1}-
          {Math.min(startIndex + rowsPerPage, schedule.length)}
          of {schedule.length} months
        </p>

        <div className="flex text-xs items-center gap-3">
          <button
            onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>
            {currPage}/{totalPages}
          </span>

          <button
            onClick={() =>
              setCurrPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AmortizationTable;
