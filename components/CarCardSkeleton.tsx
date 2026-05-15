import Skeleton from "./Skeleton";

export default function CarCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-xl h-full">
      <Skeleton height="h-[240px]" rounded="rounded-none" />
      <div className="p-6">
        <Skeleton height="h-8" width="w-3/4" className="mb-2" />
        <Skeleton height="h-10" width="w-1/2" className="mb-6" />
        
        <div className="grid grid-cols-3 gap-2 mb-6 pt-4 border-t border-[#2A2A2A]">
          <div className="flex flex-col items-center">
            <Skeleton height="h-6" width="w-6" rounded="rounded-full" className="mb-2" />
            <Skeleton height="h-3" width="w-12" />
          </div>
          <div className="flex flex-col items-center border-x border-[#2A2A2A]">
            <Skeleton height="h-6" width="w-6" rounded="rounded-full" className="mb-2" />
            <Skeleton height="h-3" width="w-12" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton height="h-6" width="w-6" rounded="rounded-full" className="mb-2" />
            <Skeleton height="h-3" width="w-12" />
          </div>
        </div>
        
        <Skeleton height="h-[56px]" rounded="rounded-xl" />
      </div>
    </div>
  );
}
