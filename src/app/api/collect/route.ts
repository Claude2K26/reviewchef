import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 40);
}

function buildGoogleReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}

// GET : liste des pages de collecte de l'utilisateur
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { data, error } = await supabase
    .from("collect_pages")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST : création d'une nouvelle page de collecte
// L'URL Google est toujours dérivée du google_place_id de l'établissement connecté,
// jamais saisie à la main, pour garantir qu'elle mène au formulaire "écrire un avis" de Google.
// Un admin peut créer une page pour un autre client en passant client_id dans le body.
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { restaurant_id, client_id: requestedClientId } = body;

  if (!restaurant_id) {
    return NextResponse.json({ error: "Établissement manquant" }, { status: 400 });
  }

  const requestingAdmin = isAdmin(user);
  const targetClientId = requestingAdmin && requestedClientId ? requestedClientId : user.id;
  const isOnBehalfOfAnother = targetClientId !== user.id;

  // Un admin agissant pour un autre client doit contourner la RLS (auth.uid() = client_id / user_id)
  const service = isOnBehalfOfAnother ? createServiceClient() : null;
  const db = service ?? supabase;

  if (service) {
    const { data: targetUser, error: lookupError } = await service.auth.admin.getUserById(targetClientId);
    if (lookupError || !targetUser?.user) {
      return NextResponse.json({ error: "Client introuvable" }, { status: 400 });
    }
  }

  const { data: restaurant, error: restaurantError } = await db
    .from("restaurants")
    .select("id, name, google_place_id, user_id")
    .eq("id", restaurant_id)
    .single();

  // Pour un admin (client RLS bypass), on vérifie explicitement que l'établissement
  // appartient bien au client ciblé — pour un client normal, la RLS s'en charge déjà.
  if (restaurantError || !restaurant || restaurant.user_id !== targetClientId) {
    return NextResponse.json({ error: "Établissement introuvable" }, { status: 400 });
  }

  if (!restaurant.google_place_id) {
    return NextResponse.json(
      { error: "Connectez d'abord Google My Business pour cet établissement avant de créer une page de collecte." },
      { status: 400 }
    );
  }

  const base = toSlug(restaurant.name);
  const suffix = Math.random().toString(36).substring(2, 6);
  const slug = `${base}-${suffix}`;
  const google_review_url = buildGoogleReviewUrl(restaurant.google_place_id);

  const { data, error } = await db
    .from("collect_pages")
    .insert({
      client_id: targetClientId,
      restaurant_id: restaurant.id,
      slug,
      nom_etablissement: restaurant.name,
      google_review_url,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE : suppression d'une page de collecte
// Un admin peut supprimer la page de n'importe quel client.
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { id } = await request.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "id manquant" }, { status: 400 });

  if (isAdmin(user)) {
    const { error } = await createServiceClient().from("collect_pages").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from("collect_pages")
    .delete()
    .eq("id", id)
    .eq("client_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
