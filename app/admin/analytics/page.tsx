"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#C9A84C", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-48 bg-[#1A1A1A] rounded" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-80 bg-[#1A1A1A] rounded-xl" />
        <div className="h-80 bg-[#1A1A1A] rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="space-y-12 pb-12">
      <div>
        <h1 className="font-heading text-4xl text-primary mb-2">Visual Analytics</h1>
        <p className="text-muted">Real-time data insights and dealership performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enquiries Over Time */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-heading text-gold mb-6">Enquiries Over Time (30d)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.enquiriesByDate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="date" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #2A2A2A" }} />
                <Line type="monotone" dataKey="count" stroke="#C9A84C" strokeWidth={3} dot={{ fill: "#C9A84C" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cars by Fuel Type */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-heading text-gold mb-6">Cars by Fuel Type</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.fuelTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.fuelTypeData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #2A2A2A" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cars by Price Range */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-heading text-gold mb-6">Inventory by Price Range</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="range" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #2A2A2A" }} />
                <Bar dataKey="count" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Viewed */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-heading text-gold mb-6">Most Viewed Vehicles</h2>
          <div className="space-y-4">
            {data.mostViewed.map((car: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="relative w-12 h-10 rounded overflow-hidden flex-shrink-0">
                  <img src={car.image} alt={car.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-primary font-medium">{car.name}</span>
                    <span className="text-gold font-bold">{car.views} views</span>
                  </div>
                  <div className="w-full bg-[#0F0F0F] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gold h-full rounded-full" 
                      style={{ width: `${(car.views / 2000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
