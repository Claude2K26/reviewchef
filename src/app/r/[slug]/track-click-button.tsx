"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Props {
  slug: string;
  googleUrl: string;
}

export function TrackClickButton({ slug, googleUrl }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await fetch("/api/collect/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
    } catch {}
    window.location.href = googleUrl;
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-gray-900 text-white font-bold text-lg py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70"
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}
    >
      {loading ? "Redirection..." : "Laisser un avis Google"}
      {!loading && <ArrowRight className="w-5 h-5" />}
    </button>
  );
}
