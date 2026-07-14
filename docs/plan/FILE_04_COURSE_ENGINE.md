# SESSION 4 — Course engine: content package + /course page + lesson player (unit 1 free)
# Spec: SPEC_V2.md §Course. NO payments this session; everything unlocked-in-dev.

---

## Before You Start
1. Read `packages/page-typing-test/lib/` in full — it is THE neighbor: fixed text + upstream
   typing engine + results screen.
2. Read `packages/keybr-content-words/` (data package shape) and `packages/keybr-pages-shared/
   lib/pages.ts` + server/browser router wiring for typing-test (grep `Pages.typingTest`).
3. Read `docs/plan/CURRICULUM.md` if it exists (S6 authors the full one) — this session ships
   unit 1 only with placeholder-quality-but-real Arabic drills.

## Task A — `packages/keybr-content-course`
1. New package copying keybr-content-words scaffolding (package.json, tsconfig, test setup).
2. Types: `Unit { id, title(ar/en), lessons }`, `Lesson { id (stable string!), title, intro
   { newKeys, fingerHints }, drills: string[], passGate { minAccuracy, minWpm? } }`.
3. Data: unit 1 (home row ش س ي ب ل ا ت ن م ك) — 6 lessons: keys intro pairs → letter drills →
   syllable drills → real short words from dictionary-ar. Drill texts = plain Arabic strings,
   RTL, no harakat.
4. Unit 2–5 stubs (ids + titles only, `locked: true` marker) so UI can render the full map.

## Task B — `packages/page-course` + wiring
1. New page package copying page-typing-test structure. Route `/course` (+ `/course/:lessonId`
   if the router supports params — else lesson state client-side).
2. Course map screen: units as sections, lessons as cards (done/available/locked states — ALL
   designed, keybrar-brand). Unit 1 unlocked; 2–5 show lock + «الخطة المدفوعة» hint (no
   checkout yet).
3. Lesson player: intro card (new keys + finger hint on keyboard-ui widget if cheap) → drill
   runner using upstream textinput components with fixed text → per-drill result → pass/fail
   vs passGate → next drill/lesson. Reuse typing-test's result presentation pieces.
4. Progress v1: localStorage only (`keybrar.course.progress` JSON: lessonId → {wpm, accuracy,
   completedAt}). DB comes in S5.
5. `Pages.course` entry + nav link (icon, ar/en labels) + server route registration.

## Smoke Test
- [ ] /course renders map in ar (RTL) + en; states designed (no bare text)
- [ ] Complete lesson 1 end-to-end on real keyboard: drills run, gate enforced, progress
      persists across reload
- [ ] Failing accuracy gate blocks advance with encouraging retry copy («حاول مرة أخرى»)
- [ ] Locked lesson card visibly locked, no crash on click
- [ ] Gates green; new packages pass lint/compile/test; UPSTREAM_DIFFS.md updated (pages.ts,
      routers only)

## After
Update keybrar-status (NEXT = FILE_05) → commit `feat(course): course engine + unit 1` → push
→ fresh session.
