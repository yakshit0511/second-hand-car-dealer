import Skeleton from "@/components/Skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-12">
      <div>
        <Skeleton height="h-10" width="w-48" className="mb-4" />
        <Skeleton height="h-6" width="w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-xl">
            <Skeleton height="h-4" width="w-24" className="mb-4" />
            <Skeleton height="h-8" width="w-32" />
          </div>
        ))}
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2A2A]">
          <Skeleton height="h-6" width="w-32" />
        </div>
        <div className="p-6 space-y-4">
          <Skeleton height="h-12" />
          <Skeleton height="h-12" />
          <Skeleton height="h-12" />
          <Skeleton height="h-12" />
          <Skeleton height="h-12" />
        </div>
      </div>
    </div>
  );
}
