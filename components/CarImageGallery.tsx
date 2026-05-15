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
      <div className="relative w-full h-[320px] md:h-[540px] rounded-2xl overflow-hidden bg-card mb-6 group border border-[#2A2A2A] shadow-2xl">
        <Image 
          src={images[activeIndex]} 
          alt="Car Image" 
          fill 
          className="object-cover transition-all duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
        />
        
        {/* Navigation Arrows (Desktop) */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="pointer-events-auto bg-black/50 hover:bg-gold text-white hover:text-background p-3 rounded-xl transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="pointer-events-auto bg-black/50 hover:bg-gold text-white hover:text-background p-3 rounded-xl transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Fullscreen Button */}
        <button 
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-6 right-6 bg-black/50 hover:bg-gold text-white hover:text-background p-3 rounded-xl transition-all z-10 backdrop-blur-md"
          aria-label="View Fullscreen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
          {images.map((img, index) => (
            <div 
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-[70px] md:h-[90px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-gold scale-105 shadow-lg shadow-gold/20' : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'}`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                className="object-cover" 
                sizes="150px"
              />
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
