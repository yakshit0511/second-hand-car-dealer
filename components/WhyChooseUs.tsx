export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      icon: "🛡️",
      title: "Verified Cars",
      description: "Every vehicle goes through a 150-point inspection"
    },
    {
      id: 2,
      icon: "💰",
      title: "Best Prices",
      description: "We price-match and offer flexible financing options"
    },
    {
      id: 3,
      icon: "🚗",
      title: "Wide Selection",
      description: "500+ vehicles across all makes and models"
    },
    {
      id: 4,
      icon: "📋",
      title: "Easy Paperwork",
      description: "We handle all the documentation for you"
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-primary mb-4 inline-block relative">
            Why AutoNova Motors?
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div 
              key={reason.id} 
              className="bg-card p-8 rounded-xl border border-[#2A2A2A] hover:border-gold transition-all duration-300 shadow-lg text-center group hover:-translate-y-2"
            >
              <div className="text-5xl mb-6 inline-block transform group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4 group-hover:text-gold transition-colors">{reason.title}</h3>
              <p className="text-muted leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
