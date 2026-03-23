// components/ItemList.jsx — Grid of all item cards

import React from "react";
import ItemCard from "./ItemCard";
import { Package2 } from "lucide-react";

// Loading skeleton for a single card
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-pulse">
      <div className="h-1 w-full rounded bg-slate-100 mb-4" />
      <div className="flex gap-2 mb-3">
        <div className="h-6 w-16 rounded-lg bg-slate-100" />
      </div>
      <div className="h-4 w-3/4 rounded bg-slate-100 mb-2" />
      <div className="h-3 w-full rounded bg-slate-100 mb-1" />
      <div className="h-3 w-2/3 rounded bg-slate-100 mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-1/2 rounded bg-slate-100" />
        <div className="h-3 w-1/2 rounded bg-slate-100" />
        <div className="h-3 w-1/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}

export default function ItemList({ items, loading, onDelete }) {
  // ── Loading state: show skeleton cards ───────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-4 shadow-inner">
          <Package2 className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-lg font-semibold text-slate-600 mb-1">
          No items found
        </h3>
        <p className="text-sm text-slate-400 max-w-xs">
          Try adjusting your filters, or be the first to report a lost or found
          item on campus!
        </p>
      </div>
    );
  }

  // ── Item grid ─────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
