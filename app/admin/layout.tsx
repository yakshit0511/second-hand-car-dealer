"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/analytics", label: "Analytics", icon: "📈" },
  { href: "/admin/cars", label: "Manage Cars", icon: "🚗" },
  { href: "/admin/contacts", label: "Contact Submissions", icon: "📩" },
  { href: "/admin/cars/new", label: "Add New Car", icon: "➕" },
  { href: "/admin/submission", label: "Project Checklist", icon: "✅" },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      }
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111111] w-60">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#2A2A2A]">
        <Link href="/admin" className="block font-heading text-gold text-xl font-bold leading-tight">
          AutoNova Motors
        </Link>
        <p className="text-muted text-xs mt-1 font-body tracking-widest uppercase">Admin Panel</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-lg mb-1 transition-all duration-200 text-sm font-body
                ${isActive
                  ? "bg-gold/15 text-gold border-l-[3px] border-gold pl-[17px] font-semibold"
                  : "text-muted hover:text-primary hover:bg-white/5"
                }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-5 border-t border-[#2A2A2A] space-y-3">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors py-2"
        >
          <span>🚪</span> Logout
        </button>
        <Link href="/" className="flex items-center gap-2 text-muted hover:text-gold text-sm transition-colors pt-2 border-t border-[#2A2A2A]/50">
          <span>←</span> Back to Website
        </Link>
        <p className="text-[#444] text-xs">AutoNova Admin v1.0</p>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0 border-r border-[#2A2A2A]">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="relative z-50 border-r border-[#2A2A2A]">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center gap-4 px-4 py-4 bg-[#111111] border-b border-[#2A2A2A]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gold"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-heading text-gold font-bold">AutoNova Admin</span>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
