---
name: АНКУВЕР
description: HACCP (ХАССП) inventory and facility audits for the food industry — zone-coded, engineered, in stock.
colors:
  sanitary-blue: "#14406e"
  sanitary-blue-bright: "#1b5391"
  washed-blue: "#eaf1f8"
  paper-white: "#ffffff"
  frost-line: "#d7e0ea"
  ink: "#16293c"
  steel-text: "#55687c"
  action-green: "#2f9e5c"
  action-green-deep: "#23824a"
  mint-signal: "#7fd6a4"
  zone-red: "#c0392b"
  zone-blue: "#2b6cb0"
  zone-green: "#2f9e5c"
  zone-yellow: "#d6a324"
  zone-white: "#e9e7dd"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(34px, 5vw, 58px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(26px, 3.4vw, 38px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "0.02em"
  title:
    fontFamily: "Oswald, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  base: "3px"
spacing:
  xs: "14px"
  sm: "18px"
  md: "24px"
  lg: "44px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.action-green}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "15px 28px"
  button-primary-hover:
    backgroundColor: "{colors.action-green-deep}"
  button-blue:
    backgroundColor: "{colors.sanitary-blue}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "15px 28px"
  button-blue-hover:
    backgroundColor: "{colors.sanitary-blue-bright}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "15px 28px"
  card:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.base}"
    padding: "36px 32px"
  input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "12px 14px"
---

# Design System: АНКУВЕР

## 1. Overview

**Creative North Star: "Карта зон" (The Zone Map)**

The entire system is organized like a facility zone map: everything is coded, legible, and in its place. Five HACCP zone colors (red, blue, green, yellow, white) act as the brand's native vocabulary — they appear as wayfinding wherever zone meaning is real (the legend, product-group chips, the logomark's key teeth) and nowhere else. Around that coded core sits an engineered, procedural frame: condensed uppercase Oswald headings, IBM Plex Mono labels that read like equipment markings, sharp 3px corners, and hairline borders. The whole page should feel the way a facility feels after a passed audit — ordered, inspection-ready, nothing to hide.

This system explicitly rejects the wholesale price-list aesthetic (cluttered product grids, popups, «Купить оптом!» banners) and flashy startup-landing gradients that read unserious to industrial buyers. Density is moderate and disciplined: generous 88px section rhythm, but tight, information-dense modules inside it.

**Key Characteristics:**
- Five HACCP zone colors used as information, never decoration
- Deep Sanitary Blue surfaces alternating with white and washed-blue sections
- Green reserved for action; every CTA is green
- Mono uppercase micro-labels as the procedural voice
- Flat surfaces, 1px hairlines, sharp 3px radius throughout

## 2. Colors: The Zone Map Palette

A committed two-color industrial palette (deep blue + action green) with the five-color HACCP zone code as a strictly functional tertiary layer.

### Primary
- **Санитарный синий / Sanitary Blue** (#14406e): the color of detectable food-industry plastic and hygiene zones. Carries the hero, reviews, contacts, and footer as full-bleed surfaces; also headings on light sections and the secondary nav button. **Sanitary Blue Bright** (#1b5391) is its gradient partner and hover state. **Washed Blue** (#eaf1f8) is the light section background that alternates with white.

### Secondary
- **Action Green** (#2f9e5c): the conversion color. Buttons, list bullets, focus borders, the eyebrow dash. Deepens to **#23824a** on hover. On dark blue surfaces its light companion **Mint Signal** (#7fd6a4) carries small labels and highlighted hero words.

### Tertiary
- **HACCP Zone Code** — Red (#c0392b), Blue (#2b6cb0), Green (#2f9e5c), Yellow (#d6a324), White (#e9e7dd): the 5-zone coding system. Appears in the zone legend, the hero zone bar, portfolio zone chips, and the logomark key teeth. These are semantic, regulated colors.

### Neutral
- **Ink** (#16293c): body and heading text on light surfaces.
- **Steel Text** (#55687c): secondary text, nav links, captions (5.6:1 on white — keep it off tinted backgrounds smaller than 14px).
- **Frost Line** (#d7e0ea): all hairline borders and dividers on light surfaces; dark surfaces use white at 12–18% alpha instead.
- **Paper White** (#ffffff): base background and card surfaces.

### Named Rules
**The Zone Rule.** The five HACCP colors may appear only where zone meaning is real: legends, product-group chips, the zone bar, the logomark. Using a zone color as page decoration is prohibited — it corrupts the code the brand sells.

**The One Green Rule.** Green means "act". If an element is green, it is clickable or marks an action path. Never use green for passive decoration.

## 3. Typography

**Display Font:** Oswald (sans-serif fallback) — always uppercase, weight 600
**Body Font:** IBM Plex Sans (sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono, weight 500

**Character:** An industrial condensed-plus-grotesque pairing. Oswald's compressed uppercase reads like stencilled equipment signage; IBM Plex Sans keeps body copy neutral and legible; IBM Plex Mono turns every small label into a procedural marking — article numbers, zone codes, checklist items.

### Hierarchy
- **Display** (600, clamp(34px, 5vw, 58px), 1.06): hero H1 only. White on Sanitary Blue, with Mint Signal for the emphasized phrase.
- **Headline** (600, clamp(26px, 3.4vw, 38px), 1.12): section H2s, uppercase, Sanitary Blue on light surfaces / white on dark.
- **Title** (600, 20px): card H3s, uppercase.
- **Body** (400, 15–17px, 1.55): IBM Plex Sans; keep line length within the existing 540–660px content maxes (~65–75ch).
- **Label** (500, 11–13px, letter-spacing 0.06–0.14em, uppercase): IBM Plex Mono. Eyebrows, button labels, form labels, contact-info labels.

### Named Rules
**The Marking Rule.** Anything small and systematic — kickers, form labels, button text, metadata — is set in IBM Plex Mono uppercase with wide tracking. This is the brand's one kicker system; it always carries its 22px green dash prefix in section heads. Do not invent a second small-label style.

## 4. Elevation

Flat by default. Surfaces sit on hairline Frost Line borders (1px) or on solid color; there are no resting shadows anywhere. Depth on the dark blue surfaces is conveyed tonally — translucent white fills (4–6% alpha) with 12–18% alpha borders. Shadow exists only as a state response: portfolio cards lift 4px and cast one soft blue-tinted shadow on hover.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 12px 28px rgba(20,64,110,0.12)` + `translateY(-4px)`): interactive cards only, on hover.

### Named Rules
**The Flat-At-Rest Rule.** No element casts a shadow at rest. A shadow is always an answer to the cursor.

## 5. Components

Engineered and precise: sharp 3px radius everywhere, mono uppercase labels, hairline borders — like the control panel of industrial equipment.

### Buttons
- **Shape:** sharp, near-square corners (3px radius)
- **Primary (green):** Action Green (#2f9e5c) fill, white IBM Plex Mono 13px uppercase label, 15px 28px padding; darkens to #23824a on hover. Reserved for conversion actions (catalog, KP).
- **Blue:** Sanitary Blue fill, same geometry; the header/nav CTA. Hover brightens to #1b5391.
- **Ghost:** transparent with white 40%-alpha border, for dark surfaces only; hover fills white at 8% and solidifies the border.
- **Press state:** all buttons nudge down 1px (`translateY(1px)`) on `:active`.

### Section Kicker (signature)
- **Style:** IBM Plex Mono 12.5px, 0.14em tracking, uppercase, Action Green (Mint Signal on dark), always prefixed by a 22px × 2px green dash. This is the section wayfinding system — one per section head.

### Zone Legend / Zone Chips (signature)
- **Legend row:** 13px color dot + bold zone name + description, separated by dashed 16%-alpha white hairlines (dark surfaces).
- **Zone chip:** 22px circle with 2px white 85%-alpha ring, pinned to portfolio card corners to code product groups.
- **Zone bar:** 6px five-segment strip (red/blue/green/yellow/white) topping the hero — the zone map in miniature.

### Cards / Containers
- **Corner Style:** 3px radius
- **Background:** Paper White on light sections; white at 5–6% alpha on dark blue
- **Border:** 1px Frost Line (light) / 1px white 14–16% alpha (dark); service cards carry a 4px top border in their category color (blue for audit, green for supply)
- **Shadow Strategy:** none at rest; hover lift on interactive (portfolio) cards only
- **Internal Padding:** 26–36px

### Inputs / Fields
- **Style:** white fill, 1px Frost Line border, 3px radius, 12px 14px padding; labels in IBM Plex Mono 11px uppercase above
- **Focus:** border switches to Action Green with a 3px Action Green 25%-alpha ring (box-shadow); links and buttons get a 2px Action Green `:focus-visible` outline
- **Dark variant (`form-dark`):** white 4%-alpha fill, white 20%-alpha border, white text, 35%-alpha placeholders

### Navigation
- **Style:** sticky white header at 94% opacity with 8px backdrop blur, 1px Frost Line bottom border, 76px tall. Links are IBM Plex Sans 14px/500 in Steel Text, darkening to Sanitary Blue on hover. Mono phone number (`tel:` link) + blue button CTA on the right. Below 900px links collapse into a 44px burger toggle that expands a dropdown panel under the header (grid-rows 0fr→1fr, 280ms; instant under reduced-motion): the five nav links plus the mono phone number, 48px rows separated by dashed Frost Line.

### Logomark (signature)
- A key inside a Sanitary Blue tile: white bow and shaft, five teeth in the five zone colors. Teeth glow in a staggered 3.2s cycle; the key rotates −38° on logo hover. Both animations are disabled under `prefers-reduced-motion`.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Action Green (#2f9e5c) for actions — every green element must be clickable or mark the conversion path (The One Green Rule).
- **Do** use the five HACCP zone colors only where zone meaning is real: legends, chips, the zone bar, the key teeth (The Zone Rule).
- **Do** treat the category color-row (`.color-dot`, 18px circles under each category card) as product-color swatches, not zones: the five zone colors plus `--inv-purple` (#8e44ad) and `--inv-orange` (#d35400). Hover/focus on a dot recolors the category photo via a `mix-blend-mode: color` overlay (`.pf-tint`) driven by CSS `:has()` — no JS.
- **Do** keep all radii at exactly 3px and all resting borders at 1px — sharpness is the "engineered and precise" signature.
- **Do** set every small systematic label in IBM Plex Mono uppercase with wide tracking (The Marking Rule).
- **Do** provide a `prefers-reduced-motion` alternative for every animation, as the logomark and map pin already do.
- **Do** keep one animation engine per element: GSAP owns scroll scenes, CSS owns entrances, Motion (vanilla, `html.motion` gate) owns micro-interactions — button press springs (`bounce: 0`, damped per the no-overshoot rule), zone-chip pop-in on category cards, invalid-field shake.
- **Do** keep body text at Ink (#16293c) or Steel Text (#55687c) on white, and white at ≥75% alpha on Sanitary Blue — WCAG AA (4.5:1) is the floor.

### Don't:
- **Don't** let this look like a wholesale price-list site: no cluttered product grids, no popups, no «Купить оптом!» banners (PRODUCT.md anti-reference).
- **Don't** import flashy startup-landing aesthetics: no decorative gradients beyond the single hero blue-to-blue wash, no glassmorphism, no gradient text (PRODUCT.md anti-reference).
- **Don't** use zone colors decoratively — a red divider or yellow highlight that isn't zone semantics breaks the system's credibility.
- **Don't** add resting shadows or rounded (>3px) corners; softness reads as consumer, not industrial.
- **Don't** use `border-left`/`border-right` color stripes on cards or callouts; the only permitted accent border is the existing 4px category top border on service cards.
- **Don't** set Steel Text (#55687c) on tinted or dark backgrounds — it washes out; use alpha-white on dark surfaces instead.
