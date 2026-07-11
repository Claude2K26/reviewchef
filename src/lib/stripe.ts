import Stripe from "stripe";

// Initialisation lazy : évite que le SDK Stripe soit évalué au build Next.js
// (le constructeur Stripe lance une erreur si STRIPE_SECRET_KEY est absent)
let _instance: Stripe | null = null;

function getInstance(): Stripe {
  if (!_instance) {
    _instance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
    });
  }
  return _instance;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_, prop: string | symbol) {
    return (getInstance() as any)[prop as string];
  },
});
