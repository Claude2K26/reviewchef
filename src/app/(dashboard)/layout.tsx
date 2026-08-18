import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { SessionRefresher } from "@/components/auth/session-refresher";

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

  const adminClient = createServiceClient();
  const { data: profile } = await adminClient
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  const ADMIN_IDS = (process.env.ADMIN_USER_IDS ?? "").split(",").filter(Boolean);
  const isAdmin = ADMIN_IDS.includes(user.id);

  if (!isAdmin && (!profile || !["active", "trialing"].includes(profile.subscription_status ?? ""))) {
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
        business_type: "Restaurant",
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

  const MAX_RESTAURANTS = 3;
  const canAddMore = restaurants.length < MAX_RESTAURANTS;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SessionRefresher />
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
