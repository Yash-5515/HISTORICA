# Handoff: HISTORICA Nahargarh — Museum Website

## Overview
Marketing + visitor website for **HISTORICA**, the museum inside Nahargarh Fort, Jaipur (formerly the *Jaipur Wax Museum*). A single long-scroll homepage that introduces the brand, presents the four experiences (Ram Prakash Talkies, Sheesh Mahal, Royal Darbar, Hall of Icons), tells the Wax Museum → HISTORICA story, shows an interactive timeline, the two films now showing, a full Plan Your Visit section (tickets, hours, directions, site map), Events & Tours, footer, and a 4-step ticket booking drawer.

Audience: domestic & international tourists, families, students, history enthusiasts. Mobile-first, fast, accessible, SEO-friendly.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing intended look, content and behavior. They are **not production code to ship directly**. Recreate the design in the target codebase's environment (e.g. Next.js/Astro/Nuxt with its established patterns). If no environment exists, a static-first framework such as **Astro** or **Next.js (SSG)** is recommended for SEO + performance. The Tweaks panel (`tweaks_panel.jsx` + the inline React block in the HTML) is a design-review tool only — **do not ship it**; instead pick the final direction (see "Directions").

## Fidelity
**High-fidelity.** Final colors, typography, spacing, imagery, copy and interactions. Recreate pixel-accurately. Items marked in the prototype with a monospace highlighted chip (`.tbc`) are **content placeholders awaiting verified data from the client** — do not invent values (client explicitly forbids invented facts, prices, reviews or credentials).

## Directions (choose one with the client)
Two directions exist, toggled via classes on `<html>`:
- **A · Royal Night (default)** — dark theme, `data-hero="cinematic"`, Cinzel display font.
- **B · Ivory Editorial** — `html.light` + `html.f-editorial`, `data-hero="split"`, Cormorant Garamond italic display.
Hero variants: `cinematic` | `split` | `reel`. Font sets: royal (default) | `f-editorial` | `f-classic` (Marcellus + EB Garamond). Implement only the chosen combination.

---

## Design Tokens

### Colors — Dark (default)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0c0a08` | page background |
| `--bg2` | `#15110d` | alt section bg (Story, Events) |
| `--bg3` | `#1d1712` | placeholder stripes |
| `--ink` | `#f1e9da` | primary text (warm ivory) |
| `--ink2` | `#c8bca7` | body/secondary text |
| `--ink3` | `#8a7f6e` | muted labels |
| `--gold` | `#c9a25a` | antique gold — accents, eyebrows, primary button |
| `--gold2` | `#e6c88a` | gold hover / highlight |
| `--gold-dim` | `rgba(201,162,90,.28)` | outlines, focus halos |
| `--red` | `#8f1d1a` | "Inaugural offer" badge (from logo ribbon) |
| `--line` | `rgba(201,162,90,.22)` | hairline dividers |
| Now Showing bg | `#070605` | always dark, even in light mode (`#120e0a`) |

### Colors — Light (`html.light`)
`--bg #f3ece0`, `--bg2 #ebe2d2`, `--bg3 #e2d6c1`, `--ink #1b1510`, `--ink2 #4a3f33`, `--ink3 #7c6f5e`, `--gold #94702e`, `--gold2 #7a5a20`, `--gold-dim rgba(148,112,46,.25)`, `--line rgba(120,90,40,.25)`.

### Typography (Google Fonts)
- **Display**: `Cinzel` 500, uppercase, letter-spacing `.06em`, line-height 1.04, `text-wrap: balance`.
- **Serif body**: `Cormorant Garamond` 400/500, base **19px** (18px ≤860px), line-height 1.55.
- **UI / labels / buttons**: `Jost` 400/500.
- Eyebrow: Jost 12px, 500, uppercase, letter-spacing `.32em`, color `--gold`.
- Lede: `clamp(20px, 2vw, 24px)`, `--ink2`, max-width 34em.
- Section H2: `clamp(38px, 5vw, 74px)`.
- Hero H1 (cinematic): `clamp(46px, 8.4vw, 128px)`, color `#f4ead6`, text-shadow `0 4px 40px rgba(0,0,0,.6)`.
- Experience H3: `clamp(36px, 4.4vw, 66px)`.
- Button: Jost 13px, 500, uppercase, letter-spacing `.22em`.

### Spacing / layout
- Horizontal page padding `--pad: clamp(20px, 5vw, 72px)`; content max-width **1440px**.
- Section vertical padding `clamp(80px, 12vw, 160px)`.
- Section header: 2-col grid (1fr 1fr), gap 40px, align end, margin-bottom `clamp(44px, 6vw, 80px)`.
- Breakpoints: **1060px** (nav links → burger), **860px** (all grids → single column; mobile sticky Book button appears).

### Shapes
- Square corners everywhere (no radius) except **arch** shape: `border-radius: 999px 999px 0 0` (Rajasthani arch) used on Sheesh Mahal image, Story frame, Split-hero main image.
- Inset gold frame on images: pseudo-element `inset: 12px; border: 1px solid rgba(230,200,138,.35)`.
- Diamond motif: 7px square rotated 45° with gold border (dividers, list bullets, timeline nodes).
- Shadows only on the logo (`drop-shadow`) and mobile sticky button (`0 10px 30px rgba(0,0,0,.5)`).

### Buttons
- `.btn-gold`: bg `--gold`, text `#140f09`; hover bg `--gold2`. Padding 17×28, min-height 52px.
- `.btn-line`: 1px border `--gold-dim`, text `--ink`; hover border `--gold`, text `--gold2`.
- Arrow glyph: 18px line + chevron, extends to 26px on hover (.3s).
- All hit targets ≥ 44px.

---

## Screens / Sections (top → bottom)

### 1. Navigation (fixed)
- Left: crest logo 44px + "HISTORICA" (Cinzel 600, 17px, `.18em`, `--gold2`) + "NAHARGARH · JAIPUR" (Jost 9.5px, `.34em`, `--ink3`).
- Center links: Experiences · Our Story · Timeline · Now Showing · Plan Your Visit (Jost 12.5px, `.2em`, uppercase; gold underline grows left→right on hover).
- Right: "Visit" (line) + "Book Tickets" (gold, opens booking drawer).
- Transparent over hero; after 40px scroll → `bg` at 88% + `backdrop-filter: blur(12px)` + bottom hairline, padding shrinks.
- ≤1060px: links hidden, burger (44×44) opens full-screen menu (Cinzel 34px links with hairlines, gold Book button). Burger morphs to ×.

### 2. Hero — Cinematic (Direction A)
- 100svh, full-bleed `assets/sheesh-mahal-wide.jpg` (center 40%), Ken Burns scale 1.08→1 over 22s.
- Overlay: radial vignette + linear gradient fading to `--bg` at bottom.
- Bottom-centered stack (staggered rise-in, 24px translate, 1.2s, cubic-bezier(.2,.7,.2,1), delays .2/.3/.55/.8/1s): eyebrow "Nahargarh Fort · Jaipur" → crest (130–190px) → H1 "Step Into History" → sub "Rajputana legend, mirrored palaces and the icons of a nation — brought to life high above Jaipur." → CTAs "Explore the Experiences" (gold) / "Plan Your Visit" (line).
- Animated gold scroll cue line at bottom center.

### 2b. Hero — Split (Direction B)
Left text column: eyebrow "Formerly the Jaipur Wax Museum", H1 "Mystery, sacrifice *&* history — in one place." (ampersand gold italic), lede incl. Hindi "रहस्य, त्याग और इतिहास — एक ही जगह", CTAs, facts row (4 Experiences / 2 Historical films / Nahargarh Fort). Right: 2×2 image grid (doorway arch spanning 2 rows; Sheesh Mahal; Royal Darbar) with small uppercase captions.

### 2c. Hero — Reel
Crossfading full-bleed slides (1.4s fade, 7s scale) auto-advancing every 6s; 4 tab buttons (I–IV, one per experience) with gold progress bar on the active tab.

### 3. Intro statement
Centered diamond rule; Cinzel `clamp(30px,3.8vw,56px)`: "Within the walls of Nahargarh, the **Jaipur Wax Museum** has become **HISTORICA** — a cinematic museum of Rajputana heritage." (gold spans). Row of 4 anchor links with Roman numerals I–IV.

### 4. Experiences (`#experiences`)
Header "The Four Experiences / One fort. Four worlds." Then 4 alternating rows (grid 1.25fr/1fr, image side swaps on even rows; hairline top border):
1. **Ram Prakash Talkies** — kicker "The Grand Film Experience"; mentions *Mystery of Nahargarh* & *Hadi Rani — The Ultimate Sacrifice*; list with taglines; CTA "See What's Showing". Image `film-nahargarh.jpg`.
2. **Sheesh Mahal** — kicker "Exquisite Mirrors"; arch image `sheesh-mahal.jpg`; tag "Photography & video not allowed inside".
3. **The Royal Darbar** — kicker "Feel Royal"; image `royal-lady.jpg`; 3-thumb strip (guard, doorway, throne).
4. **Hall of Icons** — kicker "Meet the Legends of the Nation"; image `hall-icons.jpg`; strip (Dandi March, cricket stand, family zone).
Image reveal: scale 1.12→1 over 1.6s when row enters viewport.

### 5. Our Story (`#story`) — scroll-driven
bg `--bg2`. Two columns: left sticky (100vh) arch frame with 4 stacked images crossfading; thin gold progress bar on the right edge fills with scroll. Right column: 5 steps (each ~72vh min-height); active step opacity 1, others .25. Steps: intro "From Wax Museum to HISTORICA" → I The Fort → II Jaipur Wax Museum (`tbc` founding year) → III A new chapter (`tbc`) → IV HISTORICA + "Plan Your Visit" CTA. Mobile: frame becomes a sticky 16:10 strip under the nav.

### 6. Timeline (`#timeline`)
Horizontal track of 5 nodes (diamond markers; active = filled gold + halo; gold fill line animates to active index, .6s). Labels: Fort/Nahargarh, Legend/Hadi Rani, Museum/Jaipur Wax Museum, Rebirth/HISTORICA, Today/Now showing. Panel below: image (16:10) + large outlined number (gold stroke) + eyebrow + title + text + prev/next square buttons (52px). Horizontally scrollable on mobile. Dates are `tbc`.

### 7. Now Showing (`#showing`)
Always-dark band. Two 3:4 poster cards (`poster-nahargarh.jpg`, `poster-hadi-2.jpg`) with bottom gradient caption: title (Cinzel), tagline ("The fort remembers" / "The ultimate sacrifice"), "Book" button. Hover: image scale 1.04, saturation up. Show timings `tbc`.

### 8. Plan Your Visit (`#visit`)
Two columns (1.25fr / 1fr).
**Ticket table** (verified from client creatives):
| Ticket | Indian | Foreign tourist |
|---|---|---|
| HISTORICA Entry (Inaugural offer) | ~~₹750~~ **₹500** | ~~₹1,500~~ **₹1,000** |
| Hall of Icons | ₹250 | ₹500 |
Notes: "Full ticket applies for visitors above 5 years. Photography and video are not allowed inside the Sheesh Mahal." Entry inclusions `tbc`. Price in Cinzel 30px gold; struck price Jost 15px muted; red "Inaugural offer" badge (Jost 10px, `.2em`).
Mobile: rows reflow to name full-width + 2 price cells with inline labels.
**Info list** (dl): Location (HISTORICA, Nahargarh Fort, Jaipur, Rajasthan), Hours `tbc`, Getting there `tbc`, Directions (Google Maps link), Contact `tbc`.
**Site map**: legend list (I–IV + ✦ Entrance) and a 16:11 map panel with numbered gold pins; hovering/clicking either highlights both and reveals the pin label. Current base image + pin positions are **indicative only** — replace with the official site plan.

### 9. Events & Tours (`#events`)
bg `--bg2`; 2 cols: heading "School groups, families & private visits" / lede + "Enquire" button. Group rates `tbc`.

### 10. Footer
Logo 120px + one-liner; columns "Explore" (4 experiences) and "Visit" (tickets, map, groups, story); bottom bar "© HISTORICA Nahargarh, Jaipur" + Hindi tagline.

### 11. Mobile sticky "Book Tickets"
≤860px only; fixed bottom (12px inset), slides up after scrolling past 80% of the first viewport.

### 12. Booking drawer
Right-side drawer, width `min(560px,100%)`, slides in (.5s), scrim rgba(0,0,0,.6). Header "Book Your Visit" + close (44px). Step tabs: Ticket · Date · Visitors · Review (active = gold underline).
1. **Ticket** — two selectable option cards (radio dot top-right); selecting pre-sets 1 Indian visitor.
2. **Date** — next 14 days grid (7 cols; 4 on mobile), selected = gold fill.
3. **Visitors** — steppers for Indian / Foreign tourist (0–20), prices per head; child policy `tbc`.
4. **Review** — summary table + total (gold). Primary button reads "Pay ₹X".
5. **Confirmation** — crest, "You're booked", date.
Footer shows running total; Continue disabled until the step is valid; Back hidden on step 1/confirmation. Esc / scrim / × closes. **Payment gateway must be integrated** (prototype is mock).

---

## Interactions & Behavior
- **Reveal on scroll**: `.rv` elements fade + rise 30px over 1s (stagger classes d1–d3 = .12/.24/.36s). Use IntersectionObserver **with a scroll-position fallback** (reveal when `top < innerHeight*0.92`) and a safety timeout so content can never stay hidden. Respect `prefers-reduced-motion` (all motion off, content visible).
- Smooth anchor scrolling; nav anchors offset for fixed header.
- Focus: 2px `--gold2` outline, 3px offset. Skip-to-content link provided.
- Dialog: `role="dialog" aria-modal="true"`; trap focus and return focus on close in production.

## State Management
- `nav.solid` (scrollY > 40), `menuOpen`, `reelIndex` (auto 6s), `storyActiveStep` + progress (scroll-derived), `timelineIndex`, `activeMapPin`.
- Booking: `{ step: 0–4, ticket, date, indianCount, foreignCount }`; `total = indian*ticket.in + foreign*ticket.fo`.
- Data to source from CMS/API: ticket types & prices, hours, show timings, timeline entries, contact, group rates, availability per date.

## SEO
`<title>`, meta description, OG tags, and `schema.org/Museum` JSON-LD are in the HTML head — keep and extend (add `openingHoursSpecification`, `geo`, `telephone` once verified). Use real `alt` text (provided), lazy-load below-fold images, serve AVIF/WebP with responsive `srcset`.

## Assets (`assets/`)
All derived from the client's supplied creatives and logo (crops/resizes; no stock or generated imagery):
- `logo.png` — official crest, background removed (transparent PNG). Request a vector/SVG master.
- `sheesh-mahal-wide.jpg` (2600w hero), `sheesh-mahal.jpg`, `royal-lady.jpg`, `guard.jpg`, `doorway.jpg`
- `film-nahargarh.jpg`, `film-hadi.jpg`, `poster-nahargarh.jpg`, `poster-hadi-1.jpg`, `poster-hadi-2.jpg`
- `hall-icons.jpg`, `gandhi-march.jpg`, `cricket.jpg`, `family.jpg`
- `fort-day.jpg`, `fort-night.jpg`
Several crops were taken from print flyers and may contain baked-in graphics; replace with original un-designed photography where available. Note: family zone imagery includes licensed cartoon characters — confirm usage rights.

## Files
- `HISTORICA Website.html` — full page markup (all sections, hero variants, booking drawer, Tweaks block)
- `historica.css` — all tokens, layout, responsive rules, animations
- `historica.js` — nav, reveals, reel hero, scroll story, timeline data/render, site map, booking flow
- `tweaks_panel.jsx` — design-review tool only (do not ship)
- `assets/` — images listed above
