"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ICar } from "@/types/car";
import CompareModal from "./CompareModal";
import WishlistButton from "./WishlistButton";

export default function CarsGrid({ 
  initialCars, 
  initialSearch = "" 
}: { 
  initialCars: ICar[], 
  initialSearch?: string 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  // States from URL or Defaults
  const [make, setMake] = useState(searchParams.get("make") || "All");
  const [fuelType, setFuelType] = useState(searchParams.get("fuelType") || "All");
  const [transmission, setTransmission] = useState(searchParams.get("transmission") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [search, setSearch] = useState(searchParams.get("search") || initialSearch);
  const [sortBy, setSortBy] = useState("Newest First");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load view mode and history from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("cars_view_mode") as "grid" | "list";
    if (savedView) setViewMode(savedView);

    const savedHistory = JSON.parse(localStorage.getItem("autonova_search_history") || "[]");
    setHistory(savedHistory);
  }, []);

  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...history.filter(h => h !== term)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("autonova_search_history", JSON.stringify(updated));
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (make !== "All") params.set("make", make);
    if (fuelType !== "All") params.set("fuelType", fuelType);
    if (transmission !== "All") params.set("transmission", transmission);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (search) params.set("search", search);
    
    const query = params.toString();
    router.push(`/cars${query ? `?${query}` : ""}`, { scroll: false });
  }, [make, fuelType, transmission, minPrice, maxPrice, search, router]);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".car-item-card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, [make, fuelType, transmission, minPrice, maxPrice, search, sortBy]);

  const filteredAndSortedCars = useMemo(() => {
    const result = initialCars.filter((car) => {
      let match = true;
      if (make !== "All" && car.make !== make) match = false;
      if (fuelType !== "All" && car.fuelType !== fuelType) match = false;
      if (transmission !== "All" && car.transmission !== transmission) match = false;
      if (minPrice && car.price < Number(minPrice)) match = false;
      if (maxPrice && car.price > Number(maxPrice)) match = false;
      if (search && !car.make.toLowerCase().includes(search.toLowerCase()) && !car.model.toLowerCase().includes(search.toLowerCase())) match = false;
      return match;
    });

    // Sorting logic
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Mileage: Low to High":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "Newest First":
      default:
        result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [initialCars, make, fuelType, transmission, minPrice, maxPrice, search, sortBy]);

  const clearFilters = () => {
    setMake("All");
    setFuelType("All");
    setTransmission("All");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
  };

  const activeFilters = useMemo(() => {
    const filters = [];
    if (make !== "All") filters.push({ type: "make", label: make, clear: () => setMake("All") });
    if (fuelType !== "All") filters.push({ type: "fuelType", label: fuelType, clear: () => setFuelType("All") });
    if (transmission !== "All") filters.push({ type: "transmission", label: transmission, clear: () => setTransmission("All") });
    if (search) filters.push({ type: "search", label: `Search: ${search}`, clear: () => setSearch("") });
    return filters;
  }, [make, fuelType, transmission, search]);



  const compareCars = initialCars.filter(c => compareIds.includes(c._id));

  return (
    <div className="relative pb-24">
      {/* Filter Bar Upgraded */}
      <div className="bg-[#1A1A1A]/80 backdrop-blur-xl rounded-2xl border border-gold/20 p-4 md:p-6 mb-8 sticky top-[80px] md:top-[100px] z-[40] shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 items-end">
          <div className="flex flex-col relative">
            <label className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Search</label>
            <input 
              type="text" 
              placeholder="Make or model..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowHistory(true)}
              onBlur={() => setTimeout(() => setShowHistory(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && saveToHistory(search)}
              className="bg-background border border-[#2A2A2A] rounded-xl p-3 text-sm text-primary focus:border-gold outline-none transition-all"
            />
            {showHistory && history.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#1A1A1A] border border-gold/20 rounded-xl p-3 shadow-2xl z-50 animate-fade-in">
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2 px-1">Recent Searches</p>
                <div className="flex flex-wrap gap-2">
                  {history.map(term => (
                    <div key={term} className="flex items-center bg-background border border-[#2A2A2A] rounded-lg overflow-hidden">
                      <button 
                        onClick={() => { setSearch(term); saveToHistory(term); }}
                        className="px-3 py-1.5 text-[10px] text-primary hover:text-gold transition-colors"
                      >
                        {term}
                      </button>
                      <button 
                        onClick={() => {
                          const updated = history.filter(h => h !== term);
                          setHistory(updated);
                          localStorage.setItem("autonova_search_history", JSON.stringify(updated));
                        }}
                        className="px-2 py-1.5 text-muted hover:text-red-400 border-l border-[#2A2A2A] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Make</label>
            <select 
              value={make} 
              onChange={(e) => setMake(e.target.value)}
              className="bg-background border border-[#2A2A2A] rounded-xl p-3 text-sm text-primary focus:border-gold outline-none appearance-none cursor-pointer"
            >
              <option value="All">All Makes</option>
              {["BMW", "Mercedes", "Audi", "Toyota", "Ford", "Tesla", "Honda", "Volkswagen", "Hyundai"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Fuel Type</label>
            <select 
              value={fuelType} 
              onChange={(e) => setFuelType(e.target.value)}
              className="bg-background border border-[#2A2A2A] rounded-xl p-3 text-sm text-primary focus:border-gold outline-none cursor-pointer"
            >
              <option value="All">All Fuels</option>
              {["Petrol", "Diesel", "Hybrid", "Electric"].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background border border-gold/30 rounded-xl p-3 text-sm text-gold font-bold focus:border-gold outline-none cursor-pointer"
            >
              {["Newest First", "Price: Low to High", "Price: High to Low", "Mileage: Low to High"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Price Range</label>
            <div className="flex space-x-2">
              <input 
                type="number" 
                placeholder="Min" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="bg-background border border-[#2A2A2A] rounded-xl p-3 text-sm text-primary focus:border-gold outline-none w-full"
              />
              <input 
                type="number" 
                placeholder="Max" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="bg-background border border-[#2A2A2A] rounded-xl p-3 text-sm text-primary focus:border-gold outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col pt-2 sm:pt-0">
             <button 
                onClick={clearFilters}
                className="bg-transparent border border-gold/30 text-muted hover:text-gold hover:border-gold font-bold p-3 text-sm rounded-xl transition-all w-full"
              >
                Reset
              </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <p className="text-muted">Showing <span className="text-primary font-bold">{filteredAndSortedCars.length}</span> of {initialCars.length} vehicles</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {activeFilters.map(filter => (
              <span key={filter.type} className="flex items-center bg-gold/10 border border-gold/20 text-gold px-3 py-1 rounded-full text-xs font-bold">
                {filter.label}
                <button onClick={filter.clear} className="ml-2 hover:text-white">✕</button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-[#1A1A1A] p-1 rounded-xl border border-[#2A2A2A]">
          <button 
            onClick={() => { setViewMode("grid"); localStorage.setItem("cars_view_mode", "grid"); }}
            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-gold text-background shadow-lg" : "text-muted hover:text-white"}`}
            aria-label="Grid View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </button>
          <button 
            onClick={() => { setViewMode("list"); localStorage.setItem("cars_view_mode", "list"); }}
            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-gold text-background shadow-lg" : "text-muted hover:text-white"}`}
            aria-label="List View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>

      {filteredAndSortedCars.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-[#2A2A2A] animate-fade-in">
          <div className="text-8xl mb-6 grayscale opacity-20">🚗</div>
          <h3 className="text-primary font-heading text-3xl mb-4">No matching vehicles</h3>
          <p className="text-muted mb-8 text-lg">Try adjusting your filters to find your perfect car.</p>
          <button 
            onClick={clearFilters}
            className="bg-gold hover:bg-gold-hover text-background font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-gold/20"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div 
          ref={gridRef}
          className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "flex flex-col gap-6"
          }
        >
          {filteredAndSortedCars.map((car) => (
            <div 
              key={car._id} 
              className={`car-item-card opacity-0 group bg-card rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-gold transition-all duration-500 shadow-xl ${
                viewMode === "list" ? "flex flex-col md:flex-row h-auto md:h-[260px]" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-full md:w-[350px] h-[220px] md:h-full" : "h-[240px] w-full"}`}>
                <Image 
                  src={car.images[0] || "/placeholder.jpg"} 
                  alt={`${car.make} ${car.model}`} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute top-4 left-4 z-10">
                  <WishlistButton carId={car._id} />
                </div>
                {car.isFeatured && (
                  <div className="absolute top-4 right-4 bg-gold text-background text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em] shadow-xl">
                    Featured
                  </div>
                )}
              </div>
              
              <div className={`p-6 flex flex-col flex-grow ${viewMode === "list" ? "md:justify-center" : ""}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-2xl text-primary group-hover:text-gold transition-colors truncate">
                    {car.year} {car.make} {car.model}
                  </h3>
                </div>
                <div className="text-gold text-3xl font-black mb-6">${car.price.toLocaleString()}</div>
                
                <div className="grid grid-cols-3 gap-2 mb-6 pt-4 border-t border-[#2A2A2A]">
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">🛣️</span>
                    <span className="text-[10px] text-muted font-bold uppercase">{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-[#2A2A2A]">
                    <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">⛽</span>
                    <span className="text-[10px] text-muted font-bold uppercase">{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">⚙️</span>
                    <span className="text-[10px] text-muted font-bold uppercase">{car.transmission}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/cars/${car._id}`} 
                  className="block w-full py-4 rounded-xl border border-gold/30 text-gold font-bold hover:bg-gold hover:text-background transition-all duration-300 text-center shadow-lg active:scale-95"
                >
                  View Full Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sticky Compare Bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-2xl animate-fade-in-up">
          <div className="bg-[#1A1A1A]/95 backdrop-blur-xl border-2 border-gold/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {compareCars.map(c => (
                  <div key={c._id} className="relative w-12 h-12 rounded-lg border-2 border-gold overflow-hidden bg-background">
                    <Image src={c.images[0]} alt={c.model} fill className="object-cover" />
                  </div>
                ))}
                {compareIds.length === 1 && (
                  <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gold/30 flex items-center justify-center text-gold/30 text-xs text-center font-bold px-1">
                    Add 1 more
                  </div>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm">Compare Vehicles</p>
                <p className="text-muted text-xs">{compareIds.length === 1 ? "Select one more car" : "Ready to compare specs"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCompareIds([])}
                className="text-muted hover:text-white text-xs font-bold uppercase tracking-widest px-4 py-2"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsCompareOpen(true)}
                disabled={compareIds.length < 2}
                className={`py-3 px-8 rounded-xl font-bold transition-all ${
                  compareIds.length === 2 
                    ? "bg-gold text-background hover:bg-gold-hover shadow-lg shadow-gold/20" 
                    : "bg-[#2A2A2A] text-muted cursor-not-allowed"
                }`}
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isCompareOpen && (
        <CompareModal 
          cars={compareCars} 
          onClose={() => setIsCompareOpen(false)} 
        />
      )}
    </div>
  );
}
