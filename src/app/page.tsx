import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle,
  ArrowRight,
  ChevronDown,
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
  title: "ReviewChef — Réponses automatiques à vos avis Google, dans votre ton",
  description:
    "ReviewChef génère et publie une réponse à chacun de vos avis Google sous 24h, dans le ton que vous choisissez. Surveillance 24h/24, mise en route en quelques minutes. Essai gratuit.",
  alternates: { canonical: "/" },
};

const DARK_BTN = "#1b5e45";
const DARK_BTN_SHADOW = "0 4px 20px rgba(15,35,28,0.2)";

const steps = [
  {
    num: "01",
    title: "Connectez votre fiche Google",
    desc: "Vous liez votre établissement Google My Business en quelques clics.",
  },
  {
    num: "02",
    title: "Choisissez votre ton",
    desc: "Chaleureux, sobre, commercial… vous définissez le style des réponses.",
  },
  {
    num: "03",
    title: "ReviewChef répond à votre place",
    desc: "Chaque nouvel avis reçoit une réponse sous 24h. Vous suivez tout depuis votre tableau de bord.",
  },
];

const included = [
  { icon: MessageSquare, label: "Réponses IA personnalisées à chaque avis" },
  { icon: QrCode, label: "Collecte d'avis positifs (QR code personnalisé)" },
  { icon: BarChart3, label: "Rapport mensuel avec évolution de votre note" },
  { icon: TrendingUp, label: "Suivi de votre note Google en continu" },
  { icon: Clock, label: "Vérification quotidienne de vos avis" },
  { icon: Shield, label: "Validation manuelle ou publication automatique, au choix" },
];

const faqs = [
  {
    q: "Comment fonctionne l'essai gratuit ?",
    a: "Vous testez ReviewChef gratuitement, sans engagement. Vous pouvez annuler à tout moment depuis votre espace client.",
  },
  {
    q: "Puis-je résilier quand je veux ?",
    a: "Oui, sans frais, depuis votre espace client.",
  },
  {
    q: "Dois-je installer quelque chose ?",
    a: "Non. ReviewChef fonctionne directement dans votre navigateur. Il suffit de connecter votre compte Google My Business pour démarrer.",
  },
  {
    q: "Comment se passe la collecte d'avis positifs ?",
    a: "Vous générez un QR code personnalisé depuis votre tableau de bord et l'affichez dans votre commerce. Quand un client le scanne, il arrive directement sur votre fiche Google pour laisser un avis.",
  },
  {
    q: "L'IA répond vraiment à tous les avis, même les négatifs ?",
    a: "Oui. Vous choisissez le ton de vos réponses, et l'IA rédige une réponse adaptée à chaque avis, y compris les avis négatifs, avec empathie et professionnalisme.",
  },
  {
    q: "Les réponses sont-elles publiées automatiquement ?",
    a: "À vous de choisir : activez l'automatisation pour une publication immédiate, ou relisez et validez chaque réponse avant publication.",
  },
  {
    q: "Pour quels types de commerces est-ce adapté ?",
    a: "Restaurants, coiffeurs, garages, hôtels, pharmacies, boutiques, cabinets médicaux, instituts de beauté… Tout commerce avec une fiche Google My Business.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ReviewChef — Gestion des avis Google",
    serviceType: "Gestion de réputation en ligne",
    description:
      "Logiciel de réponse automatique aux avis Google pour commerces locaux. Réponses générées et publiées sous 24h dans le ton choisi, surveillance 24h/24, collecte d'avis via QR code.",
    url: "https://reviewchef.vercel.app",
    provider: { "@type": "Organization", name: "ReviewChef" },
    areaServed: "France",
    inLanguage: "fr",
  };

  return (
    <div className="min-h-screen bg-background text-gray-900 overflow-x-hidden">
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
            style={{ background: "radial-gradient(circle, rgba(27,94,69,0.08) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-24 lg:py-32 w-full text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-scale-breath"
            style={{
              border: "1px solid rgba(15,35,28,0.14)",
              background: "rgba(15,35,28,0.05)",
              color: "#3f5148",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#1b5e45" }} />
            Réponses automatiques à vos avis Google · Propulsé par l&apos;IA Claude
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5">
            <AnimatedText text="Vos avis Google," mode="words" delay={0.05} />
            <br />
            <span className="text-gray-900 animate-float-slow">
              répondus pour vous
            </span>
            <br />
            <span className="text-gray-400 text-4xl sm:text-5xl lg:text-6xl font-black">
              en 24h.
            </span>
          </h1>

          <p
            className="text-xl text-gray-900 font-semibold mb-3 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Vous choisissez le ton. On répond à votre place.
          </p>

          <p
            className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          >
            ReviewChef génère et publie une réponse à chacun de vos avis Google sous 24h,
            dans le ton que vous choisissez. Sans y passer de temps.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base text-white font-semibold transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href="/signup">
                Démarrer gratuitement
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <p
            className="text-xs text-gray-400 mt-5 animate-fade-in"
            style={{ animationDelay: "0.85s" }}
          >
            Essai gratuit · Sans engagement · Résiliable à tout moment
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 animate-float">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ── Chiffres clés ── */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
          <AnimatedSection delay={0}>
            <div className="text-center">
              <div className="text-6xl font-black text-gray-900 mb-3 font-serif">
                <AnimatedCounter to={100} suffix="%" duration={1400} />
              </div>
              <p className="text-gray-600 text-sm font-medium">Des avis pris en charge</p>
              <p className="text-gray-400 text-xs mt-1">réponse générée pour chaque nouvel avis</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="text-center">
              <div className="text-6xl font-black text-gray-900 mb-3 font-serif">24h</div>
              <p className="text-gray-600 text-sm font-medium">Délai de réponse</p>
              <p className="text-gray-400 text-xs mt-1">même les week-ends</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={240}>
            <div className="text-center">
              <div className="text-6xl font-black text-gray-900 mb-3 font-serif">1×/jour</div>
              <p className="text-gray-600 text-sm font-medium">Vérification automatique</p>
              <p className="text-gray-400 text-xs mt-1">de votre fiche Google</p>
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
              <AnimatedText text="En route en quelques minutes" mode="words" delay={0.05} />
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Pas d&apos;outil à apprendre, pas de configuration complexe, pas de changement d&apos;habitudes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(15,35,28,0.12), rgba(15,35,28,0.12), transparent)",
              }}
            />
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 150}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-3xl mx-auto mb-5 flex items-center justify-center animate-float"
                    style={{
                      background: "#eaf3ee",
                      border: "1px solid rgba(15,35,28,0.1)",
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    <span className="text-gray-900 font-black text-xl font-serif">{step.num}</span>
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
              className="h-12 px-8 text-base text-white font-semibold transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href="/signup">
                Démarrer gratuitement
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
              <AnimatedText text="Tout, en illimité." mode="words" delay={0.05} />
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Un seul abonnement, sans palier ni fonctionnalité cachée derrière un plan supérieur.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.label} delay={i * 80}>
                  <div className="glass-card rounded-2xl p-6 flex items-start gap-4 group hover:scale-[1.02] transition-transform duration-300">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: "#f2f7f4", border: "1px solid rgba(15,35,28,0.1)" }}
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
            style={{ background: "linear-gradient(to right, #f2f7f4 60%, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #f2f7f4 60%, transparent)" }}
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
      <section className="py-32 px-6 relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 hero-grid opacity-30" />
        </div>

        <AnimatedSection>
          <div className="relative max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6 block">
              <AnimatedText text="Prêt à démarrer ?" mode="wave" delay={0} />
            </span>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 leading-tight">
              <AnimatedText text="Prêt à ne plus gérer" mode="words" delay={0.05} />
              <br />
              <span className="text-gray-400 text-4xl sm:text-5xl">vos avis ?</span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              Créez votre compte et laissez ReviewChef répondre à votre place.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base text-white font-semibold transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href="/signup">
                Démarrer gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-8 text-gray-400 text-sm">
              {["Essai gratuit", "Sans engagement", "Résiliable à tout moment"].map((item) => (
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
