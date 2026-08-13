-- "cuisine_type" supposait que tout client était un restaurant (liste de cuisines en dur,
-- prompt IA qui dit "a {cuisine} restaurant"). ReviewChef sert aussi des coiffeurs, garages,
-- boulangeries, etc. — on généralise le champ en "business_type" (texte libre).
ALTER TABLE public.restaurants RENAME COLUMN cuisine_type TO business_type;
ALTER TABLE public.restaurants ALTER COLUMN business_type SET DEFAULT 'Restaurant';
