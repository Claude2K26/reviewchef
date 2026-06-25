import Link from "next/link";
import type { Metadata } from "next";
import {
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
import { AnimatedSection } from "@/components/home/animated-section";
import { AnimatedText } from "@/components/home/animated-text";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { HeroDemo } from "@/components/home/hero-demo";
import { FloatingParticles } from "@/components/home/floating-particles";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";

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
    desc: "Configurez le ton, le type d'activité et votre signature. L'IA parle exactement comme vous.",
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


const faqs = [
  {
    q: "Comment ReviewChef répond-il à mes avis Google ?",
    a: "ReviewChef se connecte à votre compte Google My Business via OAuth 2.0 sécurisé. Chaque jour, il récupère vos nouveaux avis, les analyse avec l'IA Claude d'Anthropic, génère une réponse adaptée au ton que vous avez configuré, puis la publie automatiquement.",
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
    a: "Oui. ReviewChef utilise uniquement l'API officielle Google My Business. Les tokens OAuth sont chiffrés et stockés de manière sécurisée. Vous pouvez révoquer l'accès à tout moment depuis votre compte Google.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement. Vous résiliez depuis votre espace client et l'accès reste actif jusqu'à la fin de la période mensuelle en cours. Aucun frais de résiliation.",
  },
  {
    q: "ReviewChef fonctionne-t-il pour tous les types de commerces ?",
    a: "Oui : restaurants, coiffeurs, garages, hôtels, pharmacies, boutiques, cabinets médicaux… Vous configurez le type d'activité et l'IA adapte son registre. Un seul établissement Google My Business par abonnement.",
  },
];

const DARK_BTN = "#111111";
const DARK_BTN_SHADOW = "0 4px 20px rgba(0,0,0,0.15)";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReviewChef",
    applicationCategory: "BusinessApplication",
    description:
      "Logiciel SaaS de réponse automatique aux avis Google My Business pour tous les commerces, propulsé par l'IA.",
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
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      {/* ── Hero ── */}
      <section className="relative min-h-[95vh] flex items-center hero-grid overflow-hidden">
        <FloatingParticles count={25} />

        {/* Subtle light blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full opacity-20 animate-aurora"
            style={{ background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div className="text-center lg:text-left">
              {/* Badge — scale breath */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-scale-breath"
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(0,0,0,0.04)",
                  color: "#555",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-800 animate-pulse inline-block" />
                Propulsé par Claude (Anthropic)
              </div>

              {/* H1 — mots qui slide up un à un */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-7">
                <AnimatedText text="Vos avis Google" mode="words" delay={0.1} />
                <br />
                {/* gradient shimmer + float */}
                <span className="text-gray-900 animate-float-slow">
                  répondus auto.
                </span>
              </h1>

              {/* Subtitle — fade in */}
              <p
                className="text-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                ReviewChef surveille vos avis 24h/24 et publie des réponses personnalisées par IA.
                Zéro effort, 100% efficace.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in"
                style={{ animationDelay: "0.65s" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:opacity-80"
                  style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
                >
                  <Link href="/pricing">
                    Essayer gratuitement 7 jours
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 text-base bg-transparent border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 rounded-xl transition-all"
                >
                  <Link href="/login">J&apos;ai déjà un compte</Link>
                </Button>
              </div>

              <p
                className="text-xs text-gray-400 mt-5 animate-fade-in text-center lg:text-left"
                style={{ animationDelay: "0.8s" }}
              >
                Sans engagement · Annulable à tout moment · Paiement sécurisé Stripe
              </p>
            </div>

            {/* Right — démo produit animée */}
            <div
              className="hidden lg:flex items-center justify-center animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <HeroDemo />
            </div>
          </div>
        </div>

        {/* Scroll indicator — float */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 animate-float">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ── Tech strip ── */}
      <div className="border-y border-gray-100 py-4 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-gray-400">
            {["Claude Anthropic", "Google My Business API", "Stripe", "OAuth 2.0", "Supabase"].map((tech, i) => (
              <span
                key={tech}
                className="flex items-center gap-2 animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats — chiffres qui comptent ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">

          {/* 100% — counter animé */}
          <AnimatedSection delay={0}>
            <div className="text-center">
              <div
                className="text-6xl font-black mb-3"
                style={{
                  color: "#111",
                }}
              >
                <AnimatedCounter to={100} suffix="%" duration={1600} />
              </div>
              <p className="text-gray-400 text-sm">Taux de réponse garanti</p>
            </div>
          </AnimatedSection>

          {/* < 10 min — tremble léger puis stable */}
          <AnimatedSection delay={120}>
            <div className="text-center">
              <div
                className="text-6xl font-black mb-3 inline-block"
                style={{
                  color: "#111",
                }}
              >
                &lt; 10 min
              </div>
              <p className="text-gray-400 text-sm">Pour démarrer</p>
            </div>
          </AnimatedSection>

          {/* 24h/24 — bounce in */}
          <AnimatedSection delay={240}>
            <div className="text-center">
              <div
                className="text-6xl font-black mb-3 inline-block"
                style={{
                  color: "#111",
                }}
              >
                24h/24
              </div>
              <p className="text-gray-400 text-sm">Surveillance active</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── How it works ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            {/* Label en vague */}
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Comment ça marche" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              <AnimatedText text="Opérationnel en 10 minutes" mode="words" delay={0.05} />
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Pas de configuration complexe, pas d&apos;intégration technique.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div
              className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), rgba(0,0,0,0.1), transparent)",
              }}
            />
            {[
              { step: "01", title: "Créez votre compte", desc: "Inscription en 30 secondes avec votre email" },
              { step: "02", title: "Connectez GMB", desc: "Autorisez l'accès via OAuth 2.0 sécurisé" },
              { step: "03", title: "Configurez", desc: "Choisissez votre ton et votre signature" },
              { step: "04", title: "Auto-pilote", desc: "L'IA répond à votre place 24h/24" },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 130}>
                <div className="text-center">
                  {/* Numéro qui flotte + glow */}
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center animate-float"
                    style={{
                      background: "#f5f5f5",
                      border: "1px solid rgba(0,0,0,0.08)",
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    <span className="text-gray-900 font-black text-xl">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 hover-wiggle cursor-default">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Fonctionnalités" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              <AnimatedText text="Tout ce dont vous avez besoin" mode="words" delay={0.05} />
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Un seul outil pour surveiller, analyser et répondre à vos avis Google.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <AnimatedSection key={f.title} delay={i * 80}>
                  <div className="glass-card rounded-2xl p-6 h-full group cursor-default hover:scale-[1.02] transition-transform duration-300">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: "#f5f5f5",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 hover-wiggle inline-block">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
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

      {/* ── Testimonials marquee ── */}
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

        {/* Dégradés masquants sur les bords */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white 60%, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white 60%, transparent)" }} />
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
            <p className="text-gray-500">Avant de vous lancer.</p>
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
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <AnimatedText text="Automatisez vos réponses" mode="words" delay={0.05} />
              <br />
              <span className="text-gray-900">
                dès aujourd&apos;hui
              </span>
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              Rejoignez des commerçants qui gagnent du temps chaque jour.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:opacity-80"
              style={{ background: DARK_BTN, boxShadow: DARK_BTN_SHADOW }}
            >
              <Link href="/pricing">
                Essayer gratuitement 7 jours
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-8 text-gray-400 text-sm">
              {["Sans engagement", "Annulable à tout moment", "Support inclus"].map((item) => (
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
