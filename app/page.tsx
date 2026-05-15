import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
