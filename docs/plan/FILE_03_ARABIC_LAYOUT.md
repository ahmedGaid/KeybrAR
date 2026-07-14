# SESSION 3 — Arabic 101 Keyboard Layout + RTL Typing Surface
# Files: packages/keybr-keyboard-generator/layout/<new layout file>,
#        packages/keybr-keyboard/lib/layout.ts,
#        (only if session 1 found RTL gaps: the lesson/typing rendering components)

---

## Before You Start

1. Re-read `docs/custom_keyboard.md` in the repo — authoritative procedure.
2. Open `packages/keybr-keyboard-generator/layout/` → read one existing non-Latin layout file
   (Hebrew if present, else Russian/Greek) — this is the template to copy.
3. Open `packages/keybr-keyboard/lib/layout.ts` → read 2–3 entries; note `id`, `xid` numbering
   scheme (pick the next free single-byte xid), family, geometries.
4. Recall session 1's RTL verdict from `Docs/plan` notes.

Do not write anything yet.

---

## Task A — Create the Arabic 101 layout file

Target layout: **Arabic 101** — the standard Windows Arabic keyboard (what Egyptian/most Arab
users have printed on their keycaps).

Copy an existing layout file to `packages/keybr-keyboard-generator/layout/ar_sa.ts` (match the
repo's naming convention seen in the folder) and map physical keys → codepoints. Reference rows
(unshifted, ANSI geometry, left→right physical keys):

```
Q→ض  W→ص  E→ث  R→ق  T→ف  Y→غ  U→ع  I→ه  O→خ  P→ح  [→ج  ]→د
A→ش  S→س  D→ي  F→ب  G→ل  H→ا  J→ت  K→ن  L→م  ;→ك  '→ط
Z→ئ  X→ء  C→ؤ  V→ر  B→لا(lam-alef key)  N→ى  M→ة  ,→و  .→ز  /→ظ
`→ذ
```

Shifted layer (Arabic 101 standard): includes harakat and symbols — map faithfully
(e.g. Shift+Q→َ fatha … verify against the Windows Arabic (101) reference layout), BUT since
harakat are not in the v1 alphabet the model will simply never ask for them — fine.

**lam-alef key (B):** it emits TWO codepoints (ل + ا). Check how the generator represents
multi-codepoint keys (search existing layouts for a two-char mapping or ligature handling). If
unsupported, map B → nothing for v1 and note it — the model composes لا from ل and ا keys anyway.
Do NOT invent generator features.

Then regenerate:

```bash
cd packages/keybr-generators && npm run generate-layouts
```

(Or the exact command `docs/custom_keyboard.md` gives.)

## Task B — Register the layout

In `packages/keybr-keyboard/lib/layout.ts` add (copying exact entry shape):

- id: `"ar-sa"` (or convention-matching), next free `xid`, name `"Arabic 101"`,
  family per repo convention, language: the `AR` entry from session 2, geometries: standard set
  used by neighbors (ANSI/ISO as upstream supports).

## Task C — End-to-end RTL typing verification (and fixes only if needed)

Run dev site → select Arabic + Arabic 101 layout → complete a full lesson typing on a real
Arabic-capable keyboard (Windows: add Arabic (Egypt) input in Settings if absent).

Verify:
- On-screen keyboard shows Arabic letters on correct keys, highlights the next key correctly.
- Lesson text renders right→left; caret starts at the RIGHT and advances leftward.
- Wrong-key press marks the correct letter position (no off-by-one from RTL).
- WPM/accuracy counters update.

If session 1 found the typing surface broken for RTL: fix minimally in the rendering component
(likely a `dir="rtl"` / CSS `direction` + logical-position issue). Search upstream issues/PRs for
"rtl"/"hebrew" first — a known fix may exist. Keep the diff small and comment-free per upstream
style.

---

## Smoke Test

- [ ] Build + typecheck + upstream keyboard tests pass
- [ ] Arabic 101 selectable in layout picker when language = Arabic
- [ ] On-screen keyboard renders the Arabic 101 mapping exactly (spot-check 8 keys incl. ض ش ئ ذ)
- [ ] Full lesson completed typing Arabic — caret RTL, highlighting correct, stats recorded
- [ ] Lesson results save to the profile (letter confidence colors appear for Arabic letters)
- [ ] Commit `feat(ar): Arabic 101 keyboard layout + RTL typing verified` pushed

---

## After This Session

```
Smoke test passed?
→ Type /compact in Claude Code
→ Open FILE_04_AR_UI_BRAND.md and continue
```
