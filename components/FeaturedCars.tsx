import Image from "next/image";

const cars = [
  {
    id: 1,
    name: "2021 BMW 3 Series",
    price: "$24,500",
    mileage: "32,000 mi",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600"
  },
  {
    id: 2,
    name: "2020 Mercedes C-Class",
    price: "$27,900",
    mileage: "28,000 mi",
    fuel: "Diesel",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600"
  },
  {
    id: 3,
    name: "2019 Audi A4",
    price: "$21,000",
    mileage: "45,000 mi",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600"
  },
  {
    id: 4,
    name: "2022 Toyota Camry",
    price: "$18,500",
    mileage: "15,000 mi",
    fuel: "Hybrid",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600"
  },
  {
    id: 5,
    name: "2018 Ford Mustang",
    price: "$22,000",
    mileage: "55,000 mi",
    fuel: "Petrol",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600"
  },
  {
    id: 6,
    name: "2021 Tesla Model 3",
    price: "$31,000",
    mileage: "20,000 mi",
    fuel: "Electric",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600"
  }
];

export default function FeaturedCars() {
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
              key={car.id} 
              className="bg-card rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg group"
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-gold transition-colors">{car.name}</h3>
                <div className="text-gold text-2xl font-bold mb-6">{car.price}</div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-[#2A2A2A]">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-xs text-muted">{car.mileage}</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-l border-r border-[#2A2A2A]">
                    <svg className="w-6 h-6 text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="text-xs text-muted">{car.fuel}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-6 h-6 text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="text-xs text-muted">{car.transmission}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 rounded border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
