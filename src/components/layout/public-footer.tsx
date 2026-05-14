import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} ReviewChef — Tous droits réservés</p>
        <nav className="flex items-center gap-6">
          <Link href="/mentions-legales" className="hover:text-gray-600 transition-colors">
            Mentions légales
          </Link>
          <Link href="/cgv" className="hover:text-gray-600 transition-colors">
            CGV
          </Link>
          <a href="mailto:yann.cfw@gmail.com" className="hover:text-gray-600 transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
