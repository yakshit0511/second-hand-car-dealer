import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import { ICar } from "@/types/car";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getFeaturedCars(): Promise<ICar[]> {
  try {
    await connectDB();
    // Only fetch cars where isFeatured: true
    const cars = await Car.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(6).lean();
    return JSON.parse(JSON.stringify(cars));
  } catch (error) {
    console.error("Failed to fetch featured cars:", error);
    return [];
  }
}

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <main className="min-h-screen bg-background text-primary selection:bg-gold selection:text-background">
      <Navbar />
      <Hero />
      <FeaturedCars cars={featuredCars} />
      <HowItWorks />
      <WhyChooseUs />
      <Newsletter />
      
      {/* Admin Access Section */}
      <section className="py-12 bg-[#0A0A0A] border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted text-sm mb-4">Authorized personnel only</p>
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-all group font-heading text-lg"
          >
            <span>🔐 Admin Login</span>
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
