// components/StatsBar.jsx — Summary cards at the top

import React from "react";
import { Package, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

export default function StatsBar({ items }) {
  const total = items.length;
  const lostCount = items.filter((i) => i.type === "Lost").length;
  const foundCount = items.filter((i) => i.type === "Found").length;

  // Items posted in last 7 days
  const recentCount = items.filter((i) => {
    const daysDiff =
      (Date.now() - new Date(i.createdAt)) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }).length;

  const stats = [
    {
      label: "Total Items",
      value: total,
      icon: Package,
      gradient: "from-slate-500 to-slate-700",
      bg: "bg-slate-50",
      border: "border-slate-200",
      text: "text-slate-700",
    },
    {
      label: "Lost Items",
      value: lostCount,
      icon: AlertCircle,
      gradient: "from-rose-500 to-red-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
    },
    {
      label: "Found Items",
      value: foundCount,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
    },
    {
      label: "This Week",
      value: recentCount,
      icon: TrendingUp,
      gradient: "from-violet-500 to-indigo-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}
            >
              <Icon className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className={`text-2xl font-display font-bold ${stat.text}`}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 font-body">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
