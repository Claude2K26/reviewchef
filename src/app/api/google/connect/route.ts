import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthUrl } from "@/lib/google/auth";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL));
  }

  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect") ?? undefined;

  const authUrl = getAuthUrl(user.id, redirectTo);
  return NextResponse.redirect(authUrl);
}
