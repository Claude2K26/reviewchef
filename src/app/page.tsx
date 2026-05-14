import Link from "next/link";
import type { Metadata } from "next";
import {
  ChefHat,
  Star,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const features = [
  {
    icon: Zap,
    title: "100% Automatique",
    desc: "Dès qu'un avis arrive, l'IA le détecte et publie une réponse adaptée. Zéro intervention humaine.",
  },
  {
    icon: Star,
    title: "Personnalisé par note",
    desc: "5 étoiles → réponse enthousiaste. 1 étoile → réponse empathique et professionnelle.",
  },
  {
    icon: Shield,
    title: "À votre image",
    desc: "Configurez le ton, le type de cuisine et votre signature. L'IA parle exactement comme vous.",
  },
  {
    icon: Clock,
    title: "Disponible 24h/24",
    desc: "ReviewChef surveille vos avis en permanence, même la nuit et le week-end.",
  },
  {
    icon: TrendingUp,
    title: "Tableau de bord complet",
    desc: "Visualisez tous vos avis, réponses et statistiques en un seul endroit.",
  },
  {
    icon: MessageSquare,
    title: "API Google officielle",
    desc: "Connexion sécurisée via OAuth 2.0 à l'API Google My Business.",
  },
];

const testimonials = [
  {
    name: "Marie Dupont",
    restaurant: "Le Bistrot Parisien",
    rating: 5,
    text: "Je n'ai plus à penser à répondre aux avis. ReviewChef le fait pour moi avec des réponses vraiment personnalisées. Mes clients sont surpris de la rapidité !",
  },
  {
    name: "Thomas Martin",
    restaurant: "La Pizzeria du Coin",
    rating: 5,
    text: "En 2 semaines, mon taux de réponse est passé de 20% à 100%. Ma note Google a augmenté d'un demi-point. Je recommande.",
  },
  {
    name: "Sophie Chen",
    restaurant: "Restaurant Sakura",
    rating: 5,
    text: "Même les mauvais avis sont gérés avec beaucoup de tact. Plusieurs clients mécontents sont revenus après la réponse de l'IA.",
  },
];

const faqs = [
  {
    q: "Comment ReviewChef répond-il à mes avis Google ?",
    a: "ReviewChef se connecte à votre compte Google My Business via OAuth 2.0 sécurisé. Chaque jour (et sur demande), il récupère vos nouveaux avis, les analyse avec l'IA Claude d'Anthropic, génère une réponse adaptée au ton que vous avez configuré, puis la publie automatiquement.",
  },
  {
    q: "Combien de temps pour que le service soit actif ?",
    a: "Moins de 10 minutes. Vous créez votre compte, connectez votre fiche Google My Business, configurez votre ton et votre signature, puis activez le pilote automatique. ReviewChef prend le relais immédiatement.",
  },
  {
    q: "Comment ReviewChef gère-t-il les mauvais avis (1-2 étoiles) ?",
    a: "L'IA génère des réponses empathiques et professionnelles pour les avis négatifs : elle reconnaît l'expérience décevante, propose de résoudre le problème et invite le client à revenir. Le ton reste toujours constructif et adapté à votre image.",
  },
  {
    q: "Mes données Google sont-elles sécurisées ?",
    a: "Oui. ReviewChef utilise uniquement l'API officielle Google My Business Business Profile API. Les tokens OAuth sont chiffrés et stockés de manière sécurisée. Vous pouvez révoquer l'accès à tout moment depuis votre compte Google.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement. Vous résiliez depuis votre espace client et l'accès reste actif jusqu'à la fin de la période mensuelle en cours. Aucun frais de résiliation.",
  },
  {
    q: "ReviewChef fonctionne-t-il pour tous les types de restaurants ?",
    a: "Oui : restaurants, brasseries, pizzerias, restaurants asiatiques, gastronomiques, fast-food… Vous configurez le type de cuisine et l'IA adapte son registre. Un seul établissement Google My Business par abonnement.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReviewChef",
    applicationCategory: "BusinessApplication",
    description:
      "Logiciel SaaS de réponse automatique aux avis Google My Business pour les restaurants, propulsé par l'IA.",
    url: "https://reviewchef.vercel.app",
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "49",
        priceCurrency: "EUR",
        unitText: "MONTH",
      },
    },
    operatingSystem: "Web",
    inLanguage: "fr",
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Propulsé par Claude (Anthropic)
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight text-balance">
            Vos avis Google répondus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-red-500">
              automatiquement
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto text-balance">
            ReviewChef surveille vos avis Google My Business 24h/24 et publie des réponses
            personnalisées grâce à l'IA. Zéro effort, 100% efficace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-lg">
              <Link href="/pricing">
                Commencer maintenant — 49€/mois
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/login">J'ai déjà un compte</Link>
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Sans engagement · Annulable à tout moment · Paiement sécurisé Stripe
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Opérationnel en 10 minutes
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Pas de configuration complexe, pas d'intégration technique.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Créez votre compte", desc: "Inscription en 30 secondes" },
              { step: "2", title: "Connectez GMB", desc: "Autorisez l'accès à vos avis Google" },
              { step: "3", title: "Configurez", desc: "Choisissez votre ton et votre signature" },
              { step: "4", title: "Activez l'auto-pilote", desc: "L'IA fait tout le reste 24h/24" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Un seul outil pour surveiller, analyser et répondre à vos avis Google.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Ce que disent les restaurateurs
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Des résultats concrets dès les premières semaines.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.restaurant}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Questions fréquentes
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Tout ce que vous devez savoir avant de vous lancer.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-500 to-red-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à automatiser vos réponses ?
          </h2>
          <p className="text-brand-100 mb-8 text-lg">
            Rejoignez des restaurateurs qui gagnent du temps chaque jour.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg">
            <Link href="/pricing">
              Commencer maintenant — 49€/mois
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-brand-100 text-sm">
            {["Sans engagement", "Annulable à tout moment", "Support inclus"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
