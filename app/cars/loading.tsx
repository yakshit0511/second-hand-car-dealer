import CarCardSkeleton from "@/components/CarCardSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="flex justify-between items-end mb-16">
          <div className="w-1/3">
             <div className="h-10 bg-[#1A1A1A] rounded-lg animate-pulse mb-4"></div>
             <div className="h-4 bg-[#1A1A1A] rounded-lg animate-pulse w-3/4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
