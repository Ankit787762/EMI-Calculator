"use client";

import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

function ModeTabs() {
  const { mode, setMode } = useContext(AppContext);

  return (
    <div className="bg-white rounded-xl p-1 shadow flex items-center justify-around h-12">
      <button
        onClick={() => setMode("single")}
        className={`px-3 py-2 text-sm  rounded-lg transition-all duration-200 ${
          mode === "single"
            ? "bg-blue-600 text-white border border-blue-600"
            : "bg-white text-gray-700 border border-transparent hover:bg-blue-100 hover:border-blue-500"
        }`}
      >
        Single
      </button>
      <button
        onClick={() => setMode("compare")}
        className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
          mode === "compare"
            ? "bg-blue-600 text-white border border-blue-600"
            : "bg-white text-gray-700 border border-transparent hover:bg-blue-100 hover:border-blue-500"
        }`}
      >
        compare
      </button>
      <button
        onClick={() => setMode("prepayment")}
        className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
          mode === "prepayment"
            ? "bg-blue-600 text-white border border-blue-600"
            : "bg-white text-gray-700 border border-transparent hover:bg-blue-100 hover:border-blue-500"
        }`}
      >
        prepayment
      </button>
    </div>
  );
}

export default ModeTabs;
