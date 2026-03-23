// components/ItemCard.jsx — Single item card

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Calendar,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Tag,
} from "lucide-react";

// Format date nicely
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ItemCard({ item, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isLost = item.type === "Lost";

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      // Auto-cancel confirm after 3s
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setDeleting(true);
    try {
      await onDelete(item._id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-scale-in ${
        isLost ? "border-rose-100 hover:border-rose-200" : "border-emerald-100 hover:border-emerald-200"
      }`}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          isLost
            ? "bg-gradient-to-r from-rose-400 to-red-500"
            : "bg-gradient-to-r from-emerald-400 to-green-500"
        }`}
      />

      <div className="p-5">
        {/* Header: type badge + delete */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Type badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                isLost
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {isLost ? (
                <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
              ) : (
                <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
              )}
              {item.type}
            </span>
          </div>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
              confirmDelete
                ? "bg-red-500 text-white animate-pulse"
                : "bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500"
            } ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
            {confirmDelete ? "Sure?" : deleting ? "..." : ""}
          </button>
        </div>

        {/* Item title */}
        <h3 className="font-display font-semibold text-slate-800 text-base leading-tight mb-2 group-hover:text-campus-600 transition-colors duration-200">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Meta info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
              isLost ? "bg-rose-50" : "bg-emerald-50"
            }`}>
              <MapPin
                className={`w-3 h-3 ${isLost ? "text-rose-500" : "text-emerald-500"}`}
                strokeWidth={2.5}
              />
            </div>
            <span className="truncate">{item.location}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
              isLost ? "bg-rose-50" : "bg-emerald-50"
            }`}>
              <Phone
                className={`w-3 h-3 ${isLost ? "text-rose-500" : "text-emerald-500"}`}
                strokeWidth={2.5}
              />
            </div>
            <span className="truncate">{item.contact}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3 h-3 text-slate-400" strokeWidth={2.5} />
            </div>
            <span>{formatDate(item.date || item.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
