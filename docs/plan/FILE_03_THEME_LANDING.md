# SESSION 3 — KeybrAR theme + landing redesign
# Spec: SPEC_V2.md §Design. Recall keybrar-brand BEFORE any styling/copy.

---

## Before You Start
1. Read `packages/keybr-themes/lib/themes/theme-1-light.less` + `palettes.less` + how themes
   register (`index.ts`, `prefs.ts`, custom-theme.ts) and where the theme picker lists them.
2. Read the landing content component: find what renders the logged-out `/` hero
   (grep "Learn to Type Faster" → likely page-practice or keybr-pages-server view).
3. Fonts: check existing Arabic font assets (`arad-*.arabic.woff2`) + how fonts load
   (keybr-assets / less). NO new font dependency without checking size.

## Task A — KeybrAR theme
1. New `theme-8-keybrar.less` copying theme-1-light shape. Palette: pick warm, learning-calm
   scheme distinct from keybr defaults (keybrar-brand feel: focused, encouraging). Both a
   light and dark variant if the theme system pairs them — follow the system, don't invent.
2. Register it; make it the DEFAULT for new visitors (find default theme pref).
3. Arabic type: ensure ar UI + lesson text use the Arabic font stack at comfortable size/line
   height (RTL legibility); Latin fallback pairs cleanly.
4. Verify practice screen, profile charts, settings all readable under new theme (charts use
   theme tokens — check keybr-chart).

## Task B — Logo + landing
1. Simple logo: "KeybrAR" wordmark (SVG, works on light+dark, RTL-safe placement). Favicon.
2. Redesign the logged-out landing section on `/`: Arabic hero (tagline «تعلّم الكتابة باللمس
   بالعربية»), 3 feature cards (adaptive practice / structured course / progress tracking),
   course pitch strip with «ابدأ الدورة» CTA → /course (page exists S4; link can 404 until
   then behind a feature look, or point to signup), footer credits.
   en variant mirrors in English LTR.
3. Design bar: impeccable/frontend-design discipline — designed empty states, spacing rhythm,
   no bare defaults. This is OUR page; make it clearly better than upstream's.

## Smoke Test
- [ ] New visitor gets KeybrAR theme; theme picker still offers upstream themes
- [ ] Landing `/` (ar, RTL) + `/en` (LTR) both designed, no broken layout at 360px width
- [ ] Practice/profile/settings legible under theme (spot-check dark too)
- [ ] Arabic font renders lesson text (no tofu, proper shaping)
- [ ] Gates green + UPSTREAM_DIFFS.md updated (theme registration + landing files)
- [ ] keybrar-brand checklist passes (Arabic reads natural, lexicon terms, credits intact)

## After
Update keybrar-status (NEXT = FILE_04) → commit `feat(brand): keybrar theme + landing` → push
→ fresh session.
