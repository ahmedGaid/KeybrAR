# SESSION 4 — Arabic UI, RTL Shell, KeybrAR Brand
# Files: UI locale/message files (locate exactly in Task A), root html/dir handling,
#        site name/logo/landing components, footer

---

## Before You Start

1. Find keybr's i18n system: search repo for `react-intl` / `FormattedMessage` / a `messages`
   or `translations` directory. Note: does an `ar` locale already exist (even partial)?
2. Find where the app sets `<html lang dir>` or page direction per locale.
3. Find brand surfaces: site title component, logo asset(s), landing/home page copy, footer.
4. Read how upstream picks default locale (browser detect? setting?).

Do not write anything yet.

---

## Task A — Arabic UI locale

- If `ar` translation files exist upstream (keybr crowdsources translations): audit
  completeness, fill gaps.
- If not: create `ar` locale following the exact file format of an existing locale (e.g. `he`
  or `ru`), translating the visible UI strings (nav, lesson screen, settings, profile, typing
  test, multiplayer). Machine-translate then hand-fix; keep typing-domain terms consistent:
  - typing speed = سرعة الكتابة · accuracy = الدقة · lesson = تمرين · practice = تدريب
  - words per minute = كلمة في الدقيقة · keyboard = لوحة المفاتيح · layout = توزيعة
- Register the locale wherever upstream lists supported UI locales.

## Task B — RTL page shell

When UI locale = ar: `<html dir="rtl" lang="ar">`. Follow whatever upstream does for `he` if it
already handles this. Visual pass over main screens for broken mirroring (charts, key stats
tiles); fix with logical CSS properties only (`margin-inline-start` etc.), smallest diffs.

**Do not force RTL on the typing area via the page shell** — the lesson surface direction is
driven by the LESSON language (done in session 3), not the UI locale. English UI + Arabic lesson
and Arabic UI + English lesson must both work.

## Task C — Default Arabic-first

- Default UI locale: `ar` when browser prefers Arabic, else `en` (respect upstream's detect
  mechanism; just ensure `ar` participates).
- Default practice language for new visitors: Arabic. Find where the default lesson language is
  chosen and set `ar`.

## Task D — Brand: KeybrAR

- Site name: **KeybrAR** (Arabic display: **كيبرار** — or transliteration-free tagline; keep
  name Latin, tagline Arabic: «تعلّم الكتابة باللمس بالعربية»).
- Swap logo/title/OG meta. Keep design language of upstream (dark/light themes untouched).
- Footer additions (AGPL compliance + credits):
  - "Source code" → https://github.com/ahmedGaid/KeybrAR (AGPL-3.0)
  - "Based on keybr.com by Aliaksandr Radzivanovich" → https://github.com/aradzie/keybr.com
  - Word frequency data credit → hermitdave/FrequencyWords (CC-BY-SA-4.0)

---

## Smoke Test

- [ ] UI switchable en ⇄ ar from the locale picker; ar renders full RTL shell
- [ ] No visibly broken/mirror-wrong screens in: home, practice, profile, settings, typing test
- [ ] Arabic UI + Arabic lesson: everything RTL and correct
- [ ] English UI + Arabic lesson: page LTR, lesson RTL — both correct simultaneously
- [ ] Fresh browser (incognito, ar-EG locale): lands on Arabic UI, Arabic practice by default
- [ ] KeybrAR name/logo everywhere upstream brand was; footer has all three credit links
- [ ] Build + tests green; commit `feat(ar): Arabic UI locale, RTL shell, KeybrAR brand` pushed

---

## After This Session

```
Smoke test passed?
→ Type /compact in Claude Code
→ Open FILE_05_DEPLOY.md and continue
```
