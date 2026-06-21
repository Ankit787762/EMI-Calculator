"use client";

import { useState } from "react";
import ChartView from "@/components/amortization/ChartView";
import exportCSV from "@/utils/exportCSV";

function PrepaymentSchedule({ schedule }) {
  const [activeView, setActiveView] = useState("table");
  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 12;
  const totalPages = Math.ceil(schedule.length / rowsPerPage);
  const paginated = schedule.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage,
  );

  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const breakEvenMonth =
    schedule.findIndex((row) => row.principal >= row.interest) + 1;
 

  if (!schedule || schedule.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Adjusted Schedule
          </h2>
          <p className="text-xs text-gray-500">
            Amortization reflecting your prepayments
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

      {/* Toggle buttons */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActiveView("table")}
          className={`px-4 py-2 rounded-lg text-sm ${activeView === "table" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
        >
          Table
        </button>
        <button
          onClick={() => setActiveView("chart")}
          className={`px-4 py-2 rounded-lg text-sm ${activeView === "chart" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
        >
          Chart
        </button>
        {breakEvenMonth > 0 && (
          <span className="text-xs text-gray-500 ml-2">
            Break-even at{" "}
            <span className="text-blue-600 font-medium">
              month {breakEvenMonth}
            </span>
          </span>
        )}
      </div>

      {/* Chart View */}
      {activeView === "chart" && <ChartView schedule={schedule} />}

      {/* Table View */}
      {activeView === "table" && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">
                    Month
                  </th>
                  <th className="text-right px-3 py-2 text-gray-500 font-medium">
                    EMI
                  </th>
                  <th className="text-right px-3 py-2 text-gray-500 font-medium">
                    Principal
                  </th>
                  <th className="text-right px-3 py-2 text-gray-500 font-medium">
                    Interest
                  </th>
                  <th className="text-right px-3 py-2 text-gray-500 font-medium">
                    Prepayment
                  </th>
                  <th className="text-right px-3 py-2 text-gray-500 font-medium">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((row) => (
                  <tr
                    key={row.month}
                    className={`border-b border-gray-100 ${row.month === breakEvenMonth ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-3 py-2 font-medium">
                      {row.month}
                      {row.month === breakEvenMonth && (
                        <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                          be
                        </span>
                      )}
                    </td>
                    <td className="text-right px-3 py-2">{fmt(row.emi)}</td>
                    <td className="text-right px-3 py-2 text-blue-600">
                      {fmt(row.principal)}
                    </td>
                    <td className="text-right px-3 py-2 text-orange-500">
                      {fmt(row.interest)}
                    </td>
                    <td className="text-right px-3 py-2">
                      {row.prepayment > 0 ? fmt(row.prepayment) : "—"}
                    </td>
                    <td className="text-right px-3 py-2">{fmt(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 text-sm gap-2 text-gray-500">
            <span>
              Showing {(currPage - 1) * rowsPerPage + 1}–
              {Math.min(currPage * rowsPerPage, schedule.length)} of{" "}
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
        </>
      )}
    </div>
  );
}

export default PrepaymentSchedule;
