import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { AdminClientsList, type AdminClient } from "@/components/admin/admin-clients-list";

export default async function AdminCollectePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!isAdmin(user)) redirect("/dashboard");

  const service = createServiceClient();

  const [{ data: authUsers }, { data: profiles }, { data: collectPages }, { data: allRestaurants }] = await Promise.all([
    service.auth.admin.listUsers(),
    service.from("profiles").select("id, plan, subscription_status"),
    service.from("collect_pages").select("*").order("created_at", { ascending: false }),
    service.from("restaurants").select("id, user_id, name, google_place_id"),
  ]);

  const allUsers = authUsers?.users ?? [];
  const allProfiles = profiles ?? [];
  const allPages = collectPages ?? [];
  const allRests = allRestaurants ?? [];

  const clients: AdminClient[] = allUsers
    .map((u) => {
      const profile = allProfiles.find((p) => p.id === u.id);
      return {
        id: u.id,
        email: u.email ?? "(sans email)",
        plan: profile?.plan ?? null,
        subscription_status: profile?.subscription_status ?? null,
        created_at: u.created_at,
        restaurants: allRests
          .filter((r) => r.user_id === u.id)
          .map((r) => ({ id: r.id, name: r.name, google_place_id: r.google_place_id })),
        pages: allPages
          .filter((p) => p.client_id === u.id)
          .map((p) => ({
            id: p.id,
            slug: p.slug,
            nom_etablissement: p.nom_etablissement,
            google_review_url: p.google_review_url,
            nb_scans: p.nb_scans,
            nb_clics: p.nb_clics,
          })),
      };
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour admin
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pages de collecte</h1>
          <p className="text-gray-500 mt-1">
            Crée et suis les pages de collecte d&apos;avis pour chaque client, sans te connecter à sa place.
          </p>
        </div>

        <AdminClientsList clients={clients} />
      </div>
    </div>
  );
}
