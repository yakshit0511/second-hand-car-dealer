import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageContactForm from "@/components/PageContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | AutoNova Motors",
  description: "Get in touch with AutoNova Motors for premium pre-owned vehicles, test drives, and financing enquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />

      {/* Section 1 - Page Hero Banner */}
      <section className="relative bg-[#0F0F0F] pt-20 pb-16 border-b border-gold overflow-hidden">
        {/* Subtle gold radial gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="text-sm text-muted mb-4 font-body uppercase tracking-wider">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gold">Contact</span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
            Get In Touch
          </h1>
          <p className="text-muted text-lg font-body max-w-2xl">
            Have a question about a vehicle? Ready to book a test drive? Our team is here to help you 7 days a week.
          </p>
        </div>
      </section>

      {/* Section 2 - Contact Info + Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column - Contact Information Cards */}
            <div className="w-full lg:w-5/12 space-y-6">
              
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-gold rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform text-gold">📍</div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">Visit Us</h3>
                    <p className="text-muted text-sm mb-2">
                      AutoNova Motors Showroom<br/>
                      123 AutoNova Street, Manhattan<br/>
                      New York, NY 10001
                    </p>
                    <p className="text-gold text-sm font-medium">Open Mon–Sat: 9am – 7pm, Sun: 10am – 5pm</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-gold rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform text-gold">📞</div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">Call Us</h3>
                    <div className="flex flex-col space-y-1 mb-2">
                      <a href="tel:+18001234567" className="text-muted hover:text-gold transition-colors text-sm">+1 800 123 4567</a>
                      <a href="tel:+18009876543" className="text-muted hover:text-gold transition-colors text-sm">+1 800 987 6543</a>
                    </div>
                    <p className="text-gold text-sm font-medium">Available 7 days, 9am – 8pm</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-gold rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform text-gold">✉️</div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">Email Us</h3>
                    <div className="flex flex-col space-y-1 mb-2">
                      <a href="mailto:info@autonova.com" className="text-muted hover:text-gold transition-colors text-sm">info@autonova.com</a>
                      <a href="mailto:sales@autonova.com" className="text-muted hover:text-gold transition-colors text-sm">sales@autonova.com</a>
                    </div>
                    <p className="text-gold text-sm font-medium">We reply within 2 business hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-gold rounded-xl p-6 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="text-3xl mr-4 group-hover:scale-110 transition-transform text-gold">💬</div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">WhatsApp</h3>
                    <p className="text-muted text-sm mb-4">Chat with us instantly on WhatsApp</p>
                    <a 
                      href="https://wa.me/18001234567" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm mb-2"
                    >
                      <span className="mr-2">💬</span> Open WhatsApp
                    </a>
                    <p className="text-gold text-sm font-medium">Typically replies in under 10 minutes</p>
                  </div>
                </div>
              </div>

              {/* Social Media Row */}
              <div className="pt-6">
                <h3 className="font-heading text-xl text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors bg-[#1A1A1A]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors bg-[#1A1A1A]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors bg-[#1A1A1A]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-colors bg-[#1A1A1A]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column - Contact Form */}
            <div className="w-full lg:w-7/12">
              <PageContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Section 3 - Google Maps Embed */}
      <section className="py-12 bg-[#0A0A0A] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center md:text-left">Find Our Showroom</h2>
          <div className="w-full rounded-xl p-1 bg-[#1A1A1A] border border-gold">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.1583091352!2d-74.11976383964435!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "10px", filter: "grayscale(30%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Section 4 - FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-muted">Everything you need to know about buying a car from AutoNova Motors.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <Footer />
    </main>
  );
}
