import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RestaurantForm } from "@/components/settings/restaurant-form";
import { GoogleConnectionCard } from "@/components/settings/google-connection-card";
import { AutomationToggle } from "@/components/settings/automation-toggle";
import { BillingPortalButton } from "@/components/settings/billing-portal-button";
import { QrCodeCard } from "@/components/settings/qr-code-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Restaurant } from "@/types";

export const metadata: Metadata = {
  title: "Paramètres",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const cookieStore = await cookies();
  const activeId = cookieStore.get("active_restaurant_id")?.value;

  const { data: allRestaurants } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at");

  const restaurant = allRestaurants?.find((r) => r.id === activeId) ?? allRestaurants?.[0];

  if (!restaurant) redirect("/login");

  return (
    <>
      <DashboardHeader title="Paramètres" subtitle="Configurez votre établissement et l'automatisation" />
      <main className="flex-1 p-6 space-y-6 overflow-auto max-w-3xl">

        {/* Restaurant settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Mon établissement</CardTitle>
            <CardDescription>
              Ces informations personnalisent le ton et le contenu des réponses générées par l'IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestaurantForm restaurant={restaurant as Restaurant} />
          </CardContent>
        </Card>

        {/* Google My Business */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Google My Business</CardTitle>
            <CardDescription>
              Connectez votre établissement pour lire et répondre aux avis automatiquement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleConnectionCard restaurant={restaurant as Restaurant} />
          </CardContent>
        </Card>

        {/* Automation */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Automatisation</CardTitle>
            <CardDescription>
              Activez le pilote automatique pour que ReviewChef réponde sans intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AutomationToggle restaurant={restaurant as Restaurant} />
          </CardContent>
        </Card>

        {/* Account info */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Compte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Email : <strong className="text-gray-700">{user.email}</strong></p>
            <p className="text-xs text-gray-400 mt-1">
              Compte créé le {new Date(user.created_at).toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">QR Code avis Google</CardTitle>
            <CardDescription>
              Affichez cette carte en salle pour que vos clients laissent facilement un avis Google
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QrCodeCard restaurant={restaurant as Restaurant} />
          </CardContent>
        </Card>

        {/* Billing */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Abonnement & facturation</CardTitle>
            <CardDescription>
              Gérez votre abonnement, vos factures et votre moyen de paiement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BillingPortalButton />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
