// components/Navbar.jsx — Top navigation bar

import React from "react";
import { Search, Plus, MapPin } from "lucide-react";

export default function Navbar({ onAddClick }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-campus-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display font-800 text-lg leading-none text-slate-800 tracking-tight">
                Lost &amp; Found
              </h1>
              <p className="text-[10px] text-slate-400 font-body leading-none mt-0.5 tracking-widest uppercase">
                Campus Portal
              </p>
            </div>
          </div>

          {/* Right: Report button */}
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-gradient-to-r from-campus-500 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Report Item</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
