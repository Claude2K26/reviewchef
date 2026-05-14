"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, CheckCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "1 établissement Google My Business",
  "Surveillance des avis 24h/24",
  "Réponses générées par IA (Claude)",
  "Personnalisation du ton et signature",
  "Tableau de bord complet",
  "Publication automatique des réponses",
  "Support par email",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <ChefHat className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-gray-900">ReviewChef</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Connexion</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Un seul plan, tout inclus
        </h1>
        <p className="text-gray-500 mb-12">
          Pas de frais cachés, pas de limites surprises. Annulable à tout moment.
        </p>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-left">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-brand-600 uppercase tracking-wide">Plan Pro</p>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-5xl font-bold text-gray-900">49€</span>
                <span className="text-gray-400 mb-1">/mois</span>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            onClick={handleSubscribe}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? "Chargement..." : "Commencer maintenant"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Paiement sécurisé par Stripe · Annulable à tout moment
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          Déjà abonné ?{" "}
          <Link href="/login" className="text-brand-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
