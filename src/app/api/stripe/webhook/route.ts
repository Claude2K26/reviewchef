import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { sendTrialEndingEmail, sendPaymentFailedEmail } from "@/lib/email";
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

  const PRICE_TO_PLAN: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER!]: "starter",
    [process.env.STRIPE_PRICE_PRO!]: "pro",
    [process.env.STRIPE_PRICE_AGENCY!]: "agency",
    [process.env.STRIPE_PRICE_PREMIUM!]: "premium",
  };

  function planFromSubscription(subscription: any): string {
    const priceId = subscription.items?.data?.[0]?.price?.id as string | undefined;
    return (priceId && PRICE_TO_PLAN[priceId]) ?? "pro";
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.supabase_user_id;
    const subscriptionId = session.subscription as string;

    if (userId && subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
      // status peut être "trialing" ou "active" selon si le trial est activé
      const status = ["active", "trialing"].includes(subscription.status) ? subscription.status : "inactive";
      await supabase.from("profiles").upsert({
        id: userId,
        stripe_subscription_id: subscriptionId,
        subscription_status: status,
        plan: session.metadata?.plan ?? "pro",
        subscription_end_date: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
      });
    }
  }

  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = (invoice as any).subscription as string;
    if (subscriptionId) {
      await supabase.from("profiles").update({
        subscription_status: "active",
      }).eq("stripe_subscription_id", subscriptionId);
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as any;
    const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
    const uid = customer.metadata?.supabase_user_id;
    if (uid) {
      const updatedStatus = ["active", "trialing"].includes(subscription.status)
        ? subscription.status
        : "inactive";
      await supabase.from("profiles").update({
        subscription_status: updatedStatus,
        plan: planFromSubscription(subscription),
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

  if (event.type === "customer.subscription.trial_will_end") {
    const subscription = event.data.object as Stripe.Subscription;
    const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;

    if (customer.email && subscription.trial_end) {
      const trialEndDate = new Date(subscription.trial_end * 1000);

      // Récupérer le nom du restaurant pour personnaliser l'email
      const uid = customer.metadata?.supabase_user_id;
      let restaurantName: string | undefined;
      if (uid) {
        const { data: restaurant } = await supabase
          .from("restaurants")
          .select("name")
          .eq("user_id", uid)
          .single();
        restaurantName = restaurant?.name || undefined;
      }

      await sendTrialEndingEmail({
        to: customer.email,
        trialEndDate,
        restaurantName,
      });
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = (invoice as any).subscription as string;
    if (subscriptionId) {
      await supabase.from("profiles").update({
        subscription_status: "past_due",
      }).eq("stripe_subscription_id", subscriptionId);
    }

    const customerId = (invoice as any).customer as string;
    if (customerId) {
      try {
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
        if (customer.email) {
          const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
          });
          await sendPaymentFailedEmail({
            to: customer.email,
            portalUrl: portalSession.url,
          });
        }
      } catch (emailErr) {
        console.error("[StripeWebhook] Failed to send payment failed email:", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
