import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  pro: process.env.STRIPE_PRICE_PRO!,
  agency: process.env.STRIPE_PRICE_AGENCY!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const VALID_PLANS = ["starter", "pro", "agency", "premium"] as const;
  const plan = VALID_PLANS.includes(body.plan) ? body.plan : "pro";
  const priceId = PRICE_IDS[plan];

  if (!priceId) {
    console.error(`[StripeCheckout] Prix manquant pour le plan "${plan}" (variable d'env non configurée)`);
    return NextResponse.json(
      { error: "Ce plan n'est pas disponible pour le moment. Contactez le support." },
      { status: 500 }
    );
  }

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .upsert({ id: user.id, stripe_customer_id: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: { supabase_user_id: user.id, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[StripeCheckout] Erreur lors de la création de la session:", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Impossible de démarrer le paiement : ${message}` },
      { status: 500 }
    );
  }
}
