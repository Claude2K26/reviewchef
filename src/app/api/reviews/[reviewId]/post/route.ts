import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getValidOAuthClient } from "@/lib/google/token-manager";
import { replyToReview } from "@/lib/google/mybusiness";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Fetch review + restaurant
  const { data: review, error: reviewError } = await supabase
    .from("reviews")
    .select(`
      *,
      restaurants!inner (
        id, name, google_account_id, google_location_id, user_id
      )
    `)
    .eq("id", reviewId)
    .eq("restaurants.user_id", user.id)
    .single();

  if (reviewError || !review) {
    return NextResponse.json({ error: "Avis introuvable" }, { status: 404 });
  }

  if (!review.response_text) {
    return NextResponse.json({ error: "Aucune réponse générée" }, { status: 400 });
  }

  const restaurant = (review as any).restaurants;

  if (!restaurant.google_account_id || !restaurant.google_location_id) {
    return NextResponse.json(
      { error: "Google My Business non configuré" },
      { status: 400 }
    );
  }

  try {
    const oauth2Client = await getValidOAuthClient(restaurant.id);
    await replyToReview(
      oauth2Client,
      restaurant.google_account_id,
      restaurant.google_location_id,
      review.google_review_id,
      review.response_text
    );

    // Update status
    const { error: updateError } = await supabase
      .from("reviews")
      .update({
        status: "responded",
        responded_at: new Date().toISOString(),
      })
      .eq("id", reviewId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Post reply error:", err);
    // Mark as failed
    await supabase
      .from("reviews")
      .update({
        status: "failed",
        error_message: String(err),
      })
      .eq("id", reviewId);

    return NextResponse.json({ error: "Erreur de publication sur Google" }, { status: 500 });
  }
}
