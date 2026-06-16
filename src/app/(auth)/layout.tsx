import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hero-grid opacity-40" />

      {/* Header */}
      <header className="relative p-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 group-hover:scale-110"
            style={{ background: "#111" }}
          >
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ReviewChef</span>
        </Link>
      </header>

      {/* Content */}
      <main className="relative flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative p-6 text-center text-xs text-gray-400 space-y-1">
        <p>© {new Date().getFullYear()} ReviewChef · Tous droits réservés</p>
        <nav className="flex items-center justify-center gap-4">
          <a href="/mentions-legales" className="hover:text-gray-700 transition-colors">
            Mentions légales
          </a>
          <a href="/cgv" className="hover:text-gray-700 transition-colors">
            CGV
          </a>
        </nav>
      </footer>
    </div>
  );
}
