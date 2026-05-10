-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  google_review_id TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  author_photo_url TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL DEFAULT '',
  review_date TIMESTAMPTZ NOT NULL,
  response_text TEXT,
  responded_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'failed', 'skipped')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Prevent duplicate reviews per restaurant
  CONSTRAINT unique_review_per_restaurant UNIQUE (restaurant_id, google_review_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant_id ON public.reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_review_date ON public.reviews(review_date DESC);

-- Auto-update updated_at
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can access reviews through their restaurant)
CREATE POLICY "Users can view their restaurant reviews"
  ON public.reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = reviews.restaurant_id
        AND restaurants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert reviews for their restaurant"
  ON public.reviews FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = reviews.restaurant_id
        AND restaurants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their restaurant reviews"
  ON public.reviews FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE restaurants.id = reviews.restaurant_id
        AND restaurants.user_id = auth.uid()
    )
  );

-- Service role has full access (for cron job)
CREATE POLICY "Service role has full access"
  ON public.reviews FOR ALL
  USING (auth.role() = 'service_role');

-- Aggregation view for dashboard stats
CREATE OR REPLACE VIEW public.review_stats AS
SELECT
  r.user_id,
  r.id AS restaurant_id,
  COUNT(rv.id) AS total_reviews,
  ROUND(AVG(rv.rating), 1) AS average_rating,
  COUNT(rv.id) FILTER (WHERE rv.status = 'responded') AS responded_count,
  COUNT(rv.id) FILTER (WHERE rv.review_date >= date_trunc('month', NOW())) AS reviews_this_month,
  COUNT(rv.id) FILTER (WHERE rv.rating = 5) AS five_star_count,
  COUNT(rv.id) FILTER (WHERE rv.rating = 4) AS four_star_count,
  COUNT(rv.id) FILTER (WHERE rv.rating = 3) AS three_star_count,
  COUNT(rv.id) FILTER (WHERE rv.rating = 2) AS two_star_count,
  COUNT(rv.id) FILTER (WHERE rv.rating = 1) AS one_star_count
FROM public.restaurants r
LEFT JOIN public.reviews rv ON rv.restaurant_id = r.id
GROUP BY r.user_id, r.id;
