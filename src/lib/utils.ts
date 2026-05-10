import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), "d MMM yyyy", { locale: fr });
  } catch {
    return dateString;
  }
}

export function formatDateRelative(dateString: string): string {
  try {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
    });
  } catch {
    return dateString;
  }
}

export function formatRating(rating: number | null): string {
  if (rating === null || rating === undefined) return "—";
  return Number(rating).toFixed(1);
}

export function calculateResponseRate(total: number, responded: number): number {
  if (total === 0) return 0;
  return Math.round((responded / total) * 100);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-emerald-600";
  if (rating >= 4) return "text-green-600";
  if (rating >= 3) return "text-yellow-600";
  if (rating >= 2) return "text-orange-600";
  return "text-red-600";
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    responded: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    failed: "bg-red-100 text-red-700 border-red-200",
    skipped: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return colors[status] ?? colors.pending;
}
