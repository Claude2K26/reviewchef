import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook invalide" }, { status: 400 });
  }

  const supabase = createServiceClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.supabase_user_id;
    const subscriptionId = session.subscription as string;

    if (userId && subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
      await supabase.from("profiles").upsert({
        id: userId,
        stripe_subscription_id: subscriptionId,
        subscription_status: "active",
        subscription_end_date: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
      });
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as any;
    const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
    const uid = customer.metadata?.supabase_user_id;
    if (uid) {
      await supabase.from("profiles").update({
        subscription_status: subscription.status === "active" ? "active" : "inactive",
        subscription_end_date: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
      }).eq("stripe_subscription_id", subscription.id);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase.from("profiles").update({
      subscription_status: "inactive",
      stripe_subscription_id: null,
    }).eq("stripe_subscription_id", subscription.id);
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = (invoice as any).subscription as string;
    if (subscriptionId) {
      await supabase.from("profiles").update({
        subscription_status: "past_due",
      }).eq("stripe_subscription_id", subscriptionId);
    }
  }

  return NextResponse.json({ received: true });
}
