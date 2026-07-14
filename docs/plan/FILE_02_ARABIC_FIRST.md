# SESSION 2 — Arabic audit + Arabic-first defaults + rebrand basics
# Spec: SPEC_V2.md. Old FILE_02/03 obsolete (upstream ships Arabic already).

---

## Before You Start
1. Read `SPEC_V2.md` + recall `keybrar-stack` and `keybrar-brand` skills.
2. Read in-repo: `packages/keybr-intl/lib/locale.ts`, `packages/keybr-keyboard/lib/settings.ts`,
   `packages/keybr-pages-shared/lib/pages.ts` (meta), how the server picks locale
   (grep `intlBase` / `selectLocale` usages in packages/server + keybr-pages-server).
3. Windows build env facts → keybrar-status skill.

## Task A — Arabic quality audit (record findings, fix only cheap gaps)
1. Dictionary: `zcat packages/keybr-generators/dictionaries/dictionary-ar.csv.gz | head -50` —
   check top words are real Arabic, no Latin/digits/harakat/tatweel pollution.
2. `words-ar.json` sample + `Language.AR` alphabet vs spec (28 letters; hamza forms excluded
   from base alphabet is upstream's call — record, don't fight it).
3. Layout `ar_sa.ts` vs standard Windows Arabic 101 (spot-check 6 keys + lam-alef).
4. Run an Arabic lesson; note anything odd (letter shaping, caret, harakat).
   Verdict table into the session report; only fix what blocks course work.

## Task B — Arabic-first defaults
1. `keybr-intl/lib/locale.ts`: `defaultLocale = "ar"`. Verify `/` now Arabic, `/en` English;
   check `intlBase`/`intlPath` behavior and server-rendered `<html dir>`.
2. `keybr-keyboard/lib/settings.ts`: default `keyboard.language` → `Language.AR`,
   `keyboard.layout` → `Layout.AR_SA`.
3. Sweep for hardcoded `"en"` assumptions that break (tests will catch some — run
   keybr-intl + keybr-pages-* tests).
4. **Merge-care note**: add `docs/plan/UPSTREAM_DIFFS.md` listing every shared upstream file
   we modify (start with these + the two webpack fixes from S1).

## Task C — Rebrand basics (name/meta/footer; theme is S3)
1. Site name: grep `keybr.com - Typing lessons` + og meta in pages.ts → "KeybrAR —
   تعلّم الكتابة باللمس بالعربية" (keep en variant for /en). Update `og:url`, twitter handles
   (drop upstream's), `fb:app_id` (remove).
2. Footer: our repo link (AGPL source), keep keybr.com attribution, add FrequencyWords credit.
   Locate footer component via grep "github.com/aradzie".
3. Title/logo TEXT only (asset logo in S3). i18n: every new string in en + ar.

## Smoke Test
- [ ] `/` = Arabic UI rtl; `/en` = English ltr; language switcher works both ways
- [ ] Fresh profile (clear localStorage) starts with Arabic lesson + ar-sa layout
- [ ] Audit table recorded (dictionary/layout/model verdicts)
- [ ] Brand name + footer links correct in BOTH locales
- [ ] Gates: compile + build-dev + test (known @keybr/config Windows failure only) + lint
- [ ] UPSTREAM_DIFFS.md exists and lists all shared-file changes

## After
Update keybrar-status (NEXT = FILE_03) → commit `feat(ar): arabic-first defaults + rebrand basics`
→ push → fresh session.
