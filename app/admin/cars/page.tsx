"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import Toast, { useToast } from "@/components/admin/Toast";
import { ICar } from "@/types/car";

export default function AdminCarsPage() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState<ICar | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cars", { cache: "no-store" });
      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  const toggleFeatured = async (car: ICar) => {
    try {
      const res = await fetch(`/api/cars/${car._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !car.isFeatured }),
      });
      if (!res.ok) throw new Error();
      setCars((prev) => prev.map((c) => c._id === car._id ? { ...c, isFeatured: !c.isFeatured } : c));
      showToast(`${car.make} ${car.model} ${!car.isFeatured ? "marked as featured" : "unfeatured"}`, "success");
    } catch {
      showToast("Failed to update featured status", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/cars/${deleteTarget._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCars((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      showToast(`${deleteTarget.make} ${deleteTarget.model} deleted`, "success");
      setDeleteTarget(null);
    } catch {
      showToast("Failed to delete car", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = cars.filter((car) => {
    const matchSearch = !search || `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase());
    const matchFuel = fuelFilter === "All" || car.fuelType === fuelFilter;
    const matchFeatured = featuredFilter === "All" || (featuredFilter === "Featured" ? car.isFeatured : !car.isFeatured);
    return matchSearch && matchFuel && matchFeatured;
  });

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-heading text-3xl text-primary">Manage Cars</h1>
        <Link
          href="/admin/cars/new"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-background font-bold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          ＋ Add New Car
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by make or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-2 text-primary focus:border-gold outline-none transition-colors text-sm flex-1 min-w-[200px]"
        />
        <select
          value={fuelFilter}
          onChange={(e) => setFuelFilter(e.target.value)}
          className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-2 text-primary focus:border-gold outline-none transition-colors text-sm"
        >
          <option value="All">All Fuel Types</option>
          {["Petrol", "Diesel", "Hybrid", "Electric"].map((f) => <option key={f}>{f}</option>)}
        </select>
        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value)}
          className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-2 text-primary focus:border-gold outline-none transition-colors text-sm"
        >
          <option value="All">All</option>
          <option value="Featured">Featured Only</option>
          <option value="Not Featured">Not Featured</option>
        </select>
        <p className="flex items-center text-muted text-sm">{filtered.length} results</p>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-[#1A1A1A] rounded animate-pulse" />)}
        </div>
      ) : (
        <AdminTable
          headers={["#", "Image", "Make & Model", "Year", "Price", "Mileage", "Fuel", "Featured", "Actions"]}
          isEmpty={filtered.length === 0}
          emptyMessage="No cars match your filters."
        >
          {filtered.map((car, i) => (
            <tr key={car._id} className={`border-t border-[#2A2A2A] hover:bg-gold/5 transition-colors ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0F0F0F]"}`}>
              <td className="px-4 py-3 text-muted text-xs">{i + 1}</td>
              <td className="px-4 py-3">
                <div className="relative w-[60px] h-[45px] rounded overflow-hidden bg-[#2A2A2A]">
                  {car.images?.[0] && <Image src={car.images[0]} alt={car.make} fill className="object-cover" />}
                </div>
              </td>
              <td className="px-4 py-3 text-primary font-medium whitespace-nowrap">{car.make} {car.model}</td>
              <td className="px-4 py-3 text-muted whitespace-nowrap">{car.year}</td>
              <td className="px-4 py-3 text-gold font-semibold whitespace-nowrap">${car.price.toLocaleString()}</td>
              <td className="px-4 py-3 text-muted whitespace-nowrap">{car.mileage.toLocaleString()} mi</td>
              <td className="px-4 py-3 text-muted whitespace-nowrap">{car.fuelType}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleFeatured(car)}
                  className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors ${car.isFeatured ? "border-gold text-gold bg-gold/10 hover:bg-gold/20" : "border-[#2A2A2A] text-muted hover:border-gold hover:text-gold"}`}
                >
                  {car.isFeatured ? "⭐ Yes" : "No"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/cars/${car._id}`} target="_blank" className="text-xs border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold px-2 py-1 rounded transition-colors whitespace-nowrap">👁️ View</Link>
                  <Link href={`/admin/cars/${car._id}/edit`} className="text-xs border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold px-2 py-1 rounded transition-colors whitespace-nowrap">✏️ Edit</Link>
                  <button
                    onClick={() => setDeleteTarget(car)}
                    className="text-xs border border-[#2A2A2A] text-red-400 hover:border-red-500 hover:bg-red-500/10 px-2 py-1 rounded transition-colors whitespace-nowrap"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1A1A1A] border-t-[3px] border-t-gold rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-heading text-xl text-primary mb-3">Confirm Delete</h3>
            <p className="text-muted mb-6">
              Are you sure you want to delete the <span className="text-primary font-medium">{deleteTarget.year} {deleteTarget.make} {deleteTarget.model}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold py-2.5 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-colors font-bold disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
