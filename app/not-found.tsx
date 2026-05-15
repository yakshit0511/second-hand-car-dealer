import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <div className="relative inline-block mb-8">
            <span className="text-[120px] md:text-[180px] font-heading font-black text-gold/10 leading-none">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl animate-bounce">🚗</span>
            </div>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl text-primary mb-6">Page Not Found</h1>
          <p className="text-muted text-lg md:text-xl mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a different showroom.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="bg-gold hover:bg-gold-hover text-background font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-gold/20 text-lg uppercase tracking-widest"
            >
              Back to Home
            </Link>
            <Link 
              href="/cars" 
              className="bg-transparent border-2 border-gold/30 text-gold hover:border-gold font-bold py-4 px-10 rounded-xl transition-all text-lg uppercase tracking-widest"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
