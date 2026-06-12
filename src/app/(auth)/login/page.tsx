import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <Card className="shadow-2xl border border-white/8 text-white" style={{background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)"}}>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-white">Bienvenue !</CardTitle>
        <CardDescription className="text-white/40">Connectez-vous à votre espace ReviewChef</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
