# KeybrAR v2 — Product Spec (approved 2026-07-14)

Supersedes the assumptions of the original FILE_02..06 plan (upstream now ships Arabic).
Pivot: Arabic-first product + paid structured Arabic typing course + distinct design.

## Decisions (locked with Ahmed)

1. **Paid plan = structured Arabic course.** Free tier keeps all upstream features
   (adaptive practice, typing test, multiplayer, profile). Premium unlocks course units 2–5.
2. **Payments = Paddle**, reusing upstream premium machinery unchanged
   (`/_/checkout` webhook → `order` row → `user.premium`). Env: `PADDLE_TOKEN`,
   `PADDLE_PRICE_ID`. Ahmed must open a Paddle seller account early (approval lag).
3. **Design depth = own theme + own pages.** New default theme (LESS) + logo + landing
   redesigned + course pages designed from scratch. Practice/profile/settings keep upstream
   layout under our theme. Adaptive-algorithm packages untouched.
4. **Curriculum authored by Claude**, reviewed by Ahmed (Arabic quality per keybrar-brand).
5. **AGPL accepted**: course code + content live in the public repo. Business = hosted
   convenience + accounts, same as upstream premium.

## Product

### Arabic-first flip
- Default locale becomes `ar`: `/` = Arabic RTL UI; English at `/en`.
- New-visitor defaults: lesson language `ar`, layout `ar-sa`.
- Brand: "KeybrAR" everywhere; tagline «تعلّم الكتابة باللمس بالعربية»; Arabic meta/OG.
- Footer (AGPL): link to our repo + keybr.com attribution (Aliaksandr Radzivanovich)
  + FrequencyWords credit.

### Course (`/course`)
- **5 units, ~30 lessons** (final count set during authoring):
  1. Home row: ش س ي ب ل ا ت ن م ك + space — FREE (teaser)
  2. Top row: ض ص ث ق ف غ ع ه خ ح ج د
  3. Bottom row: ئ ء ؤ ر لا ى ة و ز ظ
  4. Special forms: hamza variants (أ إ آ ؤ ئ), lam-alef (لا لأ لإ), ة/ه, ى/ي, tanween/
     harakat keys (shift layer), Arabic punctuation (؟ ، ؛)
  5. Real typing: common words → sentences → graded texts + Western digits
- **Lesson anatomy**: intro card (new keys, finger placement, RTL hand diagram) →
  2–4 fixed drill texts → pass gate (accuracy ≥ 95% first, speed target later lessons).
- **Progress**: per-lesson best (wpm, accuracy, completedAt). Logged-in → DB; anonymous →
  localStorage (unit 1 only). Unit completion badge on profile (v1: course page only if
  profile integration is costly).
- **Gating**: units 2–5 render locked for non-premium with upsell → account page checkout.
  Server-side: progress API rejects locked lessons for non-premium users.

## Architecture (additive-only fork rules apply)

| Piece | Where | Neighbor to copy |
|---|---|---|
| Curriculum data | new `packages/keybr-content-course` (TS data: units → lessons → texts, ids stable) | keybr-content-words |
| Course UI | new `packages/page-course` | page-typing-test (fixed-text player), page-help (static parts) |
| Page entry | `Pages.course` in keybr-pages-shared/lib/pages.ts + server & browser router wiring | Pages.typingTest |
| Lesson player | reuse @keybr/textinput + textinput-ui with fixed text | typing-test usage |
| Progress store | new `course_progress` table (userId, lessonId, wpm, accuracy, completedAt) + GET/PUT `/_/course/progress` | settings/results controllers |
| Premium gate | existing `isPremiumUser` (keybr-pages-shared/pagedata) client + server check | page-account |
| Theme | new `theme-8-keybrar.less` (+ palettes entry), set default | theme-1-light |
| Locale flip | keybr-intl/lib/locale.ts `defaultLocale` + settings defaults (keyboard.language/layout) | — (small diffs, document for merge care) |
| Landing | replace content of upstream landing section on `/` (page-practice hosts it) or page-static — verify in-repo | page-static |

Shared-file diffs stay minimal and are listed in each plan file for future merge care.

## Sessions
- **S2 (FILE_02)** Arabic audit + Arabic-first defaults + rebrand basics
- **S3 (FILE_03)** KeybrAR theme + landing redesign
- **S4 (FILE_04)** Course engine: content package, /course page, lesson player, unit 1 free
- **S5 (FILE_05)** Progress DB/API + premium gating + Paddle checkout
- **S6 (FILE_06)** Full curriculum + Arabic copy polish (keybrar-brand checklist)
- **S7 (FILE_07)** Deploy: VPS docker-compose + Cloudflare + env secrets
- **S8 (FILE_08)** Acceptance QA + launch sign-off

## Non-goals (v1)
Certificates (PDF), teacher/classroom features, Hindi digits (٠-٩), local payment rails
(Paymob/Fawry — revisit after Paddle proves demand), mobile apps, harakat typing lessons
beyond key familiarization.

## Risks
- Paddle approval delay → mitigation: manual premium flag via DB for early users.
- Upstream merge friction from locale-default flip → keep diffs tiny + documented.
- Arabic copy quality → keybrar-brand checklist gate each UI session.
