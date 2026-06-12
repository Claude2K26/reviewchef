"use client";

import { useEffect, useState } from "react";
import { Star, Zap, ChefHat } from "lucide-react";

const reviews = [
  {
    author: "Marie L.",
    rating: 5,
    text: "Excellent repas, service impeccable ! Je reviendrai avec plaisir.",
    time: "Il y a 2 min",
  },
  {
    author: "Jean-Pierre M.",
    rating: 2,
    text: "Service lent ce soir, un peu déçu par l'expérience globale.",
    time: "Il y a 5 min",
  },
  {
    author: "Sophie K.",
    rating: 5,
    text: "Une adresse à retenir absolument, les plats sont divins !",
    time: "Il y a 8 min",
  },
];

const responses = [
  "Merci infiniment Marie pour ce retour chaleureux ! Nous sommes ravis que votre soirée ait été à la hauteur de vos attentes. À très bientôt !",
  "Bonjour Jean-Pierre, nous sommes sincèrement désolés pour cette expérience. Votre retour nous aide à nous améliorer — n'hésitez pas à nous recontacter.",
  "Quel plaisir de lire votre commentaire Sophie ! Toute l'équipe sera ravie d'apprendre que vous avez passé un excellent moment. À bientôt !",
];

export function HeroDemo() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"review" | "processing" | "response">("review");
  const [typed, setTyped] = useState("");
  const [dots, setDots] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    if (phase === "review") {
      timeout = setTimeout(() => setPhase("processing"), 2200);
    } else if (phase === "processing") {
      let n = 0;
      interval = setInterval(() => {
        n++;
        setDots(".".repeat(n % 4));
        if (n >= 7) {
          clearInterval(interval);
          setPhase("response");
          setTyped("");
        }
      }, 280);
    } else if (phase === "response") {
      const text = responses[current];
      let i = 0;
      interval = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          timeout = setTimeout(() => {
            setCurrent((p) => (p + 1) % reviews.length);
            setPhase("review");
            setTyped("");
            setDots("");
          }, 3000);
        }
      }, 22);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [phase, current]);

  const review = reviews[current];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Outer glow */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-25 animate-glow-pulse"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)" }}
      />

      {/* Floating badges */}
      <div
        className="absolute -top-5 -left-6 animate-float z-10"
        style={{ animationDelay: "0.5s" }}
      >
        <div
          className="rounded-xl px-3 py-1.5 text-xs font-medium text-white/80 flex items-center gap-1.5 shadow-xl"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-green-400">Nouvel avis</span>
        </div>
      </div>

      <div
        className="absolute -bottom-5 -right-4 animate-float z-10"
        style={{ animationDelay: "2s" }}
      >
        <div
          className="rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-xl"
          style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", backdropFilter: "blur(10px)", color: "#fb923c" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Répondu automatiquement
        </div>
      </div>

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(15, 15, 30, 0.8)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <ChefHat className="w-3 h-3 text-brand-400" />
            <span className="text-xs text-white/35 font-medium">ReviewChef · Autopilote</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/70">Actif</span>
          </div>
        </div>

        {/* Review section */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/25 uppercase tracking-widest">Nouvel avis Google</span>
            <span className="text-xs text-white/20">{review.time}</span>
          </div>
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              {review.author[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-white">{review.author}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-2.5 h-2.5 ${i < review.rating ? "fill-brand-400 text-brand-400" : "text-white/15"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{review.text}</p>
            </div>
          </div>
        </div>

        {/* AI response section */}
        <div className="p-4 min-h-[90px]">
          {phase === "review" && (
            <div className="flex items-center gap-2 text-xs text-white/20">
              <Zap className="w-3 h-3 text-white/15" />
              En attente de traitement IA...
            </div>
          )}
          {phase === "processing" && (
            <div>
              <div className="flex items-center gap-2 text-xs text-brand-400 mb-3">
                <div
                  className="w-3 h-3 rounded-full border-2 border-brand-400/40 border-t-brand-400 animate-spin"
                  style={{ borderTopColor: "#f97316" }}
                />
                Claude analyse l&apos;avis{dots}
              </div>
              <div className="flex gap-1">
                {[40, 70, 55, 80, 45].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full animate-pulse"
                    style={{
                      width: `${w}px`,
                      background: "rgba(249,115,22,0.2)",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {phase === "response" && (
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-green-400 font-medium">Réponse publiée sur Google</span>
              </div>
              <p className="text-xs text-white/55 leading-relaxed">
                {typed}
                {typed.length < responses[current].length && (
                  <span
                    className="inline-block w-0.5 h-3 bg-brand-400 ml-0.5 align-middle animate-pulse"
                  />
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
