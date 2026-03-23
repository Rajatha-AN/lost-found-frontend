// App.jsx — Root component that manages all state and API calls

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import FilterBar from "./components/FilterBar";
import StatsBar from "./components/StatsBar";

// ✅ FIXED API URL (removed double slash)
const API_BASE = "https://lost-found-backend-un07.onrender.com/api/items";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // ✅ Matches state
  const [matches, setMatches] = useState([]);

  // 🔹 Fetch items
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // 🔹 Add item
  const handleAddItem = async (formData) => {
    try {
      const res = await axios.post(API_BASE, formData);

      setItems((prev) => [res.data.data, ...prev]);

      // ✅ Matches from backend
      setMatches(res.data.matches || []);

      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };

  // 🔹 Delete item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Filter + Search
  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === "All" || item.type === filter;

    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60">
      <Navbar onAddClick={() => setShowForm(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <StatsBar items={items} />

        {/* ✅ Matches UI */}
        {matches.length > 0 && (
          <PossibleMatches
            matches={matches}
            onDismiss={() => setMatches([])}
          />
        )}

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          totalCount={filteredItems.length}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <ItemList
          items={filteredItems}
          loading={loading}
          onDelete={handleDeleteItem}
        />
      </main>

      {/* Modal */}
      {showForm && (
        <AddItemForm
          onSubmit={handleAddItem}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

// ✅ MATCHES COMPONENT
function PossibleMatches({ matches, onDismiss }) {
  return (
    <div className="mb-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-yellow-800">
          🔍 Possible Matches Found
        </h3>
        <button
          onClick={onDismiss}
          className="text-sm text-yellow-700 underline"
        >
          Dismiss
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {matches.map((item) => (
          <div
            key={item._id}
            className="bg-white p-3 rounded shadow border"
          >
            <span
              className={`text-xs px-2 py-1 rounded ${
                item.type === "Lost"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {item.type}
            </span>

            <p className="font-semibold mt-1">{item.title}</p>
            <p className="text-sm text-gray-500">{item.description}</p>

            <p className="text-sm">📍 {item.location}</p>
            <p className="text-sm">📞 {item.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}