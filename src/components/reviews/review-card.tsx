"use client";

import { useState } from "react";
import { MessageSquare, RefreshCw, Send, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";
import { formatDate, getInitials, getStatusColor } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
  onUpdate?: (updatedReview: Review) => void;
}

const STATUS_LABELS: Record<string, string> = {
  responded: "Répondu",
  pending: "En attente",
  failed: "Échec",
  skipped: "Ignoré",
};

export function ReviewCard({ review, onUpdate }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [localReview, setLocalReview] = useState(review);
  const { toast } = useToast();

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/reviews/${localReview.id}/generate`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur de génération");

      const updated = { ...localReview, response_text: data.response_text, status: "pending" as const };
      setLocalReview(updated);
      onUpdate?.(updated);
      setExpanded(true);
      toast({ title: "Réponse générée !", variant: "success" as any });
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handlePost() {
    setIsPosting(true);
    try {
      const res = await fetch(`/api/reviews/${localReview.id}/post`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur de publication");

      const updated = { ...localReview, status: "responded" as const, responded_at: new Date().toISOString() };
      setLocalReview(updated);
      onUpdate?.(updated);
      toast({ title: "Réponse publiée sur Google !", variant: "success" as any });
    } catch (err) {
      toast({ title: "Erreur de publication", description: String(err), variant: "destructive" });
    } finally {
      setIsPosting(false);
    }
  }

  const statusClass = getStatusColor(localReview.status);

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
            {localReview.author_photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={localReview.author_photo_url} alt={localReview.author_name} className="w-full h-full object-cover" />
            ) : (
              getInitials(localReview.author_name)
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <span className="font-semibold text-gray-900">{localReview.author_name}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating rating={localReview.rating} size="sm" />
                  <span className="text-xs text-gray-400">{formatDate(localReview.review_date)}</span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusClass}`}>
                {localReview.status === "responded" && <CheckCircle2 className="w-3 h-3" />}
                {STATUS_LABELS[localReview.status]}
              </span>
            </div>

            {/* Review text */}
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {localReview.review_text || <em className="text-gray-400">Avis sans commentaire</em>}
            </p>

            {/* Response section */}
            {localReview.response_text && (
              <div className="mt-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Voir la réponse
                  {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {expanded && (
                  <div className="mt-2 p-3 rounded-lg bg-brand-50 border border-brand-100 text-sm text-brand-800 leading-relaxed">
                    {localReview.response_text}
                    {localReview.responded_at && (
                      <p className="text-xs text-brand-500 mt-1">
                        Publié le {formatDate(localReview.responded_at)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            {localReview.status !== "responded" && (
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="text-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                  {isGenerating ? "Génération..." : localReview.response_text ? "Régénérer" : "Générer une réponse"}
                </Button>

                {localReview.response_text && (
                  <Button
                    size="sm"
                    onClick={handlePost}
                    disabled={isPosting}
                    className="text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isPosting ? "Publication..." : "Publier sur Google"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
