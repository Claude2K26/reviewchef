-- google_place_id existait déjà en prod (ajouté manuellement via le dashboard, jamais tracké) —
-- on le déclare ici pour que le schéma soit reproductible.
ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS google_place_id TEXT;

-- Lie chaque page de collecte à un établissement pour dériver l'URL d'avis Google
-- depuis google_place_id côté serveur, au lieu de la faire saisir à la main
-- (risque : lien vers la fiche au lieu du formulaire "écrire un avis", ou URL jamais mise à jour).
ALTER TABLE public.collect_pages
  ADD COLUMN IF NOT EXISTS restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_collect_pages_restaurant_id ON public.collect_pages(restaurant_id);
