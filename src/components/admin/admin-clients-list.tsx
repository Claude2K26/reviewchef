"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, QrCode as QrCodeIcon, BarChart3, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdminCollectPageForm } from "./admin-collect-page-form";
import { AdminQrCode } from "./admin-qr-code";

export interface AdminCollectPage {
  id: string;
  slug: string;
  nom_etablissement: string;
  google_review_url: string;
  nb_scans: number;
  nb_clics: number;
}

export interface AdminClient {
  id: string;
  email: string;
  plan: string | null;
  subscription_status: string | null;
  pages: AdminCollectPage[];
}

export function AdminClientsList({ clients }: { clients: AdminClient[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = clients.filter((c) =>
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(pageId: string, nom: string) {
    if (!confirm(`Supprimer la page de collecte "${nom}" ?`)) return;
    setDeletingId(pageId);
    try {
      await fetch("/api/collect", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pageId }),
      });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Rechercher un client par email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white"
      />

      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">Aucun client trouvé</p>
      )}

      {filtered.map((client) => {
        const isOpen = expanded === client.id;
        return (
          <div key={client.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : client.id)}
              className="w-full flex items-center justify-between gap-4 p-4 text-left"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{client.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  {client.plan && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                      {client.plan}
                    </span>
                  )}
                  {client.subscription_status && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        client.subscription_status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {client.subscription_status}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {client.pages.length} page{client.pages.length !== 1 ? "s" : ""} de collecte
                  </span>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 p-4 space-y-4">
                {client.pages.length > 0 && (
                  <div className="space-y-3">
                    {client.pages.map((page) => (
                      <div
                        key={page.id}
                        className="border border-gray-100 rounded-lg p-3 flex items-center gap-4"
                      >
                        <AdminQrCode slug={page.slug} nom={page.nom_etablissement} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {page.nom_etablissement}
                          </p>
                          <p className="text-xs text-gray-400">/r/{page.slug}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <QrCodeIcon className="w-3.5 h-3.5" /> {page.nb_scans} scans
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <BarChart3 className="w-3.5 h-3.5" /> {page.nb_clics} clics
                            </span>
                            {page.nb_scans > 0 && (
                              <span className="text-xs text-gray-400">
                                taux : {Math.round((page.nb_clics / page.nb_scans) * 100)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDelete(page.id, page.nom_etablissement)}
                          disabled={deletingId === page.id}
                          className="text-gray-300 hover:text-red-400 transition-colors shrink-0 disabled:opacity-50"
                          aria-label="Supprimer cette page de collecte"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <AdminCollectPageForm clientId={client.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
