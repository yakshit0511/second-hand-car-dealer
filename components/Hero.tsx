"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/cars");
    }
  };

  const tags = ["BMW", "Mercedes", "Tesla", "Under $20k", "Automatic"];

  const headline = "Find Your Perfect Ride";
  const words = useMemo(() => headline.split(" "), []);

  return (
    <section 
      id="home"
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      ></div>

      {/* Shifting Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1] animate-gradient-shift"></div>
      
      {/* Animated Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold/5 blur-[150px] rounded-full z-[2] animate-pulse"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <span className="bg-gold/10 backdrop-blur-md text-gold px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-[0.2em] border border-gold/30 shadow-[0_0_15px_rgba(201,168,76,0.1)] animate-fade-in-up">
          🏆 New York&apos;s #1 Dealer
        </span>
        
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-[84px] text-white mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] tracking-tight">
          {words.map((word, idx) => (
            <span 
              key={idx} 
              className={`inline-block mr-[0.2em] opacity-0 animate-fade-in-up ${word === "Ride" ? "text-gold" : ""}`}
              style={{ animationDelay: `${400 + idx * 150}ms`, animationFillMode: 'forwards' }}
            >
              {word}
            </span>
          ))}
        </h1>
        
        <p 
          className="font-body text-base md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl opacity-0 animate-fade-in-up px-4"
          style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
        >
          Redefining the pre-owned car experience with luxury standards, 150-point inspections, and white-glove home delivery.
        </p>
        
        {/* Search Bar Upgraded */}
        <div className="w-full max-w-2xl opacity-0 animate-fade-in-up px-2" style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }}>
          <form 
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row w-full bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 mb-6 shadow-2xl focus-within:border-gold/50 focus-within:bg-white/15 transition-all p-1.5 gap-1.5 sm:gap-0"
          >
            <input 
              type="text" 
              placeholder="Search by make, model..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent text-white px-4 sm:px-6 py-3 sm:py-4 focus:outline-none placeholder:text-white/50 text-base sm:text-lg"
            />
            <button type="submit" className="bg-gold hover:bg-gold-hover text-background font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center">
              <span>Search</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-white/50 text-xs sm:text-sm font-medium mr-1">Popular:</span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const query = tag === "Under $20k" ? "20000" : tag;
                  const param = tag === "Under $20k" ? "maxPrice" : "search";
                  router.push(`/cars?${param}=${encodeURIComponent(query)}`);
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 text-white/80 hover:text-gold px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs transition-all backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1600ms', animationFillMode: 'forwards' }}>
          <Link href="/cars" className="bg-white text-background hover:bg-gold hover:text-background font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl text-lg min-w-[200px]">
            Browse Inventory
          </Link>
          <Link href="#how-it-works" className="bg-transparent border-2 border-white/30 text-white hover:border-gold hover:text-gold font-bold py-4 px-10 rounded-xl transition-all duration-300 backdrop-blur-sm text-lg min-w-[200px]">
            How It Works
          </Link>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[2]"></div>
    </section>
  );
}
