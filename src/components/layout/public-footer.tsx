import Link from "next/link";
import { ChefHat } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "#1b5e45" }}
          >
            <ChefHat className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-gray-400">ReviewChef</span>
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} ReviewChef — Tous droits réservés</p>
        <nav className="flex items-center gap-6">
          <Link href="/pricing" className="text-gray-300 hover:text-gray-500 transition-colors text-xs">
            Abonnements
          </Link>
          <Link href="/mentions-legales" className="text-gray-400 hover:text-gray-700 transition-colors">
            Mentions légales
          </Link>
          <Link href="/cgv" className="text-gray-400 hover:text-gray-700 transition-colors">
            CGV
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-gray-700 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
