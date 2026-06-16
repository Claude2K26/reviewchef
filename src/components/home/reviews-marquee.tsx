"use client";

import { Star } from "lucide-react";

const row1 = [
  {
    name: "Marie Dupont",
    restaurant: "Le Bistrot Parisien",
    rating: 5,
    text: "Je n'ai plus à penser à répondre aux avis. ReviewChef le fait pour moi avec des réponses vraiment personnalisées.",
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
    text: "Même les mauvais avis sont gérés avec beaucoup de tact. Plusieurs clients mécontents sont revenus après la réponse de l'IA.",
  },
  {
    name: "Lucas Bernard",
    restaurant: "Brasserie du Marché",
    rating: 5,
    text: "Configuration en 5 minutes, résultats immédiats. Mes clients sont bluffés par la rapidité des réponses.",
  },
];

const row2 = [
  {
    name: "Émilie Rousseau",
    restaurant: "La Table d'Émilie",
    rating: 5,
    text: "Le ton des réponses est parfaitement adapté à mon restaurant gastronomique. On dirait que c'est moi qui écris.",
  },
  {
    name: "Karim Benali",
    restaurant: "Le Couscous Royal",
    rating: 5,
    text: "Avant ReviewChef, je répondais à peine à 10% de mes avis. Maintenant c'est 100% automatique et professionnel.",
  },
  {
    name: "Julien Moreau",
    restaurant: "Le Burger House",
    rating: 5,
    text: "Même les avis 1 étoile reçoivent des réponses bienveillantes et constructives. Mes clients reviennent.",
  },
  {
    name: "Nadia Lefèvre",
    restaurant: "Crêperie Bretonne",
    rating: 5,
    text: "Je gagne facilement 2h par semaine. L'IA comprend mon univers et répond exactement dans mon style.",
  },
];

const row3 = [
  {
    name: "Antoine Girard",
    restaurant: "Sushi Zen",
    rating: 5,
    text: "Outil indispensable. Mes concurrents galèrent à répondre, moi tout est automatisé depuis le premier jour.",
  },
  {
    name: "Clara Petit",
    restaurant: "La Boulangerie du Coin",
    rating: 5,
    text: "J'avais peur que les réponses soient trop génériques. Pas du tout — chaque réponse est unique et adaptée.",
  },
  {
    name: "Marc Dupuis",
    restaurant: "Le Steak Maison",
    rating: 5,
    text: "Mon score Google est passé de 4,1 à 4,6 en un mois. Les clients voient qu'on est réactifs.",
  },
  {
    name: "Yasmine Haddad",
    restaurant: "Café des Arts",
    rating: 5,
    text: "Setup ultra simple, résultats immédiats. Je recommande à tous les restaurateurs sans hésitation.",
  },
];

function ReviewCard({ review }: { review: (typeof row1)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-64 bg-white rounded-2xl p-5 mx-3"
      style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-gray-800 text-gray-800" />
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed italic mb-4">&ldquo;{review.text}&rdquo;</p>
      <div className="pt-3 border-t border-gray-100">
        <p className="font-medium text-gray-900 text-sm">{review.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{review.restaurant}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ reviews, reverse = false, speed = 30 }: { reviews: (typeof row1); reverse?: boolean; speed?: number }) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export function ReviewsMarquee() {
  return (
    <div className="space-y-4">
      <MarqueeRow reviews={row1} speed={28} />
      <MarqueeRow reviews={row2} reverse speed={22} />
      <MarqueeRow reviews={row3} speed={32} />
    </div>
  );
}
