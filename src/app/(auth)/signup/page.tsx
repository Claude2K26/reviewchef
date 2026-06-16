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
      <div
        className="flex items-center gap-2 p-3 rounded-lg text-gray-700 text-sm"
        style={{ background: "#f5f5f5", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <Zap className="w-4 h-4 shrink-0 text-gray-800" />
        <span>Vos avis répondus automatiquement en moins de 5 minutes</span>
      </div>

      <Card className="shadow-sm border border-gray-200 bg-white">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">Créer mon compte</CardTitle>
          <CardDescription className="text-gray-500">Commencez à répondre automatiquement à vos avis</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
