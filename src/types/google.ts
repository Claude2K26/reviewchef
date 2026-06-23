export interface GoogleReviewReply {
  comment: string;
  updateTime: string;
}

export interface GoogleReview {
  name: string; // e.g. "accounts/123/locations/456/reviews/789"
  reviewId: string;
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
    isAnonymous: boolean;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment: string;
  createTime: string;
  updateTime: string;
  reviewReply?: GoogleReviewReply;
}

export interface GoogleAccount {
  name: string; // "accounts/123456"
  accountName: string;
  type: string;
  role: string;
  state: {
    status: string;
  };
  profilePhotoUrl?: string;
}

export interface GoogleLocation {
  name: string; // "accounts/123/locations/456"
  title: string;
  storeCode?: string;
  websiteUri?: string;
  metadata?: {
    placeId?: string;
    mapsUri?: string;
  };
}

export interface ListReviewsResponse {
  reviews: GoogleReview[];
  averageRating: number;
  totalReviewCount: number;
  nextPageToken?: string;
}

export interface ListAccountsResponse {
  accounts: GoogleAccount[];
  nextPageToken?: string;
}

export interface ListLocationsResponse {
  locations: GoogleLocation[];
  nextPageToken?: string;
}

export type StarRatingValue = 1 | 2 | 3 | 4 | 5;

export const STAR_RATING_MAP: Record<GoogleReview["starRating"], StarRatingValue> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};
