import Link from "next/link";
import type { Metadata } from "next";
import {
  Star,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Phone,
  BarChart3,
  QrCode,
  MessageSquare,
  Clock,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { AnimatedSection } from "@/components/home/animated-section";
import { AnimatedText } from "@/components/home/animated-text";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { FloatingParticles } from "@/components/home/floating-particles";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";

export const metadata: Metadata = {
  title: "ReviewChef — Votre note Google au-dessus de 4,5 en 90 jours",
  description:
    "Service de gestion complète des avis Google pour commerces locaux. Nous répondons à 100% de vos avis sous 24h et collectons des avis positifs. Note Google garantie au-dessus de 4,5 en 90 jours.",
  alternates: { canonical: "/" },
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#";
const DARK_BTN = "#111111";
const DARK_BTN_SHADOW = "0 4px 20px rgba(0,0,0,0.15)";

const steps = [
  {
    num: "01",
    title: "Un appel de découverte",
    desc: "On analyse vos avis actuels, on identifie les axes d'amélioration et on vous explique la méthode. 20 minutes, gratuit.",
  },
  {
    num: "02",
    title: "On prend tout en main",
    desc: "Réponse à 100% de vos avis sous 24h, collecte d'avis positifs via QR code. Vous ne touchez à rien.",
  },
  {
    num: "03",
    title: "Votre note progresse",
    desc: "Rapport mensuel avec l'évolution de votre note, les nouveaux avis et les statistiques de collecte.",
  },
];

const included = [
  { icon: MessageSquare, label: "Réponse à 100% de vos avis sous 24h" },
  { icon: QrCode, label: "Collecte d'avis positifs (QR code personnalisé)" },
  { icon: BarChart3, label: "Rapport mensuel avec évolution de votre note" },
  { icon: TrendingUp, label: "Suivi de votre note Google en continu" },
  { icon: Clock, label: "Surveillance 24h/24, 7j/7" },
  { icon: Shield, label: "Stratégie adaptée à votre type de commerce" },
];

const faqs = [
  {
    q: "Que se passe-t-il si ma note n'atteint pas 4,5 en 90 jours ?",
    a: "On continue jusqu'à l'objectif sans frais supplémentaires. La promesse 4,5 en 90 jours, c'est un engagement — pas une estimation.",
  },
  {
    q: "Dois-je toucher à quoi que ce soit ?",
    a: "Non. Vous nous donnez accès à votre fiche Google My Business lors de l'appel, et on s'occupe de tout le reste. Zéro intervention de votre part.",
  },
  {
    q: "Comment se passe la collecte d'avis positifs ?",
    a: "On crée un QR code personnalisé à afficher dans votre commerce. Quand un client satisfait le scanne, il arrive directement sur votre fiche Google pour laisser un avis.",
  },
  {
    q: "Vous répondez vraiment à 100% des avis, même les mauvais ?",
    a: "Oui. Surtout les mauvais. Une réponse professionnelle à un avis négatif rassure les futurs clients et montre que vous prenez en compte les retours. C'est l'un des leviers les plus puissants pour améliorer votre note.",
  },
  {
    q: "Pour quels types de commerces est-ce adapté ?",
    a: "Restaurants, coiffeurs, garages, hôtels, pharmacies, boutiques, cabinets médicaux, instituts de beauté… Tout commerce avec une fiche Google My Business.",
  },
  {
    q: "Comment se passe l'appel de découverte ?",
    a: "C'est un appel de 20 à 30 minutes, sans engagement. On analyse ensemble votre situation actuelle (note, volume d'avis) et on vous explique ce qu'on peut faire concrètement pour vous.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ReviewChef — Gestion des avis Google",
    serviceType: "Gestion de réputation en ligne",
    description:
      "Service de gestion complète des avis Google pour commerces locaux. Réponse à 100% des avis sous 24h, collecte d'avis positifs, rapport mensuel. Note Google garantie au-dessus de 4,5 en 90 jours.",
    url: "https://reviewchef.vercel.app",
    provider: { "@type": "Organization", name: "ReviewChef" },
    areaServed: "France",
    inLanguage: "fr",
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center hero-grid overflow-hidden">
        <FloatingParticles count={20} />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full opacity-20 animate-aurora"
            style={{ background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32 w-full text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-scale-breath"
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(0,0,0,0.04)",
              color: "#555",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-800 animate-pulse inline-block" />
            Service de gestion des avis Google · Résultat garanti
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5">
            <AnimatedText text="Votre note Google" mode="words" delay={0.05} />
            <br />
            <span className="text-gray-900 animate-float-slow">
              au-dessus de 4,5
            </span>
            <br />
            <span className="text-gray-400 text-4xl sm:text-5xl lg:text-6xl font-black">
              en 90 jours.
            </span>
          </h1>

          <p
            className="text-xl text-gray-900 font-semibold mb-3 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            On s&apos;occupe de tout.
          </p>

          <p
            className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          >
            Nous répondons à 100&nbsp;% de vos avis sous 24h, collectons des avis positifs
            et vous envoyons un rapport mensuel. Vous n&apos;avez rien à faire.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href={CALENDLY_URL}>
                <Phone className="w-4 h-4 mr-2" />
                Réserver un appel gratuit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <p
            className="text-xs text-gray-400 mt-5 animate-fade-in"
            style={{ animationDelay: "0.85s" }}
          >
            Appel de 20 min · Sans engagement · Résultat garanti
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 animate-float">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ── Chiffres clés ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
          <AnimatedSection delay={0}>
            <div className="text-center">
              <div className="flex items-end justify-center gap-1 mb-3">
                <span className="text-6xl font-black text-gray-900">4,5</span>
                <Star className="w-8 h-8 text-yellow-400 mb-2 fill-yellow-400" />
              </div>
              <p className="text-gray-600 text-sm font-medium">Note Google garantie</p>
              <p className="text-gray-400 text-xs mt-1">en 90 jours ou on continue</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="text-center">
              <div className="text-6xl font-black text-gray-900 mb-3">
                <AnimatedCounter to={100} suffix="%" duration={1400} />
              </div>
              <p className="text-gray-600 text-sm font-medium">Des avis répondus</p>
              <p className="text-gray-400 text-xs mt-1">sous 24h, même les week-ends</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={240}>
            <div className="text-center">
              <div className="text-6xl font-black text-gray-900 mb-3">1</div>
              <p className="text-gray-600 text-sm font-medium">Rapport mensuel</p>
              <p className="text-gray-400 text-xs mt-1">note, avis, collecte, tendances</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── Comment ça marche ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Comment ça marche" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              <AnimatedText text="Simple comme un coup de fil" mode="words" delay={0.05} />
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Pas d&apos;outil à apprendre, pas de configuration, pas de changement d&apos;habitudes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), rgba(0,0,0,0.1), transparent)",
              }}
            />
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 150}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center animate-float"
                    style={{
                      background: "#f5f5f5",
                      border: "1px solid rgba(0,0,0,0.08)",
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    <span className="text-gray-900 font-black text-xl">{step.num}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-14 text-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href={CALENDLY_URL}>
                <Phone className="w-4 h-4 mr-2" />
                Démarrer avec un appel gratuit
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── Ce qui est inclus ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Ce qui est inclus" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              <AnimatedText text="On gère. Vous récoltez." mode="words" delay={0.05} />
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Un service complet, sans outil à apprendre ni temps à y consacrer.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.label} delay={i * 80}>
                  <div className="glass-card rounded-2xl p-6 flex items-start gap-4 group hover:scale-[1.02] transition-transform duration-300">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: "#f5f5f5", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pt-2">{item.label}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Témoignages" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              <AnimatedText text="Ce que disent les commerçants" mode="words" delay={0.04} />
            </h2>
            <p className="text-gray-500">Des résultats concrets dès les premières semaines.</p>
          </AnimatedSection>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white 60%, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white 60%, transparent)" }}
          />
          <ReviewsMarquee />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Questions fréquentes" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              <AnimatedText text="Tout ce qu'il faut savoir" mode="words" delay={0.05} />
            </h2>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 60}>
                <details className="group glass-card rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-32 px-6 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 hero-grid opacity-30" />
        </div>

        <AnimatedSection>
          <div className="relative max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6 block">
              <AnimatedText text="Prêt à démarrer ?" mode="wave" delay={0} />
            </span>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 leading-tight">
              <AnimatedText text="Votre note à 4,5" mode="words" delay={0.05} />
              <br />
              <span className="text-gray-400 text-4xl sm:text-5xl">en 90 jours.</span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              Un appel de 20 minutes pour tout comprendre. Gratuit, sans engagement.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href={CALENDLY_URL}>
                <Phone className="w-5 h-5 mr-2" />
                Réserver un appel gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-8 text-gray-400 text-sm">
              {["Résultat garanti", "Sans engagement", "Zéro outil à apprendre"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-gray-400" /> {item}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <PublicFooter />
    </div>
  );
}
