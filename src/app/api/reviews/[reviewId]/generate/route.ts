import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReviewResponse } from "@/lib/anthropic/client";

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

  // Fetch review + restaurant (validate ownership via join)
  const { data: review, error: reviewError } = await supabase
    .from("reviews")
    .select(`
      *,
      restaurants!inner (
        id, name, cuisine_type, tone, signature, user_id
      )
    `)
    .eq("id", reviewId)
    .eq("restaurants.user_id", user.id)
    .single();

  if (reviewError || !review) {
    return NextResponse.json({ error: "Avis introuvable" }, { status: 404 });
  }

  const restaurant = (review as any).restaurants;

  try {
    const responseText = await generateReviewResponse({
      restaurantName: restaurant.name || "notre restaurant",
      cuisineType: restaurant.cuisine_type || "Française",
      tone: restaurant.tone || "professional",
      signature: restaurant.signature || restaurant.name || "",
      reviewText: review.review_text || "",
      rating: review.rating,
      authorName: review.author_name,
    });

    // Save to DB
    const { error: updateError } = await supabase
      .from("reviews")
      .update({
        response_text: responseText,
        status: "pending",
      })
      .eq("id", reviewId);

    if (updateError) throw updateError;

    return NextResponse.json({ response_text: responseText });
  } catch (err) {
    console.error("Generate response error:", err);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
