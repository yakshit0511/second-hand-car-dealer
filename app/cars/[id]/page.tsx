import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarImageGallery from "@/components/CarImageGallery";
import ContactForm from "@/components/ContactForm";
import WishlistButton from "@/components/WishlistButton";
import { ICar } from "@/types/car";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import mongoose from "mongoose";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const car = await getCar(params.id);
  if (!car) return { title: "Car Not Found" };
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://autonova-motors.vercel.app"),
    title: `${car.year} ${car.make} ${car.model} | AutoNova Motors`,
    description: `Check out this ${car.year} ${car.make} ${car.model} available at AutoNova Motors. ${car.mileage.toLocaleString()} miles, ${car.fuelType}, ${car.transmission}.`,
    openGraph: {
      title: `${car.year} ${car.make} ${car.model}`,
      description: `View full details of this ${car.make} ${car.model} at AutoNova Motors.`,
      images: [car.images[0]],
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://autonova-motors.vercel.app"}/cars/${car._id}`,
    }
  };
}

async function getCar(id: string): Promise<ICar | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    await connectDB();
    const car = await Car.findById(id).lean();
    if (!car) return null;
    return JSON.parse(JSON.stringify(car));
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getSimilarCars(id: string, make: string): Promise<ICar[]> {
  try {
    await connectDB();
    let similar = await Car.find({ _id: { $ne: id }, make }).limit(3).lean();
    if (similar.length < 3) {
      const needed = 3 - similar.length;
      const existingIds = similar.map((c) => c._id);
      const extra = await Car.find({ _id: { $nin: [id, ...existingIds] } }).limit(needed).lean();
      similar = [...similar, ...extra];
    }
    return JSON.parse(JSON.stringify(similar));
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

  const similarCars = await getSimilarCars(car._id, car.make);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://autonova-motors.vercel.app";
  const currentUrl = `${siteUrl}/cars/${car._id}`;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${car.year} ${car.make} ${car.model}`,
    "image": car.images[0],
    "description": car.description || `This ${car.year} ${car.make} ${car.model} is available at AutoNova Motors.`,
    "brand": {
      "@type": "Brand",
      "name": car.make
    },
    "offers": {
      "@type": "Offer",
      "price": car.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": currentUrl
    }
  };

  return (
    <main className="min-h-screen bg-background text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Section 1 - Breadcrumb + Title bar */}
      <section className="bg-[#0F0F0F] pt-24 pb-12 border-b border-[#2A2A2A]">
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
              <div className="flex flex-wrap gap-2 mb-4">
                {car.isFeatured && (
                  <span className="bg-gold text-background text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(201,168,76,0.3)]">
                    ⭐ Featured Pick
                  </span>
                )}
                {car.price > 25000 && (
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    🔥 High Demand
                  </span>
                )}
                {car.mileage < 20000 && (
                  <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    💎 Low Mileage
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-primary leading-tight tracking-tighter">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="mt-2">
                  <WishlistButton carId={car._id} />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted mb-6">
                 <span className="animate-pulse mr-2">👁️</span> 
                 <span className="font-bold text-white mr-1">{Math.floor(Math.random() * (45 - 8 + 1)) + 8}</span> people viewed this today
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2 rounded-xl border border-gold/30 bg-[#1A1A1A] text-sm font-bold flex items-center">
                  ⛽ <span className="ml-2 uppercase tracking-widest text-xs">{car.fuelType}</span>
                </span>
                <span className="px-5 py-2 rounded-xl border border-gold/30 bg-[#1A1A1A] text-sm font-bold flex items-center">
                  ⚙️ <span className="ml-2 uppercase tracking-widest text-xs">{car.transmission}</span>
                </span>
                {car.color && (
                  <span className="px-5 py-2 rounded-xl border border-gold/30 bg-[#1A1A1A] text-sm font-bold flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2 border border-white/10" style={{ backgroundColor: car.color.toLowerCase() }}></span>
                    <span className="uppercase tracking-widest text-xs">{car.color}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-gold text-4xl sm:text-5xl md:text-6xl font-black font-heading mb-2 drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                ${car.price.toLocaleString()}
              </div>
              <p className="text-muted text-sm font-medium">Verified Price • Home Delivery Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column */}
            <div className="w-full lg:w-[65%]">
              <CarImageGallery images={car.images} />
              
              <div className="mt-16">
                <h2 className="font-heading text-4xl text-primary mb-8 inline-block relative">
                  About This Vehicle
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full shadow-[0_0_10px_#C9A84C]"></span>
                </h2>
                <div className="text-muted leading-relaxed text-lg whitespace-pre-wrap mt-4 bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A] shadow-inner">
                  {car.description || `This ${car.year} ${car.make} ${car.model} is a well-maintained pre-owned vehicle available at AutoNova Motors. It has been thoroughly inspected and is ready for its new owner.`}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[35%]">
              <div className="sticky top-28 space-y-8">
                {/* Price Card */}
                <div className="bg-[#1A1A1A] border-2 border-gold/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:bg-gold/10 transition-colors"></div>
                  
                  <div className="mb-8">
                    <div className="text-gold text-5xl font-black font-heading mb-2">${car.price.toLocaleString()}</div>
                    <div className="text-muted text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Currently in Stock
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-8 rounded-2xl overflow-hidden border border-[#2A2A2A] bg-background/50">
                    <div className="flex justify-between p-4 border-b border-[#2A2A2A] hover:bg-white/5 transition-colors">
                      <span className="text-muted text-sm font-bold uppercase tracking-widest">Year</span>
                      <span className="font-black text-primary">{car.year}</span>
                    </div>
                    <div className="flex justify-between p-4 border-b border-[#2A2A2A] hover:bg-white/5 transition-colors">
                      <span className="text-muted text-sm font-bold uppercase tracking-widest">Mileage</span>
                      <span className="font-black text-primary">{car.mileage.toLocaleString()} mi</span>
                    </div>
                    <div className="flex justify-between p-4 border-b border-[#2A2A2A] hover:bg-white/5 transition-colors">
                      <span className="text-muted text-sm font-bold uppercase tracking-widest">Engine</span>
                      <span className="font-black text-primary">{car.engine || "—"}</span>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-white/5 transition-colors">
                      <span className="text-muted text-sm font-bold uppercase tracking-widest">Seats</span>
                      <span className="font-black text-primary">{car.seats || "—"}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link href="#contact" className="w-full block text-center bg-gold hover:bg-gold-hover text-background font-black py-5 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-xl shadow-gold/20 text-lg uppercase tracking-widest">
                      Book a Test Drive
                    </Link>
                    <div className="grid grid-cols-2 gap-4">
                      <a href="tel:+18001234567" className="flex justify-center items-center bg-transparent border-2 border-gold/30 text-gold hover:border-gold font-bold py-4 rounded-xl transition-all text-center text-sm uppercase tracking-widest">
                        Call Us
                      </a>
                      <a 
                        href={`https://wa.me/18001234567?text=Hi, I am interested in the ${car.year} ${car.make} ${car.model}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex justify-center items-center bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 rounded-xl transition-all text-center text-sm uppercase tracking-widest"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="mt-10 pt-8 border-t border-[#2A2A2A]">
                    <p className="text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4">Share this vehicle</p>
                    <div className="flex flex-wrap gap-3">
                      <button className="p-2.5 rounded-lg border border-[#2A2A2A] hover:border-gold text-muted hover:text-gold transition-all" aria-label="Share on Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                      </button>
                      <button className="p-2.5 rounded-lg border border-[#2A2A2A] hover:border-gold text-muted hover:text-gold transition-all" aria-label="Share on Twitter">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </button>
                      <button className="flex-grow flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#2A2A2A] hover:border-gold text-muted hover:text-gold transition-all text-xs font-bold uppercase tracking-widest" aria-label="Copy Link">
                        🔗 Copy Link
                      </button>
                    </div>
                  </div>
                </div>

                {/* Badges Column */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] text-center">
                    <div className="text-2xl mb-1">🏅</div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-widest">Certified</div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] text-center">
                    <div className="text-2xl mb-1">📄</div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-widest">Clean Title</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Contact / Enquiry Form */}
      <section id="contact" className="py-24 bg-[#0A0A0A] border-y border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-primary mb-4">Inquire About This Vehicle</h2>
            <p className="text-muted text-lg">Leave your details and our team will get back to you within 2 hours.</p>
          </div>
          <ContactForm car={car} />
        </div>
      </section>

      {/* Section 5 - Similar Cars */}
      {similarCars.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl text-primary mb-12 inline-block relative">
              You May Also Like
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {similarCars.map((similarCar) => (
                <div 
                  key={similarCar._id} 
                  className="bg-card rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-gold transition-all duration-500 group flex-shrink-0 shadow-xl hover:-translate-y-2"
                >
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <Image 
                      src={similarCar.images[0]} 
                      alt={`${similarCar.make} ${similarCar.model}`} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-gold transition-colors truncate">
                      {similarCar.year} {similarCar.make} {similarCar.model}
                    </h3>
                    <div className="text-gold text-2xl font-black mb-6">
                      ${similarCar.price.toLocaleString()}
                    </div>
                    
                    <Link href={`/cars/${similarCar._id}`} className="block w-full py-4 rounded-xl border border-gold text-gold font-bold hover:bg-gold hover:text-background transition-all duration-300 text-center uppercase tracking-widest text-xs">
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
