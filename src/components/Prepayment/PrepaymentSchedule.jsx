"use client";

import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";

function PrepaymentSchedule({ schedule }) {
  const { view, setView } = useContext(AppContext);
  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 12;
  const totalPages = Math.ceil(schedule.length / rowsPerPage);
  const paginated = schedule.slice((currPage - 1) * rowsPerPage, currPage * rowsPerPage);

  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  const breakEvenMonth = schedule.findIndex((r) => r.principal >= r.interest) + 1;

  const exportCSV = () => {
    const headers = ["Month", "EMI", "Principal", "Interest", "Prepayment", "Balance"];
    const rows = schedule.map((r) =>
      [r.month, r.emi.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.prepayment.toFixed(2), r.balance.toFixed(2)]
    );
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prepayment-schedule.csv";
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Adjusted Schedule</h2>
          <p className="text-xs text-gray-500">Amortization reflecting your prepayments</p>
        </div>
        <button onClick={exportCSV} data-btn="gray" className="px-4 py-2 text-xs border rounded-lg">
          Export CSV
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button onClick={() => setView("table")}
          className={`px-4 py-2 rounded-lg text-sm ${view === "table" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}>
          Table
        </button>
        <button onClick={() => setView("chart")}
          className={`px-4 py-2 rounded-lg text-sm ${view === "chart" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}>
          Chart
        </button>
        <span className="text-xs text-gray-500 ml-2">
          Break-even at <span className="text-blue-600 font-medium">month {breakEvenMonth}</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Month</th>
              <th className="text-right px-3 py-2 text-gray-500 font-medium">EMI</th>
              <th className="text-right px-3 py-2 text-gray-500 font-medium">Principal</th>
              <th className="text-right px-3 py-2 text-gray-500 font-medium">Interest</th>
              <th className="text-right px-3 py-2 text-gray-500 font-medium">Prepayment</th>
              <th className="text-right px-3 py-2 text-gray-500 font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr key={row.month}
                className={`border-b border-gray-100 ${row.month === breakEvenMonth ? "bg-blue-50" : ""}`}>
                <td className="px-3 py-2 font-medium">
                  {row.month}
                  {row.month === breakEvenMonth && (
                    <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">be</span>
                  )}
                </td>
                <td className="text-right px-3 py-2">{fmt(row.emi)}</td>
                <td className="text-right px-3 py-2 text-blue-600">{fmt(row.principal)}</td>
                <td className="text-right px-3 py-2 text-orange-500">{fmt(row.interest)}</td>
                <td className="text-right px-3 py-2">
                  {row.prepayment > 0 ? fmt(row.prepayment) : "—"}
                </td>
                <td className="text-right px-3 py-2">{fmt(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>Showing {(currPage - 1) * rowsPerPage + 1}–{Math.min(currPage * rowsPerPage, schedule.length)} of {schedule.length} months</span>
        <div className="flex items-center gap-2">
          <button data-btn="gray" onClick={() => setCurrPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded">Prev</button>
          <span>{currPage}/{totalPages}</span>
          <button data-btn="gray" onClick={() => setCurrPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

export default PrepaymentSchedule;