"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle2, Loader2, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import type { Restaurant } from "@/types";

interface GoogleConnectionCardProps {
  restaurant: Restaurant;
}

export function GoogleConnectionCard({ restaurant }: GoogleConnectionCardProps) {
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { toast } = useToast();
  const isConnected = !!restaurant.google_access_token;

  async function handleConnect() {
    window.location.href = `/api/google/connect?restaurant_id=${restaurant.id}&redirect=/settings`;
  }

  async function handleDisconnect() {
    if (!confirm("Déconnecter Google My Business ? L'automatisation sera désactivée.")) return;
    setIsDisconnecting(true);
    try {
      const res = await fetch("/api/google/disconnect", { method: "POST" });
      if (!res.ok) throw new Error("Erreur de déconnexion");
      window.location.reload();
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
    } finally {
      setIsDisconnecting(false);
    }
  }

  if (isConnected) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-emerald-800">Google My Business connecté</p>
            {restaurant.google_location_name && (
              <p className="text-sm text-emerald-600 mt-0.5">
                Établissement : <strong>{restaurant.google_location_name}</strong>
              </p>
            )}
            {restaurant.last_checked && (
              <p className="text-xs text-emerald-500 mt-0.5">
                Dernière sync : {formatDate(restaurant.last_checked)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleConnect}
            className="text-brand-600 border-brand-200 hover:bg-brand-50"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Changer d'établissement
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            {isDisconnecting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Unlink className="w-3.5 h-3.5" />
            )}
            Déconnecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-sm text-gray-600">
          Connectez votre compte Google My Business pour permettre à ReviewChef de lire vos
          avis et d'y répondre automatiquement.
        </p>
        <ul className="mt-2 space-y-1">
          {[
            "Lecture de vos avis Google",
            "Publication de réponses",
            "Synchronisation toutes les heures",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={handleConnect} className="flex items-center gap-2">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Connecter Google My Business
      </Button>
    </div>
  );
}
