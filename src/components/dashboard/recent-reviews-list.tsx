import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, truncateText, formatDateRelative } from "@/lib/utils";
import type { Review } from "@/types";

interface RecentReviewsListProps {
  reviews: Review[];
}

const STATUS_LABELS: Record<string, { label: string; variant: "success" | "warning" | "error" | "muted" }> = {
  responded: { label: "Répondu", variant: "success" },
  pending: { label: "En attente", variant: "warning" },
  failed: { label: "Échec", variant: "error" },
  skipped: { label: "Ignoré", variant: "muted" },
};

export function RecentReviewsList({ reviews }: RecentReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Avis récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <Star className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucun avis pour le moment</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Avis récents</CardTitle>
        <Link
          href="/reviews"
          className="text-sm text-brand-600 hover:underline flex items-center gap-1"
        >
          Voir tout <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="divide-y divide-gray-50">
        {reviews.map((review) => {
          const status = STATUS_LABELS[review.status] ?? STATUS_LABELS.pending;
          return (
            <div key={review.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {review.author_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.author_photo_url}
                      alt={review.author_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(review.author_name)
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {review.author_name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant={status.variant} className="text-[10px] px-1.5 py-0">
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {truncateText(review.review_text || "Avis sans commentaire", 100)}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {formatDateRelative(review.review_date)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
