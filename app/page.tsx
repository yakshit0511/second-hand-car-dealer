import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import { ICar } from "@/types/car";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "AutoNova Motors | Premium Pre-Owned Vehicles",
  description: "Find your perfect ride at AutoNova Motors. Browse our certified luxury inventory.",
};

async function getFeaturedCars(): Promise<ICar[]> {
  try {
    await connectDB();
    // Fetch cars marked as featured, limit to 6, sort by most recent
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
    <main className="min-h-screen bg-background text-primary">
      <Navbar />
      <Hero />
      <FeaturedCars cars={featuredCars} />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
