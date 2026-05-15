"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-[#1A1A1A] border-y border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl text-primary mb-4">Stay Updated on New Arrivals</h2>
          <p className="text-muted text-lg mb-10">Get notified when new vehicles matching your preferences are added</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-background border border-[#2A2A2A] rounded-lg px-6 py-4 text-primary focus:border-gold outline-none transition-colors"
            />
            <button 
              type="submit" 
              className="bg-gold hover:bg-gold-hover text-background font-bold py-4 px-10 rounded-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-gold/20"
            >
              Subscribe
            </button>
          </form>

          {status === "success" && (
            <div className="text-gold font-medium animate-fade-in-up">
              ✅ You&apos;re subscribed! Keep an eye on your inbox.
            </div>
          )}

          <p className="text-muted text-sm mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
