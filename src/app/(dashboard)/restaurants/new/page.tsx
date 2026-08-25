import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { NewRestaurantForm } from "@/components/restaurants/new-restaurant-form";

export const metadata: Metadata = { title: "Nouvel établissement" };

export default async function NewRestaurantPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const maxRestaurants = 1;

  const { count } = await supabase
    .from("restaurants")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  // Redirect away if limit already reached
  if ((count ?? 0) >= maxRestaurants) {
    redirect("/dashboard");
  }

  return (
    <>
      <DashboardHeader
        title="Nouvel établissement"
        subtitle="Ajoutez un restaurant à votre compte Business"
      />
      <main className="flex-1 p-6 flex items-start justify-center overflow-auto">
        <NewRestaurantForm />
      </main>
    </>
  );
}
