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
      <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-50 border border-brand-100 text-brand-700 text-sm">
        <Zap className="w-4 h-4 shrink-0" />
        <span>Gratuit pour commencer · Vos avis répondus en moins de 5 minutes</span>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Créer mon compte</CardTitle>
          <CardDescription>Commencez à répondre automatiquement à vos avis</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
