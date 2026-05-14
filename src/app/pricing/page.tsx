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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col">
      <PublicNav />

      <main className="flex-1 max-w-lg mx-auto w-full px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Un seul plan, tout inclus
          </h1>
          <p className="text-gray-500">
            Pas de frais cachés. Pas de limites surprises. Résiliable à tout moment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Price */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-1">
                Plan Pro
              </p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold text-gray-900">49€</span>
                <span className="text-gray-400 mb-1.5 text-lg">/mois</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">TTC · Renouvellement mensuel automatique</p>
            </div>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            size="lg"
            className="w-full text-base"
          >
            {loading ? "Chargement..." : "S'abonner maintenant"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100">
            {guarantees.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-400 text-center mt-6">
          Déjà abonné ?{" "}
          <Link href="/login" className="text-brand-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center mt-4">
          En vous abonnant, vous acceptez nos{" "}
          <Link href="/cgv" className="hover:underline">CGV</Link>
          {" "}et nos{" "}
          <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>.
        </p>
      </main>

      <PublicFooter />
    </div>
  );
}
