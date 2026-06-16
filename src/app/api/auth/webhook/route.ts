import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();

  // Only handle new user creation on auth.users table
  if (payload.type !== "INSERT" || !payload.record?.email) {
    return NextResponse.json({ received: true });
  }

  try {
    await sendWelcomeEmail({ to: payload.record.email });
  } catch (err) {
    console.error("[AuthWebhook] Failed to send welcome email:", err);
  }

  return NextResponse.json({ received: true });
}
