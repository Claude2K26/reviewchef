# ReviewChef — Guide d'installation

## Prérequis

- Node.js 18+
- Compte Supabase (gratuit)
- Compte Anthropic (API Claude)
- Projet Google Cloud avec Google My Business API activée

---

## 1. Installation

```bash
cd reviewchef
npm install
```

---

## 2. Configuration des variables d'environnement

Copiez `.env.example` vers `.env.local` et remplissez :

```bash
cp .env.example .env.local
```

### Supabase
1. Créez un projet sur [supabase.com](https://supabase.com)
2. Récupérez l'URL et les clés dans Settings > API
3. Remplissez `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### Anthropic
1. Créez une clé API sur [console.anthropic.com](https://console.anthropic.com)
2. Remplissez `ANTHROPIC_API_KEY`

### Google OAuth (My Business API)
1. Créez un projet sur [console.cloud.google.com](https://console.cloud.google.com)
2. Activez ces APIs :
   - **My Business Account Management API**
   - **My Business Business Information API**
   - **My Business Reviews API**
3. Créez des identifiants OAuth 2.0 (type : Web Application)
4. Ajoutez l'URI de redirection autorisée : `http://localhost:3000/api/google/callback`
5. Remplissez `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### Cron Secret
Générez une chaîne aléatoire :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Base de données

Exécutez les migrations dans Supabase SQL Editor :

```sql
-- Copiez-collez le contenu de :
-- supabase/migrations/0001_create_restaurants.sql
-- supabase/migrations/0002_create_reviews.sql
```

---

## 4. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 5. Déploiement Vercel

```bash
# Installez Vercel CLI
npm install -g vercel

# Déployez
vercel

# Ajoutez les variables d'environnement dans le dashboard Vercel
# Settings > Environment Variables
```

Le fichier `vercel.json` configure automatiquement le cron job toutes les heures.

### Variables à ajouter dans Vercel :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` → `https://votre-domaine.vercel.app/api/google/callback`
- `NEXT_PUBLIC_APP_URL` → `https://votre-domaine.vercel.app`
- `CRON_SECRET`

---

## Architecture du cron job

Le cron job tourne toutes les heures via Vercel Cron :
- `POST /api/cron/check-reviews` (sécurisé par `CRON_SECRET`)
- Lit tous les restaurants avec `automation_enabled = true`
- Appelle Google My Business API pour les nouveaux avis
- Génère les réponses avec Claude
- Publie les réponses sur Google
- Met à jour la base de données

### Tester manuellement :
```bash
curl -X POST http://localhost:3000/api/cron/check-reviews \
  -H "Authorization: Bearer VOTRE_CRON_SECRET"
```

---

## Flux OAuth Google

1. Clic sur "Connecter Google My Business" → `/api/google/connect`
2. Redirection vers Google consent screen
3. Google callback → `/api/google/callback`
4. Tokens sauvegardés en base
5. Premier établissement sélectionné automatiquement

---

## Structure des dossiers

```
src/
├── app/              # Pages Next.js App Router
├── components/       # Composants React
├── lib/              # Logique métier
│   ├── supabase/     # Client Supabase
│   ├── anthropic/    # Client Claude AI
│   └── google/       # Google My Business API
├── actions/          # Server Actions
└── types/            # Types TypeScript
```
