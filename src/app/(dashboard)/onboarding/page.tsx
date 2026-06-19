import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import type { Restaurant } from "@/types";

export const metadata = { title: "Bienvenue sur ReviewChef" };

interface OnboardingPageProps {
  searchParams: Promise<{ restaurant_id?: string }>;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let restaurant;
  if (params.restaurant_id) {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .eq("user_id", user.id)
      .eq("id", params.restaurant_id)
      .maybeSingle();
    restaurant = data;
  } else {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at")
      .limit(1)
      .maybeSingle();
    restaurant = data;
  }

  if (!restaurant) redirect("/login");

  // Already fully configured and no specific restaurant requested → go to dashboard
  if (!params.restaurant_id && restaurant.name && restaurant.google_access_token && restaurant.automation_enabled) {
    redirect("/dashboard");
  }

  const startStep = params.restaurant_id ? 2 : 1;

  return <OnboardingWizard restaurant={restaurant as Restaurant} startStep={startStep} />;
}
