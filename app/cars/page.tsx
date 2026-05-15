import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarsGrid from "@/components/CarsGrid";
import { Suspense } from "react";
import Loading from "./loading";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import { ICar } from "@/types/car";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCars(): Promise<ICar[]> {
  try {
    await connectDB();
    // We fetch all cars here and handle filtering on the client for a smoother experience
    // as per the existing CarsGrid implementation.
    const cars = await Car.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(cars));
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CarsPage({ searchParams }: PageProps) {
  const cars = await getCars();
  
  // Extract search from query params to pass to client component
  const initialSearch = typeof searchParams.search === 'string' ? searchParams.search : "";

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
          <Suspense fallback={<Loading />}>
            <CarsGrid initialCars={cars} initialSearch={initialSearch} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
