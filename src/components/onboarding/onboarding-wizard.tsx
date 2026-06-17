"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { restaurantSettingsSchema, type RestaurantSettingsInput } from "@/lib/validations";
import { updateRestaurant } from "@/actions/restaurant";
import type { Restaurant } from "@/types";

const STEPS = [
  { id: 1, label: "Votre établissement" },
  { id: 2, label: "Google My Business" },
  { id: 3, label: "Activation" },
];

const TONES = [
  { value: "professional", label: "Professionnel" },
  { value: "friendly", label: "Amical et chaleureux" },
  { value: "casual", label: "Décontracté" },
  { value: "formal", label: "Formel et élégant" },
  { value: "warm", label: "Chaleureux (familial)" },
];

const CUISINE_TYPES = [
  "Française", "Italienne", "Japonaise", "Chinoise", "Mexicaine",
  "Indienne", "Libanaise", "Thaïlandaise", "Américaine", "Méditerranéenne",
  "Gastronomique", "Brasserie", "Bistrot", "Fast-food", "Pizzeria",
  "Sushi", "Burger", "Végétarienne", "Végane", "Autre",
];

interface OnboardingWizardProps {
  restaurant: Restaurant;
}

export function OnboardingWizard({ restaurant }: OnboardingWizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [activating, setActivating] = useState(false);
  const isGoogleConnected = !!restaurant.google_access_token;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantSettingsInput>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      name: restaurant.name ?? "",
      cuisine_type: restaurant.cuisine_type ?? "Française",
      tone: restaurant.tone ?? "professional",
      signature: restaurant.signature ?? "",
    },
  });

  async function onSubmitStep1(data: RestaurantSettingsInput) {
    const result = await updateRestaurant(data);
    if (result.success) {
      setStep(2);
    } else {
      toast({ title: "Erreur", description: result.error, variant: "destructive" });
    }
  }

  async function handleActivate() {
    setActivating(true);
    try {
      const res = await fetch("/api/automation/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: true }),
      });
      if (!res.ok) throw new Error("Erreur d'activation");
      router.push("/dashboard");
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
      setActivating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-block bg-gray-900 text-white text-lg font-black px-4 py-2 rounded-xl mb-4">
          ReviewChef
        </div>
        <h1 className="text-2xl font-black text-gray-900">Bienvenue ! Configurons votre compte</h1>
        <p className="text-gray-500 text-sm mt-1">3 étapes rapides pour démarrer</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > s.id
                    ? "bg-emerald-500 text-white"
                    : step === s.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === s.id ? "text-gray-900" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 mb-5 transition-all ${step > s.id ? "bg-emerald-400" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-lg p-8">

        {/* Step 1 — Infos établissement */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmitStep1)} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Votre établissement</h2>
              <p className="text-sm text-gray-500 mt-1">Ces infos personnalisent le contenu des réponses IA</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name">Nom du restaurant *</Label>
              <Input
                id="name"
                placeholder="Le Petit Bistrot"
                {...register("name")}
                className={errors.name ? "border-red-400" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Type de cuisine *</Label>
              <Select
                defaultValue={restaurant.cuisine_type ?? "Française"}
                onValueChange={(v) => setValue("cuisine_type", v, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {CUISINE_TYPES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cuisine_type && <p className="text-xs text-red-500">{errors.cuisine_type.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Ton de communication *</Label>
              <Select
                defaultValue={restaurant.tone ?? "professional"}
                onValueChange={(v) => setValue("tone", v as any, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un ton..." />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">Définit le style de toutes vos réponses automatiques</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signature">Signature (optionnel)</Label>
              <Input
                id="signature"
                placeholder="L'équipe du Petit Bistrot"
                {...register("signature")}
              />
              <p className="text-xs text-gray-400">Apparaît à la fin de chaque réponse</p>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>Continuer <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </form>
        )}

        {/* Step 2 — Google My Business */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Connecter Google My Business</h2>
              <p className="text-sm text-gray-500 mt-1">ReviewChef a besoin d'accéder à vos avis pour y répondre</p>
            </div>

            {isGoogleConnected ? (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-800">Google My Business connecté</p>
                  {restaurant.google_location_name && (
                    <p className="text-sm text-emerald-600 mt-0.5">
                      Établissement : <strong>{restaurant.google_location_name}</strong>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  {[
                    "Lecture de vos avis Google",
                    "Publication de réponses automatiques",
                    "Aucune modification sans votre accord",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => { window.location.href = "/api/google/connect?redirect=/onboarding"; }}
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Connecter Google My Business
                </Button>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!isGoogleConnected}
                className="flex-1"
              >
                Continuer <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {!isGoogleConnected && (
              <button
                onClick={() => setStep(3)}
                className="w-full text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
              >
                Passer cette étape (configurer plus tard)
              </button>
            )}
          </div>
        )}

        {/* Step 3 — Activation */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Activer l'automatisation</h2>
              <p className="text-sm text-gray-500 mt-1">ReviewChef répondra automatiquement à tous vos nouveaux avis</p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              {[
                { icon: "🕘", text: "Vérification quotidienne à 9h" },
                { icon: "🤖", text: "Réponse IA personnalisée pour chaque avis" },
                { icon: "📧", text: "Notification email à chaque réponse publiée" },
                { icon: "⚠️", text: "Alerte spéciale pour les avis négatifs" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Retour
              </Button>
              <Button
                onClick={handleActivate}
                disabled={activating || !isGoogleConnected}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {activating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-1" />
                    Activer et démarrer
                  </>
                )}
              </Button>
            </div>

            {!isGoogleConnected && (
              <p className="text-xs text-amber-600 text-center">
                Connectez Google My Business à l'étape précédente pour activer l'automatisation
              </p>
            )}

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
            >
              Passer et configurer plus tard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
