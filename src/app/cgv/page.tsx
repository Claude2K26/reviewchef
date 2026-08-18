import type { Metadata } from "next";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente de ReviewChef — abonnement, paiement, résiliation, droit de rétractation.",
  robots: { index: false },
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNav />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-gray-400 mb-10">Dernière mise à jour : mai 2025</p>

        <section className="space-y-10 text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
              ReviewChef (ci-après "le Prestataire") et toute personne physique ou morale souscrivant un abonnement
              au service ReviewChef (ci-après "l'Abonné").
            </p>
            <p className="mt-3">
              ReviewChef est un service SaaS (Software as a Service) permettant la surveillance automatique
              des avis Google My Business et la génération de réponses personnalisées par intelligence artificielle.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Prix et facturation</h2>
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-sm mb-4">
              <p className="font-semibold text-brand-800">Abonnement ReviewChef — 39 € TTC / mois</p>
              <p className="text-brand-700 mt-1">Accès complet à toutes les fonctionnalités. Sans engagement.</p>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>Les prix sont indiqués en euros, toutes taxes comprises (TTC)</li>
              <li>La facturation est mensuelle, à compter de la date de souscription</li>
              <li>Le paiement est effectué via Stripe (carte bancaire), plateforme sécurisée PCI DSS</li>
              <li>Une facture est générée automatiquement à chaque renouvellement</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Durée et renouvellement</h2>
            <p>
              L'abonnement est conclu pour une durée mensuelle et se renouvelle automatiquement chaque mois
              jusqu'à résiliation. L'Abonné est informé du renouvellement par email.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Résiliation</h2>
            <p>
              L'Abonné peut résilier son abonnement à tout moment depuis son espace client (portail Stripe)
              ou en contactant <a href="mailto:yann.cfw@gmail.com" className="text-brand-600 hover:underline">yann.cfw@gmail.com</a>.
            </p>
            <p className="mt-3">
              La résiliation prend effet à la fin de la période d'abonnement en cours. Aucun remboursement partiel
              n'est effectué pour la période restante. L'accès au service est maintenu jusqu'à la fin de la période payée.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation de 14 jours
              ne s'applique pas aux services numériques dont l'exécution a commencé, avec l'accord exprès du
              consommateur, avant l'expiration du délai de rétractation.
            </p>
            <p className="mt-3">
              En souscrivant à ReviewChef et en accédant immédiatement au service, l'Abonné reconnaît expressément
              renoncer à son droit de rétractation.
            </p>
            <p className="mt-3">
              À titre commercial, ReviewChef peut examiner toute demande de remboursement dans les 48 heures
              suivant la souscription. Contactez <a href="mailto:yann.cfw@gmail.com" className="text-brand-600 hover:underline">yann.cfw@gmail.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Accès au service et disponibilité</h2>
            <p>
              ReviewChef s'engage à mettre tout en œuvre pour assurer la disponibilité du service 24h/24,
              7j/7. Des interruptions peuvent survenir pour maintenance ou pour des raisons indépendantes
              de notre volonté (pannes d'infrastructure, API tierce, etc.).
            </p>
            <p className="mt-3">
              Le service dépend d'APIs tierces (Google My Business API, Anthropic API). ReviewChef ne peut
              être tenu responsable des interruptions dues à ces services externes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Obligations de l'Abonné</h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>Fournir des informations exactes lors de l'inscription</li>
              <li>Ne pas utiliser le service à des fins illégales ou frauduleuses</li>
              <li>Être titulaire ou avoir les droits sur le compte Google My Business connecté</li>
              <li>S'assurer que les réponses générées par l'IA sont conformes à ses obligations légales</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Responsabilité du Prestataire</h2>
            <p>
              ReviewChef est un outil d'assistance. Les réponses générées par l'IA sont des suggestions
              automatiques. Le Prestataire ne saurait être tenu responsable du contenu des réponses
              publiées sur Google My Business via le service.
            </p>
            <p className="mt-3">
              La responsabilité du Prestataire est limitée au montant des sommes effectivement versées
              par l'Abonné au cours des trois derniers mois.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est détaillé dans nos{" "}
              <a href="/mentions-legales" className="text-brand-600 hover:underline">Mentions légales</a>.
              Les données de paiement sont traitées exclusivement par Stripe et ne sont jamais stockées
              sur nos serveurs.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Modification des CGV</h2>
            <p>
              ReviewChef se réserve le droit de modifier les présentes CGV à tout moment. Les modifications
              seront notifiées par email au moins 30 jours avant leur entrée en vigueur. La poursuite de
              l'utilisation du service après cette période vaut acceptation des nouvelles CGV.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">11. Droit applicable et litiges</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront
              de trouver une solution amiable. À défaut, les tribunaux français seront seuls compétents.
            </p>
            <p className="mt-3">
              Pour tout litige de consommation, l'Abonné peut recourir à la médiation en ligne via la
              plateforme européenne de règlement des litiges :{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
            </p>
          </div>

        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
