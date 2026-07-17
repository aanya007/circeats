# CircEats — Landing Page PRD v3
## "Impossible Foods" Visual Direction — Product-Led, Motion-Driven, Editorial

---

## 1. What Changed From v2

**Layout and content structure stay the same** (hero → trolley/product moment → mission → how it works → impact stats → FAQ → footer). What changes is the **visual execution and motion language**, rebuilt to match impossiblefoods.com/beef/plant-based-impossible-burger:

- **Big floating product cutouts** instead of flat illustrations — hero features a large "hero item" (a rescued grocery item) floating with soft shadow, with smaller supporting items orbiting it
- **Pinned/sticky scroll sections** — text and stat panels stay fixed while content scrolls past or fades in behind them
- **Bold, oversized editorial typography** — huge uppercase statements broken across lines, mixed type weight (thin + black), similar to "FOR THE MEAT STANS"
- **Stat-driven proof sections** with giant numbers (like Impossible's "92% LESS WATER / 91% LESS EMISSIONS / 96% LESS LAND")
- **Horizontal scroll-snap carousels** for the trolley/rescue items section, not a passive auto-scroll marquee
- **Clean white/near-black base** with the CircEats brand colors used as *accents and pops only* — not everywhere. This is a shift from the "warm cream everywhere" v2 direction toward a more premium, restrained palette punctuated by color
- **Product-first photography-style treatment** — even though we're using illustration, items should feel "shot" (drop shadow, floating, slight rotation) rather than "drawn on a page"

**Content and copy stay anchored to the pitch deck** — every stat, headline, and section pulls directly from the CircEats pitch deck (attached), not invented from scratch.

---

## 2. Design System

### Color Palette (Restrained — Impossible Foods Style)

```css
:root {
  /* Base — mostly black, white, and off-white, like Impossible's site */
  --black: #0F0F0F;
  --near-black: #1A1A1A;
  --white: #FFFFFF;
  --off-white: #F7F5F2;
  --gray-100: #EDEBE7;
  --gray-400: #8C8A86;
  --gray-600: #4A4846;

  /* Brand accent — used sparingly, in bursts, like Impossible's red */
  --brand-green: #3D8B5F;      /* Deep, confident green — not pastel */
  --brand-lime: #C8F169;       /* Punch accent — used for CTAs, highlights, underlines only */
  --brand-orange: #E85D2F;     /* Secondary accent — used for supermarket/B2B context only */

  /* Functional */
  --shadow-soft: rgba(0,0,0,0.12);
  --border-hairline: rgba(0,0,0,0.08);
}
```

**Rule of thumb**: 90% of any given screen is black/white/off-white. Color shows up in: the CTA button, one headline word per section, the stat numbers, and product-item accents. This restraint is what makes Impossible's site feel premium instead of "kids app." We keep the CircEats warmth but earn it through typography and motion, not color saturation.

### Typography

- **Display headlines**: `Neue Machina` or (fallback via Google Fonts) `Space Grotesk` at Black/Bold weight — tight tracking, uppercase, big. This replaces Anton — Anton reads slightly too "cartoon condensed"; we want something that reads more editorial/confident like Impossible's headline type, while keeping some boldness.
  - Fallback stack if unavailable: `'Space Grotesk', 'Helvetica Neue', sans-serif`
- **Body**: `Inter` — neutral, clean, gets out of the way (swap from DM Sans; Inter reads closer to Impossible's body copy)
- **Stat numbers**: `Space Grotesk` Bold (not mono anymore — Impossible uses a bold grotesk for their "92%" stats, not monospace, which reads more premium)

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');

.display { font-family: 'Space Grotesk', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.95; }
body, p { font-family: 'Inter', sans-serif; font-weight: 400; }
.stat-num { font-family: 'Space Grotesk', sans-serif; font-weight: 800; }
```

### Motion Language (The Core Difference From v2)

This is the most important addition. Reference: impossiblefoods.com's PDP page scroll behavior.

1. **Sticky pinned hero**: As the user scrolls past the hero, the headline text and floating product image stay pinned/fixed in the viewport while a secondary content layer scrolls up from below and settles into view (Impossible does this with the burger patty image staying centered while copy blocks slide in around it).

2. **Floating parallax product items**: The hero's "rescued grocery item" illustration and 2-3 satellite items float with independent, slow, slightly-offset vertical drift (translateY loop, 4-6s duration, different delays) AND respond to scroll position with a subtle parallax (translateY tied to scroll offset, moving slower than the page scroll = feels like it's floating in 3D space above the page).

3. **Scroll-triggered reveal with scale**: Sections don't just fade-up, they scale in from 0.96 → 1.0 while fading opacity 0 → 1, matching Impossible's slightly-zoomed-in entrance for image blocks.

4. **Horizontal scroll-snap carousel** for the rescued-items/trolley section: Real CSS scroll-snap (`scroll-snap-type: x mandatory`), cards snap into place, either user-dragged or auto-advanced with pause-on-hover. This replaces the old marquee — it should feel like the Impossible "Recipes" carousel: card-based, snappy, deliberate, not a passive background ticker.

5. **Number count-up tied to scroll pin**: Stat section pins in viewport while numbers count up — same as v2 but now the whole stat block is pinned (position: sticky) for a beat before releasing to continue scroll, so the numbers get full attention.

6. **Micro-interactions on hover**: Buttons scale 1.03 + shadow deepens (kept from v2), but now also: card items in the carousel tilt slightly (subtle 3D rotateY) on hover, like product cards on e-commerce PDPs.

7. **Section transitions use dark/light contrast**: Impossible alternates black sections and white sections as you scroll (e.g. "FOR THE MEAT STANS" is on a dark background, nutrition facts on white). CircEats should do the same: Hero = off-white, Rescue carousel = off-white, Mission statement = **black background** (dramatic contrast moment), How It Works = white, Impact Stats = **black background** (second dramatic moment), FAQ = off-white, Footer = black.

---

## 3. Page Structure (Home) — Rebuilt Section by Section

### SECTION 1: Hero (Pinned/Sticky Scroll Hero)

**Background**: `--off-white`

**Layout inspired by Impossible's PDP header**: 
- Small eyebrow label top-left: "SINGAPORE'S SURPLUS FOOD PLATFORM" (uppercase, tracked out, `--gray-600`, 12px)
- Massive display headline, center-left, broken across 3 lines with mixed color:
  ```
  RESCUE
  GROCERIES.
  NOT LANDFILLS.
  ```
  ("RESCUE" in `--black`, "GROCERIES." in `--black`, "NOT LANDFILLS." with "LANDFILLS" struck through in `--brand-orange` and replaced conceptually — OR simpler: keep all black except one word in `--brand-green`)

- Below headline: one sentence in Inter, `--gray-600`, max-width 420px: "Singapore supermarkets sell near-expiry groceries at 30–70% off, before they hit the bin."

- **CTA row**: Primary button "Join Waitlist" (`--black` bg, `--white` text, sharp/minimal corners — 8px radius not full pill, matching Impossible's more squared-off button style) + secondary text link "For Supermarkets →"

- **Floating hero visual (right side, large)**: A large "hero rescued item" — e.g., an illustrated grocery basket/bag shot at a 3/4 angle with soft drop shadow beneath it, floating with slow parallax drift. Two smaller satellite items (a produce item, a discount tag graphic) float around it at smaller scale with independent motion timing, exactly like Impossible's three floating PNG cutouts around the main burger patty image.

- **Pin behavior**: This entire hero content (headline + CTA + floating visual) pins via `position: sticky; top: 0;` for approximately 100vh of additional scroll, while the NEXT section's content slides up from below and becomes visible starting at the bottom edge, creating the "content emerging from under the hero" effect Impossible uses.

### SECTION 2: The Rescue Carousel (Horizontal Scroll-Snap)

**Background**: `--off-white` (continues from hero, no hard break yet)

**Heading** (display, centered): "EVERY ITEM. FULL TRANSPARENCY."
**Subheading** (Inter, `--gray-600`, centered): "See the exact product, price, and expiry date. No surprise bags."

**The carousel**: 
- Horizontal scroll-snap row of 6-8 "product cards" — each styled like an e-commerce product tile: white card, soft shadow, rounded 12px corners, a floating illustrated grocery item (bread, milk, produce, etc.) centered with drop shadow, a small discount badge top-right (`--brand-lime` background, `--black` text, e.g. "-45%"), item name, and original/discounted price shown with strikethrough on original.
- Cards are draggable/swipeable, snap to center, with a subtle scale-down (0.94) on off-center cards and scale-up (1.0) on the centered/focused card — mimicking Impossible's carousel focus behavior.
- Small dot pagination indicator below.
- On hover (desktop): card lifts (translateY -6px) + subtle rotateY(4deg) tilt.

### SECTION 3: Mission Statement (Dark Section — Dramatic Contrast)

**Background**: `--black`, text `--white`

This is the "FOR THE MEAT STANS" moment — bold, editorial, confident, slightly provocative copy on full black.

**Large centered statement** (display, `--white`, huge — 56-72px depending on breakpoint):
```
WE'RE NOT HERE TO
SELL YOU SCRAPS.
```

**Follow-up paragraph** (Inter, `--gray-400`, max-width 600px, centered, smaller):
"We're here because Singapore throws away 755,000 tonnes of food a year — and almost half of everything we import ends up as waste. Not because it's bad. Because there's no smart system to sell it before the clock runs out. CircEats is that system."

**Small accent detail**: one word in the statement rendered in `--brand-lime`, e.g. "SCRAPS" crossed out and "OPPORTUNITY" written beside it in lime — a small callback to the "too good to bin" positioning.

### SECTION 4: How It Works (White, Pinned Numbered Steps)

**Background**: `--white`

**Heading**: "THREE STEPS. ZERO WASTE." (display)

**Layout**: As user scrolls through this section, a large number (01, 02, 03 in huge `--gray-100` outline/ghost text as a background watermark) stays pinned behind the content while each step's description slides into focus in the foreground — similar to Impossible's ingredient/nutrition breakdown scroll behavior.

**Step 01 — List**: "Supermarkets flag near-expiry stock with photos, condition, and price — powered by our AI discount engine."
**Step 02 — Reserve**: "You browse real inventory nearby. Reserve exactly what you want, no mystery bags."
**Step 03 — Pick Up**: "Collect in-store on your schedule. No delivery fees. No logistics overhead."

Each step also gets a small floating icon-illustration (not a full character, more like a simple line-art icon in `--black` with one `--brand-green` accent detail) to the side.

### SECTION 5: The Numbers (Dark Section #2 — Pinned Stat Reveal)

**Background**: `--black`, text `--white`

This directly mirrors Impossible's "92% LESS WATER / 91% LESS GHG EMISSIONS / 96% LESS LAND" block.

**Heading** (small, `--gray-400`, uppercase, tracked): "COMPARED TO THROWING IT AWAY"

**Three massive stat numbers in a row** (Space Grotesk 800, ~96-120px):
```
755,000t         47%              2035
food wasted      of SG food       Semakau landfill
in SG yearly      imports wasted    reaches capacity
```

**Pin behavior**: This block pins in viewport (sticky) while numbers count up from 0, holding the user's attention for a full scroll-beat before releasing.

**Source citation** (tiny, `--gray-600`, bottom): "Source: NEA Singapore, Singapore Environment Council, 2023–2024"

**CTA below**: "See the full impact" or "Join the rescue" button in `--brand-lime` — the one moment lime gets used as a large surface area, for maximum pop against black.

### SECTION 6: FAQ Accordion

**Background**: `--off-white`

Same accordion mechanics as v2 (click + to expand, rotates to x, one open at a time) but restyled:
- Question rows in `--black` Inter Medium, 18px
- Hairline border (`--border-hairline`) between rows, not the softer `--border` from v2
- "+" icon styling: thin, minimal (like a real Impossible/premium DTC site FAQ, not a chunky kawaii icon)
- Smooth max-height expand animation retained

**Heading**: "COMMON QUESTIONS" (display, smaller scale than hero headlines — this is a utility section, shouldn't compete for drama)

Use the same 7-8 FAQ content items from PRD v2 (unchanged — content is solid).

### SECTION 7: For Supermarkets Teaser Strip (NEW — pulled from pitch deck)

**Background**: `--white`, with a bold `--brand-orange` accent block

Short teaser strip before the footer, directly referencing the pitch deck's B2B value prop:

**Heading**: "RUN A SUPERMARKET?"
**Copy**: "Turn near-expiry stock into revenue overnight. No new workflows. Track waste, stay RSA-compliant, and unlock ESG reporting — all from one dashboard."
**CTA**: "Book a Demo →" links to /supermarkets

### SECTION 8: Footer

**Background**: `--black`

- Logo (white wordmark, minimal — drop the kawaii avocado icon in favor of a clean geometric mark, more in line with the premium DTC direction, OR keep the avocado mark but simplify the linework to be thinner/more refined)
- Tagline: "Too good to bin."
- Link columns: About | How It Works | Blog — For Supermarkets | Partners | Contact
- Social icons: minimal line-icon style (Instagram, LinkedIn, TikTok), `--gray-400` default, `--brand-lime` on hover
- Bottom bar: "© 2026 CircEats. Made in Singapore." (small, `--gray-600`)

---

## 4. Component Behavior Specs (For Claude Code)

### Sticky Hero Pin
```css
.hero-pin-wrapper {
  height: 180vh; /* extra scroll room for the pin effect */
  position: relative;
}
.hero-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
}
```
Use Framer Motion's `useScroll` + `useTransform` to fade/scale the hero content out as the user scrolls past the pin threshold, so it doesn't feel stuck — it should recede (scale down slightly, fade opacity) as the next section's content rises over it.

### Floating Parallax Items
```jsx
// Each floating item gets independent scroll-tied parallax + idle float animation
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -80]); // parallax drift tied to scroll
// Combined with a CSS keyframe idle float:
@keyframes idleFloat {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-14px) rotate(2deg); }
}
```

### Horizontal Scroll-Snap Carousel
```css
.carousel-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 10vw; /* so first/last cards can center */
}
.carousel-card {
  scroll-snap-align: center;
  flex: 0 0 280px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```
Use IntersectionObserver to detect which card is centered and apply a `.is-active` class that scales it to 1.0 while others sit at 0.94 scale / 0.7 opacity.

### Pinned Stat Counter
```jsx
// Section pins via sticky positioning for a fixed scroll distance,
// numbers count up via useInView trigger + requestAnimationFrame,
// then section releases (unpins) once counting completes + user continues scrolling
```

### Dark/Light Section Alternation
Each section component accepts a `theme="light" | "dark"` prop that swaps background/text CSS variables. Use this consistently so Claude Code can template each section rather than hand-styling every one.

---

## 5. Content Source of Truth

All headline stats, positioning language, and structural content should be pulled from the attached **CircEats pitch deck** (Green_and_White_Illustrative_Food_Market_Presentation), specifically:

- Problem stats: 755,000 tonnes, 47% import waste, 2035 landfill capacity
- Positioning: "No mystery bags," SKU-level transparency, in-store pickup only (zero logistics), RSA compliance layer
- Value props: Supermarkets turn waste into revenue overnight; consumers get 30-70% off; Singapore gets measurable landfill diversion
- Tagline: "Too good to bin." / "Join the circle. Save the food."
- Competitive framing: surprise bags (TGTG) vs. delivery-logistics-death (UglyFood) vs. CircEats' item-level + pickup-only model

Use the pitch deck's exact figures — don't introduce new stats not present in the deck.

---

## 6. Dependencies

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "framer-motion": "^11",
    "canvas-confetti": "^1.9"
  }
}
```

Framer Motion is now load-bearing (not optional) — the pin/parallax/scroll-triggered scale effects require `useScroll`, `useTransform`, and `useInView` throughout. Budget more animation engineering time than v2.

---

## 7. What to Build First

1. Hero with sticky pin + floating parallax items (the signature moment — get this right before anything else)
2. Dark mission statement section (proves the dark/light alternation pattern)
3. Rescue carousel with scroll-snap (proves the horizontal interaction pattern)
4. Pinned stat counter section (reuses the pin pattern from hero, should be faster to build second time)
5. How It Works, FAQ, Supermarket teaser, Footer (lower motion complexity, standard scroll-reveal is fine)

---

*End of PRD v3. This document assumes PRD v2's content/copy/site-map is still valid — only the visual/motion system changes. Feed both v2 (for copy reference) and v3 (for design direction) into Claude Code, or use the accompanying HTML wireframe as the primary visual reference.*
