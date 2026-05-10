"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { DashboardStats } from "@/types";

interface RatingChartProps {
  stats: DashboardStats;
}

export function RatingChart({ stats }: RatingChartProps) {
  const max = Math.max(...stats.ratingDistribution.map((r) => r.count), 1);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Distribution des notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {[5, 4, 3, 2, 1].map((stars) => {
          const item = stats.ratingDistribution.find((r) => r.stars === stars);
          const count = item?.count ?? 0;
          const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
          const barWidth = max > 0 ? (count / max) * 100 : 0;

          return (
            <div key={stars} className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5 w-16 shrink-0">
                <span className="text-sm text-gray-600">{stars}</span>
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stars >= 4
                      ? "bg-emerald-400"
                      : stars === 3
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm text-gray-500 shrink-0">
                {count} ({Math.round(percentage)}%)
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
