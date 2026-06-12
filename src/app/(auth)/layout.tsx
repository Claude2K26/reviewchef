import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06060f] text-white flex flex-col relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15 animate-aurora"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 animate-aurora-2"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative p-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              boxShadow: "0 0 16px rgba(249,115,22,0.4)",
            }}
          >
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ReviewChef</span>
        </Link>
      </header>

      {/* Content */}
      <main className="relative flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative p-6 text-center text-xs text-white/20 space-y-1">
        <p>© {new Date().getFullYear()} ReviewChef · Tous droits réservés</p>
        <nav className="flex items-center justify-center gap-4">
          <a href="/mentions-legales" className="hover:text-white/40 transition-colors">
            Mentions légales
          </a>
          <a href="/cgv" className="hover:text-white/40 transition-colors">
            CGV
          </a>
        </nav>
      </footer>
    </div>
  );
}
