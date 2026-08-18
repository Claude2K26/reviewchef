const PRICE_ID_PATTERN = /^price_[A-Za-z0-9]+$/;

const INVISIBLE_CHARS: Record<string, string> = {
  "​": "espace de largeur nulle (U+200B)",
  "‌": "zero-width non-joiner (U+200C)",
  "‍": "zero-width joiner (U+200D)",
  "﻿": "BOM / espace insécable de largeur nulle (U+FEFF)",
  "⁠": "word joiner (U+2060)",
  "­": "trait d'union conditionnel (U+00AD)",
};

export interface StripeEnvIssue {
  variable: string;
  reason: string;
}

export function validateStripePriceEnv(
  env: NodeJS.ProcessEnv = process.env
): StripeEnvIssue[] {
  const issues: StripeEnvIssue[] = [];

  const priceVars = Object.keys(env).filter(
    (key) => key === "STRIPE_PRICE" || key.startsWith("STRIPE_PRICE_")
  );

  for (const name of priceVars) {
    const raw = env[name];

    if (!raw) {
      issues.push({ variable: name, reason: "variable manquante ou vide" });
      continue;
    }

    for (const [char, label] of Object.entries(INVISIBLE_CHARS)) {
      const pos = raw.indexOf(char);
      if (pos !== -1) {
        issues.push({
          variable: name,
          reason: `contient un caractère invisible : ${label} à la position ${pos}`,
        });
      }
    }

    if (!raw.startsWith("price_")) {
      issues.push({
        variable: name,
        reason: `ne commence pas par "price_" (valeur actuelle : "${raw}")`,
      });
    } else if (!PRICE_ID_PATTERN.test(raw)) {
      issues.push({
        variable: name,
        reason: `format invalide (valeur actuelle : "${raw}")`,
      });
    }
  }

  return issues;
}

export function assertStripePriceEnv(env: NodeJS.ProcessEnv = process.env): void {
  const issues = validateStripePriceEnv(env);
  if (issues.length === 0) return;

  const details = issues.map((issue) => `  - ${issue.variable}: ${issue.reason}`).join("\n");

  console.error(
    `[StripeEnv] ${issues.length} variable(s) STRIPE_PRICE_* invalide(s) détectée(s) au démarrage :\n${details}`
  );
}
