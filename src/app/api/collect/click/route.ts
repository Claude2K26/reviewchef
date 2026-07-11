import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { slug } = await request.json().catch(() => ({}));
  if (!slug) return NextResponse.json({ error: "slug manquant" }, { status: 400 });

  const supabase = createServiceClient();
  await supabase.rpc("increment_click", { page_slug: slug });

  return NextResponse.json({ ok: true });
}
