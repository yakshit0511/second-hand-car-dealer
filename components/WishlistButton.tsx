"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function WishlistButton({ carId }: { carId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const savedIds = JSON.parse(localStorage.getItem("autonova_wishlist") || "[]");
      setIsWishlisted(savedIds.includes(carId));
    };

    checkWishlist();
    window.addEventListener("wishlist-updated", checkWishlist);
    return () => window.removeEventListener("wishlist-updated", checkWishlist);
  }, [carId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const savedIds = JSON.parse(localStorage.getItem("autonova_wishlist") || "[]");
    let updatedIds;

    if (isWishlisted) {
      updatedIds = savedIds.filter((id: string) => id !== carId);
      toast.success("Removed from Wishlist", { icon: "💔", style: { background: "#1A1A1A", color: "#C9A84C", border: "1px solid #C9A84C" } });
    } else {
      updatedIds = [...savedIds, carId];
      toast.success("Added to Wishlist", { icon: "❤️", style: { background: "#1A1A1A", color: "#C9A84C", border: "1px solid #C9A84C" } });
    }

    localStorage.setItem("autonova_wishlist", JSON.stringify(updatedIds));
    setIsWishlisted(!isWishlisted);
    
    // Notify other components (like Navbar)
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <button 
      onClick={toggleWishlist}
      className={`p-2.5 rounded-full transition-all duration-300 shadow-lg active:scale-90 ${
        isWishlisted 
          ? "bg-red-600 text-white" 
          : "bg-black/40 backdrop-blur-md text-white hover:bg-white/20 border border-white/10"
      }`}
      aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <svg 
        className={`w-5 h-5 transition-transform duration-300 ${isWishlisted ? "scale-110" : "scale-100 group-hover:scale-110"}`} 
        fill={isWishlisted ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  );
}
