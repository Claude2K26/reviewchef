import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("restaurants")
    .upsert({
      user_id: "9e285161-6980-4f8e-8321-efc48954ce92",
      name: "ReviewChef Admin",
      cuisine_type: "Française",
      tone: "professional",
      signature: "",
    }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, restaurant: data });
}
