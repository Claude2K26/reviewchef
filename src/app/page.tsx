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
    q: "ReviewChef fonctionne-t-il pour tous les types de restaurants ?",
    a: "Oui : restaurants, brasseries, pizzerias, restaurants asiatiques, gastronomiques, fast-food… Vous configurez le type de cuisine et l'IA adapte son registre. Un seul établissement Google My Business par abonnement.",
  },
];

const ORANGE_GRADIENT = "linear-gradient(105deg, #ea580c 0%, #f97316 45%, #fb923c 55%, #ea580c 100%)";
const ORANGE_SHIMMER_ANIM = "btn-bg-shimmer 3s linear infinite";
const ORANGE_GLOW = "0 0 32px rgba(249,115,22,0.45), 0 8px 32px rgba(0,0,0,0.4)";

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
    <div className="min-h-screen bg-[#06060f] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PublicNav />

      {/* ── Hero ── */}
      <section className="relative min-h-[95vh] flex items-center hero-grid overflow-hidden">
        <FloatingParticles count={25} />

        {/* Aurora blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full opacity-25 animate-aurora"
            style={{ background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 65%)" }}
          />
          <div
            className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full opacity-15 animate-aurora-2"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 65%)" }}
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
                  border: "1px solid rgba(249,115,22,0.35)",
                  background: "rgba(249,115,22,0.1)",
                  color: "#fb923c",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse inline-block" />
                Propulsé par Claude (Anthropic)
              </div>

              {/* H1 — mots qui slide up un à un */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-7">
                <AnimatedText text="Vos avis Google" mode="words" delay={0.1} />
                <br />
                {/* gradient shimmer + float */}
                <span
                  className="bg-clip-text text-transparent animate-float-slow"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #fb923c, #f97316, #ea580c, #f97316, #fb923c)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "btn-bg-shimmer 5s linear infinite, float 7s ease-in-out infinite",
                  }}
                >
                  répondus auto.
                </span>
              </h1>

              {/* Subtitle — fade in */}
              <p
                className="text-lg text-white/50 mb-10 max-w-lg mx-auto lg:mx-0 animate-fade-in"
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
                  className="w-full sm:w-auto h-12 px-8 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: ORANGE_GRADIENT,
                    backgroundSize: "200% auto",
                    boxShadow: ORANGE_GLOW,
                    animation: ORANGE_SHIMMER_ANIM,
                  }}
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
                  className="w-full sm:w-auto h-12 text-base bg-transparent border-white/10 text-white/60 hover:bg-white/5 hover:text-white hover:border-white/20 rounded-xl transition-all"
                >
                  <Link href="/login">J&apos;ai déjà un compte</Link>
                </Button>
              </div>

              <p
                className="text-xs text-white/25 mt-5 animate-fade-in text-center lg:text-left"
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-float">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ── Tech strip ── */}
      <div className="border-y border-white/5 py-4" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/25">
            {["Claude Anthropic", "Google My Business API", "Stripe", "OAuth 2.0", "Supabase"].map((tech, i) => (
              <span
                key={tech}
                className="flex items-center gap-2 animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="w-1 h-1 rounded-full bg-brand-500/60 inline-block" />
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
                className="text-6xl font-black mb-3 glow-text"
                style={{
                  background: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter to={100} suffix="%" duration={1600} />
              </div>
              <p className="text-white/40 text-sm">Taux de réponse garanti</p>
            </div>
          </AnimatedSection>

          {/* < 10 min — tremble léger puis stable */}
          <AnimatedSection delay={120}>
            <div className="text-center">
              <div
                className="text-6xl font-black mb-3 inline-block animate-tremble-slow"
                style={{
                  background: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                &lt; 10 min
              </div>
              <p className="text-white/40 text-sm">Pour démarrer</p>
            </div>
          </AnimatedSection>

          {/* 24h/24 — bounce in */}
          <AnimatedSection delay={240}>
            <div className="text-center">
              <div
                className="text-6xl font-black mb-3 animate-float-slow inline-block"
                style={{
                  background: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                24h/24
              </div>
              <p className="text-white/40 text-sm">Surveillance active</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── How it works ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            {/* Label en vague */}
            <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Comment ça marche" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              <AnimatedText text="Opérationnel en 10 minutes" mode="words" delay={0.05} />
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Pas de configuration complexe, pas d&apos;intégration technique.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div
              className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.35), rgba(249,115,22,0.35), transparent)",
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
                      background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))",
                      border: "1px solid rgba(249,115,22,0.3)",
                      boxShadow: "0 0 24px rgba(249,115,22,0.1)",
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    <span className="text-brand-400 font-black text-xl glow-text">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 hover-wiggle cursor-default">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Fonctionnalités" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              <AnimatedText text="Tout ce dont vous avez besoin" mode="words" delay={0.05} />
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
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
                        background: "rgba(249,115,22,0.1)",
                        border: "1px solid rgba(249,115,22,0.2)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    {/* Titre wiggle au hover */}
                    <h3 className="font-semibold text-white mb-2 hover-wiggle inline-block">{f.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Témoignages" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              <AnimatedText text="Ce que disent les restaurateurs" mode="words" delay={0.04} />
            </h2>
            <p className="text-white/40">Des résultats concrets dès les premières semaines.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-6 h-full hover:scale-[1.015] transition-transform duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="font-medium text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{t.restaurant}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase mb-4 block">
              <AnimatedText text="Questions fréquentes" mode="wave" delay={0} />
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              <AnimatedText text="Tout ce qu'il faut savoir" mode="words" delay={0.05} />
            </h2>
            <p className="text-white/40">Avant de vous lancer.</p>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 60}>
                <details className="group glass-card rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-medium text-white/75 hover:text-white transition-colors">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-white/30 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/40 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full animate-glow-pulse"
            style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 65%)" }}
          />
          <div className="absolute inset-0 hero-grid opacity-20" />
          <FloatingParticles count={15} />
        </div>

        <AnimatedSection>
          <div className="relative max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase mb-6 block">
              <AnimatedText text="Prêt à démarrer ?" mode="wave" delay={0} />
            </span>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
              <AnimatedText text="Automatisez vos réponses" mode="words" delay={0.05} />
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #fb923c, #f97316, #ea580c, #f97316, #fb923c)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "btn-bg-shimmer 5s linear infinite, float 6s ease-in-out 0.3s infinite",
                }}
              >
                dès aujourd&apos;hui
              </span>
            </h2>
            <p className="text-white/40 mb-10 text-lg">
              Rejoignez des restaurateurs qui gagnent du temps chaque jour.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: ORANGE_GRADIENT,
                backgroundSize: "200% auto",
                boxShadow: "0 0 50px rgba(249,115,22,0.5), 0 8px 40px rgba(0,0,0,0.4)",
                animation: ORANGE_SHIMMER_ANIM,
              }}
            >
              <Link href="/pricing">
                Essayer gratuitement 7 jours
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-8 text-white/30 text-sm">
              {["Sans engagement", "Annulable à tout moment", "Support inclus"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-500/50" /> {item}
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
