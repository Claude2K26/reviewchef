import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-200"
      style={{ background: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "#111" }}
          >
            <ChefHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">ReviewChef</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-900 transition-all"
          >
            <Link href="/login">Connexion</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{ background: "#111" }}
          >
            <Link href="/pricing">Commencer</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
