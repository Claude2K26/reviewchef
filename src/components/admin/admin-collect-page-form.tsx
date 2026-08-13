"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AdminRestaurant } from "./admin-clients-list";

interface Props {
  clientId: string;
  restaurants: AdminRestaurant[];
}

export function AdminCollectPageForm({ clientId, restaurants }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectedRestaurants = restaurants.filter((r) => r.google_place_id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!restaurantId) { setError("Sélectionnez un établissement"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          restaurant_id: restaurantId,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création");
        return;
      }
      setRestaurantId("");
      setShowForm(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (!showForm) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowForm(true)}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Créer une page pour ce client
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
      {connectedRestaurants.length === 0 ? (
        <p className="text-xs text-gray-500">
          Ce client n'a aucun établissement connecté à Google My Business. L'URL d'avis ne peut
          pas être générée tant que la connexion Google n'est pas faite.
        </p>
      ) : (
        <div className="space-y-1.5">
          <Label htmlFor={`restaurant-${clientId}`} className="text-xs text-gray-500">
            Établissement
          </Label>
          <Select value={restaurantId} onValueChange={setRestaurantId}>
            <SelectTrigger id={`restaurant-${clientId}`} className="text-sm bg-white">
              <SelectValue placeholder="Choisir un établissement" />
            </SelectTrigger>
            <SelectContent>
              {connectedRestaurants.map((r) => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400">
            L'URL d'avis Google est générée automatiquement depuis la fiche connectée.
          </p>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={saving || connectedRestaurants.length === 0}>
          {saving ? "Création..." : "Créer"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => { setShowForm(false); setError(null); setRestaurantId(""); }}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
