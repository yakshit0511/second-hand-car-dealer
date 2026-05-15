import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarsGrid from "@/components/CarsGrid";
import { Suspense } from "react";

async function getCars() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${url}/api/cars`, {
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch cars");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-[#0A0A0A] border-b border-gold pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="text-sm text-muted mb-4 font-body tracking-wider uppercase">
            <span className="text-gold">Home</span> &gt; Cars
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Our Vehicle Collection
          </h1>
          <p className="text-muted text-lg font-body max-w-2xl">
            Explore our handpicked selection of premium pre-owned vehicles
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="flex justify-center items-center py-32">
              <div className="w-16 h-16 border-4 border-[#2A2A2A] border-t-gold rounded-full animate-spin"></div>
            </div>
          }>
            <CarsGrid initialCars={cars} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
