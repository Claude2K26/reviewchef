import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getValidOAuthClient } from "@/lib/google/token-manager";
import { listReviews, replyToReview, starRatingToNumber } from "@/lib/google/mybusiness";
import { generateReviewResponse } from "@/lib/anthropic/client";
import { sendNewReviewEmail, sendNegativeReviewAlertEmail } from "@/lib/email";

// Security: only allow Vercel cron or authorized callers
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  return authHeader === `Bearer ${cronSecret}`;
}

interface RestaurantRow {
  id: string;
  user_id: string;
  name: string;
  cuisine_type: string;
  tone: string;
  signature: string;
  google_account_id: string;
  google_location_id: string;
  last_checked: string | null;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const startTime = Date.now();
  const results: { restaurantId: string; processed: number; errors: number }[] = [];

  try {
    // Fetch all restaurants with automation enabled and Google connected
    const { data: restaurants, error } = await supabase
      .from("restaurants")
      .select("id, user_id, name, cuisine_type, tone, signature, google_account_id, google_location_id, last_checked")
      .eq("automation_enabled", true)
      .not("google_access_token", "is", null)
      .not("google_account_id", "is", null)
      .not("google_location_id", "is", null);

    if (error) throw error;
    if (!restaurants || restaurants.length === 0) {
      return NextResponse.json({ message: "No restaurants to process", results });
    }

    console.log(`[CronJob] Processing ${restaurants.length} restaurants`);

    for (const restaurant of restaurants as RestaurantRow[]) {
      const result = { restaurantId: restaurant.id, processed: 0, errors: 0 };

      try {
        const oauth2Client = await getValidOAuthClient(restaurant.id);

        // Fetch reviews from Google
        const { reviews } = await listReviews(
          oauth2Client,
          restaurant.google_account_id,
          restaurant.google_location_id
        );

        // Get existing review IDs to avoid re-processing
        const { data: existingReviews } = await supabase
          .from("reviews")
          .select("google_review_id, status")
          .eq("restaurant_id", restaurant.id);

        const existingMap = new Map(
          (existingReviews ?? []).map((r) => [r.google_review_id, r.status])
        );

        // Filter: new reviews without a response
        const newReviews = reviews.filter((review) => {
          const reviewId = review.name.split("/").pop() ?? review.reviewId;
          const existing = existingMap.get(reviewId);
          // Process if: not in DB yet OR in DB with status pending/failed
          return !existing || existing === "pending" || existing === "failed";
        });

        console.log(`[CronJob] Restaurant ${restaurant.name}: ${newReviews.length} reviews to process`);

        for (const googleReview of newReviews) {
          const reviewId = googleReview.name.split("/").pop() ?? googleReview.reviewId;

          try {
            // Skip if already replied on Google
            if (googleReview.reviewReply?.comment) {
              // Upsert as responded
              await supabase.from("reviews").upsert(
                {
                  restaurant_id: restaurant.id,
                  google_review_id: reviewId,
                  author_name: googleReview.reviewer.displayName,
                  author_photo_url: googleReview.reviewer.profilePhotoUrl,
                  rating: starRatingToNumber(googleReview.starRating),
                  review_text: googleReview.comment ?? "",
                  review_date: googleReview.createTime,
                  response_text: googleReview.reviewReply.comment,
                  responded_at: googleReview.reviewReply.updateTime,
                  status: "responded",
                },
                { onConflict: "restaurant_id,google_review_id" }
              );
              continue;
            }

            // Generate AI response
            const rating = starRatingToNumber(googleReview.starRating);
            const responseText = await generateReviewResponse({
              restaurantName: restaurant.name || "notre restaurant",
              cuisineType: restaurant.cuisine_type || "Française",
              tone: restaurant.tone || "professional",
              signature: restaurant.signature || restaurant.name || "",
              reviewText: googleReview.comment ?? "",
              rating,
              authorName: googleReview.reviewer.displayName,
            });

            // Post reply to Google
            await replyToReview(
              oauth2Client,
              restaurant.google_account_id,
              restaurant.google_location_id,
              reviewId,
              responseText
            );

            // Save to DB
            await supabase.from("reviews").upsert(
              {
                restaurant_id: restaurant.id,
                google_review_id: reviewId,
                author_name: googleReview.reviewer.displayName,
                author_photo_url: googleReview.reviewer.profilePhotoUrl,
                rating,
                review_text: googleReview.comment ?? "",
                review_date: googleReview.createTime,
                response_text: responseText,
                responded_at: new Date().toISOString(),
                status: "responded",
              },
              { onConflict: "restaurant_id,google_review_id" }
            );

            // Send notification email to restaurant owner
            try {
              const { data: { user: owner } } = await supabase.auth.admin.getUserById(restaurant.user_id);
              if (owner?.email) {
                if (rating <= 2) {
                  await sendNegativeReviewAlertEmail({
                    to: owner.email,
                    restaurantName: restaurant.name,
                    authorName: googleReview.reviewer.displayName,
                    rating,
                    reviewText: googleReview.comment ?? "",
                    responseText,
                  });
                } else {
                  await sendNewReviewEmail({
                    to: owner.email,
                    restaurantName: restaurant.name,
                    authorName: googleReview.reviewer.displayName,
                    rating,
                    reviewText: googleReview.comment ?? "",
                    responseText,
                  });
                }
              }
            } catch (emailErr) {
              console.error(`[CronJob] Failed to send review notification email:`, emailErr);
            }

            result.processed++;
            console.log(`[CronJob] Replied to review ${reviewId} for ${restaurant.name}`);

            // Small delay to avoid rate limits
            await new Promise((r) => setTimeout(r, 500));

          } catch (reviewErr) {
            console.error(`[CronJob] Error processing review ${reviewId}:`, reviewErr);
            result.errors++;

            // Mark as failed in DB
            await supabase.from("reviews").upsert(
              {
                restaurant_id: restaurant.id,
                google_review_id: reviewId,
                author_name: googleReview.reviewer.displayName,
                author_photo_url: googleReview.reviewer.profilePhotoUrl,
                rating: starRatingToNumber(googleReview.starRating),
                review_text: googleReview.comment ?? "",
                review_date: googleReview.createTime,
                status: "failed",
                error_message: String(reviewErr),
              },
              { onConflict: "restaurant_id,google_review_id" }
            );
          }
        }

        // Update last_checked timestamp
        await supabase
          .from("restaurants")
          .update({ last_checked: new Date().toISOString() })
          .eq("id", restaurant.id);

      } catch (restaurantErr) {
        console.error(`[CronJob] Error processing restaurant ${restaurant.id}:`, restaurantErr);
        result.errors++;
      }

      results.push(result);
    }

    const duration = Date.now() - startTime;
    console.log(`[CronJob] Done in ${duration}ms. Results:`, results);

    return NextResponse.json({
      success: true,
      duration_ms: duration,
      restaurants_processed: restaurants.length,
      results,
    });

  } catch (err) {
    console.error("[CronJob] Fatal error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Also allow GET for manual triggering in development
export async function GET(request: Request) {
  return POST(request);
}
