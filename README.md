# Valiyo — Platform (Next.js)

Production Next.js application for Valiyo: landing page + authenticated
parent dashboard, built on Firebase Auth (Google Sign-in) and Firestore.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Firebase web config
npm run dev
```

Without `.env.local` filled in, the app still runs — auth is disabled and
the dashboard shows a "Firebase isn't configured" message instead of
crashing.

## Deploy Firestore security rules

`firestore.rules` at the project root is the **real** security boundary
(see "Auth & security model" below). Deploy it with the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

You'll also need composite indexes for a few queries the first time they
run — Firestore's error message includes a direct console link to create
each one. Expected indexes:

- `children`: `parentUid` ASC, `createdAt` ASC
- `learn_progress`: `childId` ASC, `lastActivityAt` DESC
- `discovery_results`: `childId` ASC, `completedAt` DESC
- `reports`: `uid` ASC, `createdAt` DESC

## Assumed Firestore schema

The brief specified the collection names but not their field shapes.
Types in `types/*.ts` document exactly what this app reads/writes; the
short version:

| Collection | Key | Written by | Notes |
|---|---|---|---|
| `users` | uid | this app (client) | Created/updated on login — see `lib/firestore/users.ts` |
| `user_access` | uid | **backend only** | `{ uid, products: ("learn" \| "discovery")[], updatedAt }`. This app only reads it. |
| `children` | auto id | this app (client) | `{ parentUid, name, birthDate, gender, avatarEmoji, createdAt, updatedAt }` |
| `orders` | auto id | **backend only** (future Lynk.id webhook) | `{ uid, productId, status, amount, currency, provider, providerRef, createdAt, updatedAt }` — read-only here, modeled in `types/order.ts` |
| `learn_progress` | auto id | Learn product | `{ uid, childId, courseId, courseTitle, progressPercent, lastActivityAt }` |
| `discovery_results` | auto id | Discovery product | `{ uid, childId, status, summary, topDomains, completedAt }` |
| `reports` | auto id | backend/AI pipeline | `{ uid, childId, type, title, summary, createdAt }` — powers Recent Activity |

If your actual field names differ, update the types and the corresponding
function in `lib/firestore/*.ts` — nothing else needs to change, since
components never talk to Firestore directly.

## Auth & security model

This app uses the Firebase **client SDK only** (popup sign-in). There's no
Admin SDK/service account here, so there's no way to mint a verifiable
server-side session. That shapes how protection is layered:

1. **`proxy.ts`** (Next.js 16's middleware convention) — a best-effort,
   non-cryptographic redirect based on a plain marker cookie, purely to
   avoid flashing the dashboard shell on direct navigation. Documented in
   the file itself as *not* the security boundary.
2. **`components/auth/RouteGuard.tsx`** — the real client-side guard.
   Redirects to `/` as soon as Firebase Auth resolves to "no user."
3. **`firestore.rules`** — the actual enforcement. Every collection
   requires `request.auth.uid` to match the resource's owner; `user_access`,
   `orders`, and `reports` are read-only to the client entirely.

To upgrade to a fully edge-verified guard later: add the Firebase Admin
SDK, exchange the ID token for an httpOnly session cookie in an API route
on login, and verify it in `proxy.ts` with `admin.auth().verifySessionCookie()`.

## Lynk.id webhook (future)

Not implemented yet — no webhook secret or payload spec was available to
build against. What's ready for it:

- `types/order.ts` models an `orders` document the way a webhook handler
  would write it (`provider: "lynkid"`, `providerRef` for their transaction
  id).
- `lib/firestore/access.ts` documents that `user_access/{uid}` is expected
  to be upserted by that same backend once an order's status is "paid".
- `firestore.rules` already blocks client writes to both `orders` and
  `user_access`, so the webhook (using the Admin SDK, which bypasses rules)
  is the only thing that can grant access.

When you're ready: add an `app/api/webhooks/lynkid/route.ts` API route,
verify Lynk.id's signature, write the `orders` doc, then upsert
`user_access/{uid}.products`.

## Structure

```
app/
  layout.tsx            Root layout: fonts, metadata, AuthProvider
  page.tsx               Landing page
  dashboard/
    layout.tsx           Navbar + Footer + RouteGuard
    page.tsx              Renders DashboardView
proxy.ts                 Best-effort redirect for /dashboard/* (see above)
firestore.rules          Real security enforcement

components/
  layout/                Navbar, Footer
  home/                  Hero, HeroVisual, JourneyNav, JourneyCards, GrowSection
  dashboard/             WelcomeCard, ChildSelector, ChildFormDialog,
                         ProductAccess, ContinueLearning, DiscoveryReports,
                         RecentActivity, LockedSection, DashboardView
  auth/                  RouteGuard
  ui/                    Button, AuthButton, StatusBadge, Dialog
  providers/             AuthProvider (user, profile, access, children, selected child)

lib/
  firebase/              config.ts, auth.ts, firestore.ts (client SDK init)
  firestore/              users.ts, children.ts, access.ts, reports.ts
                          — all Firestore reads/writes live here, never in components
  hooks/                  useAuth, useAsyncData
  utils/                  cn

config/                  site.ts, journey.ts — content, decoupled from presentation
types/                   user, child, access, order, learning, journey
```

## Design tokens

| Token | Value |
|---|---|
| `--color-bg` | `#FFFBF2` |
| `--color-primary` | `#5B3DF5` |
| `--color-secondary` | `#FFD447` |
| `--color-accent` | `#63D5C7` |
| `--color-text` | `#272640` |
| `--color-grow-bg` | `#EBE6FB` |

Fonts: Fredoka (display/headings), Plus Jakarta Sans (body). The landing
page design was preserved as-is; the dashboard reuses the same tokens and
components (Button, cards, pill radius) rather than introducing a new style.
