# KeybrAR — working agreement

**KeybrAR** — Arabic-first touch-typing tutor website: a fork of [keybr.com](https://github.com/aradzie/keybr.com)
(AGPL-3.0) that adds Arabic language, Arabic 101 keyboard layout, RTL, and an Arabic UI.
TypeScript monorepo, lage task runner, React front-end, Node server.

This file is deliberately short. The real rules live in **skills** — recall them; don't reinvent.

## Recall the right skill BEFORE you act
- **Building/editing ANY code** → **`keybrar-stack`** (fork discipline, key paths, gates).
- **Any UI / copy / Arabic term / RTL feel** → **`keybrar-brand`**.
- **Resuming / status / "where are we"** → **`keybrar-resume`** (reads `keybrar-status` first).

## Source-of-truth map
- Session plan (what next) → `docs/plan/FILE_00_INDEX.md` + the lowest incomplete session file
- Live status / NEXT ACTION / blockers → **`keybrar-status`** skill
- Extension work (language/keyboard) → repo docs `docs/custom_language.md`, `docs/custom_keyboard.md` — authoritative

## Hard rules — the safety net
- **Additive-only fork.** Smallest diff; never refactor upstream code; keeps `git merge upstream/master` cheap.
  Never touch: adaptive-algorithm internals, auth logic beyond env config, license files, unrelated tests.
- **AGPL-3.0.** Repo stays public; deployed commit pushed; live footer links source repo +
  keybr.com attribution + FrequencyWords credit (CC-BY-SA-4.0).
- **Generated files are generated** (`model-*.data`, `words-*.json`, layout outputs) — fix inputs, rerun generator, never hand-edit.
- **ar/en parity.** English UI + Arabic lesson AND Arabic UI + English lesson must both work.
- **Logical CSS only** for RTL fixes (`margin-inline-start`, …) — never `left/right`.
- **Follow the neighbor.** New language/layout entries copy the exact shape of an existing entry (Hebrew/Farsi for RTL precedent).

## Before you say "done"
Upstream's lint + typecheck + tests (lage scripts from root `package.json`) green · dev site runs ·
the session's Smoke Test checklist all ticked.

## Session protocol
One session = one plan file. When done: update **`keybrar-status`** skill → commit + push →
report with **How to test** → tell the user to clear and start a fresh session.
Blocked? Write blocker into `keybrar-status`, stop, ask.
