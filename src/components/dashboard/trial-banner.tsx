import Link from "next/link";
import { Clock, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrialBannerProps {
  trialEndDate: string;
}

export function TrialBanner({ trialEndDate }: TrialBannerProps) {
  const end = new Date(trialEndDate);
  const now = new Date();
  const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) return null;

  const isUrgent = daysLeft <= 2;

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-sm ${
        isUrgent
          ? "bg-red-50 border border-red-200 text-red-700"
          : "bg-brand-50 border border-brand-200 text-brand-700"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isUrgent ? (
          <Zap className="w-4 h-4 shrink-0 text-red-500" />
        ) : (
          <Clock className="w-4 h-4 shrink-0 text-brand-500" />
        )}
        <span className="font-medium">
          {isUrgent
            ? `⚠️ Votre essai gratuit se termine dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""} !`
            : `Essai gratuit — ${daysLeft} jour${daysLeft > 1 ? "s" : ""} restant${daysLeft > 1 ? "s" : ""}`}
        </span>
        {!isUrgent && (
          <span className="text-brand-600/70">· Abonnez-vous pour continuer après l&apos;essai</span>
        )}
      </div>
      <Button asChild size="sm" className={isUrgent ? "bg-red-600 hover:bg-red-700 text-white shrink-0" : "shrink-0"}>
        <Link href="/pricing">
          S&apos;abonner maintenant
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </Button>
    </div>
  );
}
