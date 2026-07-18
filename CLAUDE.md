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

Category photo generation (`tools/gen-photos.mjs`): `GEMINI_API_KEY=... node tools/gen-photos.mjs` writes 8 photos to `assets/cat-*.png`. Requires a Gemini key **with billing enabled** — free-tier image quota is 0. Manual fallback prompts: `tools/photo-prompts.md`.

## Design system — authoritative sources

`PRODUCT.md` and `DESIGN.md` in the root define brand, audience, and the visual system (North Star: «Карта зон» / The Zone Map). Follow them for any UI change. Core tokens are CSS custom properties at the top of `index.html`:

- Sanitary Blue `#14406e` (primary), Action Green `#2f9e5c` (CTA/accent)
- HACCP zone colors: `--zone-red/blue/green/yellow/white` — semantic, used for zone coding across the page
- Fonts: Oswald (headings) + IBM Plex Sans/Mono (body/data); radius 3px, flat-at-rest
- The Remotion video (`video/src/theme.ts`) mirrors these tokens — keep them in sync

`.impeccable/config.json` records approved design-hook exceptions (placeholder gradient colors, 4px logomark radius, prose-documented font sizes). Don't "fix" values listed there; don't add new exceptions without user confirmation.

## index.html structure

One file, in order: CSS (`<style>`, tokens first), inline SVG `<symbol>` defs (`pic-*` category illustrations with hover "tool works" animations), page sections, then JS at the bottom. GSAP 3.12.5 + ScrollTrigger are vendored in `vendor/` (no CDN). JS powers a zone-color scroll progress bar in the header and a pinned scroll scene «Аудит цеха» (`#audit`) — the pin is desktop-only and the section must stay fully readable with JS disabled or `prefers-reduced-motion`.

## Known placeholders (intentional, pending)

- Forms post to `#` — leads go nowhere yet
- Phone number is fake
- No mobile menu below 900px
- `.ph-1..6` gradient backgrounds on category cards stand in for real photos (to land in `assets/cat-*.png`, then be wired into the 8 `.pf-card` elements)
