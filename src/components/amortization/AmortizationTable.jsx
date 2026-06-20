function AmortizationTable() {
  return (
    <div className="bg-white rounded-xl p-2 shadow">

  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-lg font-semibold">
        Amortization Schedule
      </h2>

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
      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
        Table
      </button>

      <button className="px-4 py-2 rounded-lg hover:bg-blue-100">
        Chart
      </button>
    </div>

    <p className="text-xs text-gray-500">
      Break-even at month 1
    </p>

  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-xs ">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="p-3 text-left">Month</th>
          <th className="p-3 text-left">EMI</th>
          <th className="p-3 text-left">Principal</th>
          <th className="p-3 text-left">Interest</th>
          <th className="p-3 text-left">Prepayment</th>
          <th className="p-3 text-left">Balance</th>
        </tr>
      </thead>

      <tbody>
        {/* Rows later */}
      </tbody>
    </table>
  </div>

  {/* Footer */}
  <div className="flex justify-between items-center mt-4">
    <p className="text-xs text-gray-500">
      Showing 1-12 of 48 months
    </p>

    <div className="flex text-xs items-center gap-3">
      <button className="px-3 py-1 border rounded">
        Prev
      </button>

      <span>1 / 4</span>

      <button className="px-3 py-1 border rounded">
        Next
      </button>
    </div>
  </div>

</div>
  );
}

export default AmortizationTable;