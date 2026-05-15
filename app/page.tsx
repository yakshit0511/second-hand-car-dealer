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
      <Footer />
    </main>
  );
}
