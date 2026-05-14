import type { Metadata } from "next";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site ReviewChef — éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNav />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
        <p className="text-sm text-gray-400 mb-10">Dernière mise à jour : mai 2025</p>

        <section className="space-y-10 text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Éditeur du site</h2>
            <p>
              Le site <strong>reviewchef.vercel.app</strong> est édité par :
            </p>
            <address className="not-italic mt-3 bg-gray-50 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Nom :</strong> Kouby</p>
              <p><strong>Statut :</strong> Micro-entrepreneur (en cours d'immatriculation)</p>
              <p><strong>Adresse :</strong> France</p>
              <p><strong>Email :</strong> <a href="mailto:yann.cfw@gmail.com" className="text-brand-600 hover:underline">yann.cfw@gmail.com</a></p>
            </address>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Directeur de la publication</h2>
            <p>Kouby</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Hébergeur</h2>
            <address className="not-italic bg-gray-50 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Vercel Inc.</strong></p>
              <p>340 Pine Street, Suite 701</p>
              <p>San Francisco, CA 94104, États-Unis</p>
              <p><a href="https://vercel.com" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
            </address>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, graphismes, logotypes, icônes, images, code source)
              est la propriété exclusive de ReviewChef ou de ses partenaires. Toute reproduction, représentation,
              modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu,
              par quelque procédé que ce soit, est interdite sans autorisation préalable écrite.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Données personnelles (RGPD)</h2>
            <p>
              ReviewChef collecte et traite des données personnelles dans le cadre de la fourniture de son service.
              Ces données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-sm">
              <li>La création et la gestion de votre compte</li>
              <li>La connexion à votre compte Google My Business via OAuth 2.0</li>
              <li>La génération de réponses aux avis par intelligence artificielle</li>
              <li>La facturation via Stripe</li>
            </ul>
            <p className="mt-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès,
              de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:yann.cfw@gmail.com" className="text-brand-600 hover:underline">yann.cfw@gmail.com</a>.
            </p>
            <p className="mt-3">
              Les données sont conservées pendant la durée de votre abonnement et 12 mois après sa résiliation.
              Elles ne sont jamais revendues à des tiers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies fonctionnels nécessaires au bon fonctionnement de
              l'authentification (session Supabase). Aucun cookie publicitaire ou de tracking tiers n'est déposé.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation de responsabilité</h2>
            <p>
              ReviewChef s'efforce de maintenir des informations exactes et à jour sur ce site mais ne peut garantir
              l'exactitude, la complétude ou l'actualité des informations diffusées. ReviewChef ne saurait être tenu
              responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité
              d'y accéder.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
          </div>

        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
