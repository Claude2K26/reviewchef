import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RatingChart } from "@/components/dashboard/rating-chart";
import { RecentReviewsList } from "@/components/dashboard/recent-reviews-list";
import { AutomationStatusBanner } from "@/components/dashboard/automation-status-banner";
import { TrialBanner } from "@/components/dashboard/trial-banner";
import { calculateResponseRate } from "@/lib/utils";
import type { DashboardStats, Restaurant, Review } from "@/types";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch restaurant
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) redirect("/onboarding");
  if (!restaurant.name) redirect("/onboarding");

  // Fetch trial info
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, subscription_end_date")
    .eq("id", user.id)
    .single();

  // Fetch reviews stats
  const { data: reviewsData } = await supabase
    .from("reviews")
    .select("rating, status, review_date")
    .eq("restaurant_id", restaurant.id);

  const reviews = reviewsData ?? [];
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalReviews = reviews.length;
  const respondedCount = reviews.filter((r) => r.status === "responded").length;
  const reviewsThisMonth = reviews.filter(
    (r) => new Date(r.review_date) >= startOfMonth
  ).length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  const stats: DashboardStats = {
    totalReviews,
    averageRating,
    responseRate: calculateResponseRate(totalReviews, respondedCount),
    reviewsThisMonth,
    ratingDistribution,
  };

  // Fetch recent reviews
  const { data: recentReviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("review_date", { ascending: false })
    .limit(5);

  return (
    <>
      <DashboardHeader
        title="Tableau de bord"
        subtitle={restaurant.name ? `${restaurant.name} · Vue d'ensemble` : "Vue d'ensemble"}
      />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Bannière trial si en période d'essai */}
        {profile?.subscription_status === "trialing" && profile.subscription_end_date && (
          <TrialBanner trialEndDate={profile.subscription_end_date} />
        )}

        {/* Automation status */}
        <AutomationStatusBanner restaurant={restaurant as Restaurant} />

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Bottom grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentReviewsList reviews={(recentReviews ?? []) as Review[]} />
          <RatingChart stats={stats} />
        </div>
      </main>
    </>
  );
}
