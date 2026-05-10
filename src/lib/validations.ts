import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court (6 caractères minimum)"),
});

export const signupSchema = z
  .object({
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Mot de passe trop court (8 caractères minimum)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const restaurantSettingsSchema = z.object({
  name: z.string().min(1, "Le nom du restaurant est requis").max(100),
  cuisine_type: z.string().min(1, "Le type de cuisine est requis").max(50),
  tone: z.enum(["professional", "friendly", "casual", "formal", "warm"]),
  signature: z.string().max(100, "La signature ne peut pas dépasser 100 caractères"),
});

export const reviewResponseSchema = z.object({
  response_text: z
    .string()
    .min(10, "La réponse doit contenir au moins 10 caractères")
    .max(1000, "La réponse ne peut pas dépasser 1000 caractères"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type RestaurantSettingsInput = z.infer<typeof restaurantSettingsSchema>;
export type ReviewResponseInput = z.infer<typeof reviewResponseSchema>;
