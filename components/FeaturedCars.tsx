"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ICar } from "@/types/car";

export default function FeaturedCars({ cars }: { cars: ICar[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

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

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".car-card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  if (cars.length === 0) return null;

  return (
    <section id="cars" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="font-heading text-4xl text-primary mb-4 inline-block relative">
              Featured Vehicles
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full shadow-[0_0_10px_#C9A84C]"></span>
            </h2>
            <p className="text-muted text-lg mt-6">Handpicked for quality and value</p>
          </div>
          <Link 
            href="/cars" 
            className="text-gold font-bold flex items-center hover:translate-x-2 transition-transform duration-300 group"
          >
            View All Cars 
            <span className="ml-2 group-hover:scale-125 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" ref={containerRef}>
          {cars.map((car, idx) => (
            <div 
              key={car._id} 
              className="car-card opacity-0 transition-all duration-700 bg-card rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg group"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={car.images[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600"} 
                  alt={`${car.make} ${car.model}`} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xl">
                  Featured Pick
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-gold transition-colors">
                  {car.year} {car.make} {car.model}
                </h3>
                <div className="text-gold text-2xl font-bold mb-6">${car.price.toLocaleString()}</div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-[#2A2A2A]">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">🛣️</span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-l border-r border-[#2A2A2A]">
                    <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">⛽</span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">⚙️</span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">{car.transmission}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/cars/${car._id}`}
                  className="block w-full py-4 rounded-xl border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-all duration-300 text-center shadow-lg active:scale-95"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
