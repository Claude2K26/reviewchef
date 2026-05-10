-- Create restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  cuisine_type TEXT NOT NULL DEFAULT 'French',
  tone TEXT NOT NULL DEFAULT 'professional' CHECK (tone IN ('professional', 'friendly', 'casual', 'formal', 'warm')),
  signature TEXT NOT NULL DEFAULT '',
  google_account_id TEXT,
  google_location_id TEXT,
  google_location_name TEXT,
  google_access_token TEXT,
  google_refresh_token TEXT,
  token_expiry TIMESTAMPTZ,
  automation_enabled BOOLEAN NOT NULL DEFAULT false,
  last_checked TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_restaurants_user_id ON public.restaurants(user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON public.restaurants
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own restaurant"
  ON public.restaurants FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own restaurant"
  ON public.restaurants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own restaurant"
  ON public.restaurants FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own restaurant"
  ON public.restaurants FOR DELETE
  USING (auth.uid() = user_id);

-- Service role can access all restaurants (for cron job)
CREATE POLICY "Service role has full access"
  ON public.restaurants FOR ALL
  USING (auth.role() = 'service_role');
