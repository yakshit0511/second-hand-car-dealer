"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCardSkeleton from "@/components/CarCardSkeleton";
import { ICar } from "@/types/car";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      const savedIds = JSON.parse(localStorage.getItem("autonova_wishlist") || "[]");
      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/cars?ids=${savedIds.join(",")}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setWishlist(data);
      } catch (e) {
        console.error("Failed to load wishlist", e);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (id: string) => {
    const savedIds = JSON.parse(localStorage.getItem("autonova_wishlist") || "[]");
    const updatedIds = savedIds.filter((i: string) => i !== id);
    localStorage.setItem("autonova_wishlist", JSON.stringify(updatedIds));
    setWishlist(prev => prev.filter(car => car._id !== id));
    
    // Dispatch event for Navbar count sync
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4 tracking-tighter">
              Your <span className="text-gold">Wishlist</span> ❤️
            </h1>
            <p className="text-muted text-lg max-w-2xl">
              You have {wishlist.length} {wishlist.length === 1 ? "vehicle" : "vehicles"} saved for later.
            </p>
          </div>
          <Link 
            href="/cars" 
            className="bg-transparent border-2 border-gold/30 text-gold hover:border-gold font-bold py-3 px-8 rounded-xl transition-all uppercase tracking-widest text-xs"
          >
            Browse More Cars
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <CarCardSkeleton key={i} />)}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-24 bg-[#1A1A1A] rounded-3xl border border-[#2A2A2A] shadow-2xl animate-fade-in">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="font-heading text-3xl text-primary mb-4">Your wishlist is empty</h2>
            <p className="text-muted text-lg mb-10 max-w-md mx-auto">
              Browse our premium collection and save your favorites to compare or view later.
            </p>
            <Link 
              href="/cars" 
              className="bg-gold hover:bg-gold-hover text-background font-black py-5 px-12 rounded-xl transition-all shadow-xl shadow-gold/20 inline-block uppercase tracking-widest"
            >
              Start Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((car) => (
              <div 
                key={car._id} 
                className="group bg-card rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-gold transition-all duration-500 shadow-xl relative"
              >
                <div className="relative h-[240px] w-full overflow-hidden">
                  <Image 
                    src={car.images[0]} 
                    alt={car.model} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <button 
                    onClick={() => removeFromWishlist(car._id)}
                    className="absolute top-4 right-4 bg-red-600/90 text-white p-2.5 rounded-full hover:bg-red-700 transition-colors z-10 shadow-lg active:scale-95"
                    aria-label="Remove from Wishlist"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-gold transition-colors">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="text-gold text-2xl font-black mb-6">${car.price.toLocaleString()}</div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/cars/${car._id}`} 
                      className="flex-grow py-3.5 rounded-xl border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-all duration-300 text-center uppercase tracking-widest text-xs"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
