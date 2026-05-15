"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/cars");
    }
  };

  return (
    <section 
      id="home"
      className="relative w-full h-[calc(100vh-80px)] flex items-center justify-center bg-cover bg-center animate-fade-in-up"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <span className="bg-background/80 text-gold px-4 py-1 rounded-full text-sm font-medium mb-6 uppercase tracking-wider backdrop-blur-sm border border-gold/30">
          🏆 Trusted by 5,000+ Happy Customers
        </span>
        
        <h1 className="font-heading text-5xl md:text-6xl lg:text-[64px] text-primary mb-6 leading-tight">
          Find Your Perfect <span className="text-gold">Ride</span>
        </h1>
        
        <p className="font-body text-lg md:text-[18px] text-muted mb-10 max-w-2xl">
          Browse our handpicked collection of premium pre-owned vehicles. Transparency, trust, and great prices — guaranteed.
        </p>
        
        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="flex w-full max-w-2xl bg-card rounded-full overflow-hidden border border-gold/20 mb-10 shadow-lg focus-within:border-gold transition-colors"
        >
          <input 
            type="text" 
            placeholder="Search by make, model or keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent text-primary px-6 py-4 focus:outline-none placeholder:text-muted"
          />
          <button type="submit" className="bg-gold hover:bg-gold-hover text-background font-bold px-8 py-4 transition-colors">
            Search
          </button>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/cars" className="bg-gold hover:bg-gold-hover text-background font-bold py-3 px-8 rounded transition-colors text-center">
            Browse All Cars
          </Link>
          <Link href="#about" className="bg-transparent border border-gold text-gold hover:bg-gold/10 font-bold py-3 px-8 rounded transition-colors text-center">
            How It Works
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-primary border-t border-gold/20 pt-8 w-full">
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-gold font-bold mb-1">500+</span>
            <span className="text-sm text-muted uppercase tracking-wider">Cars</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-gold font-bold mb-1">48hr</span>
            <span className="text-sm text-muted uppercase tracking-wider">Delivery</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl text-gold font-bold mb-1">1 Year</span>
            <span className="text-sm text-muted uppercase tracking-wider">Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
}
