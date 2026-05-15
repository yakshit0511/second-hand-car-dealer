"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="font-heading text-gold text-2xl font-bold">
              AutoNova Motors
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-primary hover:text-gold transition-colors">Home</Link>
            <Link href="/cars" className="text-primary hover:text-gold transition-colors">Cars</Link>
            <Link href="/about" className="text-primary hover:text-gold transition-colors">About</Link>
            <Link href="/contact" className="text-primary hover:text-gold transition-colors">Contact</Link>
            <button className="bg-gold hover:bg-gold-hover text-background font-bold py-2 px-6 rounded transition-colors">
              List Your Car
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gold focus:outline-none">
              {isOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-gold animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-primary hover:text-gold">Home</Link>
            <Link href="/cars" className="block px-3 py-2 text-primary hover:text-gold">Cars</Link>
            <Link href="/about" className="block px-3 py-2 text-primary hover:text-gold">About</Link>
            <Link href="/contact" className="block px-3 py-2 text-primary hover:text-gold">Contact</Link>
            <div className="px-3 py-2">
              <button className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-2 px-6 rounded transition-colors">
                List Your Car
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
