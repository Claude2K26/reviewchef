import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library";
import type {
  GoogleReview,
  GoogleAccount,
  GoogleLocation,
  ListReviewsResponse,
  STAR_RATING_MAP,
} from "@/types/google";

// Google My Business API v4 base URL (not yet in googleapis package)
const GMB_BASE = "https://mybusiness.googleapis.com/v4";
const GMB_REVIEWS_BASE = "https://mybusinessreviews.googleapis.com/v1";

async function makeRequest<T>(
  oauth2Client: OAuth2Client,
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await oauth2Client.getAccessToken();
  const accessToken = token.token;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API error ${response.status}: ${errorText}`);
  }

  return response.json() as T;
}

export async function listAccounts(oauth2Client: OAuth2Client): Promise<GoogleAccount[]> {
  const data = await makeRequest<{ accounts?: GoogleAccount[] }>(
    oauth2Client,
    `${GMB_BASE}/accounts`
  );
  return data.accounts ?? [];
}

export async function listLocations(
  oauth2Client: OAuth2Client,
  accountId: string
): Promise<GoogleLocation[]> {
  const accountName = accountId.startsWith("accounts/") ? accountId : `accounts/${accountId}`;
  const data = await makeRequest<{ locations?: GoogleLocation[] }>(
    oauth2Client,
    `${GMB_BASE}/${accountName}/locations?readMask=name,title,metadata`
  );
  return data.locations ?? [];
}

export async function listReviews(
  oauth2Client: OAuth2Client,
  accountId: string,
  locationId: string,
  pageToken?: string
): Promise<ListReviewsResponse> {
  const accountName = accountId.startsWith("accounts/") ? accountId : `accounts/${accountId}`;
  const locationName = locationId.startsWith("locations/") ? locationId : `locations/${locationId}`;
  const fullName = `${accountName}/${locationName}`;

  let url = `${GMB_REVIEWS_BASE}/${fullName}/reviews?pageSize=50&orderBy=updateTime desc`;
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  const data = await makeRequest<{
    reviews?: GoogleReview[];
    averageRating?: number;
    totalReviewCount?: number;
    nextPageToken?: string;
  }>(oauth2Client, url);

  return {
    reviews: data.reviews ?? [],
    averageRating: data.averageRating ?? 0,
    totalReviewCount: data.totalReviewCount ?? 0,
    nextPageToken: data.nextPageToken,
  };
}

export async function replyToReview(
  oauth2Client: OAuth2Client,
  accountId: string,
  locationId: string,
  reviewId: string,
  comment: string
): Promise<void> {
  const accountName = accountId.startsWith("accounts/") ? accountId : `accounts/${accountId}`;
  const locationName = locationId.startsWith("locations/") ? locationId : `locations/${locationId}`;
  const fullReviewName = `${accountName}/${locationName}/reviews/${reviewId}`;

  await makeRequest(oauth2Client, `${GMB_REVIEWS_BASE}/${fullReviewName}/reply`, {
    method: "PUT",
    body: JSON.stringify({ comment }),
  });
}

export async function deleteReply(
  oauth2Client: OAuth2Client,
  accountId: string,
  locationId: string,
  reviewId: string
): Promise<void> {
  const accountName = accountId.startsWith("accounts/") ? accountId : `accounts/${accountId}`;
  const locationName = locationId.startsWith("locations/") ? locationId : `locations/${locationId}`;
  const fullReviewName = `${accountName}/${locationName}/reviews/${reviewId}`;

  await makeRequest(oauth2Client, `${GMB_REVIEWS_BASE}/${fullReviewName}/reply`, {
    method: "DELETE",
  });
}

export function starRatingToNumber(starRating: GoogleReview["starRating"]): number {
  const map: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return map[starRating] ?? 0;
}
