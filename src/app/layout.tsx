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
    "ReviewChef répond automatiquement aux avis Google de votre restaurant grâce à l'IA Claude. Surveillance 24h/24, réponses personnalisées, pilote automatique. 49€/mois.",
  keywords: [
    "réponse avis Google restaurant",
    "automatiser réponses avis Google",
    "gestion avis Google My Business",
    "logiciel réputation restaurant",
    "IA réponse avis client",
    "ReviewChef",
  ],
  authors: [{ name: "ReviewChef" }],
  creator: "ReviewChef",
  metadataBase: new URL("https://reviewchef.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "ReviewChef — Réponses automatiques aux avis Google",
    description: "L'IA qui répond à vos avis Google My Business, 24h/24, automatiquement. Personnalisé à votre image.",
    type: "website",
    locale: "fr_FR",
    url: "https://reviewchef.vercel.app",
    siteName: "ReviewChef",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewChef — Réponses automatiques aux avis Google",
    description: "L'IA qui répond à vos avis Google My Business, 24h/24, automatiquement.",
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
