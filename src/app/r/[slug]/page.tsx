import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { TrackClickButton } from "./track-click-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CollectPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: page } = await supabase
    .from("collect_pages")
    .select("nom_etablissement, google_review_url, restaurant_id, restaurants(google_place_id)")
    .eq("slug", slug)
    .single();

  if (!page) notFound();

  // Recalcule l'URL depuis le google_place_id actuel de l'établissement (au cas où le
  // commerçant a reconnecté Google My Business depuis la création de la page). Repli sur
  // la valeur stockée pour les anciennes pages non liées à un restaurant.
  const placeId = (page.restaurants as unknown as { google_place_id: string | null } | null)?.google_place_id;
  const googleUrl = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : page.google_review_url;

  // Incrémente le compteur de scans (page vue)
  await supabase.rpc("increment_scan", { page_slug: slug });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center space-y-8">

        <p className="text-xs text-gray-300 uppercase tracking-widest">ReviewChef</p>

        {/* Étoiles */}
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-gray-900">
            {page.nom_etablissement}
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Vous avez passé un bon moment&nbsp;?
            <br />
            <strong className="text-gray-800">Laissez-nous un avis</strong>
            {" "}— ça nous aide énormément&nbsp;!
          </p>
        </div>

        {/* Bouton avec tracking */}
        <TrackClickButton slug={slug} googleUrl={googleUrl} />

        <p className="text-xs text-gray-300">Propulsé par ReviewChef</p>
      </div>
    </div>
  );
}
