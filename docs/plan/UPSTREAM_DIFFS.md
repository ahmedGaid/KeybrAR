# Upstream diffs — merge-conflict budget

Every change to a file that exists in upstream keybr.com goes here, so a future
`git merge upstream/master` knows exactly what to re-check. Additive-only new
files (new packages, new pages) are NOT listed — only edits to shared files.

## Session 1 — fork + Windows build

- `webpack-manifest.js` — path-test regexes used forward slashes only, broke
  on Windows; use `[\/]` + `posix.join` for manifest URLs. No Linux behavior
  change. Upstream-PR candidate.
- `webpack.config.js` — same Windows path-separator fix. Upstream-PR candidate.

## Session 2 — Arabic-first defaults + rebrand basics

- `packages/keybr-intl/lib/locale.ts` — `defaultLocale` "en" → "ar";
  `allLocales` literal `"ar"` entry removed (now implied by `defaultLocale`),
  `"en"` added explicitly. Result: `/` = Arabic, `/en` = English (via existing
  `Pages.intlBase`/`intlPath`, unchanged).
- `packages/keybr-intl/lib/numbers.ts`, `packages/keybr-intl/lib/durations.ts`
  — force `numberingSystem: "latn"` on all `intl.formatNumber`/`formatDate`
  calls. Without this, the `ar` locale's default Arabic-Indic digits (٠١٢...)
  would replace Western digits everywhere (WPM, accuracy, dates), violating
  the "Western digits in v1" brand rule.
- `packages/page-profile/lib/profile/AccuracyStreaksSection.tsx`,
  `packages/keybr-lesson-ui/lib/DailyStats.tsx` — added
  `numberingSystem: "latn"` to two direct `formatDate` calls (same reason,
  not covered by the keybr-intl helper since these call `useIntl()` directly).
- `packages/keybr-keyboard/lib/settings.ts` — `keyboardProps.language`/
  `.layout` defaults and `KeyboardOptions.default()` changed from
  `Language.EN`/`Layout.EN_US` to `Language.AR`/`Layout.AR_SA`.
- `packages/keybr-keyboard/lib/settings.test.ts` — updated 2 assertions to
  match the new AR/AR_SA default.
- `packages/page-practice/lib/PracticePage.tsx` — the upstream
  `setDefaultLayout(navigator.language)` auto-detect used to silently
  override our new Arabic default back to `Layout.EN_US` for any visitor
  whose browser/OS locale is English (very common even among Arabic
  learners). Narrowed the condition to only apply when the detected layout's
  language is `Language.AR`, so browser locale can reinforce but never
  override the Arabic-first default.
- `packages/keybr-pages-shared/lib/pages.ts` — `Pages` shared `meta` array:
  removed upstream's `fb:app_id`, hardcoded `og:url`/`og:image` (wrong
  domain/asset, revisit in S3/S7), `twitter:site`/`twitter:creator`
  (`@keybrcom` isn't ours). `og:site_name`/`og:title`/`og:description` are
  now localized `defineMessage`s ("KeybrAR" / Arabic tagline) instead of
  hardcoded "keybr.com - Typing lessons" strings.
- `packages/keybr-pages-browser/lib/SubMenu.tsx` — `GithubLink` now points to
  our repo (`github.com/ahmedGaid/KeybrAR`) instead of upstream's. Added two
  new footer links: `AttributionLink` (credits keybr.com / Aliaksandr
  Radzivanovich — AGPL/attribution obligation) and `WordsCreditLink`
  (credits hermitdave/FrequencyWords, CC BY-SA 4.0 — dictionary source
  obligation).
- `packages/keybr-pages-browser/lib/SubMenu.test.tsx` — updated to expect
  "العربية" instead of "English" for the default-locale switcher link.
- `packages/keybr-intl/translations/en.json` + `ar.json` (source) and the
  generated `packages/keybr-intl/lib/messages/*.json` (compiled, via
  `npm run translate`) — added `meta.siteName`, `meta.siteTitle`,
  `meta.siteDescription`, `footer.attributionLink.description`,
  `footer.wordsCreditLink.description`; updated `footer.githubLink.description`
  text (keybr.com → KeybrAR).

## Session 3 — KeybrAR theme + logo + landing

- `packages/keybr-themes/lib/themes/themes.ts` — added a `keybrar` entry as the
  **first** item in the `COLORS` `ThemeList` (list order = default; `.default`
  returns `#themes[0]`). Makes the KeybrAR warm terracotta/sand theme the
  out-of-box default for anonymous visitors.
- `packages/keybr-themes/lib/themes/index.less` — `@import` of the new
  `theme-9-keybrar.less` (new additive file, not a shared-file edit).
- `packages/keybr-pages-browser/lib/NavMenu.tsx` — render the new `Logo`
  wordmark (new additive `Logo.tsx`/`Logo.module.less`) in the nav.
- `packages/keybr-pages-server/lib/entry.ts` + `lib/meta.tsx` — wire the new
  `favicon.svg` (new additive asset) as the SVG favicon; old PNG favicons kept
  as fallback (real multi-res PNG regen still pending — no rasterizer this
  session).
- `packages/page-practice/lib/PracticePage.tsx` — render the new `Landing`
  (new additive `lib/landing/`) above the live lesson **only** for anonymous
  users (`publicUser.id == null`); keybr's instant-typing hook stays intact.
- `packages/keybr-intl/translations/en.json` + `ar.json` (source) and generated
  `lib/messages/*.json` (via `npm run translate`) — added 10 `landing.*` keys
  (hero title/subhead, 3 feature card titles+bodies, course CTA strip).

### Session 3 — pre-existing test failures fixed (caused by S2's Arabic-default flip, surfaced now)

- `packages/keybr-intl/lib/locale.test.ts` — unmatched-locale fallthrough now
  resolves to `ar` (was `en`); updated `filter()`, `filter("xx")`,
  `filter("en-CA")` assertions.
- `packages/keybr-pages-server/lib/Shell.test.tsx` + `ErrorPage.test.tsx` —
  `data-color` default assertion `system` → `keybrar` (4 spots).
- `packages/page-practice/lib/PracticePage.test.tsx`,
  `practice/PracticeScreen.test.tsx`, `settings/SettingsScreen.test.tsx` —
  pin an explicit English keyboard (`KeyboardOptions…withLanguage(EN)
  .withLayout(EN_US)`) in the fixture. `FakePhoneticModel` is English-only, so
  under the new Arabic-default keyboard the guided lesson generator found zero
  letter overlap and threw / filtered out the Latin custom text.

### Explicitly NOT touched (traps identified during audit)

- `scripts/locale.js` — a **separate**, hardcoded `defaultLocale = "en"` used
  only by `scripts/translate.js` to decide which `translations/*.json` file
  is the AST-extracted source of truth. This is unrelated to the UI's
  routing default (`keybr-intl/lib/locale.ts`) — it must stay "en" because
  `defaultMessage` in source code is always written in English. Flipping it
  would make `npm run translate` overwrite `translations/ar.json` with raw
  English text on the next run.
- `Language.AR` alphabet (28 letters, no hamza forms) and the Windows Arabic
  101 layout data (`cldr-keyboards-43.0/keyboards/windows/ar-t-k0-windows.xml`)
  — audited, both correct/standard. Upstream's call to exclude hamza from the
  base alphabet; we don't fight it (course units 4 covers hamza forms
  separately per SPEC_V2).
- `packages/page-typing-test/lib/settings.ts` (`typingTestProps.language`
  default) and `packages/keybr-textinput/lib/settings.ts`
  (`textDisplaySettings.language`) still default to `Language.EN`. Not
  required by S2's smoke test (only the Practice/lesson default is gated);
  flip these in a later polish pass if the Typing Test page should also be
  Arabic-first by default.
