"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg transition-all hover:opacity-80"
      style={{ background: "#111111" }}
    >
      <Printer className="w-4 h-4" />
      Imprimer / Exporter PDF
    </button>
  );
}
