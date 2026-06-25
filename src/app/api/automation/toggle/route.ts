import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { enabled, restaurantId } = body;

  if (!restaurantId || typeof restaurantId !== "string" || !/^[0-9a-f-]{36}$/.test(restaurantId)) {
    return NextResponse.json({ error: "restaurantId invalide" }, { status: 400 });
  }

  // Verify ownership
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, google_access_token")
    .eq("id", restaurantId)
    .eq("user_id", user.id)
    .single();

  if (!restaurant) {
    return NextResponse.json({ error: "Établissement introuvable" }, { status: 404 });
  }

  if (enabled && !restaurant.google_access_token) {
    return NextResponse.json(
      { error: "Connectez d'abord votre Google My Business" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("restaurants")
    .update({ automation_enabled: enabled })
    .eq("id", restaurantId)
    .eq("user_id", user.id);

  if (error) {
    console.error("[toggle] update error:", error.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  return NextResponse.json({ success: true, enabled });
}
