"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";

export default function SubmissionChecklist() {
  const [checklist, setChecklist] = useState({
    homepage: true,
    listing: true,
    detail: true,
    contactForm: true,
    adminStats: true,
    deployed: true,
    repoPublic: true,
    readme: true,
    envHidden: true,
    seedRun: true,
  });

  const [githubUrl, setGithubUrl] = useState("https://github.com/yakshit0511/second-hand-car-dealer");
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://second-hand-car-dealer-git-main-23it047-charusatedus-projects.vercel.app";

  const toggle = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyMessage = () => {
    const text = `Hi! Here is my AutoNova Motors project submission:
Live Link: https://autonova-motors.vercel.app
GitHub Repo: ${githubUrl}
Tech Stack: Next.js 14, MongoDB Atlas, Tailwind CSS, Vercel`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const items = [
    { key: "homepage", label: "Homepage loads with hero section" },
    { key: "listing", label: "Cars listing page shows all 9 cars" },
    { key: "detail", label: "Car detail page loads with image gallery" },
    { key: "contactForm", label: "Contact form saves to MongoDB" },
    { key: "adminStats", label: "Admin dashboard shows real stats" },
    { key: "deployed", label: "Website is deployed on Vercel" },
    { key: "repoPublic", label: "GitHub repo is public" },
    { key: "readme", label: "README.md is complete" },
    { key: "envHidden", label: ".env.local is NOT in GitHub" },
    { key: "seedRun", label: "/api/seed has been run on production" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="font-heading text-4xl text-primary mb-2">Project Submission Checklist</h1>
          <p className="text-muted">Final verification before handing over the project</p>
        </div>
        <Link href="/admin" className="text-gold hover:underline text-sm font-medium">← Back to Admin</Link>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {items.map((item) => (
            <label key={item.key} className="flex items-center gap-4 cursor-pointer group">
              <div 
                onClick={() => toggle(item.key as keyof typeof checklist)}
                className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                  checklist[item.key as keyof typeof checklist] 
                    ? "bg-gold border-gold text-background" 
                    : "border-[#444] group-hover:border-gold/50"
                }`}
              >
                {checklist[item.key as keyof typeof checklist] && <span>✓</span>}
              </div>
              <span className={`text-sm transition-colors ${
                checklist[item.key as keyof typeof checklist] ? "text-primary font-medium" : "text-muted"
              }`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-muted text-xs font-bold uppercase tracking-widest mb-2">Live URL</label>
            <input 
              type="text" 
              readOnly
              value={siteUrl}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-gold text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-muted text-xs font-bold uppercase tracking-widest mb-2">GitHub Repo URL</label>
            <input 
              type="text" 
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/repo"
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-primary text-sm focus:border-gold outline-none transition-colors"
            />
          </div>
        </div>

        <button 
          onClick={copyMessage}
          className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-5 rounded-xl transition-all shadow-xl shadow-gold/20 text-lg uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95"
        >
          {copied ? (
            <><span>✅</span> COPIED TO CLIPBOARD</>
          ) : (
            <><span>📋</span> COPY SUBMISSION MESSAGE</>
          )}
        </button>
      </div>

      <div className="text-center text-muted text-xs">
        <p>This checklist is for your local reference to ensure all prompt requirements are met.</p>
      </div>
    </div>
  );
}
