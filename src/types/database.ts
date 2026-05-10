export type ReviewStatus = "pending" | "responded" | "failed" | "skipped";
export type RestaurantTone = "professional" | "friendly" | "casual" | "formal" | "warm";

export interface Restaurant {
  id: string;
  user_id: string;
  name: string;
  cuisine_type: string;
  tone: RestaurantTone;
  signature: string;
  google_account_id: string | null;
  google_location_id: string | null;
  google_location_name: string | null;
  google_access_token: string | null;
  google_refresh_token: string | null;
  token_expiry: string | null;
  automation_enabled: boolean;
  last_checked: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  restaurant_id: string;
  google_review_id: string;
  author_name: string;
  author_photo_url: string | null;
  rating: number;
  review_text: string;
  review_date: string;
  response_text: string | null;
  responded_at: string | null;
  status: ReviewStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  responded_count: number;
  reviews_this_month: number;
  five_star_count: number;
  four_star_count: number;
  three_star_count: number;
  two_star_count: number;
  one_star_count: number;
}

export type RestaurantInsert = Omit<Restaurant, "id" | "created_at" | "updated_at">;
export type RestaurantUpdate = Partial<Omit<Restaurant, "id" | "user_id" | "created_at" | "updated_at">>;
export type ReviewInsert = Omit<Review, "id" | "created_at" | "updated_at">;
export type ReviewUpdate = Partial<Omit<Review, "id" | "restaurant_id" | "google_review_id" | "created_at" | "updated_at">>;
