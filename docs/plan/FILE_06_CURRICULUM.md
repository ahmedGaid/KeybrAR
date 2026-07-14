# SESSION 6 — Full curriculum authoring + Arabic copy polish
# Spec: SPEC_V2.md §Course. Recall keybrar-brand — this session is MOSTLY Arabic quality.

---

## Before You Start
1. Recall keybrar-brand (lexicon + tone) — every drill/intro string is user-facing Arabic.
2. Read unit 1 data (S4) as the shape to follow; read dictionary-ar top-2000 words as the
   word-pool source (`zcat ... | head -2000`).
3. Write `docs/plan/CURRICULUM.md` FIRST (the syllabus below, refined), get shape settled
   before generating lesson data.

## Task A — author units 2–5 (target ~30 lessons total)
- **U2 top row** (ض ص ث ق ف غ ع ه خ ح ج د): 7 lessons, letter-pair intro order by frequency,
  drills mix new+old keys, end-of-unit word drill.
- **U3 bottom row** (ئ ء ؤ ر لا ى ة و ز ظ): 7 lessons, same pattern; lam-alef key gets
  explicit treatment (single keystroke → لا).
- **U4 special forms**: hamza carriers (أ إ آ on shift layer), ة vs ه, ى vs ي, tanween/harakat
  keys familiarization (recognize + locate, not vocalized typing), Arabic punctuation ؟ ، ؛
  + numbers row. 5 lessons.
- **U5 real typing**: 6 lessons — top-100 words, common collocations, short sentences, two
  graded texts (~40s and ~90s at 20wpm), final assessment lesson (speed+accuracy gate).
- Rules: drills only use keys already taught; words from dictionary-ar (real, no
  transliteration); pass gates ramp accuracy 95%→97%, wpm target only U5.
- Every lesson: ar title + one-line encouraging intro (فصحى مبسطة), en translations.

## Task B — copy polish sweep
1. All course UI strings vs keybrar-brand lexicon (تمرين، الدقة، سرعة الكتابة…). Read ALOUD test.
2. Results/empty/error states encouraging («أحسنت!», «مفتاح جديد!») — never blame.
3. ar.json UI additions complete; en parity; no English leakage in ar mode except brand + units.

## Smoke Test
- [ ] CURRICULUM.md matches shipped data (ids stable, counts right)
- [ ] Type through 1 lesson of EACH unit on real keyboard — drills feel right, gates sane
- [ ] No drill contains an untaught key (write a data test asserting this — cheap + prevents
      authoring bugs forever)
- [ ] keybrar-brand checklist full pass; Ahmed reviews Arabic before merge
- [ ] Gates green

## After
Update keybrar-status (NEXT = FILE_07) → commit `feat(course): full curriculum units 2-5` →
push → fresh session.
