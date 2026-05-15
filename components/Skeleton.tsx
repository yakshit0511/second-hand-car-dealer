export default function Skeleton({ className = "", height = "h-4", width = "w-full", rounded = "rounded" }) {
  return (
    <div className={`animate-pulse bg-[#1A1A1A] relative overflow-hidden ${height} ${width} ${rounded} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
    </div>
  );
}
