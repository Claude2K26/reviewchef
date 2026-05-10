import { createServiceClient } from "@/lib/supabase/server";
import { createOAuth2Client } from "@/lib/google/auth";
import type { OAuth2Client } from "google-auth-library";

export async function getValidOAuthClient(restaurantId: string): Promise<OAuth2Client> {
  const supabase = createServiceClient();

  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("google_access_token, google_refresh_token, token_expiry")
    .eq("id", restaurantId)
    .single();

  if (error || !restaurant) {
    throw new Error(`Restaurant not found: ${restaurantId}`);
  }

  if (!restaurant.google_access_token || !restaurant.google_refresh_token) {
    throw new Error(`Restaurant ${restaurantId} has no Google tokens`);
  }

  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({
    access_token: restaurant.google_access_token,
    refresh_token: restaurant.google_refresh_token,
    expiry_date: restaurant.token_expiry
      ? new Date(restaurant.token_expiry).getTime()
      : undefined,
  });

  // Refresh if token is expired or about to expire (within 5 minutes)
  const expiryDate = restaurant.token_expiry ? new Date(restaurant.token_expiry).getTime() : 0;
  const isExpired = Date.now() >= expiryDate - 5 * 60 * 1000;

  if (isExpired) {
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);

      // Persist refreshed tokens
      await supabase
        .from("restaurants")
        .update({
          google_access_token: credentials.access_token,
          google_refresh_token: credentials.refresh_token ?? restaurant.google_refresh_token,
          token_expiry: credentials.expiry_date
            ? new Date(credentials.expiry_date).toISOString()
            : null,
        })
        .eq("id", restaurantId);
    } catch (refreshError) {
      throw new Error(`Failed to refresh Google token for restaurant ${restaurantId}: ${refreshError}`);
    }
  }

  return oauth2Client;
}
