"use client";

import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import type { Restaurant } from "@/types";

interface AutomationToggleProps {
  restaurant: Restaurant;
}

export function AutomationToggle({ restaurant }: AutomationToggleProps) {
  const [enabled, setEnabled] = useState(restaurant.automation_enabled);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isConnected = !!restaurant.google_access_token;

  async function handleToggle(newValue: boolean) {
    setLoading(true);
    try {
      const res = await fetch("/api/automation/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: newValue, restaurantId: restaurant.id }),
      });
      if (!res.ok) throw new Error("Erreur de mise à jour");
      setEnabled(newValue);
      toast({
        title: newValue ? "Automatisation activée !" : "Automatisation désactivée",
        description: newValue
          ? "ReviewChef va répondre automatiquement à vos avis 24h/24."
          : "Les réponses automatiques sont en pause.",
        variant: newValue ? ("success" as any) : "default",
      });
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border bg-white">
      <div className={`p-2.5 rounded-xl ${enabled ? "bg-brand-50" : "bg-gray-50"}`}>
        <Zap className={`w-5 h-5 ${enabled ? "text-brand-600" : "text-gray-400"}`} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Réponses automatiques</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {enabled
                ? "L'IA répond automatiquement à chaque nouvel avis"
                : "Les nouvelles réponses ne seront pas publiées automatiquement"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
            <Switch
              checked={enabled}
              onCheckedChange={handleToggle}
              disabled={loading || !isConnected}
            />
          </div>
        </div>

        {!isConnected && (
          <p className="text-xs text-amber-600 mt-2">
            Connectez d'abord votre Google My Business pour activer l'automatisation
          </p>
        )}

        {enabled && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">Actif · Vérification toutes les heures</span>
          </div>
        )}
      </div>
    </div>
  );
}
