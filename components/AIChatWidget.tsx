"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm AutoNova's AI assistant. Ask me anything about our cars!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) 
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What's your cheapest car?",
    "Do you have electric cars?",
    "How does financing work?"
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[10000]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-card border border-gold/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 bg-[#1A1A1A] border-b border-[#2A2A2A] flex justify-between items-center">
            <h3 className="font-heading text-gold font-bold flex items-center gap-2">
              <span className="animate-bounce">🤖</span> AutoNova AI Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-gold text-background font-bold rounded-tr-none" 
                    : "bg-[#1A1A1A] text-primary border border-[#2A2A2A] rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1A1A1A] p-3 rounded-2xl rounded-tl-none border border-[#2A2A2A]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 pt-0 flex flex-wrap gap-2">
              {quickQuestions.map(q => (
                <button 
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[10px] bg-gold/10 hover:bg-gold/20 border border-gold/20 text-gold px-3 py-1.5 rounded-full transition-all active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-4 bg-[#1A1A1A] border-t border-[#2A2A2A] flex gap-2"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 bg-background border border-[#2A2A2A] rounded-xl px-4 py-2 text-sm focus:border-gold outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gold text-background p-2 rounded-xl hover:bg-gold-hover transition-all disabled:opacity-50 disabled:grayscale active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 ${
          isOpen ? "bg-[#2A2A2A] rotate-90" : "bg-gold animate-bounce"
        }`}
      >
        {isOpen ? "✕" : "🤖"}
      </button>
    </div>
  );
}
