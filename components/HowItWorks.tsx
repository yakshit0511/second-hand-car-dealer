"use client";

import { useEffect, useRef } from "react";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll(".step-item");
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: "01",
      icon: "🔍",
      title: "Browse",
      desc: "Search our inventory of 500+ vehicles by make, model, or budget"
    },
    {
      num: "02",
      icon: "📋",
      title: "Inspect",
      desc: "Every car comes with a full 150-point inspection report"
    },
    {
      num: "03",
      icon: "💰",
      title: "Finance",
      desc: "Get pre-approved financing in minutes with our partner lenders"
    },
    {
      num: "04",
      icon: "🚗",
      title: "Drive",
      desc: "Complete paperwork online and take delivery in 48 hours"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl text-primary mb-4 inline-block relative">
            How It Works
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full shadow-[0_0_10px_#C9A84C]"></span>
          </h2>
          <p className="text-muted text-lg mt-6">Your journey to a new car in 4 simple steps</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gold/30 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <div 
                key={step.num} 
                className="step-item opacity-0 transition-all duration-700 flex flex-col items-center text-center z-10"
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-gold bg-[#1A1A1A] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(201,168,76,0.2)] group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gold text-background text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-background">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-heading text-2xl text-primary mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed max-w-[250px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
