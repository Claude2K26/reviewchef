"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  clientId: string;
}

export function AdminCollectPageForm({ clientId }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          nom_etablissement: nom.trim(),
          google_review_url: url.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création");
        return;
      }
      setNom("");
      setUrl("");
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
      <div className="space-y-1.5">
        <Label htmlFor={`nom-${clientId}`} className="text-xs text-gray-500">
          Nom de l'établissement
        </Label>
        <Input
          id={`nom-${clientId}`}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="text-sm bg-white"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`url-${clientId}`} className="text-xs text-gray-500">
          Lien vers la fiche Google (pour laisser un avis)
        </Label>
        <Input
          id={`url-${clientId}`}
          type="url"
          placeholder="https://g.page/r/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="text-sm bg-white"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? "Création..." : "Créer"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => { setShowForm(false); setError(null); setNom(""); setUrl(""); }}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
