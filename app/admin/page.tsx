"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/admin/StatCard";
import AdminTable from "@/components/admin/AdminTable";
import { ICar } from "@/types/car";

interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

interface Stats {
  totalCars: number;
  totalEnquiries: number;
  featuredCars: number;
  newThisMonth: number;
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="text-right">
      <p className="text-muted text-sm font-body">
        {now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p className="text-primary text-sm font-mono">{now.toLocaleTimeString("en-US")}</p>
      <p className="text-gold text-sm mt-1">{greeting}, Admin 👋</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentCars, setRecentCars] = useState<ICar[]>([]);
  const [recentContacts, setRecentContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, carsRes, contactsRes] = await Promise.all([
        fetch("/api/admin/stats", { cache: "no-store" }),
        fetch("/api/cars", { cache: "no-store" }),
        fetch("/api/contact", { cache: "no-store" }),
      ]);
      const statsData = await statsRes.json();
      const carsData = await carsRes.json();
      const contactsData = await contactsRes.json();

      setStats(statsData);
      setRecentCars(carsData.slice(0, 5));
      setRecentContacts(contactsData.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-[#1A1A1A] rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 bg-[#1A1A1A] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <h1 className="font-heading text-3xl text-primary">Dashboard Overview</h1>
        <LiveClock />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="🚗" label="Total Cars" value={stats?.totalCars ?? 0} subLabel="vehicles in inventory" trend="+2 this week" />
        <StatCard icon="📩" label="Total Enquiries" value={stats?.totalEnquiries ?? 0} subLabel="contact submissions" trend="+5 this week" />
        <StatCard icon="⭐" label="Featured Cars" value={stats?.featuredCars ?? 0} subLabel="featured listings" />
        <StatCard icon="🆕" label="New This Month" value={stats?.newThisMonth ?? 0} subLabel="added this month" />
      </div>

      {/* Recent Enquiries */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading text-xl text-primary">Recent Enquiries</h2>
          <Link href="/admin/contacts" className="text-gold text-sm hover:text-gold/80 transition-colors">View All →</Link>
        </div>
        <AdminTable
          headers={["Name", "Email", "Subject", "Message", "Date"]}
          isEmpty={recentContacts.length === 0}
          emptyMessage="No enquiries yet."
        >
          {recentContacts.map((c, i) => (
            <tr key={c._id} className={`border-t border-[#2A2A2A] hover:bg-gold/5 transition-colors ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0F0F0F]"}`}>
              <td className="px-4 py-3 text-primary font-medium whitespace-nowrap">{c.name}</td>
              <td className="px-4 py-3 text-muted text-xs">{c.email}</td>
              <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{c.subject || "—"}</td>
              <td className="px-4 py-3 text-muted text-xs max-w-[200px] truncate">{c.message.slice(0, 60)}{c.message.length > 60 ? "…" : ""}</td>
              <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>

      {/* Recent Cars */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading text-xl text-primary">Recently Added Cars</h2>
          <Link href="/admin/cars" className="text-gold text-sm hover:text-gold/80 transition-colors">View All →</Link>
        </div>
        <AdminTable
          headers={["Image", "Car", "Year", "Price", "Fuel", "Featured", "Actions"]}
          isEmpty={recentCars.length === 0}
          emptyMessage="No cars in inventory."
        >
          {recentCars.map((car, i) => (
            <tr key={car._id} className={`border-t border-[#2A2A2A] hover:bg-gold/5 transition-colors ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0F0F0F]"}`}>
              <td className="px-4 py-3">
                <div className="relative w-10 h-10 rounded overflow-hidden bg-[#2A2A2A]">
                  {car.images?.[0] && <Image src={car.images[0]} alt={car.make} fill className="object-cover" />}
                </div>
              </td>
              <td className="px-4 py-3 text-primary font-medium whitespace-nowrap">{car.make} {car.model}</td>
              <td className="px-4 py-3 text-muted">{car.year}</td>
              <td className="px-4 py-3 text-gold font-semibold">${car.price.toLocaleString()}</td>
              <td className="px-4 py-3 text-muted">{car.fuelType}</td>
              <td className="px-4 py-3">
                {car.isFeatured
                  ? <span className="text-gold text-xs font-bold">⭐ Yes</span>
                  : <span className="text-muted text-xs">No</span>}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link href={`/cars/${car._id}`} target="_blank" className="text-xs border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold px-2 py-1 rounded transition-colors">View</Link>
                  <Link href={`/admin/cars/${car._id}/edit`} className="text-xs border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold px-2 py-1 rounded transition-colors">Edit</Link>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
