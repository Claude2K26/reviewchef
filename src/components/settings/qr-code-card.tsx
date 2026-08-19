"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Printer, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types";

interface QrCodeCardProps {
  restaurant: Restaurant;
}

export function QrCodeCard({ restaurant }: QrCodeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const placeId = restaurant.google_place_id;
  const reviewUrl = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : null;

  useEffect(() => {
    if (!reviewUrl) return;
    QRCode.toDataURL(reviewUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [reviewUrl]);

  function handleDownload() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-avis-${restaurant.name.toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
  }

  function handlePrint() {
    const win = window.open("", "_blank");
    if (!win || !qrDataUrl) return;
    const safeName = restaurant.name.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] ?? c));
    win.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>QR Code avis — ${safeName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
          .card { width: 320px; padding: 32px 24px; border: 2px solid #e5e7eb; border-radius: 16px; text-align: center; }
          .logo { font-size: 13px; color: #9ca3af; margin-bottom: 20px; letter-spacing: 0.05em; text-transform: uppercase; }
          .qr { width: 220px; height: 220px; margin: 0 auto 20px; }
          .stars { color: #f59e0b; font-size: 24px; margin-bottom: 12px; }
          h1 { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 8px; }
          p { font-size: 13px; color: #6b7280; line-height: 1.5; margin-bottom: 20px; }
          .cta { background: #FF6B35; color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; display: inline-block; }
          @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">ReviewChef</div>
          <img class="qr" src="${qrDataUrl}" alt="QR Code avis Google" />
          <div class="stars">★★★★★</div>
          <h1>Votre avis compte !</h1>
          <p>Scannez ce QR code pour laisser un avis Google sur <strong>${safeName}</strong> en quelques secondes.</p>
          <div class="cta">Laisser un avis ⭐</div>
        </div>
      </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 300);
  }

  if (!placeId) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400 space-y-2">
        <Star className="w-10 h-10 opacity-20" />
        <p className="text-sm font-medium text-gray-500">QR code non disponible</p>
        <p className="text-xs">Connectez votre Google My Business pour générer le QR code d'avis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Aperçu de la carte imprimable */}
      <div className="flex justify-center">
        <div className="w-72 border-2 border-gray-100 rounded-2xl p-6 text-center bg-white shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">ReviewChef</p>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code" className="w-44 h-44 mx-auto mb-4" />
          ) : (
            <div className="w-44 h-44 mx-auto mb-4 bg-gray-100 rounded-lg animate-pulse" />
          )}
          <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
          <p className="font-bold text-gray-900 text-sm mb-1">Votre avis compte !</p>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Scannez pour laisser un avis Google sur <strong>{restaurant.name}</strong>
          </p>
          <span className="bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
            Laisser un avis ⭐
          </span>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        URL : <a href={reviewUrl!} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">{reviewUrl}</a>
      </p>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={handleDownload} disabled={!qrDataUrl}>
          <Download className="w-4 h-4 mr-2" />
          Télécharger PNG
        </Button>
        <Button onClick={handlePrint} disabled={!qrDataUrl}>
          <Printer className="w-4 h-4 mr-2" />
          Imprimer la carte
        </Button>
      </div>
    </div>
  );
}
