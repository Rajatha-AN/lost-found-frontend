// components/AddItemForm.jsx — Modal form to report a lost or found item

import React, { useState, useEffect } from "react";
import {
  X,
  Package,
  MapPin,
  Phone,
  FileText,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const INITIAL_STATE = {
  title: "",
  type: "Lost",
  description: "",
  location: "",
  contact: "",
  date: new Date().toISOString().split("T")[0],
};

// ─── Field is defined OUTSIDE AddItemForm ────────────────────────────────────
// If defined inside, React creates a NEW component type on every render,
// which causes it to unmount+remount the input — losing focus after each keystroke.
function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
        <span className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-slate-400" />
          {label}
        </span>
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

export default function AddItemForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Item name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.contact.trim())
      newErrors.contact = "Contact info is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isLost = formData.type === "Lost";

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal panel */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Modal header */}
        <div
          className={`px-6 pt-6 pb-5 border-b ${
            isLost ? "border-rose-100" : "border-emerald-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                  isLost
                    ? "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-200"
                    : "bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-200"
                }`}
              >
                {isLost ? (
                  <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />
                ) : (
                  <CheckCircle2
                    className="w-5 h-5 text-white"
                    strokeWidth={2}
                  />
                )}
              </div>
              <div>
                <h2 className="font-display font-bold text-slate-800 text-lg leading-none">
                  Report an Item
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fill in the details below
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Lost / Found toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Item Type
              </span>
            </label>
            <div className="flex gap-3">
              {["Lost", "Found"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type }))
                  }
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    formData.type === type
                      ? type === "Lost"
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {type === "Lost" ? (
                    <AlertCircle className="w-4 h-4" strokeWidth={2} />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                  )}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Item Name */}
          <Field label="Item Name" icon={Package} error={errors.title}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Black iPhone 13, Blue Backpack..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-700 placeholder-slate-300 bg-slate-50 focus:bg-white transition-all duration-200 ${
                errors.title ? "border-rose-300" : "border-slate-200 focus:border-campus-500"
              }`}
            />
          </Field>

          {/* Description */}
          <Field label="Description" icon={FileText} error={errors.description}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the item in detail — color, brand, identifying marks..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-700 placeholder-slate-300 bg-slate-50 focus:bg-white transition-all duration-200 resize-none ${
                errors.description ? "border-rose-300" : "border-slate-200 focus:border-campus-500"
              }`}
            />
          </Field>

          {/* Location */}
          <Field label="Location" icon={MapPin} error={errors.location}>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Library Block B, Main Canteen, Hostel 3..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-700 placeholder-slate-300 bg-slate-50 focus:bg-white transition-all duration-200 ${
                errors.location ? "border-rose-300" : "border-slate-200 focus:border-campus-500"
              }`}
            />
          </Field>

          {/* Contact */}
          <Field label="Contact Info" icon={Phone} error={errors.contact}>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone number, email, or roll number..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-700 placeholder-slate-300 bg-slate-50 focus:bg-white transition-all duration-200 ${
                errors.contact ? "border-rose-300" : "border-slate-200 focus:border-campus-500"
              }`}
            />
          </Field>

          {/* Date */}
          <Field label="Date" icon={Calendar} error={errors.date}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-campus-500 text-sm text-slate-700 bg-slate-50 focus:bg-white transition-all duration-200"
            />
          </Field>
        </form>

        {/* Modal footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-lg ${
              submitting
                ? "opacity-70 cursor-not-allowed bg-slate-400"
                : isLost
                ? "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-rose-200 hover:scale-[1.02] active:scale-95"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-200 hover:scale-[1.02] active:scale-95"
            }`}
          >
            {submitting ? "Submitting..." : `Report as ${formData.type}`}
          </button>
        </div>
      </div>
    </div>
  );
}
