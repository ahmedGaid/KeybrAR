# SESSION 5 — Progress DB/API + premium gating + Paddle checkout
# Spec: SPEC_V2.md §Gating/§Payments. Prereq: Ahmed opened Paddle seller account (sandbox OK).

---

## Before You Start
1. Read `packages/keybr-database/lib/` (models, createSchema) + `packages/server/lib/app/`
   (a small controller neighbor: settings or results sync) + `checkout/` (Paddle webhook).
2. Read `packages/page-account/lib/` — how premium purchase UI works (use-paddle hook,
   PADDLE_TOKEN/PADDLE_PRICE_ID from thirdparties config).
3. Confirm how `user.premium` is computed (grep premium in keybr-database / pages-server).

## Task A — course_progress persistence
1. Model + schema: `course_progress` (userId FK, lessonId string, wpm, accuracy, completedAt;
   PK userId+lessonId). Follow neighbor model + createSchema pattern; migration additive.
2. Controller: `GET /_/course/progress` (own rows), `PUT /_/course/progress/:lessonId`
   (upsert; validate payload with zod like neighbors). Auth required.
3. Client: page-course syncs — logged-in loads DB, merges localStorage once (upload), then DB
   is truth. Anonymous stays localStorage.
4. Server-side gate: PUT rejects lessons of units 2–5 when `!user.premium` (403). Unit ids
   from keybr-content-course shared import.

## Task B — premium gating UI + checkout
1. Course map: non-premium sees units 2–5 locked with price + «اشترك الآن» CTA.
2. CTA → account page Paddle checkout (reuse upstream flow; keybr-pages-shared
   `isPremiumUser`). After webhook fires, course unlocks (verify with Paddle sandbox).
3. Config: document env vars in `.env.example`-style note + UPSTREAM_DIFFS if touched.
4. Fallback ops path: document manual premium grant (insert order row) in docs/plan/OPS.md
   for pre-Paddle-approval users.

## Smoke Test
- [ ] Anonymous: unit 1 works, progress in localStorage; units 2–5 locked
- [ ] Logged-in free: progress syncs to DB (verify sqlite row); units 2–5 locked; PUT to
      locked lesson → 403
- [ ] Paddle sandbox purchase → webhook → premium → units unlock without redeploy
- [ ] Manual grant path works (OPS.md steps)
- [ ] Gates green; controller has tests (follow neighbor test style)

## After
Update keybrar-status (NEXT = FILE_06) → commit `feat(premium): course gating + progress api`
→ push → fresh session.
