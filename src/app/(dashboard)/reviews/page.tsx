import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewFilters } from "@/components/reviews/review-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import type { Review } from "@/types";

export const metadata: Metadata = {
  title: "Avis",
};

interface ReviewsPageProps {
  searchParams: Promise<{
    status?: string;
    rating?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, name")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) redirect("/settings");

  const page = Math.max(1, parseInt(params.page ?? "1"));
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  // Build query
  let query = supabase
    .from("reviews")
    .select("*", { count: "exact" })
    .eq("restaurant_id", restaurant.id)
    .order("review_date", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }
  if (params.rating && params.rating !== "all") {
    query = query.eq("rating", parseInt(params.rating));
  }
  if (params.search) {
    query = query.ilike("author_name", `%${params.search}%`);
  }

  const { data: reviews, count } = await query;

  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <DashboardHeader
        title="Avis Google"
        subtitle={`${total} avis au total`}
      />
      <main className="flex-1 p-6 space-y-4 overflow-auto">
        <Suspense>
          <ReviewFilters />
        </Suspense>

        {reviews && reviews.length > 0 ? (
          <>
            <div className="space-y-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review as Review} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <a
                    key={i}
                    href={`/reviews?page=${i + 1}${params.status ? `&status=${params.status}` : ""}${params.rating ? `&rating=${params.rating}` : ""}`}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-brand-500 text-white"
                        : "bg-white border hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Star className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Aucun avis trouvé</p>
            <p className="text-sm mt-1">
              {params.status || params.rating || params.search
                ? "Essayez de modifier vos filtres"
                : "Connectez votre Google My Business pour commencer"}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
