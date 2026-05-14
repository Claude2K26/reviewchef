import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReviewChef — Réponses automatiques aux avis Google",
    template: "%s | ReviewChef",
  },
  description:
    "ReviewChef répond automatiquement aux avis Google de votre restaurant grâce à l'IA. Gagnez du temps, améliorez votre réputation, 24h/24.",
  keywords: ["avis Google", "restaurant", "réponse automatique", "IA", "reputation management"],
  openGraph: {
    title: "ReviewChef — Réponses automatiques aux avis Google",
    description: "L'IA qui répond à vos avis Google, 24h/24, automatiquement.",
    type: "website",
    locale: "fr_FR",
  },
  verification: {
    google: "udsX1dZratsrF0uvp5mqnxT_i8I0SycSKvzA9t-1weE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
