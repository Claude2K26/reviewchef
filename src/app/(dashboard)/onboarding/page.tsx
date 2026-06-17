import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import type { Restaurant } from "@/types";

export const metadata = { title: "Bienvenue sur ReviewChef" };

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) redirect("/login");

  // Already configured → go to dashboard
  if (restaurant.name && restaurant.google_access_token && restaurant.automation_enabled) {
    redirect("/dashboard");
  }

  return <OnboardingWizard restaurant={restaurant as Restaurant} />;
}
