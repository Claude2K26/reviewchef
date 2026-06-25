import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReviewTheme } from "@/lib/anthropic/client";

interface TopicsCardProps {
  themes: ReviewTheme[];
}

export function TopicsCard({ themes }: TopicsCardProps) {
  if (themes.length === 0) return null;

  const positives = themes.filter((t) => t.sentiment === "positive");
  const negatives = themes.filter((t) => t.sentiment === "negative");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Thèmes récurrents</h3>
          <p className="text-xs text-gray-400">Basé sur vos 30 derniers avis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {positives.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Points forts
            </p>
            <div className="space-y-2">
              {positives.map((t) => (
                <div key={t.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{t.label}</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    {t.count} avis
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {negatives.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Points à améliorer
            </p>
            <div className="space-y-2">
              {negatives.map((t) => (
                <div key={t.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{t.label}</span>
                  <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    {t.count} avis
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
