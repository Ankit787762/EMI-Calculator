"use client";

import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

function Header() {
  const { activeTabs, tabId, theme, setTheme } = useContext(AppContext); // ← add theme, setTheme

  return (
    <header className="bg-white rounded-xl shadow p-3 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600">EMI Calculator</h1>
          <p className="text-xs text-gray-500">
            Loan Calculator, synced across tabs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <span className="text-sm font-medium">
              {tabId ? `Tab ${tabId}` : "Tab"}
            </span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <span className="text-gray-500 text-sm">Active Tabs</span>
            <span className="font-semibold">{activeTabs}</span>
          </div>

          {/* ← only this button changed */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;