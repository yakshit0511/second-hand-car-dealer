import Skeleton from "@/components/Skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Skeleton */}
      <section className="bg-[#0F0F0F] pt-24 pb-12 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton height="h-4" width="w-32" className="mb-6" />
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div className="flex-grow">
              <div className="flex gap-2 mb-4">
                <Skeleton height="h-6" width="w-24" rounded="rounded-full" />
                <Skeleton height="h-6" width="w-24" rounded="rounded-full" />
              </div>
              <Skeleton height="h-16" width="w-3/4" className="mb-6" />
              <div className="flex gap-3">
                <Skeleton height="h-10" width="w-32" rounded="rounded-xl" />
                <Skeleton height="h-10" width="w-32" rounded="rounded-xl" />
              </div>
            </div>
            <div className="w-48">
              <Skeleton height="h-16" width="w-full" className="mb-2" />
              <Skeleton height="h-4" width="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-[65%]">
              <Skeleton height="h-[540px]" rounded="rounded-2xl" className="mb-6" />
              <div className="grid grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} height="h-[90px]" rounded="rounded-xl" />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[35%] space-y-8">
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 h-[500px]">
                <Skeleton height="h-12" width="w-1/2" className="mb-8" />
                <div className="space-y-4 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} height="h-12" />
                  ))}
                </div>
                <Skeleton height="h-16" rounded="rounded-xl" className="mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton height="h-12" rounded="rounded-xl" />
                  <Skeleton height="h-12" rounded="rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
