import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarImageGallery from "@/components/CarImageGallery";
import ContactForm from "@/components/ContactForm";
import { ICar } from "@/types/car";

async function getCar(id: string): Promise<ICar | null> {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${url}/api/cars/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getSimilarCars(id: string): Promise<ICar[]> {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${url}/api/cars/similar/${id}`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);

  if (!car) {
    notFound();
  }

  const similarCars = await getSimilarCars(car._id);

  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />

      {/* Section 1 - Breadcrumb + Title bar */}
      <section className="bg-[#0F0F0F] pt-8 pb-12 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-muted mb-6 font-body">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/cars" className="hover:text-gold transition-colors">Cars</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gold">{car.make} {car.model}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
                {car.year} {car.make} {car.model}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full border border-gold bg-[#1A1A1A] text-sm font-medium">
                  ⛽ {car.fuelType}
                </span>
                <span className="px-4 py-1.5 rounded-full border border-gold bg-[#1A1A1A] text-sm font-medium">
                  ⚙️ {car.transmission}
                </span>
                <span className="px-4 py-1.5 rounded-full border border-gold bg-[#1A1A1A] text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-gray-500" style={{ backgroundColor: car.color?.toLowerCase() }}></span>
                  {car.color}
                </span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-gold text-4xl md:text-5xl font-bold font-heading">
                ${car.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column */}
            <div className="w-full lg:w-[60%]">
              <CarImageGallery images={car.images} />
              
              <div className="mt-12">
                <h2 className="font-heading text-3xl text-primary mb-6 inline-block relative">
                  About This Car
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full"></span>
                </h2>
                <div className="text-muted leading-relaxed text-lg whitespace-pre-wrap mt-4">
                  {car.description || `This ${car.year} ${car.make} ${car.model} is a well-maintained pre-owned vehicle available at AutoNova Motors. It has been thoroughly inspected and is ready for its new owner.`}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[40%]">
              <div className="sticky top-24">
                {/* Price Card */}
                <div className="bg-card border border-gold rounded-xl p-7 mb-8 shadow-lg">
                  <div className="mb-6">
                    <div className="text-gold text-4xl font-bold font-heading mb-1">${car.price.toLocaleString()}</div>
                    <div className="text-muted text-sm">or from $380/month financing available</div>
                  </div>
                  
                  <div className="border-t border-[#2A2A2A] my-6"></div>
                  
                  <div className="space-y-0 mb-8 rounded-lg overflow-hidden border border-[#2A2A2A]">
                    <div className="flex justify-between p-3 bg-[#222]">
                      <span className="text-muted">📅 Year</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#1A1A1A]">
                      <span className="text-muted">🛣️ Mileage</span>
                      <span className="font-medium">{car.mileage.toLocaleString()} miles</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#222]">
                      <span className="text-muted">⛽ Fuel Type</span>
                      <span className="font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#1A1A1A]">
                      <span className="text-muted">⚙️ Transmission</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#222]">
                      <span className="text-muted">🎨 Color</span>
                      <span className="font-medium">{car.color}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#1A1A1A]">
                      <span className="text-muted">💺 Seats</span>
                      <span className="font-medium">{car.seats || '-'}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-[#222]">
                      <span className="text-muted">🔧 Engine</span>
                      <span className="font-medium">{car.engine || '-'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link href="#contact" className="w-full block text-center bg-gold hover:bg-gold-hover text-background font-bold py-4 px-6 rounded-lg transition-colors text-lg">
                      🚗 Book a Test Drive
                    </Link>
                    <a href="tel:+18001234567" className="w-full flex justify-center items-center bg-transparent border border-gold text-gold hover:bg-gold hover:text-background font-bold py-4 px-6 rounded-lg transition-colors text-lg">
                      📞 Call Us Now
                    </a>
                    <a 
                      href={`https://wa.me/18001234567?text=Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed for $${car.price.toLocaleString()}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="w-full flex justify-center items-center bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                    >
                      <span className="mr-2">💬</span> WhatsApp Enquiry
                    </a>
                  </div>
                  
                  <div className="mt-8 flex flex-col space-y-3 border-t border-[#2A2A2A] pt-6">
                    <div className="flex items-center text-sm text-primary"><span className="text-gold mr-2 text-lg">✅</span> Free Inspection Report</div>
                    <div className="flex items-center text-sm text-primary"><span className="text-gold mr-2 text-lg">✅</span> 7-Day Return Policy</div>
                    <div className="flex items-center text-sm text-primary"><span className="text-gold mr-2 text-lg">✅</span> Secure Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Car Highlights */}
      <section className="py-16 bg-[#0A0A0A] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-xl border border-[#2A2A2A] hover:border-gold transition-all duration-300 shadow-lg text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏅</div>
              <h4 className="font-heading text-xl text-primary mb-2 group-hover:text-gold transition-colors">Certified Pre-Owned</h4>
              <p className="text-muted text-sm">Passed 150-point inspection</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-[#2A2A2A] hover:border-gold transition-all duration-300 shadow-lg text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</div>
              <h4 className="font-heading text-xl text-primary mb-2 group-hover:text-gold transition-colors">Clean Title</h4>
              <p className="text-muted text-sm">No accident history reported</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-[#2A2A2A] hover:border-gold transition-all duration-300 shadow-lg text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
              <h4 className="font-heading text-xl text-primary mb-2 group-hover:text-gold transition-colors">Service History</h4>
              <p className="text-muted text-sm">Full service records available</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-[#2A2A2A] hover:border-gold transition-all duration-300 shadow-lg text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚚</div>
              <h4 className="font-heading text-xl text-primary mb-2 group-hover:text-gold transition-colors">Home Delivery</h4>
              <p className="text-muted text-sm">Available within 48 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Contact / Enquiry Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm car={car} />
        </div>
      </section>

      {/* Section 5 - Similar Cars */}
      {similarCars.length > 0 && (
        <section className="py-20 bg-[#0A0A0A] border-t border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl text-primary mb-10">You May Also Like</h2>
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 hide-scrollbar">
              {similarCars.map((similarCar) => (
                <div 
                  key={similarCar._id} 
                  className="min-w-[300px] sm:min-w-0 bg-card rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-gold hover:-translate-y-1 transition-all duration-300 group flex-shrink-0"
                >
                  <div className="relative h-[200px] w-full">
                    <Image 
                      src={similarCar.images[0]} 
                      alt={`${similarCar.make} ${similarCar.model}`} 
                      fill 
                      className="object-cover"
                    />
                    {similarCar.isFeatured && (
                      <div className="absolute top-4 left-4 bg-gold text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-primary mb-2 group-hover:text-gold transition-colors truncate">
                      {similarCar.year} {similarCar.make} {similarCar.model}
                    </h3>
                    <div className="text-gold text-xl font-bold mb-4">
                      ${similarCar.price.toLocaleString()}
                    </div>
                    
                    <div className="flex justify-between items-center mb-6 pt-4 border-t border-[#2A2A2A]">
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-lg mb-1">🛣️</span>
                        <span className="text-xs text-muted">{similarCar.mileage.toLocaleString()} mi</span>
                      </div>
                      <div className="flex flex-col items-center flex-1 border-x border-[#2A2A2A]">
                        <span className="text-lg mb-1">⛽</span>
                        <span className="text-xs text-muted">{similarCar.fuelType}</span>
                      </div>
                    </div>
                    
                    <Link href={`/cars/${similarCar._id}`} className="block w-full py-2 rounded border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-colors duration-300 text-center">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
