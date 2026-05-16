"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Welcome back, Admin!");
      router.push("/admin");
      router.refresh();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <Link href="/" className="font-heading text-gold text-3xl font-bold mb-2 inline-block">
            AutoNova Motors
          </Link>
          <p className="text-muted text-sm font-body tracking-widest uppercase mt-2">Admin Portal Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-[#2A2A2A] rounded-xl px-4 py-3 text-primary focus:border-gold outline-none transition-all"
              placeholder="admin@autonova.com"
            />
          </div>

          <div>
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-[#2A2A2A] rounded-xl px-4 py-3 text-primary focus:border-gold outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-4 rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#2A2A2A] text-center">
          <Link href="/" className="text-muted hover:text-gold text-sm transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
