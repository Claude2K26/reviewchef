import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM = "ReviewChef <onboarding@resend.dev>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://reviewchef.vercel.app";

export async function sendTrialEndingEmail({
  to,
  trialEndDate,
  restaurantName,
}: {
  to: string;
  trialEndDate: Date;
  restaurantName?: string;
}) {
  const daysLeft = Math.ceil(
    (trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const greeting = restaurantName
    ? `Votre essai pour <strong>${restaurantName}</strong>`
    : "Votre essai ReviewChef";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Votre essai ReviewChef se termine bientôt</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:10px 14px;">
                    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">ReviewChef</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Orange top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Badge -->
                    <div style="display:inline-block;background:#fff7ed;border:1px solid #fed7aa;border-radius:999px;padding:4px 14px;margin-bottom:24px;">
                      <span style="color:#ea580c;font-size:13px;font-weight:600;">⏰ ${daysLeft} jour${daysLeft > 1 ? "s" : ""} restant${daysLeft > 1 ? "s" : ""}</span>
                    </div>

                    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#111827;line-height:1.2;">
                      ${greeting} se termine dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}
                    </h1>

                    <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
                      Merci d'avoir essayé ReviewChef. Pendant votre essai, l'IA a répondu automatiquement à vos avis Google My Business — sans que vous ayez à lever le petit doigt.
                    </p>

                    <p style="margin:0 0 32px;color:#6b7280;font-size:15px;line-height:1.6;">
                      Pour continuer à bénéficier du service après le <strong style="color:#111827;">${trialEndDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</strong>, abonnez-vous maintenant.
                    </p>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td style="background:linear-gradient(105deg,#ea580c,#f97316);border-radius:10px;box-shadow:0 4px 16px rgba(249,115,22,0.4);">
                          <a href="${APP_URL}/pricing" style="display:block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;white-space:nowrap;">
                            S'abonner pour 49€/mois →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Features recap -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;padding:20px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Ce que vous gardez avec le plan Pro</p>
                          ${[
                            "✅ Réponses automatiques 24h/24",
                            "✅ Personnalisation du ton et de la signature",
                            "✅ Tableau de bord complet",
                            "✅ Support par email inclus",
                          ].map(f => `<p style="margin:0 0 6px;color:#4b5563;font-size:14px;">${f}</p>`).join("")}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
                <tr>
                  <td style="border-top:1px solid #f3f4f6;padding-top:24px;">
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
                      Sans engagement · Annulable à tout moment depuis votre espace client.
                      <br />Des questions ? Répondez à cet email, on vous répond rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} ReviewChef ·
                <a href="${APP_URL}/mentions-legales" style="color:#9ca3af;">Mentions légales</a> ·
                <a href="${APP_URL}/pricing" style="color:#f97316;">Se désabonner de ces emails</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `⏰ Votre essai ReviewChef se termine dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""} — continuez sans interruption`,
    html,
  });
}

export async function sendNewReviewEmail({
  to,
  restaurantName,
  authorName,
  rating,
  reviewText,
  responseText,
}: {
  to: string;
  restaurantName: string;
  authorName: string;
  rating: number;
  reviewText: string;
  responseText: string;
}) {
  const stars = "⭐".repeat(rating);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouvel avis répondu automatiquement</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:10px 14px;">
                    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">ReviewChef</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Orange top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Badge -->
                    <div style="display:inline-block;background:#fff7ed;border:1px solid #fed7aa;border-radius:999px;padding:4px 14px;margin-bottom:24px;">
                      <span style="color:#ea580c;font-size:13px;font-weight:600;">✨ Nouvel avis répondu automatiquement</span>
                    </div>

                    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;line-height:1.3;">
                      L'IA vient de répondre à un avis pour <span style="color:#f97316;">${restaurantName}</span>
                    </h1>
                    <p style="margin:0 0 28px;color:#6b7280;font-size:14px;">Vous n'avez rien eu à faire.</p>

                    <!-- Review -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;margin-bottom:16px;">
                      <tr>
                        <td style="padding:20px;">
                          <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#111827;">${stars} ${authorName}</p>
                          <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;font-style:italic;">"${reviewText}"</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Response -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td style="border-left:4px solid #f97316;padding-left:16px;">
                          <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#ea580c;text-transform:uppercase;letter-spacing:0.05em;">Réponse publiée par l'IA</p>
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${responseText}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td style="background:linear-gradient(105deg,#ea580c,#f97316);border-radius:10px;box-shadow:0 4px 16px rgba(249,115,22,0.4);">
                          <a href="${APP_URL}/dashboard" style="display:block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;white-space:nowrap;">
                            Voir tous mes avis →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
                <tr>
                  <td style="border-top:1px solid #f3f4f6;padding-top:24px;">
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
                      Vous recevez cet email à chaque nouvel avis répondu automatiquement.
                      <br />Des questions ? Répondez à cet email, on vous répond rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} ReviewChef ·
                <a href="${APP_URL}/mentions-legales" style="color:#9ca3af;">Mentions légales</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `✨ ${stars} Nouvel avis de ${authorName} — répondu automatiquement par ReviewChef`,
    html,
  });
}

export async function sendWeeklyRecapEmail({
  to,
  restaurantName,
  reviewsThisWeek,
  responsesPublished,
  averageRating,
  recentResponses = [],
}: {
  to: string;
  restaurantName: string;
  reviewsThisWeek: number;
  responsesPublished: number;
  averageRating: number | null;
  recentResponses?: { authorName: string; rating: number; reviewText: string; responseText: string }[];
}) {
  const ratingDisplay = averageRating !== null ? averageRating.toFixed(1) : "—";
  const stars = averageRating !== null ? "⭐".repeat(Math.round(averageRating)) : "";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Votre récap ReviewChef de la semaine</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:10px 14px;">
                    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">ReviewChef</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Orange top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Badge -->
                    <div style="display:inline-block;background:#fff7ed;border:1px solid #fed7aa;border-radius:999px;padding:4px 14px;margin-bottom:24px;">
                      <span style="color:#ea580c;font-size:13px;font-weight:600;">📊 Récap des 2 dernières semaines</span>
                    </div>

                    <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#111827;line-height:1.2;">
                      Voici ce qui s'est passé pour <span style="color:#f97316;">${restaurantName}</span>
                    </h1>
                    <p style="margin:0 0 32px;color:#6b7280;font-size:15px;line-height:1.6;">
                      L'IA a travaillé pour vous ces 2 dernières semaines. Voici le bilan.
                    </p>

                    <!-- Stats -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td width="33%" style="text-align:center;padding:20px 8px;background:#fff7ed;border-radius:12px;">
                          <p style="margin:0;font-size:36px;font-weight:800;color:#ea580c;">${reviewsThisWeek}</p>
                          <p style="margin:4px 0 0;font-size:12px;color:#9a3412;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Avis reçus</p>
                        </td>
                        <td width="4%"></td>
                        <td width="33%" style="text-align:center;padding:20px 8px;background:#f0fdf4;border-radius:12px;">
                          <p style="margin:0;font-size:36px;font-weight:800;color:#16a34a;">${responsesPublished}</p>
                          <p style="margin:4px 0 0;font-size:12px;color:#15803d;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Réponses publiées</p>
                        </td>
                        <td width="4%"></td>
                        <td width="26%" style="text-align:center;padding:20px 8px;background:#fafafa;border-radius:12px;border:1px solid #f3f4f6;">
                          <p style="margin:0;font-size:30px;font-weight:800;color:#111827;">${ratingDisplay}</p>
                          <p style="margin:4px 0 0;font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${stars || "Note moy."}</p>
                        </td>
                      </tr>
                    </table>

                    ${responsesPublished === reviewsThisWeek && reviewsThisWeek > 0
                      ? `<p style="margin:0 0 32px;color:#16a34a;font-size:15px;font-weight:600;text-align:center;">✅ 100% des avis ont reçu une réponse automatique !</p>`
                      : `<p style="margin:0 0 32px;color:#6b7280;font-size:15px;line-height:1.6;text-align:center;">ReviewChef a géré vos avis automatiquement, sans que vous ayez à intervenir.</p>`
                    }

                    <!-- Réponses récentes -->
                    ${recentResponses.length > 0 ? `
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Dernières réponses publiées</p>
                          ${recentResponses.map(r => `
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;background:#f9fafb;border-radius:10px;overflow:hidden;">
                            <tr>
                              <td style="padding:16px;">
                                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#111827;">${"⭐".repeat(r.rating)} ${r.authorName}</p>
                                <p style="margin:0 0 10px;font-size:13px;color:#6b7280;line-height:1.5;font-style:italic;">"${r.reviewText.length > 120 ? r.reviewText.slice(0, 120) + "…" : r.reviewText}"</p>
                                <div style="border-left:3px solid #f97316;padding-left:10px;">
                                  <p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">${r.responseText.length > 150 ? r.responseText.slice(0, 150) + "…" : r.responseText}</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          `).join("")}
                        </td>
                      </tr>
                    </table>
                    ` : ""}

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                      <tr>
                        <td style="background:linear-gradient(105deg,#ea580c,#f97316);border-radius:10px;box-shadow:0 4px 16px rgba(249,115,22,0.4);">
                          <a href="${APP_URL}/dashboard" style="display:block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;white-space:nowrap;">
                            Voir mon tableau de bord →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
                <tr>
                  <td style="border-top:1px solid #f3f4f6;padding-top:24px;">
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
                      Ce récap est envoyé automatiquement tous les 15 jours, le lundi matin.
                      <br />Des questions ? Répondez à cet email, on vous répond rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} ReviewChef ·
                <a href="${APP_URL}/mentions-legales" style="color:#9ca3af;">Mentions légales</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `📊 Récap ReviewChef : ${reviewsThisWeek} avis ces 2 dernières semaines pour ${restaurantName}`,
    html,
  });
}

export async function sendWelcomeEmail({ to }: { to: string }) {
  const steps = [
    { n: "01", title: "Connecter votre fiche Google My Business", desc: "Autorisez l'accès via OAuth 2.0 sécurisé en quelques clics." },
    { n: "02", title: "Configurer votre ton et votre signature", desc: "Choisissez comment l'IA parle à votre place : professionnel, chaleureux, décontracté." },
    { n: "03", title: "Activer l'autopilote", desc: "ReviewChef surveille vos avis 24h/24 et publie les réponses automatiquement." },
  ];

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue sur ReviewChef</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:10px 14px;">
                    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">ReviewChef</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Orange top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Badge -->
                    <div style="display:inline-block;background:#fff7ed;border:1px solid #fed7aa;border-radius:999px;padding:4px 14px;margin-bottom:24px;">
                      <span style="color:#ea580c;font-size:13px;font-weight:600;">🎉 Bienvenue !</span>
                    </div>

                    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#111827;line-height:1.2;">
                      Votre compte ReviewChef est prêt
                    </h1>

                    <p style="margin:0 0 32px;color:#6b7280;font-size:15px;line-height:1.6;">
                      Plus qu'à connecter votre fiche Google My Business et l'IA répondra automatiquement à tous vos avis — même la nuit et le week-end.
                    </p>

                    <!-- Steps -->
                    <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">3 étapes pour démarrer</p>
                    ${steps.map(s => `
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                      <tr>
                        <td width="36" valign="top">
                          <div style="width:32px;height:32px;border-radius:8px;background:#fff7ed;border:1px solid #fed7aa;display:flex;align-items:center;justify-content:center;text-align:center;line-height:32px;">
                            <span style="color:#ea580c;font-size:12px;font-weight:800;">${s.n}</span>
                          </div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#111827;">${s.title}</p>
                          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">${s.desc}</p>
                        </td>
                      </tr>
                    </table>
                    `).join("")}

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:32px auto 0;">
                      <tr>
                        <td style="background:linear-gradient(105deg,#ea580c,#f97316);border-radius:10px;box-shadow:0 4px 16px rgba(249,115,22,0.4);">
                          <a href="${APP_URL}/dashboard" style="display:block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;white-space:nowrap;">
                            Accéder à mon tableau de bord →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
                <tr>
                  <td style="border-top:1px solid #f3f4f6;padding-top:24px;">
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
                      Des questions ? Répondez à cet email, on vous répond rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} ReviewChef ·
                <a href="${APP_URL}/mentions-legales" style="color:#9ca3af;">Mentions légales</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "Bienvenue sur ReviewChef 🎉",
    html,
  });
}

export async function sendNegativeReviewAlertEmail({
  to,
  restaurantName,
  authorName,
  rating,
  reviewText,
  responseText,
}: {
  to: string;
  restaurantName: string;
  authorName: string;
  rating: number;
  reviewText: string;
  responseText: string;
}) {
  const stars = "⭐".repeat(rating);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Avis négatif reçu</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:10px 14px;">
                    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">ReviewChef</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Red top bar for negative alert -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#dc2626,#ef4444,#f87171);height:4px;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Badge -->
                    <div style="display:inline-block;background:#fef2f2;border:1px solid #fecaca;border-radius:999px;padding:4px 14px;margin-bottom:24px;">
                      <span style="color:#dc2626;font-size:13px;font-weight:600;">⚠️ Avis négatif — action recommandée</span>
                    </div>

                    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;line-height:1.3;">
                      Avis ${stars} de <span style="color:#dc2626;">${authorName}</span> pour ${restaurantName}
                    </h1>
                    <p style="margin:0 0 28px;color:#6b7280;font-size:14px;line-height:1.6;">
                      L'IA a déjà publié une réponse automatique, mais ce commentaire mérite votre attention.
                    </p>

                    <!-- Review -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;border-radius:12px;margin-bottom:16px;">
                      <tr>
                        <td style="padding:20px;">
                          <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#111827;">${stars} ${authorName}</p>
                          <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;font-style:italic;">"${reviewText}"</p>
                        </td>
                      </tr>
                    </table>

                    <!-- AI Response -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td style="border-left:4px solid #f97316;padding-left:16px;">
                          <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#ea580c;text-transform:uppercase;letter-spacing:0.05em;">Réponse publiée par l'IA</p>
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${responseText}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td style="background:linear-gradient(105deg,#ea580c,#f97316);border-radius:10px;box-shadow:0 4px 16px rgba(249,115,22,0.4);">
                          <a href="${APP_URL}/dashboard" style="display:block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;white-space:nowrap;">
                            Voir l'avis dans le tableau de bord →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
                <tr>
                  <td style="border-top:1px solid #f3f4f6;padding-top:24px;">
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
                      Vous recevez cet email uniquement pour les avis de 1 ou 2 étoiles.
                      <br />Des questions ? Répondez à cet email, on vous répond rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} ReviewChef ·
                <a href="${APP_URL}/mentions-legales" style="color:#9ca3af;">Mentions légales</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `⚠️ Avis négatif reçu (${rating}⭐) — action recommandée`,
    html,
  });
}

export async function sendPaymentFailedEmail({
  to,
  portalUrl,
}: {
  to: string;
  portalUrl: string;
}) {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Problème de paiement ReviewChef</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:10px 14px;">
                    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">ReviewChef</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Orange top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Badge -->
                    <div style="display:inline-block;background:#fef2f2;border:1px solid #fecaca;border-radius:999px;padding:4px 14px;margin-bottom:24px;">
                      <span style="color:#dc2626;font-size:13px;font-weight:600;">⚠️ Problème de paiement</span>
                    </div>

                    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#111827;line-height:1.2;">
                      Votre paiement ReviewChef a échoué
                    </h1>

                    <p style="margin:0 0 16px;color:#6b7280;font-size:15px;line-height:1.6;">
                      Nous n'avons pas pu encaisser votre abonnement mensuel. Cela peut arriver si votre carte a expiré, si les fonds sont insuffisants ou si votre banque a bloqué le paiement.
                    </p>

                    <p style="margin:0 0 32px;color:#6b7280;font-size:15px;line-height:1.6;">
                      <strong style="color:#111827;">Votre service est momentanément suspendu.</strong> Mettez à jour votre moyen de paiement pour reprendre la réponse automatique à vos avis.
                    </p>

                    <!-- Steps -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:32px;">
                      <tr>
                        <td>
                          <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Comment résoudre le problème</p>
                          ${[
                            "Cliquez sur le bouton ci-dessous pour accéder à votre portail de facturation",
                            "Mettez à jour ou remplacez votre carte bancaire",
                            "Votre abonnement reprend automatiquement",
                          ].map((s, i) => `<p style="margin:0 0 6px;color:#4b5563;font-size:14px;"><strong style="color:#111827;">${i + 1}.</strong> ${s}</p>`).join("")}
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td style="background:linear-gradient(105deg,#ea580c,#f97316);border-radius:10px;box-shadow:0 4px 16px rgba(249,115,22,0.4);">
                          <a href="${portalUrl}" style="display:block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;white-space:nowrap;">
                            Mettre à jour ma carte bancaire →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px 32px;">
                <tr>
                  <td style="border-top:1px solid #f3f4f6;padding-top:24px;">
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
                      Des questions sur votre facturation ? Répondez à cet email, on vous répond rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} ReviewChef ·
                <a href="${APP_URL}/mentions-legales" style="color:#9ca3af;">Mentions légales</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to,
    subject: "⚠️ Problème de paiement ReviewChef — action requise",
    html,
  });
}
