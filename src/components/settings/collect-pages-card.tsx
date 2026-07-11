"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Plus, Download, QrCode, Trash2, ExternalLink, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CollectPage {
  id: string;
  slug: string;
  nom_etablissement: string;
  google_review_url: string;
  nb_scans: number;
  nb_clics: number;
  created_at: string;
}

export function CollectPagesCard() {
  const [pages, setPages] = useState<CollectPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [qrUrls, setQrUrls] = useState<Record<string, string>>({});

  const appUrl = typeof window !== "undefined"
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL ?? "");

  useEffect(() => { fetchPages(); }, []);

  async function fetchPages() {
    setLoading(true);
    try {
      const res = await fetch("/api/collect");
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  // Génère les QR codes pour chaque page
  useEffect(() => {
    pages.forEach(async (page) => {
      if (qrUrls[page.id]) return;
      const collectUrl = `${appUrl}/r/${page.slug}`;
      const dataUrl = await QRCode.toDataURL(collectUrl, {
        width: 400,
        margin: 2,
        color: { dark: "#1a1a1a", light: "#ffffff" },
      });
      setQrUrls((prev) => ({ ...prev, [page.id]: dataUrl }));
    });
  }, [pages, appUrl]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_etablissement: nom.trim(), google_review_url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error ?? "Erreur lors de la création"); return; }
      setPages((prev) => [data, ...prev]);
      setNom("");
      setUrl("");
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette page de collecte ?")) return;
    await fetch("/api/collect", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPages((prev) => prev.filter((p) => p.id !== id));
    setQrUrls((prev) => { const next = { ...prev }; delete next[id]; return next; });
  }

  function handleDownload(page: CollectPage) {
    const qr = qrUrls[page.id];
    if (!qr) return;
    const a = document.createElement("a");
    a.href = qr;
    a.download = `qr-collecte-${page.slug}.png`;
    a.click();
  }

  if (loading) {
    return <div className="h-20 bg-gray-100 rounded-xl animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      {pages.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-400">
          <QrCode className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm text-gray-500">Aucune page de collecte créée</p>
          <p className="text-xs mt-1">
            Créez une page pour collecter des avis positifs via QR code, avec suivi des scans et clics.
          </p>
        </div>
      )}

      {pages.map((page) => (
        <div key={page.id} className="border border-gray-100 rounded-xl p-4 space-y-4 bg-white">
          {/* En-tête */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-sm">{page.nom_etablissement}</p>
              <a
                href={`${appUrl}/r/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1 mt-0.5"
              >
                /r/{page.slug}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <button
              onClick={() => handleDelete(page.id)}
              className="text-gray-300 hover:text-red-400 transition-colors shrink-0 mt-0.5"
              aria-label="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pb-1">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900">{page.nb_scans}</span>
              <span className="text-xs text-gray-400">scans</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900">{page.nb_clics}</span>
              <span className="text-xs text-gray-400">clics Google</span>
            </div>
            {page.nb_scans > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">
                  taux : {Math.round((page.nb_clics / page.nb_scans) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* QR code + téléchargement */}
          <div className="flex items-center gap-4">
            {qrUrls[page.id] ? (
              <img
                src={qrUrls[page.id]}
                alt={`QR code ${page.nom_etablissement}`}
                className="w-20 h-20 rounded-lg border border-gray-100"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-lg animate-pulse" />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(page)}
              disabled={!qrUrls[page.id]}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Télécharger PNG
            </Button>
          </div>
        </div>
      ))}

      {/* Formulaire de création */}
      {showForm ? (
        <form onSubmit={handleCreate} className="border border-gray-200 rounded-xl p-4 space-y-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700">Nouvelle page de collecte</p>

          <div className="space-y-1.5">
            <Label htmlFor="collect-nom" className="text-xs text-gray-500">
              Nom de l'établissement
            </Label>
            <Input
              id="collect-nom"
              placeholder="ex : Le Bistrot du Marché"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="collect-url" className="text-xs text-gray-500">
              Lien vers votre fiche Google (pour laisser un avis)
            </Label>
            <Input
              id="collect-url"
              placeholder="https://g.page/r/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              type="url"
              className="text-sm"
            />
            <p className="text-xs text-gray-400">
              Trouvez ce lien dans Google Maps → votre fiche → "Demander des avis"
            </p>
          </div>

          {formError && <p className="text-xs text-red-500">{formError}</p>}

          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={saving}>
              {saving ? "Création..." : "Créer la page"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => { setShowForm(false); setFormError(null); setNom(""); setUrl(""); }}
            >
              Annuler
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(true)}
          className="w-full border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Créer une page de collecte
        </Button>
      )}
    </div>
  );
}
