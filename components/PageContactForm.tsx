"use client";

import { useState } from "react";

export default function PageContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "I'm interested in a vehicle",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const newErrors: { [key: string]: boolean } = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        subject: "I'm interested in a vehicle", 
        message: "" 
      });
      
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#1A1A1A] border-t-[3px] border-t-gold rounded-xl p-6 md:p-9 shadow-lg">
      <div className="mb-8">
        <h2 className="font-heading text-3xl text-primary mb-2">Send Us a Message</h2>
        <p className="text-muted">Fill in the form and we&apos;ll get back to you within 2 hours</p>
      </div>

      {status === "success" && (
        <div className="mb-6 bg-[#0f2a1a] border border-green-500 text-green-500 px-4 py-3 rounded-lg flex items-center animate-fade-in-up">
          <span className="mr-2">✅</span> Message sent! We&apos;ll be in touch within 2 hours.
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-red-900/30 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center animate-fade-in-up">
          <span className="mr-2">❌</span> Something went wrong. Please try again or call us directly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-muted text-sm mb-2">Full Name *</label>
          <input 
            type="text" 
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={`bg-[#0F0F0F] border ${errors.name ? 'border-red-500' : 'border-[#2A2A2A]'} rounded-lg px-4 py-3 text-primary focus:border-gold focus:shadow-[0_0_8px_rgba(201,168,76,0.3)] outline-none transition-all`}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-muted text-sm mb-2">Email Address *</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={`bg-[#0F0F0F] border ${errors.email ? 'border-red-500' : 'border-[#2A2A2A]'} rounded-lg px-4 py-3 text-primary focus:border-gold focus:shadow-[0_0_8px_rgba(201,168,76,0.3)] outline-none transition-all`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-2">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-primary focus:border-gold focus:shadow-[0_0_8px_rgba(201,168,76,0.3)] outline-none transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-muted text-sm mb-2">Subject *</label>
            <select 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-primary focus:border-gold focus:shadow-[0_0_8px_rgba(201,168,76,0.3)] outline-none transition-all appearance-none"
            >
              <option value="I'm interested in a vehicle">I&apos;m interested in a vehicle</option>
              <option value="Book a Test Drive">Book a Test Drive</option>
              <option value="General Enquiry">General Enquiry</option>
              <option value="Financing Options">Financing Options</option>
              <option value="After-Sales Support">After-Sales Support</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-muted text-sm mb-2">Message *</label>
          <textarea 
            rows={5}
            placeholder="Tell us how we can help you..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className={`bg-[#0F0F0F] border ${errors.message ? 'border-red-500' : 'border-[#2A2A2A]'} rounded-lg px-4 py-3 text-primary focus:border-gold focus:shadow-[0_0_8px_rgba(201,168,76,0.3)] outline-none transition-all resize-none`}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
        >
          {status === "loading" ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message \u2192"
          )}
        </button>
      </form>
    </div>
  );
}
