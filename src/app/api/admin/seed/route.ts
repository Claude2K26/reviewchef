import { NextResponse } from "next/server";

export async function GET() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/restaurants`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Prefer": "return=representation,resolution=merge-duplicates",
    },
    body: JSON.stringify({
      user_id: "9e285161-6980-4f8e-8321-efc48954ce92",
      name: "ReviewChef Admin",
      cuisine_type: "Française",
      tone: "professional",
      signature: "",
    }),
  });

  const text = await res.text();
  if (!res.ok) return NextResponse.json({ error: text, status: res.status }, { status: 500 });
  return NextResponse.json({ ok: true, data: JSON.parse(text) });
}
