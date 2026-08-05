import { createClient, createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, CreditCard, TrendingUp, Activity, QrCode } from "lucide-react";
import { isAdmin } from "@/lib/admin";

export default async function AdminPage() {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!isAdmin(user)) redirect("/dashboard");

  // Fetch all data with service client
  const service = createServiceClient();

  const { data: profiles } = await service
    .from("profiles")
    .select("id, subscription_status, created_at")
    .order("created_at", { ascending: false });

  const { data: authUsers } = await service.auth.admin.listUsers();

  const allProfiles = profiles ?? [];
  const allUsers = authUsers?.users ?? [];

  const totalUsers = allUsers.length;
  const activeSubscribers = allProfiles.filter(
    (p) => p.subscription_status === "active"
  ).length;
  const mrr = activeSubscribers * 49;

  // Recent signups (last 10)
  const recentUsers = allUsers
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  const stats = [
    {
      label: "Utilisateurs total",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Abonnés actifs",
      value: activeSubscribers,
      icon: CreditCard,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "MRR",
      value: `${mrr} €`,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Taux conversion",
      value: totalUsers > 0 ? `${Math.round((activeSubscribers / totalUsers) * 100)}%` : "0%",
      icon: Activity,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin ReviewChef</h1>
            <p className="text-gray-500 mt-1">Vue d'ensemble en temps réel</p>
          </div>
          <Link
            href="/admin/collecte"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-4 py-2 shrink-0 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            Pages de collecte
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent signups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Derniers inscrits</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.length === 0 ? (
              <p className="p-5 text-gray-400 text-sm">Aucun utilisateur</p>
            ) : (
              recentUsers.map((u) => {
                const profile = allProfiles.find((p) => p.id === u.id);
                const isActive = profile?.subscription_status === "active";
                return (
                  <div key={u.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.email}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(u.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/rapport/${u.id}`}
                        className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
                      >
                        Rapport
                      </Link>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isActive ? "Abonné" : "Gratuit"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
