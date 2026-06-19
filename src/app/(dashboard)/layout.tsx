import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, plan")
    .eq("id", user.id)
    .single();

  if (!profile || !["active", "trialing"].includes(profile.subscription_status ?? "")) {
    redirect("/pricing");
  }

  // Fetch all restaurants
  let { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name")
    .eq("user_id", user.id)
    .order("created_at");

  // Auto-create if none (backward compat for new subscribers)
  if (!restaurants || restaurants.length === 0) {
    const { data: created } = await supabase
      .from("restaurants")
      .insert({
        user_id: user.id,
        name: "",
        cuisine_type: "Française",
        tone: "professional",
        signature: "",
      })
      .select("id, name")
      .single();
    restaurants = created ? [created] : [];
  }

  // Resolve active restaurant from cookie
  const cookieStore = await cookies();
  const activeId = cookieStore.get("active_restaurant_id")?.value;
  const activeRestaurant = restaurants.find((r) => r.id === activeId) ?? restaurants[0];
  const activeRestaurantId = activeRestaurant?.id ?? "";

  const plan = (profile as any)?.plan ?? "pro";
  const maxRestaurants = plan === "business" ? 3 : 1;
  const canAddMore = restaurants.length < maxRestaurants;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        restaurants={restaurants ?? []}
        activeRestaurantId={activeRestaurantId}
        canAddMore={canAddMore}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
