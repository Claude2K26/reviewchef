import { Star, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRating, calculateResponseRate } from "@/lib/utils";
import type { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Avis reçus",
      value: stats.totalReviews.toString(),
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
      change: `+${stats.reviewsThisMonth} ce mois`,
    },
    {
      label: "Note moyenne",
      value: formatRating(stats.averageRating),
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      suffix: "/5",
    },
    {
      label: "Taux de réponse",
      value: `${stats.responseRate}%`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      change: `${stats.totalReviews - Math.round(stats.totalReviews * stats.responseRate / 100)} en attente`,
    },
    {
      label: "Ce mois-ci",
      value: stats.reviewsThisMonth.toString(),
      icon: Calendar,
      color: "text-brand-600",
      bg: "bg-brand-50",
      change: "nouveaux avis",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    {card.suffix && (
                      <span className="text-sm text-gray-400">{card.suffix}</span>
                    )}
                  </div>
                  {card.change && (
                    <p className="text-xs text-gray-400 mt-1">{card.change}</p>
                  )}
                </div>
                <div className={`p-2.5 rounded-xl ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
