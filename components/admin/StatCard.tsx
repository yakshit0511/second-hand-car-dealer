interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  subLabel: string;
  trend?: string;
}

export default function StatCard({ icon, label, value, subLabel, trend }: StatCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-gold rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.1)] relative overflow-hidden group">
      <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gold font-heading mb-1">{value}</div>
      <div className="text-primary font-semibold mb-1">{label}</div>
      <div className="text-muted text-sm">{subLabel}</div>
      {trend && (
        <div className="mt-3 text-green-400 text-xs font-medium flex items-center gap-1">
          <span>↑</span> {trend}
        </div>
      )}
    </div>
  );
}
