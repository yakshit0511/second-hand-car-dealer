import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "AutoNova Motors | New York's Trusted Pre-Owned Car Dealer",
    template: "%s | AutoNova Motors"
  },
  description: "AutoNova Motors — New York's most trusted pre-owned car dealership. Browse 500+ premium used cars with transparent pricing, certified inspections, and home delivery.",
  keywords: ["used cars", "pre-owned cars", "second hand cars", "car dealer New York", "AutoNova Motors", "luxury cars NYC", "certified pre-owned"],
  authors: [{ name: "AutoNova Motors" }],
  metadataBase: new URL("https://second-hand-car-dealer-b1f0p71gv-23it047-charusatedus-projects.vercel.app"),
  openGraph: {
    title: "AutoNova Motors",
    description: "New York's most trusted pre-owned car dealership",
    url: "https://second-hand-car-dealer-b1f0p71gv-23it047-charusatedus-projects.vercel.app",
    siteName: "AutoNova Motors",
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
        width: 1200,
        height: 630,
        alt: "AutoNova Motors Showroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoNova Motors",
    description: "New York's most trusted pre-owned car dealership",
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

import { Toaster } from "react-hot-toast";
import AIChatWidget from "@/components/AIChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body antialiased bg-background text-primary selection:bg-gold selection:text-background`}
      >
        <Toaster position="top-center" />
        {children}
        <WhatsAppButton />
        <AIChatWidget />
        <ScrollToTop />
      </body>
    </html>
  );
}
