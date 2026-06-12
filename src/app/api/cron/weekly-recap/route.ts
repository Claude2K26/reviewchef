import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendWeeklyRecapEmail } from "@/lib/email";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  return authHeader === `Bearer ${cronSecret}`;
}

function getISOWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only send every 2 weeks (even ISO week numbers)
  const weekNumber = getISOWeekNumber(new Date());
  if (weekNumber % 2 !== 0) {
    return NextResponse.json({ skipped: true, reason: "odd week — next send in 7 days" });
  }

  const supabase = createServiceClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id")
    .in("subscription_status", ["active", "trialing"]);

  if (!profiles?.length) {
    return NextResponse.json({ sent: 0, message: "No active users" });
  }

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  let sent = 0;
  const errors: string[] = [];

  for (const profile of profiles) {
    try {
      const { data: { user } } = await supabase.auth.admin.getUserById(profile.id);
      if (!user?.email) continue;

      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id, name")
        .eq("user_id", profile.id)
        .single();

      if (!restaurant) continue;

      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating, status, author_name, review_text, response_text")
        .eq("restaurant_id", restaurant.id)
        .gte("review_date", fourteenDaysAgo.toISOString())
        .order("review_date", { ascending: false });

      const totalReviews = reviews?.length ?? 0;
      const responsesPublished = reviews?.filter((r) => r.status === "responded").length ?? 0;
      const averageRating =
        totalReviews > 0
          ? reviews!.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          : null;

      const recentResponses = (reviews ?? [])
        .filter((r) => r.status === "responded" && r.response_text)
        .slice(0, 5)
        .map((r) => ({
          authorName: r.author_name as string,
          rating: r.rating as number,
          reviewText: r.review_text as string,
          responseText: r.response_text as string,
        }));

      await sendWeeklyRecapEmail({
        to: user.email,
        restaurantName: restaurant.name ?? "votre restaurant",
        reviewsThisWeek: totalReviews,
        responsesPublished,
        averageRating,
        recentResponses,
      });

      sent++;
    } catch (err) {
      errors.push(`${profile.id}: ${String(err)}`);
    }
  }

  return NextResponse.json({ sent, errors });
}

export async function POST(request: Request) {
  return GET(request);
}
