// components/FilterBar.jsx — Filter by type + search by name

import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const FILTERS = ["All", "Lost", "Found"];

export default function FilterBar({ filter, setFilter, search, setSearch, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-slide-up">
      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search items, locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:border-campus-500 transition-all duration-200 shadow-sm"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm gap-1">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-2 mr-1 flex-shrink-0" />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === f
                ? f === "Lost"
                  ? "bg-rose-500 text-white shadow-sm"
                  : f === "Found"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-campus-500 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Count badge */}
      <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
        <span className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{totalCount}</span>{" "}
          item{totalCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
