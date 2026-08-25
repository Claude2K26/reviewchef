"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { restaurantSettingsSchema, type RestaurantSettingsInput } from "@/lib/validations";
import type { ActionResult } from "@/types";

export async function updateRestaurant(
  data: RestaurantSettingsInput,
  restaurantId?: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Non authentifié" };
  }

  const parsed = restaurantSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const updateData = {
    name: parsed.data.name,
    business_type: parsed.data.business_type,
    tone: parsed.data.tone,
    signature: parsed.data.signature,
  };

  const { error } = restaurantId
    ? await supabase.from("restaurants").update(updateData).eq("id", restaurantId).eq("user_id", user.id)
    : await supabase.from("restaurants").update(updateData).eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function createRestaurant(
  data: RestaurantSettingsInput
): Promise<ActionResult<{ id: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Non authentifié" };

  const parsed = restaurantSettingsSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const MAX_RESTAURANTS = 1;

  const { count } = await supabase
    .from("restaurants")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) >= MAX_RESTAURANTS) {
    return {
      success: false,
      error: "Votre abonnement couvre 1 établissement. Contactez le support pour en ajouter d'autres.",
    };
  }

  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .insert({
      user_id: user.id,
      name: parsed.data.name,
      business_type: parsed.data.business_type,
      tone: parsed.data.tone,
      signature: parsed.data.signature,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  return { success: true, data: { id: restaurant.id } };
}

export async function setActiveRestaurant(restaurantId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("active_restaurant_id", restaurantId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
  });
}
