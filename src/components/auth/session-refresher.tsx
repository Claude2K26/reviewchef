"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function SessionRefresher() {
  useEffect(() => {
    const supabase = createClient();

    // Refresh session immediately on mount
    supabase.auth.getSession();

    // Keep session alive by refreshing every 4 minutes
    const interval = setInterval(() => {
      supabase.auth.getSession();
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
