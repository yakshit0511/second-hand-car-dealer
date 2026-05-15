import Image from "next/image";
import Link from "next/link";
import { ICar } from "@/types/car";

export default function FeaturedCars({ cars }: { cars: ICar[] }) {
  if (cars.length === 0) return null;

  return (
    <section id="cars" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-primary mb-4 inline-block relative">
            Featured Vehicles
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full"></span>
          </h2>
          <p className="text-muted text-lg mt-4">Handpicked for quality and value</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div 
              key={car._id} 
              className="bg-card rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg group"
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={car.images[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600"} 
                  alt={`${car.make} ${car.model}`} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-gold transition-colors">
                  {car.year} {car.make} {car.model}
                </h3>
                <div className="text-gold text-2xl font-bold mb-6">${car.price.toLocaleString()}</div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-[#2A2A2A]">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-xs text-muted">{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-l border-r border-[#2A2A2A]">
                    <svg className="w-6 h-6 text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="text-xs text-muted">{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="text-xs text-muted">{car.transmission}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/cars/${car._id}`}
                  className="block w-full py-3 rounded border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-colors duration-300 text-center"
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
