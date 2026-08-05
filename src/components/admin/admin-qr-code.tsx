"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";

interface Props {
  slug: string;
  nom: string;
}

export function AdminQrCode({ slug, nom }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = `${window.location.origin}/r/${slug}`;
    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    }).then(setDataUrl);
  }, [slug]);

  function handleDownload() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-collecte-${slug}.png`;
    a.click();
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={!dataUrl}
      className="shrink-0 group relative"
      title="Télécharger le QR code"
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={`QR code ${nom}`}
          className="w-14 h-14 rounded-md border border-gray-100"
        />
      ) : (
        <div className="w-14 h-14 bg-gray-100 rounded-md animate-pulse" />
      )}
      {dataUrl && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Download className="w-4 h-4 text-white" />
        </span>
      )}
    </button>
  );
}
