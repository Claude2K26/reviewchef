import Link from "next/link";
import { AlertCircle, CheckCircle2, Wifi, WifiOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types";

interface AutomationStatusBannerProps {
  restaurant: Restaurant;
}

export function AutomationStatusBanner({ restaurant }: AutomationStatusBannerProps) {
  const isConnected = !!restaurant.google_access_token;
  const isEnabled = restaurant.automation_enabled;

  if (!isConnected) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <WifiOff className="w-5 h-5 text-amber-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-800">Google My Business non connecté</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Connectez votre établissement pour activer les réponses automatiques
          </p>
        </div>
        <Button asChild size="sm" variant="default" className="shrink-0">
          <Link href="/settings">Connecter</Link>
        </Button>
      </div>
    );
  }

  if (!isEnabled) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <AlertCircle className="w-5 h-5 text-gray-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700">Automatisation désactivée</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Les réponses automatiques sont en pause. Activez-les dans les paramètres.
          </p>
        </div>
        <Button asChild size="sm" variant="outline" className="shrink-0">
          <Link href="/settings">Activer</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
      <div className="relative">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-emerald-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          Auto-pilote activé — {restaurant.google_location_name ?? "votre établissement"}
        </p>
        <p className="text-xs text-emerald-600 mt-0.5">
          Vos avis sont surveillés et répondus automatiquement 24h/24
          {restaurant.last_checked && (
            <> · Dernière vérification : {new Date(restaurant.last_checked).toLocaleTimeString("fr-FR")}</>
          )}
        </p>
      </div>
    </div>
  );
}
