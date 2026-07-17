# CircEats — Design.md
## Canonical Design Reference (derived from PRD v3 + `CircEats_Wireframe_ImpossibleStyle.html`)

This document is the single source of truth for visual fidelity. The HTML wireframe is the ground truth for exact values — this file organizes those values into a system so implementation doesn't drift from it section by section. If this doc and the wireframe ever disagree, the wireframe wins; update this file to match.

---

## 1. Design Tokens

```css
:root {
  /* Base */
  --black: #0F0F0F;
  --near-black: #1A1A1A;
  --white: #FFFFFF;
  --off-white: #F7F5F2;
  --gray-100: #EDEBE7;
  --gray-400: #8C8A86;
  --gray-600: #4A4846;

  /* Brand accent — sparingly, in bursts */
  --brand-green: #3D8B5F;
  --brand-lime: #C8F169;
  --brand-orange: #E85D2F;

  /* Functional */
  --shadow-soft: rgba(0,0,0,0.12);
  --border-hairline: rgba(0,0,0,0.08);
}
```

**90/10 rule**: 90% of any screen is black/white/off-white. Color appears only in: the CTA button, one accent word per headline, stat numbers, discount badges, and product-item accent shapes. Never introduce a new color outside this palette — if a section feels like it needs more visual interest, reach for typography scale or motion, not color.

---

## 2. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display headlines | Space Grotesk | 800 | uppercase, `letter-spacing: -0.02em`, `line-height: 0.95` |
| Body | Inter | 400 | `line-height: 1.5` |
| Eyebrow labels | Inter | 600 | 11px, `letter-spacing: 0.14em`, uppercase, `--gray-600` |
| Stat numbers | Space Grotesk | 800 | `.mono-stat` class name is legacy naming — it is NOT monospace |

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');

.display { font-family: 'Space Grotesk', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.95; }
body, p { font-family: 'Inter', sans-serif; font-weight: 400; }
.mono-stat { font-family: 'Space Grotesk', sans-serif; font-weight: 800; }
```

Type scale is fluid via `clamp()` — do not hardcode pixel sizes at breakpoints; use the clamp values already defined per component below.

---

## 3. Motion Language

This is the differentiator vs. a static clone — treat these as functional requirements, not polish.

1. **Sticky pinned hero** — `.hero-pin-wrapper` is 180vh tall; `.hero-content` is `position: sticky; top: 0; height: 100vh`. As the user scrolls through the extra 80vh, a full-bleed `--off-white` overlay (`.hero-fade-overlay`) fades in over the pinned content starting at 55% scroll progress through the wrapper, reaching full opacity at 100% — this is what makes the hero "recede" before the next section takes over the viewport.
2. **Floating parallax items** — 4 SVG illustrations (`float-main`, `float-sat1`, `float-sat2`, `float-tag`) each run an independent CSS `idleFloat*` keyframe loop (3.6s–5s, translateY + rotate) so they never move in sync. In the React build, additionally tie a `useScroll`/`useTransform` parallax offset to each item so they drift at a slower rate than page scroll (see PRD §4 code sample) — the CSS idle-float alone is the fallback for `prefers-reduced-motion`.
3. **Scroll-triggered reveal with scale** — sections don't just fade up, they scale `0.94 → 1.0` while `opacity 0 → 1`. Pattern used on: mission heading/paragraph (`.reveal-scale`/`.reveal-fade` + `.in-view`), how-it-works step rows (`.step-row` → `.step-row.in-view`, translateY 24px → 0). Trigger via IntersectionObserver at `threshold: 0.3` (CSS version) or Framer Motion `useInView` (React version) — same visual result.
4. **Horizontal scroll-snap carousel** — real `scroll-snap-type: x mandatory`, not a JS-animated marquee. Off-center cards sit at `scale(0.92) opacity: 0.6`; the centered card gets `.is-active` → `scale(1) opacity: 1` with a deeper shadow. Active-card detection: on every `scroll` event (rAF-throttled), find the card whose center is closest to the track's viewport center. Dots mirror the active index (`.dot.is-active` grows from a 6px circle to a 20px pill).
5. **Number count-up tied to scroll pin** — `.stats-pin-wrapper` is 160vh, `.stats-pin-content` sticky-pins for the scroll beat. Count-up triggers once via IntersectionObserver at `threshold: 0.5`, eases with cubic-out (`1 - (1-p)^3`) over 1800ms, formatted with `toLocaleString()` plus each stat's prefix/suffix (`t`, `=`, `$…M`). Never re-trigger once animated.
6. **Micro-interactions on hover** — buttons: `scale(1.03)` + deepened shadow on hover (`.btn-primary`, `.btn-lime`, `.btn-orange`, `.nav-cta` all share this transition timing: `transform .18s ease, box-shadow .18s ease`). Carousel cards: lift `translateY(-6px)` — the wireframe's current hover is shadow-only; PRD §2 motion spec 6 additionally calls for a subtle `rotateY(4deg)` tilt on desktop hover, which should be added in the React build (not yet in the HTML reference).
7. **Dark/light alternation** — Hero: off-white → Carousel: off-white (no hard seam) → Mission: **black** → How It Works: white → Stats: **black** → FAQ: off-white → Teaser: white → Footer: black. This alternation is load-bearing for the "premium" feel — never insert a section without deciding which side of light/dark it falls on.

---

## 4. Component Specs

### Nav (`nav`)
- Fixed, `z-index: 100`, transparent by default, `padding: 20px 40px`.
- On `window.scrollY > 40`: adds `.scrolled` → `background: rgba(247,245,242,0.9)`, `backdrop-filter: blur(12px)`, hairline bottom border. Transition on background/border/backdrop-filter, 0.3s ease.
- Logo mark: SVG avocado-derived shape (green fill `#3D8B5F`, black 2.5px stroke) + `Space Grotesk` 800 wordmark, 17px, uppercase.
- Nav links: underline-on-hover via `::after` width 0→100%, 0.25s ease.
- CTA: `.nav-cta` — black bg, white text, 8px radius (not full pill — this is an explicit break from "kawaii" rounded corners toward Impossible's squarer button language).
- Mobile (≤860px): nav links hidden (hamburger menu is a stated future need — the wireframe has `.hamburger { display:none }` as a placeholder only; a working mobile nav drawer is in-scope for the React build).

### Buttons
Three variants, same interaction physics (`scale(1.03)` + shadow deepen on hover, 0.18s ease):
- `.btn-primary` — black bg / white text — primary CTAs (Join Waitlist)
- `.btn-lime` — lime bg / black text — used exactly once, at large surface area, in the dark stats section ("Join the rescue") — this scarcity is intentional, do not reuse lime as a general secondary button color
- `.btn-orange` — orange bg / white text — reserved for supermarket/B2B context only (teaser strip)
- `.link-underline` — text link with static 1.5px bottom border, no button chrome (e.g. "For Supermarkets →")

### Hero
- Grid: `1.1fr 0.9fr`, gap 40px, max-width 1400px.
- H1: `clamp(48px, 6.2vw, 92px)`, 3 lines, last word ("LANDFILLS.") in `--brand-green`.
- Body copy: 17px, `--gray-600`, max-width 420px.
- Floating visual area: 520px tall, 4 absolutely-positioned SVGs at different scales/positions (see wireframe lines 345–376 for exact viewBox/paths — treat these SVGs as final assets, port verbatim).
- Stats strip directly below hero (outside the pin wrapper): 3 mini stats, centered, hairline top border.
- Mobile (≤860px): grid collapses to 1 column, `.hero-right` reorders above `.hero-left` (`order: -1`), floating items scale down (~60%).

### Carousel / Product Card
- Track: `overflow-x: auto`, `scroll-snap-type: x mandatory`, `padding: 10px 10vw 30px` (side padding lets first/last cards center), scrollbar hidden.
- Card: 260px fixed width, 16px radius, white bg, hairline border, `box-shadow: 0 4px 20px rgba(0,0,0,0.05)` at rest → `0 12px 32px rgba(0,0,0,0.1)` active.
- Discount badge: top-right, lime pill, `Space Grotesk` 800, 11px, e.g. "-45%".
- Content order: badge → visual (130px height, centered SVG w/ drop-shadow filter) → name (15px/600) → price row (new price `--brand-green` 800/18px + strikethrough old price `--gray-400`) → expiry (11px, `--gray-600`).
- 8 items in the reference set (Sourdough, Avocados, Milk, Bell Peppers, Eggs, Cherry Tomatoes, Wholegrain Bread, Broccoli) — treat as sample data, not final inventory; the React build should read this from a typed data array so real inventory can later replace it without touching component code.
- Dot pagination below track, active dot grows to a 20px pill.

### Dark Mission Section
- Full black bg, centered content, max-width 900px.
- Headline: `clamp(34px, 5.5vw, 64px)`, contains one struck-through word (`.strike`, orange strikethrough, 3px thick, 50% opacity) immediately followed by the reframe word in `.lime`.
- Paragraph: `--gray-400`, max-width 600px, delayed reveal (0.15s after headline).

### How It Works
- White bg, 3 step rows, each `grid-template-columns: 140px 1fr`, hairline top border (bottom border only on the last row).
- Ghost number: `Space Grotesk` 800, 88px, `-webkit-text-stroke: 1.5px var(--gray-100)`, transparent fill — outline-only "watermark" numeral.
- Step text: 22px/700 heading + 15px `--gray-600` body, max-width 520px.
- Mobile: grid collapses to 1 column; ghost numeral shrinks to 48px.
- PRD §3 additionally specifies a small line-art icon per step (black + one green accent) — not present in the current wireframe; treat as an addition for the React build, not a contradiction.

### Pinned Stats (Dark #2)
- `.stats-pin-wrapper` 160vh, black bg, sticky content pins and centers.
- Eyebrow: "COMPARED TO THROWING IT AWAY", `--gray-400`.
- 3 stats, `clamp(42px, 6vw, 88px)` numbers, 13px `--gray-400` labels (max-width 180px, wraps to 2 lines).
- `.btn-lime` CTA ("Join the rescue") directly below the stat row.
- Source citation: 11px `--gray-600`, smallest text on the page — never let it compete visually with the stats.

### FAQ Accordion
- Off-white bg, max-width 680px.
- Rows: hairline bottom border, 26px vertical padding, 17px/500 question text.
- Icon: pure CSS plus-sign (`::before`/`::after`), rotates to an X via `.faq-icon.open::after { transform: rotate(90deg); opacity: 0 }` — this is a minimal/thin icon by design, not a chunky glyph or SVG.
- Answer: `max-height` transition (0 → 200px cap), 0.4s ease — only one open at a time, opening a new one closes the previous.
- 7 FAQ items, content carried over verbatim from PRD v2 (see wireframe lines 642–650 for exact copy).

### Supermarket Teaser Strip
- White section bg, but the inner card itself is `--off-white` with a 1.5px `--brand-orange` border, 20px radius — this is the one place a colored border (not fill) is used as the accent move.
- Grid: `1fr auto` (copy left, button right), collapses to single column centered on mobile.

### Footer
- Black bg, `--gray-400` default text.
- Logo mark repeats but in lime/white (inverted from the nav's green/black version) — this inversion is intentional, not an inconsistency.
- 3 link columns (Company / Business / Follow), link hover color → `--brand-lime` (the only footer hover state that introduces color).
- Bottom bar: copyright left, tagline-as-CTA right ("Join the circle. Save the food."), 11.5px `--gray-600`.

---

## 5. Responsive Breakpoints

Single breakpoint defined in the reference: `@media (max-width: 860px)`. Behavior at that breakpoint:
- Hero grid → 1 column, visual reorders above copy
- Nav links hidden (hamburger placeholder — needs a real implementation, see Nav notes above)
- Step rows → 1 column
- Ghost numerals shrink 88px → 48px
- Big stat row gap tightens 70px → 32px
- Teaser card → 1 column, centered
- Footer top → column stack

The React build should also add an intermediate tablet breakpoint (~1024px) since the single 860px cutoff will feel abrupt on iPad-width viewports — this is a gap in the wireframe, not a spec to preserve.

---

## 6. Accessibility Notes

- All idle-float and parallax motion must respect `prefers-reduced-motion: reduce` — disable the CSS keyframes and Framer Motion transforms, keep only opacity-based reveals.
- Verify text contrast for `--gray-400` on `--black` (footer, dark sections) and `--gray-600` on `--off-white` (eyebrows, captions) meets WCAG AA at the sizes used.
- FAQ accordion and nav links must be keyboard-operable (native `<button>`/`<a>` semantics, visible focus states — not currently styled in the wireframe and need adding).
- Carousel must remain operable via keyboard/scroll, not only pointer drag.
