import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ReviewChef</span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-gray-400 space-y-1">
        <p>© {new Date().getFullYear()} ReviewChef · Tous droits réservés</p>
        <nav className="flex items-center justify-center gap-4">
          <a href="/mentions-legales" className="hover:text-gray-600 transition-colors">Mentions légales</a>
          <a href="/cgv" className="hover:text-gray-600 transition-colors">CGV</a>
        </nav>
      </footer>
    </div>
  );
}
