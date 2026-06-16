"use client";

import { useState } from "react";
import { CreditCard, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Impossible d'accéder au portail. Contactez le support.");
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={loading}
        variant="outline"
        className="gap-2"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CreditCard className="w-4 h-4" />
        )}
        {loading ? "Chargement..." : "Gérer mon abonnement"}
        {!loading && <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-50" />}
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-gray-400">
        Voir les factures, changer de plan, mettre à jour la carte bancaire ou annuler.
      </p>
    </div>
  );
}
