"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Star, Settings, LogOut, ChefHat, Zap,
  Building2, ChevronDown, Plus, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { setActiveRestaurant } from "@/actions/restaurant";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/reviews", label: "Avis", icon: Star },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

interface RestaurantSummary {
  id: string;
  name: string;
}

interface SidebarProps {
  restaurants: RestaurantSummary[];
  activeRestaurantId: string;
  canAddMore: boolean;
}

export function Sidebar({ restaurants, activeRestaurantId, canAddMore }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeRestaurant = restaurants.find((r) => r.id === activeRestaurantId) ?? restaurants[0];

  async function handleSwitch(restaurantId: string) {
    setDropdownOpen(false);
    await setActiveRestaurant(restaurantId);
    router.refresh();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm">
          <ChefHat className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">ReviewChef</span>
      </div>

      {/* Restaurant Switcher */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-100">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-sm"
          >
            <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="flex-1 text-left font-medium text-gray-900 truncate">
              {activeRestaurant?.name || "Mon restaurant"}
            </span>
            {restaurants.length > 1 && (
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-gray-400 transition-transform shrink-0",
                  dropdownOpen && "rotate-180"
                )}
              />
            )}
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {restaurants.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSwitch(r.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-50 text-left transition-colors",
                      r.id === activeRestaurantId ? "text-brand-700 bg-brand-50" : "text-gray-700"
                    )}
                  >
                    <Check
                      className={cn(
                        "w-3.5 h-3.5 shrink-0",
                        r.id === activeRestaurantId ? "text-brand-600" : "invisible"
                      )}
                    />
                    <span className="truncate">{r.name || "Restaurant sans nom"}</span>
                  </button>
                ))}
                {canAddMore && (
                  <Link
                    href="/restaurants/new"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-brand-600 hover:bg-brand-50 border-t border-gray-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Ajouter un établissement
                  </Link>
                )}
              </div>
            </>
          )}
        </div>

        {canAddMore && restaurants.length === 1 && (
          <Link
            href="/restaurants/new"
            className="mt-2 flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 px-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Ajouter un établissement
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-brand-50 text-brand-700 border border-brand-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-brand-600" : "text-gray-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Auto-pilot badge */}
      <div className="mx-3 mb-3 p-3 rounded-lg bg-gradient-to-br from-brand-50 to-orange-50 border border-brand-100">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-3.5 h-3.5 text-brand-600" />
          <span className="text-xs font-semibold text-brand-700">Auto-pilote actif</span>
        </div>
        <p className="text-xs text-brand-600/70">Vos avis sont traités automatiquement 24h/24</p>
      </div>

      {/* Sign out */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
