# KeybrAR — Master Plan Index

Load this file first in every session. **v2 (2026-07-14): re-planned after discovering upstream
ships Arabic; product pivot per `SPEC_V2.md` (Arabic-first + paid course + own design).**

## Project Goal

Build **KeybrAR** — Arabic-first touch-typing tutor website. Free tier = all keybr.com features
(adaptive lessons, per-key confidence, WPM/accuracy, profile stats, typing test, multiplayer,
accounts) with Arabic-first defaults and KeybrAR design. Paid tier (Paddle) = structured Arabic
typing course (5 units, ~30 lessons). Fork of keybr.com (AGPL-3.0), deploy on VPS behind free
Cloudflare. Target ~5,000 daily users. Full product spec: **`SPEC_V2.md`**.

## Key facts (verified 2026-07-14, session 1)

- Upstream: https://github.com/aradzie/keybr.com — TypeScript monorepo, lage task runner,
  Node server, Dockerfile + docker-compose.yaml (single container, SQLite via knex).
  License **AGPL-3.0** → fork source MUST stay public; live site links to source.
- Our repo: https://github.com/ahmedGaid/KeybrAR.git (public). Local: `C:\AhmedGaid\keybrAR`.
- **Upstream already ships Arabic**: Language.AR (rtl), dictionary/model/words, layouts
  `ar-sa` + `ar-sa-102`, full `ar` UI locale. Verified working in session 1.
- Upstream premium machinery exists: Paddle webhook `/_/checkout` → `order` row →
  `user.premium` (`isPremiumUser` in keybr-pages-shared). We gate the course with it.
- Pages pattern: `Pages.*` entry (keybr-pages-shared/pages.ts) + `page-*` package + router
  wiring. Themes = `theme-N-name.less` in keybr-themes. Arabic webfont already in assets.
- Windows dev env facts + build quirks → `keybrar-status` skill.

## New/changed surfaces (v2 — verify in-repo each session)

- NEW `packages/keybr-content-course` — curriculum data (units/lessons/drills)
- NEW `packages/page-course` — course map + lesson player (reuses typing engine)
- NEW `course_progress` table + `/_/course/progress` API
- NEW `theme-8-keybrar.less` + logo + redesigned landing
- CHANGED (small, tracked in UPSTREAM_DIFFS.md): defaultLocale→ar, lesson defaults→ar/ar-sa,
  brand meta/footer, pages.ts + router entries

## Never touch

- The adaptive algorithm packages (phonetic model logic, lesson generator internals) — we feed
  them Arabic data; we do not modify their code.
- Server auth/session logic beyond configuration (OAuth keys via env).
- Upstream test files unrelated to Arabic.
- License files — AGPL text and upstream attribution stay.

## Session Map (v2)

| # | File | What gets built | Status |
|---|------|-----------------|--------|
| 1 | FILE_01_FORK_BUILD.md | Fork + Windows build + dev server + Arabic/RTL baseline | ✅ DONE |
| 2 | FILE_02_ARABIC_FIRST.md | Arabic quality audit + Arabic-first defaults (`/`=ar) + rebrand basics | |
| 3 | FILE_03_THEME_LANDING.md | KeybrAR theme (default) + logo + redesigned landing | |
| 4 | FILE_04_COURSE_ENGINE.md | Course content package + /course page + lesson player, unit 1 free | |
| 5 | FILE_05_PREMIUM.md | Progress DB/API + premium gating + Paddle checkout (sandbox) | |
| 6 | FILE_06_CURRICULUM.md | Full curriculum units 2–5 + Arabic copy polish | |
| 7 | FILE_07_DEPLOY.md | VPS + Cloudflare + OAuth + Paddle production | |
| 8 | FILE_08_ACCEPTANCE.md | Full QA, regression vs upstream, launch sign-off | |

**Prereq for S5/S7 (Ahmed, start early):** Paddle seller account — approval can take days.

## Ground Rules (every session)

1. **Read before write.** Open and read every file you are about to change; this plan's code
   snippets are drafts — the in-repo docs and existing patterns win on any conflict.
2. **Additive only.** We extend keybr with Arabic; we do not refactor upstream code. Smallest
   diff that works — keeps future `git merge upstream/master` cheap.
3. **Follow the neighbor.** New packages/pages/entries copy the exact shape of an existing one
   (page-typing-test for the course player, keybr-content-words for data packages,
   theme-1-light for themes).
3b. **Track shared-file diffs.** Any change to an upstream file goes into
   `docs/plan/UPSTREAM_DIFFS.md` — that list is the merge-conflict budget.
4. **Gates before done.** Whatever upstream uses (lint, typecheck, tests via lage) must pass, and
   the dev server must run, before a session ends.
5. **Commit per session** to `main` of KeybrAR repo, push. Message format:
   `feat(ar): <what>` / `chore: <what>`.
6. **AGPL discipline.** Repo stays public; never strip license headers or attribution.

## How to use this plan

1. Fresh Claude Code session in `C:\AhmedGaid\keybrAR` (after session 1 the repo lives there).
2. Load `FILE_00_INDEX.md` (this file) + the session file.
3. Complete the session's tasks → run its Smoke Test.
4. Commit + push, `/compact` or clear, next session file.

## After all sessions complete

- Run FILE_08 acceptance in full.
- Point the production domain via Cloudflare, announce.
- Set a recurring task to pull upstream fixes: `git fetch upstream && git merge upstream/master`.

*Generated by ag-plan skill (v2 revision 2026-07-14). Do not edit this index manually.*
