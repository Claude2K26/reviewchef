export * from "./database";
export * from "./google";

export interface DashboardStats {
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  reviewsThisMonth: number;
  ratingDistribution: {
    stars: number;
    count: number;
  }[];
}

export interface ReviewFilters {
  status?: string;
  rating?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
