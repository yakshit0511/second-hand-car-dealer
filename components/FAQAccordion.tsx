"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className={`bg-[#1A1A1A] rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'border-l-[3px] border-l-gold' : 'border border-[#2A2A2A]'}`}>
      <button 
        className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h4 className="font-heading text-lg text-primary text-left">{question}</h4>
        <span className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do you offer financing options?",
      answer: "Yes! We work with multiple lenders to offer flexible financing plans. You can get pre-approved in minutes. Contact our finance team for a personalized quote."
    },
    {
      question: "Can I trade in my current vehicle?",
      answer: "Absolutely. We accept trade-ins and offer competitive valuations. Bring your car to our showroom or submit details online for a free estimate."
    },
    {
      question: "Do you offer a warranty on used cars?",
      answer: "All our vehicles come with a minimum 1-year mechanical warranty. Extended warranty options are also available at checkout."
    },
    {
      question: "Can I book a test drive online?",
      answer: "Yes! Simply fill out the contact form above or click 'Book a Test Drive' on any car listing. We'll confirm your slot within 1 hour."
    },
    {
      question: "Is home delivery available?",
      answer: "We offer home delivery within a 100-mile radius of our showroom. Delivery is free for purchases over $15,000."
    },
    {
      question: "What documents do I need to buy a car?",
      answer: "You'll need a valid government-issued ID, proof of insurance, and payment method. Our team will guide you through all the paperwork."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem 
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
