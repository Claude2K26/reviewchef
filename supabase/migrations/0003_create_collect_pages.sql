-- Create collect_pages table
CREATE TABLE IF NOT EXISTS public.collect_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  nom_etablissement TEXT NOT NULL,
  google_review_url TEXT NOT NULL,
  nb_scans INTEGER NOT NULL DEFAULT 0,
  nb_clics INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_collect_pages_client_id ON public.collect_pages(client_id);

-- Enable RLS
ALTER TABLE public.collect_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Utilisateurs voient leurs propres pages"
  ON public.collect_pages FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Utilisateurs gèrent leurs propres pages"
  ON public.collect_pages FOR ALL
  USING (auth.uid() = client_id);

CREATE POLICY "Pages publiques lisibles par slug"
  ON public.collect_pages FOR SELECT
  USING (true);

-- Service role has full access (for /r/[slug] and click tracking, unauthenticated)
CREATE POLICY "Service role has full access"
  ON public.collect_pages FOR ALL
  USING (auth.role() = 'service_role');

-- RPC: increment scan count (page view)
CREATE OR REPLACE FUNCTION public.increment_scan(page_slug TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.collect_pages SET nb_scans = nb_scans + 1 WHERE slug = page_slug;
END;
$$;

-- RPC: increment click count (redirect to Google review)
CREATE OR REPLACE FUNCTION public.increment_click(page_slug TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.collect_pages SET nb_clics = nb_clics + 1 WHERE slug = page_slug;
END;
$$;
