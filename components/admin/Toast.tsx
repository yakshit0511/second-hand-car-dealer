"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-lg shadow-xl border animate-slide-in-right max-w-sm
        ${type === "success"
          ? "bg-green-950/90 border-green-500 text-green-400"
          : "bg-red-950/90 border-red-500 text-red-400"
        }`}
    >
      <span className="text-lg flex-shrink-0">{type === "success" ? "✅" : "❌"}</span>
      <p className="font-body text-sm flex-1">{message}</p>
      <button onClick={onClose} className="text-current opacity-60 hover:opacity-100 transition-opacity ml-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error") => setToast({ message, type });
  const hideToast = () => setToast(null);
  return { toast, showToast, hideToast };
}
