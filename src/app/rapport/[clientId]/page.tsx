import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Star, ChevronUp, ChevronDown, Minus, QrCode, MessageSquare, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { formatRating } from "@/lib/utils";
import { PrintButton } from "./print-button";

interface Props {
  params: Promise<{ clientId: string }>;
  searchParams: Promise<{ mois?: string }>;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

export default async function RapportPage({ params, searchParams }: Props) {
  const { clientId } = await params;
  const { mois } = await searchParams;

  // Auth : admin ou le client lui-même
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const isAdmin = user.email === ADMIN_EMAIL;
  if (!isAdmin && user.id !== clientId) redirect("/dashboard");

  const service = createServiceClient();

  // Période du rapport
  const now = new Date();
  let year: number, month: number;
  if (mois && /^\d{4}-\d{2}$/.test(mois)) {
    [year, month] = mois.split("-").map(Number);
  } else {
    year = now.getFullYear();
    month = now.getMonth() + 1;
  }

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
  const startOfPrevMonth = new Date(year, month - 2, 1);
  const endOfPrevMonth = new Date(year, month - 1, 0, 23, 59, 59, 999);
  const periodLabel = format(startOfMonth, "MMMM yyyy", { locale: fr });

  // Établissements du client
  const { data: restaurants } = await service
    .from("restaurants")
    .select("id, name")
    .eq("user_id", clientId);

  if (!restaurants || restaurants.length === 0) notFound();

  const restaurantIds = restaurants.map((r) => r.id);
  const restaurantName = restaurants[0].name || "Établissement";

  // Tous les avis
  const { data: allReviews } = await service
    .from("reviews")
    .select("rating, status, review_date, responded_at")
    .in("restaurant_id", restaurantIds);

  const reviews = allReviews ?? [];

  const thisMonthReviews = reviews.filter((r) => {
    const d = new Date(r.review_date);
    return d >= startOfMonth && d <= endOfMonth;
  });

  const prevMonthReviews = reviews.filter((r) => {
    const d = new Date(r.review_date);
    return d >= startOfPrevMonth && d <= endOfPrevMonth;
  });

  const respondedThisMonth = reviews.filter((r) => {
    if (r.status !== "responded" || !r.responded_at) return false;
    const d = new Date(r.responded_at);
    return d >= startOfMonth && d <= endOfMonth;
  });

  const avg = (arr: typeof reviews) =>
    arr.length > 0 ? arr.reduce((s, r) => s + r.rating, 0) / arr.length : null;

  const avgAllTime = avg(reviews);
  const avgThisMonth = avg(thisMonthReviews);
  const avgPrevMonth = avg(prevMonthReviews);
  const delta =
    avgThisMonth !== null && avgPrevMonth !== null
      ? avgThisMonth - avgPrevMonth
      : null;

  const ratingDist = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: thisMonthReviews.filter((r) => r.rating === stars).length,
  }));

  const responseRate =
    thisMonthReviews.length > 0
      ? Math.round((respondedThisMonth.length / thisMonthReviews.length) * 100)
      : respondedThisMonth.length > 0 ? 100 : 0;

  // Stats QR collecte
  const { data: collectPages } = await service
    .from("collect_pages")
    .select("nb_scans, nb_clics")
    .eq("client_id", clientId);

  const totalScans = (collectPages ?? []).reduce((s, p) => s + (p.nb_scans ?? 0), 0);
  const totalClics = (collectPages ?? []).reduce((s, p) => s + (p.nb_clics ?? 0), 0);
  const clickRate = totalScans > 0 ? Math.round((totalClics / totalScans) * 100) : 0;
  const hasQr = (collectPages?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-white">

      {/* Barre admin — cachée à l'impression */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/admin"
          className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
        >
          ← Retour admin
        </Link>
        <div className="flex items-center gap-3">
          {/* Navigation mois précédent / suivant */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            {month > 1 ? (
              <Link
                href={`/rapport/${clientId}?mois=${year}-${String(month - 1).padStart(2, "0")}`}
                className="px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                ← Mois préc.
              </Link>
            ) : null}
            <span className="px-2 font-medium text-gray-600 capitalize">{periodLabel}</span>
            {(year < now.getFullYear() || month < now.getMonth() + 1) ? (
              <Link
                href={`/rapport/${clientId}?mois=${year}-${String(month + 1).padStart(2, "0")}`}
                className="px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Mois suiv. →
              </Link>
            ) : null}
          </div>
          <PrintButton />
        </div>
      </div>

      {/* Contenu du rapport */}
      <div className="max-w-3xl mx-auto px-8 py-12 space-y-10">

        {/* En-tête */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-8">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">ReviewChef</p>
            <h1 className="text-3xl font-black text-gray-900">{restaurantName}</h1>
            <p className="text-gray-400 mt-1 capitalize">Rapport mensuel · {periodLabel}</p>
          </div>
          <p className="text-xs text-gray-300 text-right">
            Généré le {format(now, "d MMMM yyyy", { locale: fr })}
          </p>
        </div>

        {/* 1 — Note Google */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Note Google
          </h2>
          <div className="grid grid-cols-3 gap-5">

            {/* Note globale */}
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <p className="text-xs text-gray-400 mb-2">Note globale</p>
              <p className="text-5xl font-black text-gray-900">
                {avgAllTime !== null ? formatRating(avgAllTime) : "—"}
              </p>
              <p className="text-gray-400 text-sm">/5</p>
              <div className="flex justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= Math.round(avgAllTime ?? 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{reviews.length} avis total</p>
            </div>

            {/* Ce mois */}
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <p className="text-xs text-gray-400 mb-2">Ce mois</p>
              <p className="text-5xl font-black text-gray-900">
                {avgThisMonth !== null ? formatRating(avgThisMonth) : "—"}
              </p>
              <p className="text-gray-400 text-sm">/5</p>
              {delta !== null ? (
                <div
                  className={`flex items-center justify-center gap-1 mt-2 text-sm font-semibold ${
                    delta > 0.05
                      ? "text-emerald-600"
                      : delta < -0.05
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {delta > 0.05 ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : delta < -0.05 ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <Minus className="w-4 h-4" />
                  )}
                  {delta > 0 ? "+" : ""}
                  {delta.toFixed(1)} vs mois préc.
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-2">—</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{thisMonthReviews.length} avis reçus</p>
            </div>

            {/* Mois précédent */}
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <p className="text-xs text-gray-400 mb-2">Mois précédent</p>
              <p className="text-5xl font-black text-gray-900">
                {avgPrevMonth !== null ? formatRating(avgPrevMonth) : "—"}
              </p>
              <p className="text-gray-400 text-sm">/5</p>
              <p className="text-xs text-gray-400 mt-2">{prevMonthReviews.length} avis reçus</p>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* 2 — Avis reçus */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Avis reçus · <span className="capitalize">{periodLabel}</span>
          </h2>
          {thisMonthReviews.length === 0 ? (
            <p className="text-sm text-gray-400">Aucun avis reçu ce mois.</p>
          ) : (
            <div className="space-y-3">
              {ratingDist.map(({ stars, count }) => {
                const pct =
                  thisMonthReviews.length > 0
                    ? Math.round((count / thisMonthReviews.length) * 100)
                    : 0;
                return (
                  <div key={stars} className="flex items-center gap-4">
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= stars
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200 fill-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-5 text-right shrink-0">
                      {count}
                    </span>
                    <span className="text-xs text-gray-400 w-8 shrink-0">{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="h-px bg-gray-100" />

        {/* 3 — Réponses publiées */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Réponses publiées
          </h2>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{respondedThisMonth.length}</p>
                <p className="text-sm text-gray-500">réponses publiées</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{responseRate}%</p>
                <p className="text-sm text-gray-500">taux de réponse</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 — Collecte QR (si des pages existent) */}
        {hasQr && (
          <>
            <div className="h-px bg-gray-100" />
            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Collecte d'avis · QR code
              </h2>
              <p className="text-xs text-gray-400 mb-5">Statistiques cumulées depuis la création</p>
              <div className="grid grid-cols-3 gap-5">
                <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <QrCode className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{totalScans}</p>
                    <p className="text-sm text-gray-500">scans QR</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Star className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{totalClics}</p>
                    <p className="text-sm text-gray-500">clics Google</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">{clickRate}%</p>
                    <p className="text-sm text-gray-500">taux de conversion</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Pied de page */}
        <div className="border-t border-gray-100 pt-8 flex items-center justify-between text-xs text-gray-300">
          <p>ReviewChef — Service de gestion des avis Google</p>
          <p>reviewchef.vercel.app</p>
        </div>
      </div>
    </div>
  );
}
