import Link from "next/link";
import { ChefHat } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="py-10 px-6 border-t border-white/5 bg-[#06060f]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            <ChefHat className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white/40">ReviewChef</span>
        </div>
        <p className="text-white/25">© {new Date().getFullYear()} ReviewChef — Tous droits réservés</p>
        <nav className="flex items-center gap-6">
          <Link href="/mentions-legales" className="text-white/30 hover:text-white/60 transition-colors">
            Mentions légales
          </Link>
          <Link href="/cgv" className="text-white/30 hover:text-white/60 transition-colors">
            CGV
          </Link>
          <Link href="/contact" className="text-white/30 hover:text-white/60 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
