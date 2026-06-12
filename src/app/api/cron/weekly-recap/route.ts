import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendWeeklyRecapEmail } from "@/lib/email";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id")
    .in("subscription_status", ["active", "trialing"]);

  if (!profiles?.length) {
    return NextResponse.json({ sent: 0, message: "No active users" });
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

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
        .select("rating, status")
        .eq("restaurant_id", restaurant.id)
        .gte("review_date", sevenDaysAgo.toISOString());

      const reviewsThisWeek = reviews?.length ?? 0;
      const responsesPublished = reviews?.filter((r) => r.status === "responded").length ?? 0;
      const averageRating =
        reviewsThisWeek > 0
          ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewsThisWeek
          : null;

      await sendWeeklyRecapEmail({
        to: user.email,
        restaurantName: restaurant.name ?? "votre restaurant",
        reviewsThisWeek,
        responsesPublished,
        averageRating,
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
