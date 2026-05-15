"use client";

import { useState } from "react";
import { ICar } from "@/types/car";

export default function ContactForm({ car }: { car: ICar }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I&apos;m interested in the ${car.year} ${car.make} ${car.model}. Please contact me with more details.`
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div id="contact" className="bg-card border border-[#2A2A2A] rounded-xl p-8 mb-16 relative overflow-hidden">
      <div className="mb-8">
        <h2 className="font-heading text-3xl text-primary mb-2">Enquire About This Car</h2>
        <p className="text-muted">Fill in your details and we&apos;ll get back to you within 2 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-2">Full Name *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-background border border-[#2A2A2A] rounded-lg p-3 text-primary focus:border-gold outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-2">Email Address *</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-background border border-[#2A2A2A] rounded-lg p-3 text-primary focus:border-gold outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-muted text-sm mb-2">Phone Number (Optional)</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="bg-background border border-[#2A2A2A] rounded-lg p-3 text-primary focus:border-gold outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-muted text-sm mb-2">Message *</label>
          <textarea 
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="bg-background border border-[#2A2A2A] rounded-lg p-3 text-primary focus:border-gold outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Enquiry"}
        </button>
      </form>

      {/* Toasts */}
      {status === "success" && (
        <div className="absolute top-8 right-8 bg-green-500/10 border border-green-500 text-green-500 px-6 py-3 rounded-lg flex items-center animate-fade-in-up">
          <span className="mr-2">✅</span> Thank you! We&apos;ll contact you within 2 hours.
        </div>
      )}
      {status === "error" && (
        <div className="absolute top-8 right-8 bg-red-500/10 border border-red-500 text-red-500 px-6 py-3 rounded-lg flex items-center animate-fade-in-up">
          <span className="mr-2">❌</span> Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}
