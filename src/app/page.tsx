import Link from "next/link";
import { ChefHat, Star, Zap, Shield, Clock, TrendingUp, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "100% Automatique",
    desc: "Dès qu'un avis arrive, l'IA le détecte et publie une réponse. Zéro intervention humaine.",
  },
  {
    icon: Star,
    title: "Personnalisé par note",
    desc: "5 étoiles → réponse enthousiaste. 1 étoile → réponse empathique et professionnelle.",
  },
  {
    icon: Shield,
    title: "À votre image",
    desc: "Configurez le ton, le type de cuisine et la signature. L'IA parle comme vous.",
  },
  {
    icon: Clock,
    title: "Disponible 24h/24",
    desc: "Le cron job vérifie vos avis toutes les heures, même la nuit et le week-end.",
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
    text: "En 2 semaines, mon taux de réponse est passé de 20% à 100%. Ma note Google a augmenté d'un demi-point.",
  },
  {
    name: "Sophie Chen",
    restaurant: "Restaurant Sakura",
    rating: 5,
    text: "Même les mauvais avis sont gérés avec beaucoup de tact. J'ai eu plusieurs retours positifs de clients mécontents qui sont revenus après la réponse.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
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
            <Button asChild size="sm">
              <Link href="/signup">Commencer gratuitement</Link>
            </Button>
          </div>
        </div>
      </nav>

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
              <Link href="/signup">
                Commencer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/login">J'ai déjà un compte</Link>
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Aucune carte de crédit requise · Installation en 5 minutes
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Créez votre compte", desc: "Inscrivez-vous en 30 secondes" },
              { step: "2", title: "Connectez GMB", desc: "Autorisez l'accès à vos avis Google" },
              { step: "3", title: "Configurez", desc: "Choisissez votre ton et signature" },
              { step: "4", title: "Activez l'auto-pilote", desc: "L'IA fait tout le reste 24h/24" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tout ce qu'il vous faut
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm border-0">
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ce que disent nos restaurateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex mb-3">
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

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-500 to-red-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à automatiser vos réponses ?
          </h2>
          <p className="text-brand-100 mb-8">
            Rejoignez des centaines de restaurateurs qui gagnent du temps chaque jour.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-brand-700 hover:bg-brand-50">
              <Link href="/signup">
                Commencer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-brand-100 text-sm">
            {["Sans carte bancaire", "Disponible immédiatement", "Support inclus"].map((item) => (
              <span key={item} className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 text-center text-sm text-gray-400">
        <p>© 2024 ReviewChef · Fait avec ❤️ pour les restaurateurs</p>
      </footer>
    </div>
  );
}
