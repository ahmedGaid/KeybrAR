# SESSION 2 — Arabic Language Core (dictionary + phonetic model)
# Files: packages/keybr-keyboard/lib/language.ts,
#        packages/keybr-generators/dictionaries/dictionary-ar.csv.gz,
#        packages/keybr-phonetic-model/assets/model-ar.data (generated),
#        packages/keybr-content-words/lib/data/words-ar.json (generated)

---

## Before You Start

1. Re-read `docs/custom_language.md` in the repo — it is the authoritative procedure; if it
   differs from this file, follow the repo doc.
2. Open `packages/keybr-keyboard/lib/language.ts` → read 2–3 existing Language entries fully
   (pick Hebrew/Farsi if present for the RTL shape, plus one Latin one).
3. Open `packages/keybr-generators/` → find how `generate-languages` reads dictionaries (peek at
   the generator script) so the CSV format is exact.

Do not write anything yet.

---

## Task A — Add the Arabic Language entry

In `packages/keybr-keyboard/lib/language.ts`, copy the shape of an existing entry and add
(alphabetical position in the `ALL` list):

```ts
static readonly AR = new Language(
  /* id= */ "ar",
  /* script= */ "arabic",
  /* direction= */ "rtl",
  /* alphabet= */ "ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىي",
);
```

Adjust to the real constructor signature in the file. Alphabet decision (locked):
- Include: 28 base letters + hamza forms (ء آ أ ؤ إ ئ) + ة (taa marbuta) + ى (alef maqsura).
- Exclude: harakat/tashkeel (ً ٌ ٍ َ ُ ِ ّ ْ) — v1 teaches letters, not diacritics.
- lam-alef (لا) is NOT an alphabet letter — it is two codepoints ل+ا; the dedicated key is a
  layout concern (session 3).

## Task B — Build the frequency dictionary

Source (license-checked): **Hermit Dave FrequencyWords** — OpenSubtitles-derived word/frequency
lists, https://github.com/hermitdave/FrequencyWords (CC-BY-SA-4.0; attribution required —
add credit line in Docs and site About/footer later).

```bash
cd /tmp  # or scratchpad
curl -LO https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/ar/ar_50k.txt
```

Format is `word count` per line, space-separated. Convert to keybr's two-column CSV and gzip:

```bash
# inspect first — confirm format before converting
head -5 ar_50k.txt
awk '{print $1","$2}' ar_50k.txt > dictionary-ar.csv
gzip -9 dictionary-ar.csv
mv dictionary-ar.csv.gz <repo>/packages/keybr-generators/dictionaries/
```

Cleaning pass BEFORE converting (do in a small script):
- Drop tokens containing Latin letters, digits, or punctuation.
- Strip any harakat from words (model alphabet has none, else generator may reject words).
- Normalize: keep hamza forms as-is (they are in the alphabet); drop tatweel (ـ U+0640).
- Match the exact CSV delimiter/format the generator expects (verified in Before You Start #3).

## Task C — Generate model + words

```bash
npm --workspace packages/keybr-generators run generate-languages
```

Expect two new files:
- `packages/keybr-phonetic-model/assets/model-ar.data`
- `packages/keybr-content-words/lib/data/words-ar.json`

If the generator errors on specific characters, fix the cleaning script in Task B and rerun —
do not hand-edit generated files.

## Task D — Wire anything else the repo doc requires

`docs/custom_language.md` may list extra registration points (tests, locale lists). Follow it to
the end. Run the package tests it mentions.

---

## Smoke Test

- [ ] Build + typecheck pass repo-wide
- [ ] Dev site: Arabic appears in the language selector
- [ ] Selecting Arabic (with any existing layout hack or default) shows Arabic words generated
      from the model — real-looking words, right-to-left order
- [ ] `words-ar.json` spot check: top words are sane common Arabic words, no Latin/digits/harakat
- [ ] Upstream language tests still green
- [ ] Commit `feat(ar): Arabic language, dictionary and phonetic model` pushed

---

## After This Session

```
Smoke test passed?
→ Type /compact in Claude Code
→ Open FILE_03_ARABIC_LAYOUT.md and continue
```
