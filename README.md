# Pakistan Tourism Gateway

Premium, Pakistan-only tourism platform. Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + Prisma/PostgreSQL + Auth.js + next-intl (English/Urdu) + Framer Motion/GSAP. Inquiry-based booking (no online payments).

## 1. Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) Postgres database (free tier is fine)
- A [Vercel](https://vercel.com) account for hosting

## 2. Local setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="<Neon pooled connection string>"
DIRECT_URL="<Neon direct connection string>"
AUTH_SECRET="<run: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
SEED_ADMIN_EMAIL="admin@paktourismgateway.com"
SEED_ADMIN_PASSWORD="ChangeMe123!"
```

In Neon: create a project, then copy the **pooled** connection string into `DATABASE_URL` and the **direct** (non-pooled) connection string into `DIRECT_URL`.

Push the schema and seed sample data:

```bash
npx prisma db push
npm run seed
```

The seed script creates:
- One Super Admin user (the email/password from `.env`)
- Site settings
- Sample destinations, tours, hotels, vehicles, blog posts, FAQs, gallery images and hero slides for Hunza, Skardu, Swat, Naran-Kaghan, Fairy Meadows, etc.

**Every seeded item can be edited or permanently deleted from the admin panel** — none of it is hard-coded into the pages.

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the admin panel (log in with the seed admin credentials above, then change the password from Admin → Users).

## 3. Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import the repo in Vercel.
3. Add the same environment variables from `.env` in Vercel's Project Settings → Environment Variables (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXTAUTH_URL` set to your production URL, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`).
4. Deploy. `prisma generate` runs automatically via the `postinstall`/`build` scripts.
5. Run `npx prisma db push` and `npm run seed` once against your production `DATABASE_URL` (from your machine, or a Vercel CLI/one-off script) to initialize the production database.

## 4. Project structure

- `src/app/[locale]/...` — public site (English/Urdu), all content-driven from the database
- `src/app/admin/...` — admin panel (protected by Auth.js; roles: SUPER_ADMIN, ADMIN, EDITOR)
- `src/app/actions/` — server actions (admin CRUD + public inquiry/newsletter forms)
- `prisma/schema.prisma` — full data model
- `prisma/seed.ts` — sample data (safe to edit or remove)
- `src/components/` — UI components (shadcn-based primitives, cards, admin forms, home sections)
- `messages/en.json`, `messages/ur.json` — translation strings

## 5. Notes

- Images are referenced by URL (paste any HTTPS image link when creating/editing content in the admin panel — no file upload storage is wired up yet).
- Only SUPER_ADMIN users can manage other users, from Admin → Users.
- The contact/inquiry forms write to the `Inquiry` table, visible and manageable under Admin → Inquiries. There is no payment integration by design — everything is inquiry-based.
