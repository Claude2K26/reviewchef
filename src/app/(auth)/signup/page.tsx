import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Créer un compte",
};

export default function SignupPage() {
  return (
    <div className="space-y-4">
      {/* Value prop banner */}
      <div className="flex items-center gap-2 p-3 rounded-lg text-brand-400 text-sm" style={{background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)"}}>
        <Zap className="w-4 h-4 shrink-0" />
        <span>Vos avis répondus automatiquement en moins de 5 minutes</span>
      </div>

      <Card className="shadow-2xl border border-white/8 text-white" style={{background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)"}}>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-white">Créer mon compte</CardTitle>
          <CardDescription className="text-white/40">Commencez à répondre automatiquement à vos avis</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
