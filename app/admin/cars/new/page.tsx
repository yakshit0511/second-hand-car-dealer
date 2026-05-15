"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast, { useToast } from "@/components/admin/Toast";

interface FormData {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  color: string;
  seats: string;
  engine: string;
  description: string;
  isFeatured: boolean;
  images: string[];
}

const initialForm: FormData = {
  make: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  fuelType: "Petrol",
  transmission: "Automatic",
  color: "",
  seats: "",
  engine: "",
  description: "",
  isFeatured: false,
  images: [""],
};

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-gold" : "bg-[#2A2A2A]"}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const inputClass = "w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-primary focus:border-gold outline-none transition-colors text-sm placeholder:text-[#444]";
const labelClass = "block text-muted text-sm mb-1.5 font-medium";
const errorClass = "text-red-400 text-xs mt-1";

export default function AddNewCarPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setImage = (index: number, value: string) => {
    const imgs = [...form.images];
    imgs[index] = value;
    setForm((prev) => ({ ...prev, images: imgs }));
  };

  const addImage = () => setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  const removeImage = (index: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.make.trim()) e.make = "Make is required";
    if (!form.model.trim()) e.model = "Model is required";
    if (!form.year || Number(form.year) < 1990 || Number(form.year) > 2025) e.year = "Year must be between 1990–2025";
    if (!form.price || Number(form.price) <= 0) e.price = "Valid price is required";
    if (!form.mileage || Number(form.mileage) < 0) e.mileage = "Valid mileage is required";
    if (!form.images[0]?.trim()) e.images = "At least one image URL is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
          seats: form.seats ? Number(form.seats) : undefined,
          images: form.images.filter((img) => img.trim() !== ""),
        }),
      });

      if (!res.ok) throw new Error();
      showToast("✅ Car added successfully!", "success");
      setTimeout(() => router.push("/admin/cars"), 1500);
    } catch {
      showToast("❌ Failed to add car. Please check all fields.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary">Add New Car</h1>
          <p className="text-muted text-sm mt-1">Fill in the details to add a vehicle to inventory</p>
        </div>
        <Link href="/admin/cars" className="text-muted hover:text-gold text-sm transition-colors">
          ← Back to Cars
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-[#1A1A1A] border-t-[3px] border-t-gold rounded-xl p-8 space-y-6">
          <h2 className="font-heading text-xl text-primary pb-2 border-b border-[#2A2A2A]">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Make *</label>
              <input type="text" placeholder="e.g. BMW" value={form.make} onChange={(e) => set("make", e.target.value)} className={inputClass} />
              {errors.make && <p className={errorClass}>{errors.make}</p>}
            </div>
            <div>
              <label className={labelClass}>Model *</label>
              <input type="text" placeholder="e.g. 3 Series" value={form.model} onChange={(e) => set("model", e.target.value)} className={inputClass} />
              {errors.model && <p className={errorClass}>{errors.model}</p>}
            </div>
            <div>
              <label className={labelClass}>Year *</label>
              <input type="number" placeholder="e.g. 2021" min={1990} max={2025} value={form.year} onChange={(e) => set("year", e.target.value)} className={inputClass} />
              {errors.year && <p className={errorClass}>{errors.year}</p>}
            </div>
            <div>
              <label className={labelClass}>Price ($) *</label>
              <input type="number" placeholder="e.g. 35000" min={0} value={form.price} onChange={(e) => set("price", e.target.value)} className={inputClass} />
              {errors.price && <p className={errorClass}>{errors.price}</p>}
            </div>
            <div>
              <label className={labelClass}>Mileage *</label>
              <input type="number" placeholder="e.g. 25000" min={0} value={form.mileage} onChange={(e) => set("mileage", e.target.value)} className={inputClass} />
              {errors.mileage && <p className={errorClass}>{errors.mileage}</p>}
            </div>
            <div>
              <label className={labelClass}>Color</label>
              <input type="text" placeholder="e.g. Midnight Blue" value={form.color} onChange={(e) => set("color", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="bg-[#1A1A1A] border-t-[3px] border-t-gold rounded-xl p-8 space-y-6">
          <h2 className="font-heading text-xl text-primary pb-2 border-b border-[#2A2A2A]">Vehicle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Fuel Type *</label>
              <select value={form.fuelType} onChange={(e) => set("fuelType", e.target.value)} className={inputClass}>
                {["Petrol", "Diesel", "Hybrid", "Electric"].map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Transmission *</label>
              <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)} className={inputClass}>
                {["Automatic", "Manual"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Seats</label>
              <input type="number" placeholder="e.g. 5" min={2} max={9} value={form.seats} onChange={(e) => set("seats", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Engine</label>
              <input type="text" placeholder="e.g. 2.0L Turbo" value={form.engine} onChange={(e) => set("engine", e.target.value)} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                rows={4}
                placeholder="Describe the vehicle condition, history, and features..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className={`${labelClass} mb-0`}>Mark as Featured</label>
              <ToggleSwitch checked={form.isFeatured} onChange={(v) => set("isFeatured", v)} />
              <span className="text-muted text-sm">{form.isFeatured ? "Featured" : "Not featured"}</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-[#1A1A1A] border-t-[3px] border-t-gold rounded-xl p-8 space-y-4">
          <h2 className="font-heading text-xl text-primary pb-2 border-b border-[#2A2A2A]">Images</h2>
          {errors.images && <p className={errorClass}>{errors.images}</p>}
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                type="url"
                placeholder={`Image URL ${i + 1}`}
                value={img}
                onChange={(e) => setImage(i, e.target.value)}
                className={`${inputClass} flex-1`}
              />
              {form.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="text-red-400 hover:text-red-300 transition-colors p-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImage}
            className="text-gold hover:text-gold-hover text-sm border border-gold/40 hover:border-gold px-4 py-2 rounded-lg transition-colors"
          >
            ＋ Add Another Image
          </button>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 sm:flex-none bg-gold hover:bg-gold-hover text-background font-bold px-10 py-3 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {submitting ? "Saving..." : "Add Car"}
          </button>
          <Link href="/admin/cars" className="border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold px-8 py-3 rounded-lg transition-colors font-medium">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
