"use client";

import { ICar } from "@/types/car";

interface CompareModalProps {
  cars: ICar[];
  onClose: () => void;
}

export default function CompareModal({ cars, onClose }: CompareModalProps) {
  if (cars.length < 2) return null;

  const specs = [
    { label: "Year", key: "year" },
    { label: "Price", key: "price", format: (v: number) => `$${v.toLocaleString()}` },
    { label: "Mileage", key: "mileage", format: (v: number) => `${v.toLocaleString()} mi` },
    { label: "Fuel", key: "fuelType" },
    { label: "Transmission", key: "transmission" },
    { label: "Engine", key: "engine" },
    { label: "Seats", key: "seats" },
    { label: "Color", key: "color" },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-card border border-gold/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(201,168,76,0.2)] animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-[#2A2A2A] flex justify-between items-center bg-[#1A1A1A]">
          <h2 className="font-heading text-2xl text-gold">Vehicle Comparison</h2>
          <button 
            onClick={onClose}
            className="text-muted hover:text-white p-2 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="py-4 px-4 text-muted font-medium w-1/4">Specification</th>
                {cars.map((car) => (
                  <th key={car._id} className="py-4 px-4 w-3/8">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden mb-3 border border-[#2A2A2A]">
                        <img src={car.images[0]} alt={car.model} className="object-cover w-full h-full" />
                      </div>
                      <span className="text-primary font-bold text-center leading-tight">
                        {car.year} {car.make}<br/>{car.model}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} className="border-b border-[#2A2A2A] hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-muted font-medium">{spec.label}</td>
                  {cars.map((car: any) => (
                    <td key={car._id} className="py-4 px-4 text-center text-primary font-medium">
                      {spec.format ? spec.format(car[spec.key]) : (car[spec.key] || "—")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#2A2A2A] bg-[#1A1A1A] flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gold text-background font-bold py-3 px-10 rounded-lg hover:bg-gold-hover transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
