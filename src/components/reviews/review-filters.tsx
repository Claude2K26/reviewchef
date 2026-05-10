"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback } from "react";

export function ReviewFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset pagination
      router.push(`/reviews?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Rechercher par nom..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-9"
        />
      </div>

      <Select
        defaultValue={searchParams.get("status") ?? "all"}
        onValueChange={(v) => updateFilter("status", v)}
      >
        <SelectTrigger className="w-[160px]">
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="responded">Répondus</SelectItem>
          <SelectItem value="failed">Échecs</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get("rating") ?? "all"}
        onValueChange={(v) => updateFilter("rating", v)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Note" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les notes</SelectItem>
          <SelectItem value="5">⭐⭐⭐⭐⭐ 5 étoiles</SelectItem>
          <SelectItem value="4">⭐⭐⭐⭐ 4 étoiles</SelectItem>
          <SelectItem value="3">⭐⭐⭐ 3 étoiles</SelectItem>
          <SelectItem value="2">⭐⭐ 2 étoiles</SelectItem>
          <SelectItem value="1">⭐ 1 étoile</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
