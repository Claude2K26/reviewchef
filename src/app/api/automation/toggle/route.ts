import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { enabled } = await request.json();

  // Verify Google is connected before enabling
  if (enabled) {
    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("google_access_token")
      .eq("user_id", user.id)
      .single();

    if (!restaurant?.google_access_token) {
      return NextResponse.json(
        { error: "Connectez d'abord votre Google My Business" },
        { status: 400 }
      );
    }
  }

  const { error } = await supabase
    .from("restaurants")
    .update({ automation_enabled: enabled })
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, enabled });
}
