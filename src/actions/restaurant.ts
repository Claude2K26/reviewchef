"use server";

import { createClient } from "@/lib/supabase/server";
import { restaurantSettingsSchema, type RestaurantSettingsInput } from "@/lib/validations";
import type { ActionResult } from "@/types";

export async function updateRestaurant(data: RestaurantSettingsInput): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Non authentifié" };
  }

  const parsed = restaurantSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const { error } = await supabase
    .from("restaurants")
    .update({
      name: parsed.data.name,
      cuisine_type: parsed.data.cuisine_type,
      tone: parsed.data.tone,
      signature: parsed.data.signature,
    })
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
