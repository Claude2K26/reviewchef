"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { restaurantSettingsSchema, type RestaurantSettingsInput } from "@/lib/validations";
import { useToast } from "@/components/ui/use-toast";
import { updateRestaurant } from "@/actions/restaurant";
import type { Restaurant } from "@/types";

interface RestaurantFormProps {
  restaurant: Restaurant;
}

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

export function RestaurantForm({ restaurant }: RestaurantFormProps) {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<RestaurantSettingsInput>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      name: restaurant.name,
      cuisine_type: restaurant.cuisine_type,
      tone: restaurant.tone,
      signature: restaurant.signature,
    },
  });

  async function onSubmit(data: RestaurantSettingsInput) {
    const result = await updateRestaurant(data);
    if (result.success) {
      toast({ title: "Paramètres sauvegardés !", variant: "success" as any });
    } else {
      toast({ title: "Erreur", description: result.error, variant: "destructive" });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <Label htmlFor="cuisine_type">Type de cuisine *</Label>
          <Select
            defaultValue={restaurant.cuisine_type}
            onValueChange={(v) => setValue("cuisine_type", v, { shouldDirty: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              {CUISINE_TYPES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cuisine_type && <p className="text-xs text-red-500">{errors.cuisine_type.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Ton de communication *</Label>
        <Select
          defaultValue={restaurant.tone}
          onValueChange={(v) => setValue("tone", v as any, { shouldDirty: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choisir un ton..." />
          </SelectTrigger>
          <SelectContent>
            {TONES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Définit le style de toutes vos réponses automatiques
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signature">Signature personnalisée</Label>
        <Input
          id="signature"
          placeholder="L'équipe du Petit Bistrot"
          {...register("signature")}
          className={errors.signature ? "border-red-400" : ""}
        />
        {errors.signature && <p className="text-xs text-red-500">{errors.signature.message}</p>}
        <p className="text-xs text-gray-500">
          Aparaîtra à la fin de chaque réponse. Laissez vide pour utiliser le nom du restaurant.
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting || !isDirty}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sauvegarde...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Sauvegarder
          </>
        )}
      </Button>
    </form>
  );
}
