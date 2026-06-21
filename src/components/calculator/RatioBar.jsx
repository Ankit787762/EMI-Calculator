
function RatioBar({
  Principalshare,
  Interestshare,
  amount,
  totalInterest,
}) {
  return (
    <div className="px-4 pb-4">
      <div className="flex justify-between mb-2">
        <p className="font-medium">Principal vs Interest</p>

        <p className="text-gray-500">
          {Principalshare.toFixed(2)}% / {Interestshare.toFixed(2)}%
        </p>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full flex">
          <div
            className="bg-blue-600"
            style={{ width: `${Principalshare}%` }}
          />

          <div
            className="bg-orange-400"
            style={{ width: `${Interestshare}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Principal ₹{amount.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span>Interest ₹{totalInterest.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default RatioBar;