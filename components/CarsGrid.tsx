"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ICar } from "@/types/car";

export default function CarsGrid({ initialCars }: { initialCars: ICar[] }) {
  const [make, setMake] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const filteredCars = initialCars.filter((car) => {
    let match = true;
    if (make !== "All" && car.make !== make) match = false;
    if (fuelType !== "All" && car.fuelType !== fuelType) match = false;
    if (transmission !== "All" && car.transmission !== transmission) match = false;
    if (minPrice && car.price < Number(minPrice)) match = false;
    if (maxPrice && car.price > Number(maxPrice)) match = false;
    if (search && !car.make.toLowerCase().includes(search.toLowerCase()) && !car.model.toLowerCase().includes(search.toLowerCase())) match = false;
    return match;
  });

  const clearFilters = () => {
    setMake("All");
    setFuelType("All");
    setTransmission("All");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-card rounded-xl border border-[#2A2A2A] p-4 md:p-6 mb-8 sticky top-[80px] z-40 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Make or model..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background border border-[#2A2A2A] rounded p-2 text-primary focus:border-gold outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-1">Make</label>
            <select 
              value={make} 
              onChange={(e) => setMake(e.target.value)}
              className="bg-background border border-[#2A2A2A] rounded p-2 text-primary focus:border-gold outline-none"
            >
              <option value="All">All Makes</option>
              {["BMW", "Mercedes", "Audi", "Toyota", "Ford", "Tesla", "Honda", "Volkswagen", "Hyundai"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-1">Fuel Type</label>
            <select 
              value={fuelType} 
              onChange={(e) => setFuelType(e.target.value)}
              className="bg-background border border-[#2A2A2A] rounded p-2 text-primary focus:border-gold outline-none"
            >
              <option value="All">All Fuels</option>
              {["Petrol", "Diesel", "Hybrid", "Electric"].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-1">Transmission</label>
            <select 
              value={transmission} 
              onChange={(e) => setTransmission(e.target.value)}
              className="bg-background border border-[#2A2A2A] rounded p-2 text-primary focus:border-gold outline-none"
            >
              <option value="All">All Transmissions</option>
              {["Automatic", "Manual"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-muted text-sm mb-1">Price Range</label>
            <div className="flex space-x-2">
              <input 
                type="number" 
                placeholder="Min" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="bg-background border border-[#2A2A2A] rounded p-2 text-primary focus:border-gold outline-none w-full"
              />
              <input 
                type="number" 
                placeholder="Max" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="bg-background border border-[#2A2A2A] rounded p-2 text-primary focus:border-gold outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <button 
              onClick={clearFilters}
              className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-background font-bold p-2 rounded transition-colors w-full h-[42px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted">Showing {filteredCars.length} of {initialCars.length} vehicles</p>
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-[#2A2A2A]">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-primary font-heading text-2xl mb-2">No vehicles found matching your criteria</h3>
          <p className="text-muted mb-6">Try adjusting your filters or clearing them to see more vehicles.</p>
          <button 
            onClick={clearFilters}
            className="bg-gold hover:bg-gold-hover text-background font-bold py-2 px-6 rounded transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car._id} 
              className="bg-card rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-gold hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-all duration-300 group"
            >
              <div className="relative h-[220px] w-full">
                <Image 
                  src={car.images[0]} 
                  alt={`${car.make} ${car.model}`} 
                  fill 
                  className="object-cover"
                />
                {car.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center shadow-lg">
                    ⭐ Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-xl text-primary mb-2 group-hover:text-gold transition-colors truncate">
                  {car.year} {car.make} {car.model}
                </h3>
                <div className="text-gold text-2xl font-bold mb-4">
                  ${car.price.toLocaleString()}
                </div>
                
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-[#2A2A2A]">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-lg mb-1">🛣️</span>
                    <span className="text-xs text-muted">{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 border-x border-[#2A2A2A]">
                    <span className="text-lg mb-1">⛽</span>
                    <span className="text-xs text-muted">{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-lg mb-1">⚙️</span>
                    <span className="text-xs text-muted">{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <span 
                    className="w-3 h-3 rounded-full mr-2 border border-[#2A2A2A]"
                    style={{ backgroundColor: car.color?.toLowerCase() || 'gray' }}
                  ></span>
                  <span className="text-sm text-muted">{car.color}</span>
                </div>
                
                <Link href={`/cars/${car._id}`} className="block w-full py-3 rounded border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-colors duration-300 text-center">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
