"use client";

import { useState } from "react";
import Image from "next/image";

export default function CarImageGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative w-full h-[480px] rounded-lg overflow-hidden bg-card mb-4 group">
        <Image 
          src={images[activeIndex]} 
          alt="Car Image" 
          fill 
          className="object-cover transition-opacity duration-500"
          priority
        />
        
        {/* Fullscreen Button */}
        <button 
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
          aria-label="View Fullscreen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {images.map((img, index) => (
            <div 
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-[90px] rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${activeIndex === index ? 'border-2 border-gold scale-105' : 'border border-[#2A2A2A] opacity-70 hover:opacity-100'}`}
            >
              <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in-up" onClick={() => setIsLightboxOpen(false)}>
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-4 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="relative w-[90%] h-[80vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={images[activeIndex]} 
              alt="Car Fullscreen" 
              fill 
              className="object-contain"
            />
          </div>

          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-4 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
