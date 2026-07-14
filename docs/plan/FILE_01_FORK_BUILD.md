# SESSION 1 — Fork, Build, Run
# Files: git remotes, no source edits (plus copying this plan into Docs/plan/)

---

## Before You Start

1. Confirm `C:\AhmedGaid\keybrAR` is empty and `C:\AhmedGaid\keybrAR-plan\` holds this plan.
2. Confirm `gh auth status` works and you can push to `ahmedGaid/KeybrAR`.
3. Check Node version: `node -v` (upstream needs a recent LTS; check `package.json` `engines`
   after clone).
4. Check Docker Desktop installed (`docker -v`, `docker compose version`) — needed for the full
   server stack; the dev front-end may run without it.

Do not write anything yet.

---

## Task A — Clone upstream, wire remotes

```bash
cd /c/AhmedGaid
git clone https://github.com/aradzie/keybr.com.git keybrAR
cd keybrAR
git remote rename origin upstream
git remote add origin https://github.com/ahmedGaid/KeybrAR.git
git push -u origin master
```

If upstream default branch is not `master`, use what it is. Keep both remotes:
`origin` = our repo, `upstream` = keybr.com (for future merges).

## Task B — Bring the plan into the repo

```bash
mkdir -p Docs/plan
cp -r ../keybrAR-plan/* Docs/plan/
git add Docs/plan && git commit -m "docs: add KeybrAR build plan" && git push
```

(Original `keybrAR-plan` folder can be deleted after this.)

Also create a short `CLAUDE.md` at repo root (house pattern — mirrors Dukkan's): project
one-liner, "recall keybrar-stack before any code / keybrar-brand before any UI-copy /
keybrar-resume to continue", source-of-truth map (Docs/plan + keybrar-status skill), and the
hard rules: additive-only fork, AGPL = repo public + footer links, generated files never
hand-edited, ar/en parity. Commit with the plan.

## Task C — Read the repo's own instructions

1. Read `README.md` "Getting started" section.
2. Read `docs/custom_language.md` and `docs/custom_keyboard.md` in full (they drive sessions 2–3).
3. Read root `package.json` — note the workspace layout, `engines`, and the lage scripts
   (build/test/lint names).
4. Read `docker-compose.yaml` — note what services exist (server, database, etc.) and which
   database keybr actually uses. Record it in the session report.

## Task D — Install and build

Follow README exactly. Expected shape (verify, don't assume):

```bash
npm install
npm run build        # or the lage equivalent from package.json
npm run start        # or dev script — get the local site serving
```

Windows note: if native build steps fail on Windows, retry inside WSL2 or use
`docker compose up` for the full stack. Record which path worked in the session report —
later sessions reuse it.

## Task E — Verify RTL baseline (riskiest unknown)

1. In `packages/keybr-keyboard/lib/language.ts`, search for `"rtl"`.
2. Record which languages (if any) already use `direction: "rtl"` — Hebrew (`he`) and/or
   Farsi (`fa`) expected.
3. If an RTL language exists: open the local site, switch to it, run one practice lesson.
   Watch: text flows right→left, cursor/caret advances correctly, correct/wrong letter
   highlighting tracks position.
4. If NO RTL language exists: flag this in the report — session 3 grows to include making the
   typing surface handle RTL (extra risk, plan for it before starting session 3).

---

## Smoke Test

- [ ] `git remote -v` shows `origin` → ahmedGaid/KeybrAR, `upstream` → aradzie/keybr.com
- [ ] Code pushed; https://github.com/ahmedGaid/KeybrAR shows the full source tree
- [ ] `Docs/plan/FILE_00_INDEX.md` exists in the repo
- [ ] `npm install` completes without fatal errors
- [ ] Build passes (whatever the repo's build gate is)
- [ ] Local dev site opens in browser; can type an English lesson end-to-end
- [ ] RTL status recorded: which languages, does typing surface handle RTL today, yes/no
- [ ] Database used by docker-compose recorded

---

## After This Session

```
Smoke test passed?
→ Update the keybrar-status skill (position, NEXT ACTION = FILE_02, RTL verdict, DB fact)
→ Type /compact in Claude Code
→ Open FILE_02_ARABIC_LANGUAGE.md and continue
```
