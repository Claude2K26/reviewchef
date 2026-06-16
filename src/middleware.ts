import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reviews/:path*",
    "/settings/:path*",
    "/checkout/:path*",
    "/api/stripe/:path*",
    "/api/google/:path*",
    "/api/cron/:path*",
  ],
};
