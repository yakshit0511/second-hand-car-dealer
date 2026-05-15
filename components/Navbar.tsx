"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [carCount, setCarCount] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setCarCount(data.totalCars);
        }
      } catch (error) {
        console.error("Failed to fetch car count", error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchStats();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cars", href: "/cars", badge: carCount },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[5000] transition-all duration-500 ${
        scrolled 
          ? "bg-[#0F0F0F]/95 backdrop-blur-md border-b border-gold/30 py-4 shadow-2xl" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="font-heading text-gold text-2xl font-bold tracking-tighter group flex items-center">
              <span className="bg-gold text-background px-2 py-0.5 rounded mr-1 transition-transform group-hover:-rotate-6">A</span>
              utoNova
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative py-2 transition-colors ${
                  isActive(link.href) ? "text-gold" : "text-primary hover:text-gold"
                }`}
              >
                {link.name}
                {link.badge !== null && link.name === "Cars" && (
                  <span className="absolute -top-1 -right-4 bg-gold text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {link.badge}
                  </span>
                )}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#C9A84C]"></span>
                )}
              </Link>
            ))}
            <Link 
              href="/cars"
              className="bg-gold hover:bg-gold-hover text-background font-bold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg active:scale-95"
            >
              List Your Car
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="relative w-10 h-10 text-gold focus:outline-none flex flex-col justify-center items-center"
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`}></span>
              <span className={`block w-6 h-0.5 bg-gold my-1 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-[#111111]/98 backdrop-blur-xl border-b border-gold/20 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`block px-4 py-3 rounded-lg transition-all ${
                isActive(link.href) 
                  ? "text-gold bg-gold/5 border-l-4 border-gold pl-3" 
                  : "text-primary hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{link.name}</span>
                {link.badge !== null && link.name === "Cars" && (
                  <span className="bg-gold text-background text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
          <div className="pt-4">
            <Link 
              href="/cars"
              className="block w-full bg-gold text-background font-bold py-4 rounded-xl text-center shadow-xl shadow-gold/10"
            >
              List Your Car
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
