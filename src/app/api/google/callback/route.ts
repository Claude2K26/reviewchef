import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { exchangeCodeForTokens, decodeState } from "@/lib/google/auth";
import { createOAuth2Client } from "@/lib/google/auth";
import { listAccounts, listLocations } from "@/lib/google/mybusiness";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (error || !code || !state) {
    return NextResponse.redirect(`${appUrl}/settings?error=google_auth_denied`);
  }

  try {
    const { userId, redirectTo, restaurantId } = decodeState(state);
    const tokens = await exchangeCodeForTokens(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error("Missing tokens from Google");
    }

    // Use service client to update restaurant (bypassing RLS for this server-side operation)
    const supabase = createServiceClient();

    // Get Google account info
    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials(tokens);

    let accountId: string | null = null;
    let locationId: string | null = null;
    let locationName: string | null = null;
    let placeId: string | null = null;

    try {
      const accounts = await listAccounts(oauth2Client);
      if (accounts.length > 0) {
        accountId = accounts[0].name; // "accounts/123456"

        const locations = await listLocations(oauth2Client, accountId);
        if (locations.length > 0) {
          locationId = locations[0].name.split("/").pop() ?? null;
          locationName = locations[0].title;
          placeId = locations[0].metadata?.placeId ?? null;
        }
      }
    } catch (gmErr) {
      console.warn("Could not fetch GMB data:", gmErr);
      // Continue — tokens are still saved, user can configure manually
    }

    // Save tokens to the specific restaurant (or all restaurants for the user as fallback)
    const tokenUpdate = {
      google_access_token: tokens.access_token,
      google_refresh_token: tokens.refresh_token,
      token_expiry: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
      google_account_id: accountId,
      google_location_id: locationId,
      google_location_name: locationName,
      google_place_id: placeId,
    };

    const updateQuery = restaurantId
      ? supabase.from("restaurants").update(tokenUpdate).eq("id", restaurantId).eq("user_id", userId)
      : supabase.from("restaurants").update(tokenUpdate).eq("user_id", userId);

    const { error: dbError } = await updateQuery;
    if (dbError) throw dbError;

    const base = redirectTo ?? "/settings";
    const separator = base.includes("?") ? "&" : "?";
    return NextResponse.redirect(`${appUrl}${base}${separator}connected=true`);
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(`${appUrl}/settings?error=google_auth_failed`);
  }
}
