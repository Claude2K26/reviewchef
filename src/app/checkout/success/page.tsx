import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/pricing");

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription"],
    });

    if (session.payment_status !== "paid") redirect("/pricing");

    const userId = session.metadata?.supabase_user_id;
    const subscriptionId = session.subscription as string;

    if (userId && subscriptionId) {
      const supabase = createServiceClient();
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
  } catch {
    redirect("/pricing?error=checkout_failed");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Abonnement activé !
        </h1>
        <p className="text-gray-500 mb-8">
          Bienvenue sur ReviewChef. Votre compte est prêt, vous pouvez configurer votre établissement.
        </p>
        <Button asChild size="lg" className="w-full">
          <Link href="/dashboard">Accéder au tableau de bord</Link>
        </Button>
      </div>
    </div>
  );
}
