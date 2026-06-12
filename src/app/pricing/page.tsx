"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Star, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";

const features = [
  "1 établissement Google My Business",
  "Surveillance des avis 24h/24",
  "Réponses générées par IA (Claude)",
  "Personnalisation du ton et signature",
  "Tableau de bord complet",
  "Publication automatique des réponses",
  "Support par email",
];

const guarantees = [
  { icon: Shield, label: "Paiement sécurisé Stripe" },
  { icon: Zap, label: "Accès immédiat après paiement" },
  { icon: Clock, label: "Annulable à tout moment" },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        router.push("/login?redirect=/pricing");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#06060f] text-white flex flex-col">
      <PublicNav />

      {/* Aurora blob */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 animate-aurora"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 65%)" }}
        />
      </div>

      <main className="relative flex-1 max-w-lg mx-auto w-full px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase mb-4 block">
            Tarif
          </span>
          <h1 className="text-4xl font-black text-white mb-3">Un seul plan, tout inclus</h1>
          <p className="text-white/40">Pas de frais cachés. Pas de limites surprises. Résiliable à tout moment.</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(249,115,22,0.25)",
            boxShadow: "0 0 60px rgba(249,115,22,0.08), 0 32px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Price */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">
                Plan Pro
              </p>
              <div className="flex items-end gap-1">
                <span
                  className="text-6xl font-black bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  49€
                </span>
                <span className="text-white/30 mb-2 text-lg">/mois</span>
              </div>
              <p className="text-xs text-white/25 mt-1">TTC · Renouvellement mensuel automatique</p>
            </div>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
              ))}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            size="lg"
            className="w-full text-base text-white font-semibold rounded-xl h-12 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            style={{
              background: "linear-gradient(105deg, #ea580c 0%, #f97316 45%, #fb923c 55%, #ea580c 100%)",
              backgroundSize: "200% auto",
              boxShadow: "0 0 30px rgba(249,115,22,0.4), 0 8px 32px rgba(0,0,0,0.3)",
              animation: loading ? "none" : "btn-bg-shimmer 3s linear infinite",
            }}
          >
            {loading ? "Chargement..." : "S'abonner maintenant"}
            {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
          </Button>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
            {guarantees.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="w-4 h-4 text-brand-500/60" />
                <span className="text-xs text-white/30 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/30 text-center mt-6">
          Déjà abonné ?{" "}
          <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Se connecter
          </Link>
        </p>

        <p className="text-xs text-white/20 text-center mt-4">
          En vous abonnant, vous acceptez nos{" "}
          <Link href="/cgv" className="hover:text-white/40 transition-colors">CGV</Link>
          {" "}et nos{" "}
          <Link href="/mentions-legales" className="hover:text-white/40 transition-colors">
            Mentions légales
          </Link>.
        </p>
      </main>

      <PublicFooter />
    </div>
  );
}
