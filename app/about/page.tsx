import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | The AutoNova Story",
  description: "Learn how AutoNova Motors became New York's most trusted pre-owned car dealership. Our mission, our team, and our heritage.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />

      {/* Section 1 - Hero Banner */}
      <section className="relative w-full h-[400px] flex items-center justify-center">
        <Image 
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600" 
          alt="AutoNova Motors Showroom" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20 text-sm font-body">
          <Link href="/" className="text-white hover:text-gold transition-colors drop-shadow-md">Home</Link>
          <span className="mx-2 text-white drop-shadow-md">&gt;</span>
          <span className="text-gold drop-shadow-md">About</span>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block bg-gold/20 border border-gold text-gold px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            🏆 Established 2005 — 20 Years of Trust
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6">
            About AutoNova Motors
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-body max-w-2xl mx-auto">
            New York's most trusted pre-owned car dealership
          </p>
        </div>
      </section>

      {/* Section 2 - Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left - Text */}
            <div className="w-full lg:w-1/2">
              <div className="mb-8 relative inline-block">
                <h2 className="font-heading text-4xl text-primary relative z-10">Our Story</h2>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full"></span>
              </div>
              
              <div className="space-y-6 text-muted text-lg leading-relaxed mb-10">
                <p>
                  AutoNova Motors was founded in 2005 with a simple mission: make buying a used car as transparent and stress-free as possible. What started as a small lot with 20 vehicles has grown into New York's premier pre-owned dealership with over 500 vehicles in stock.
                </p>
                <p>
                  We believe every customer deserves honesty, fair pricing, and a car they can trust. That's why every vehicle in our inventory undergoes a rigorous 150-point inspection before it reaches our showroom floor.
                </p>
                <p>
                  Today, with over 5,000 happy customers and a team of 30 dedicated professionals, we continue to uphold the same values that made us who we are: integrity, quality, and customer-first service.
                </p>
              </div>

              <div className="flex gap-6">
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 flex-1 text-center border-b-2 border-b-gold">
                  <div className="text-3xl font-bold text-gold mb-1">20+</div>
                  <div className="text-sm text-primary font-medium">Years in Business</div>
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 flex-1 text-center border-b-2 border-b-gold">
                  <div className="text-3xl font-bold text-gold mb-1">5,000+</div>
                  <div className="text-sm text-primary font-medium">Cars Sold</div>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-[420px] w-full rounded-xl overflow-hidden border-2 border-gold shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                <Image 
                  src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800" 
                  alt="AutoNova Dealership" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3 - Stats Bar */}
      <section className="bg-[#0A0A0A] py-16 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#2A2A2A] text-center">
            <div className="pt-4 md:pt-0 flex flex-col items-center">
              <div className="text-4xl mb-3">🚗</div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">500+</div>
              <div className="text-white font-medium tracking-wide">Vehicles in Stock</div>
            </div>
            <div className="pt-4 md:pt-0 flex flex-col items-center">
              <div className="text-4xl mb-3">😊</div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">5,000+</div>
              <div className="text-white font-medium tracking-wide">Happy Customers</div>
            </div>
            <div className="pt-4 md:pt-0 flex flex-col items-center">
              <div className="text-4xl mb-3">🏆</div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">20+</div>
              <div className="text-white font-medium tracking-wide">Years Experience</div>
            </div>
            <div className="pt-4 md:pt-0 flex flex-col items-center">
              <div className="text-4xl mb-3">⭐</div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">4.9/5</div>
              <div className="text-white font-medium tracking-wide">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="font-heading text-4xl text-primary mb-4 relative z-10">Meet Our Team</h2>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold rounded-full"></span>
            </div>
            <p className="text-muted mt-6 text-lg">The people who make AutoNova Motors extraordinary</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Team Member 1 */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 text-center hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg group">
              <div className="relative w-[120px] h-[120px] mx-auto mb-6 rounded-full overflow-hidden border-[3px] border-gold p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" 
                    alt="James Mitchell" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading text-2xl text-primary mb-1">James Mitchell</h3>
              <p className="text-gold text-sm font-bold tracking-widest uppercase mb-4">Founder & CEO</p>
              <p className="text-muted text-sm leading-relaxed">
                "With 25 years in the automotive industry, James built AutoNova from the ground up with a vision of honest, customer-first car sales."
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 text-center hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg group">
              <div className="relative w-[120px] h-[120px] mx-auto mb-6 rounded-full overflow-hidden border-[3px] border-gold p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" 
                    alt="Sarah Collins" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading text-2xl text-primary mb-1">Sarah Collins</h3>
              <p className="text-gold text-sm font-bold tracking-widest uppercase mb-4">Head of Sales</p>
              <p className="text-muted text-sm leading-relaxed">
                "Sarah leads our sales team with warmth and expertise, helping hundreds of customers find their perfect vehicle every year."
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 text-center hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg group md:col-span-2 lg:col-span-1 md:w-1/2 lg:w-full md:mx-auto">
              <div className="relative w-[120px] h-[120px] mx-auto mb-6 rounded-full overflow-hidden border-[3px] border-gold p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400" 
                    alt="David Park" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading text-2xl text-primary mb-1">David Park</h3>
              <p className="text-gold text-sm font-bold tracking-widest uppercase mb-4">Lead Mechanic & Inspector</p>
              <p className="text-muted text-sm leading-relaxed">
                "David ensures every car meets AutoNova's strict quality standards through his rigorous 150-point inspection process."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5 - Testimonials */}
      <section className="py-20 bg-[#0A0A0A] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-primary text-center mb-16">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] border-l-[3px] border-l-gold rounded-r-xl p-8 relative shadow-lg">
              <div className="absolute top-4 right-6 text-6xl text-gold opacity-20 font-heading leading-none">"</div>
              <div className="text-gold mb-4 text-xl tracking-widest">★★★★★</div>
              <p className="text-muted italic mb-6 relative z-10 leading-relaxed">
                "Buying from AutoNova was the smoothest car purchase I've ever made. Zero pressure, transparent pricing, and the car was exactly as described. Highly recommend!"
              </p>
              <p className="text-white font-bold">— Michael R.</p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] border-l-[3px] border-l-gold rounded-r-xl p-8 relative shadow-lg">
              <div className="absolute top-4 right-6 text-6xl text-gold opacity-20 font-heading leading-none">"</div>
              <div className="text-gold mb-4 text-xl tracking-widest">★★★★★</div>
              <p className="text-muted italic mb-6 relative z-10 leading-relaxed">
                "The team helped me find the perfect family SUV within my budget. The 150-point inspection report gave me total confidence. I'll definitely be back!"
              </p>
              <p className="text-white font-bold">— Priya S.</p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] border-l-[3px] border-l-gold rounded-r-xl p-8 relative shadow-lg">
              <div className="absolute top-4 right-6 text-6xl text-gold opacity-20 font-heading leading-none">"</div>
              <div className="text-gold mb-4 text-xl tracking-widest">★★★★★</div>
              <p className="text-muted italic mb-6 relative z-10 leading-relaxed">
                "Home delivery was a game changer. My Tesla Model 3 arrived spotless and on time. AutoNova Motors is a cut above the rest."
              </p>
              <p className="text-white font-bold">— Carlos M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - CTA Banner */}
      <section className="w-full bg-gradient-to-br from-[#C9A84C] to-[#E2C06A] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-[#0F0F0F] font-bold mb-6">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-[#1A1A1A] text-xl mb-10 font-medium">
            Browse our collection of 500+ premium pre-owned vehicles today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/cars" 
              className="bg-[#0F0F0F] hover:bg-[#1A1A1A] text-white font-bold py-4 px-10 rounded-lg transition-colors text-lg shadow-lg"
            >
              Browse Cars
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-gold font-bold py-4 px-10 rounded-lg transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
