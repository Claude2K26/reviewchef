"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { restaurantSettingsSchema, type RestaurantSettingsInput } from "@/lib/validations";
import { createRestaurant } from "@/actions/restaurant";

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

export function NewRestaurantForm() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantSettingsInput>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      name: "",
      cuisine_type: "Française",
      tone: "professional",
      signature: "",
    },
  });

  async function onSubmit(data: RestaurantSettingsInput) {
    const result = await createRestaurant(data);
    if (result.success && result.data) {
      router.push(`/onboarding?restaurant_id=${result.data.id}`);
    } else {
      toast({ title: "Erreur", description: result.error, variant: "destructive" });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-lg p-8 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Informations de l'établissement</h2>
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
          defaultValue="Française"
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
          defaultValue="professional"
          onValueChange={(v) => setValue("tone", v as RestaurantSettingsInput["tone"], { shouldDirty: true })}
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
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Créer et connecter Google <ArrowRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>
    </form>
  );
}
