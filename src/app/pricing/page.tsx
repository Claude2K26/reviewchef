"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 19,
    features: [
      "1 établissement Google My Business",
      "Maximum 50 réponses IA par mois",
      "Surveillance des avis 24h/24",
      "Tableau de bord basique",
      "Historique des avis 30 jours",
      'Badge "Propulsé par ReviewChef" en signature',
      "Support par email",
    ],
    cta: "Commencer avec Starter",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    features: [
      "1 établissement Google My Business",
      "Réponses IA illimitées",
      "Personnalisation du ton et signature",
      "Notification email à chaque avis répondu",
      "Récap hebdomadaire par email",
      "Statistiques avancées (note & volume)",
      "Historique des avis 12 mois",
      "Support prioritaire",
    ],
    cta: "Essayer gratuitement 7 jours",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    price: 89,
    features: [
      "Jusqu'à 3 établissements Google My Business",
      "Vue centralisée tous établissements",
      "Réponses IA illimitées",
      "Tout le plan Pro inclus",
      "Réponses en plusieurs langues (FR, EN, ES)",
      "Export CSV mensuel des avis et réponses",
      "Widget avis intégrable sur votre site",
      "Rapport mensuel PDF",
      "Onboarding personnalisé (appel 30 min)",
      "Support dédié — réponse sous 2h",
    ],
    cta: "Commencer avec Business",
    highlighted: false,
  },
];

const guarantees = [
  { icon: Shield, label: "Paiement sécurisé Stripe" },
  { icon: Zap, label: "Accès immédiat après paiement" },
  { icon: Clock, label: "Annulable à tout moment" },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(plan: string) {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        router.push(`/login?redirect=/pricing`);
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col overflow-x-hidden">
      <PublicNav />

      <main className="flex-1 w-full px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
            Tarifs
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Choisissez votre plan
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Pas de frais cachés. Résiliable à tout moment.
          </p>
        </div>

        {/* Plans grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 relative flex flex-col ${
                  isHighlighted
                    ? "border-2 border-gray-900"
                    : "glass-card"
                }`}
                style={
                  isHighlighted
                    ? { background: "#ffffff", boxShadow: "0 8px 48px rgba(0,0,0,0.12)" }
                    : {}
                }
              >
                {/* Badge Populaire */}
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                      Populaire
                    </span>
                  </div>
                )}

                {/* Plan name & price */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-black text-gray-900">{plan.price}€</span>
                    <span className="text-gray-400 mb-2 text-base">/mois</span>
                  </div>
                  <p className="text-xs text-gray-400">TTC · Renouvellement mensuel automatique</p>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  size="lg"
                  className="w-full text-base text-white font-semibold rounded-xl h-12 transition-all duration-300 hover:scale-[1.02] hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{ background: "#111111", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
                >
                  {loading === plan.id ? "Chargement..." : plan.cta}
                  {loading !== plan.id && <ArrowRight className="w-4 h-4 ml-1" />}
                </Button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  7 jours gratuits · Annulable avant sans frais
                </p>
              </div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-sm mx-auto">
          {guarantees.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Login link */}
        <p className="text-sm text-gray-400 text-center mt-8">
          Déjà abonné ?{" "}
          <Link
            href="/login"
            className="text-gray-900 hover:text-gray-700 font-medium transition-colors underline underline-offset-2"
          >
            Se connecter
          </Link>
        </p>

        <p className="text-xs text-gray-300 text-center mt-4">
          En vous abonnant, vous acceptez nos{" "}
          <Link href="/cgv" className="hover:text-gray-500 transition-colors">
            CGV
          </Link>{" "}
          et nos{" "}
          <Link href="/mentions-legales" className="hover:text-gray-500 transition-colors">
            Mentions légales
          </Link>
          .
        </p>
      </main>

      <PublicFooter />
    </div>
  );
}
