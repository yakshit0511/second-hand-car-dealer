"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto p-12 bg-[#1A1A1A] border border-gold/20 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 blur-3xl rounded-full"></div>
          
          <div className="text-6xl mb-8">🛠️</div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary mb-6">Something Went Wrong</h1>
          <p className="text-muted text-lg mb-12">
            We encountered a technical issue while loading this page. Our team has been notified.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => reset()}
              className="bg-gold hover:bg-gold-hover text-background font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-gold/20 text-lg uppercase tracking-widest"
            >
              Try Again
            </button>
            <Link 
              href="/" 
              className="bg-transparent border-2 border-[#2A2A2A] text-muted hover:text-white hover:border-white font-bold py-4 px-10 rounded-xl transition-all text-lg uppercase tracking-widest"
            >
              Return Home
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[#2A2A2A]">
            <p className="text-[10px] text-muted/50 font-mono break-all uppercase tracking-widest">
              Error Digest: {error.digest || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
