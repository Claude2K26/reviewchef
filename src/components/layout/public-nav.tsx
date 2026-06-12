import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/5"
      style={{ background: "rgba(6, 6, 15, 0.85)", backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              boxShadow: "0 0 16px rgba(249,115,22,0.4)",
            }}
          >
            <ChefHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">ReviewChef</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white/50 hover:text-white hover:bg-white/8 transition-all"
          >
            <Link href="/login">Connexion</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(105deg, #ea580c, #f97316, #fb923c, #ea580c)",
              backgroundSize: "200% auto",
              boxShadow: "0 0 16px rgba(249,115,22,0.35)",
              animation: "btn-bg-shimmer 3s linear infinite",
            }}
          >
            <Link href="/pricing">Commencer</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
