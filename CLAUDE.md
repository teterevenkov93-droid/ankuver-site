# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-file Russian landing page (`index.html`) for АНКУВЕР — a HACCP (ХАССП) cleaning-inventory supplier for food production facilities. No build system, no framework, no tests: all CSS, inline SVG illustrations, and JS live in `index.html`. Open it directly in a browser to view; no dev server needed. All site copy is in Russian.

## Commands

Site: none — edit `index.html`, refresh browser.

Remotion promo video (separate npm project in `video/`):

```bash
cd video
npm run dev                              # Remotion Studio preview
npx remotion still Promo --frame=45 --scale=0.25 out/check.png   # one-frame sanity check
npx remotion render Promo out/promo.mp4  # full render
npx tsc --noEmit                         # typecheck
```

Windows quirk: `npx remotion add <pkg>` fails with `spawn npm ENOENT` — install packages directly with `npm i --save-exact <pkg>@<remotion-version>` instead, matching the version of `remotion` in package.json.

Category photos: source of truth is `Desktop/фото для сайта/` (6 category folders × 7 colorway subfolders with `screen.png`, plus `фон/`). They are converted to `assets/cat-{slug}-{color}.jpg` (720px jpeg) and `assets/bg-facility.jpg` with sharp from `tools/`. Colorway order differs per folder — verify visually before mapping. Legacy generators (`tools/gen-photos.mjs`, `tools/restyle-photo.mjs`) are kept for history.

## Design system — authoritative sources

`PRODUCT.md` and `DESIGN.md` in the root define brand, audience, and the visual system (North Star: «Карта зон» / The Zone Map). Follow them for any UI change. Core tokens are CSS custom properties at the top of `index.html`:

- Sanitary Blue `#14406e` (primary), Action Green `#2f9e5c` (CTA/accent)
- HACCP zone colors: `--zone-red/blue/yellow/green/white/purple/orange` + `--zone-darkred` (sanitary cleaning) — semantic, used for zone coding across the page
- Fonts: Oswald (headings) + IBM Plex Sans/Mono (body/data); radius 3px, flat-at-rest
- The Remotion video (`video/src/theme.ts`) mirrors these tokens — keep them in sync

`.impeccable/config.json` records approved design-hook exceptions (placeholder gradient colors, 4px logomark radius, prose-documented font sizes). Don't "fix" values listed there; don't add new exceptions without user confirmation.

## index.html structure

One file, in order: CSS (`<style>`, tokens first), inline SVG `<symbol>` defs (`pic-*`/`inv-*` illustrations, now used only as review-card icons and legacy fallbacks), page sections, then JS at the bottom. GSAP 3.12.5 + ScrollTrigger and Motion 12 (`motion.js`, vanilla build — see the `motion-vanilla-animations` skill) are vendored in `vendor/` (no CDN). Engine ownership: GSAP drives the mop scroll-progress strip in the header (a mop "washes in" a repeating HACCP wordmark) and the pinned zoning scene (`#zoning`, desktop-only pin, 7 HACCP colors); CSS drives the hero load sequence and card entrances; Motion drives micro-interactions only (button press springs, invalid-field shake) behind an `html.motion` class gate. Never animate the same element's property with two engines. Everything must stay fully readable with JS disabled or `prefers-reduced-motion`.

## Catalog page

`catalog.html` is GENERATED — do not edit by hand. Source: `assets/catalog/catalog-data.json` (18 categories, 199 items; names scraped from schavon.ru 2026-07-19) + generator `tools/build-catalog-page.mjs`; images built from `Desktop/schavon-images` by `tools/build-catalog.mjs` into `assets/catalog/{slug}/{артикул}.jpg` (600px, white-padded). To change catalog content: edit the JSON (or NAMES in build-catalog.mjs), then `cd tools && node build-catalog-page.mjs`. Category drill-down is JS view-switching over hash routing; without JS the page shows all sections with anchor navigation. Product photos are TEMPORARY (supplier's, schavon.ru) — user plans to replace them.

## Known placeholders (intentional, pending)

- Forms: full client pipeline exists (validation with inline Russian errors, honeypot, double-submit lock, 12s timeout, success/error states), but `LEAD_ENDPOINT` in the form script is an empty string — until a real endpoint (Formspree/Web3Forms/webhook) is pasted there, submits fall back to a prefilled `mailto:info@ankuver.ru`
- Phone number is fake (used in `tel:` links in header, mobile menu, and contacts — replace in all three places)
- Address in contacts is fake (ул. Примерная); map block is a styled placeholder (swap for a Yandex/Google Maps iframe)
