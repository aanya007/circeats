# CircEats — planning.md
## Engineering Plan: UI Replication (Phase 1) → Full Product (Phase 2+)

This repo currently has no application code — only the PRD, the wireframe, and an unrelated commit-history script (`index.js`/`package.json`, left untouched). This plan covers **Phase 1: pixel/motion-exact replication of `CircEats_Wireframe_ImpossibleStyle.html` as a real Next.js app**. Full product functionality (Phase 2+) is scoped at the bottom so later work has a landing spot, but is explicitly out of scope until Phase 1 is signed off.

---

## 1. Phase 1 Goal

Rebuild the wireframe as a componentized Next.js app that is visually and behaviorally indistinguishable from `CircEats_Wireframe_ImpossibleStyle.html` — same layout, same colors/type, same scroll/pin/parallax/carousel/count-up mechanics — but written as maintainable React instead of one static HTML file. No backend, no real data, no auth. Content (copy, stats, FAQ, sample products) is hardcoded from the PRD/wireframe, isolated into data files so Phase 2 can swap it for real sources without touching components.

**Definition of done**: side-by-side scroll-through of the Next.js build against the wireframe shows no visual or motion divergence, at desktop and the ≤860px breakpoint, with `prefers-reduced-motion` respected.

---

## 2. Tech Stack

Per PRD §6, Framer Motion is load-bearing, not optional.

- **Next.js 14** (App Router) — matches PRD's stated dependency; gives file-based routing for `/`, `/supermarkets` (footer/teaser link target, stubbed in Phase 1).
- **React 18**
- **TypeScript** — not mentioned in PRD but adopted here so the data-driven sections (carousel items, FAQ, stats) are typed rather than loosely shaped objects; low cost, catches content-shape mistakes early.
- **Framer Motion 11** — `useScroll` + `useTransform` for hero pin recede and floating parallax; `useInView` for scroll-triggered reveals; replaces the wireframe's manual IntersectionObserver/rAF scroll listeners.
- **Plain CSS (global stylesheet + CSS Modules per component)** — the wireframe's CSS is already a complete, correct design system (see Design.md). Porting it near-verbatim into CSS Modules gets exact fidelity with minimal translation risk. **Not** using Tailwind for this phase — introducing a utility framework mid-port adds a translation step that risks drift from the reference file for no real benefit at this stage.
- **canvas-confetti** — included per PRD dependency list; not used by any current section, held in reserve for a Phase 2 "waitlist joined" moment. Do not wire it into Phase 1 UI just because it's installed.

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11",
    "canvas-confetti": "^1.9"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^18",
    "@types/node": "^20"
  }
}
```

---

## 3. Project Structure

```
circeats/
  Design.md
  planning.md
  app/
    layout.tsx              # font imports, global CSS import, metadata
    globals.css              # tokens (:root vars), resets, .display/.eyebrow/.mono-stat base classes
    page.tsx                 # composes all sections in order
    supermarkets/
      page.tsx               # stub route for footer/teaser "Book a Demo" link — Phase 2 builds this out
  components/
    Nav/
      Nav.tsx
      Nav.module.css
    Hero/
      Hero.tsx                # pin wrapper + sticky content + fade overlay
      FloatingItems.tsx       # the 4 SVG parallax items, isolated so useScroll logic stays contained
      Hero.module.css
    StatsStrip/
      StatsStrip.tsx
    Carousel/
      Carousel.tsx             # scroll-snap track + active-card detection
      ProductCard.tsx
      Carousel.module.css
    MissionSection/
      MissionSection.tsx       # dark section, scroll-reveal heading/paragraph
    HowItWorks/
      HowItWorks.tsx
      StepRow.tsx
    PinnedStats/
      PinnedStats.tsx          # sticky wrapper + count-up hook
    Faq/
      Faq.tsx
      FaqItem.tsx
    SupermarketTeaser/
      SupermarketTeaser.tsx
    Footer/
      Footer.tsx
    ui/
      Button.tsx               # variant prop: primary | lime | orange, shared hover physics
  lib/
    data/
      products.ts              # carousel item data, typed
      faq.ts
      stats.ts                 # hero-strip stats + pinned dark-stats data, with source citation
    hooks/
      useCountUp.ts            # cubic-out count-up, mirrors wireframe's animateStats()
      useActiveCarouselCard.ts
      usePrefersReducedMotion.ts
  public/
    (SVG assets, if extracted from inline — see §4 asset note)
```

Section-per-folder keeps each piece's motion logic (which varies a lot: sticky-pin vs. scroll-snap vs. count-up vs. simple reveal) co-located with its markup, matching how differently each section actually behaves — a single shared "ScrollSection" abstraction would hide more than it'd save, since no two sections share the same mechanic.

---

## 4. Asset Note

The wireframe's SVGs (hero floating items, product-card shapes, logo mark) are inline in the HTML. Port them as inline SVG React components (not `<img src>` files) so `stroke`/`fill` can stay as CSS custom properties where useful and so Framer Motion can apply transforms directly to them without an extra wrapper. Copy the `viewBox`/path data verbatim from the wireframe (lines 347–376 for hero items, 546–552 for product-card shapes, 319/477 for the logo mark) — these are treated as final assets for Phase 1, not placeholders to redesign.

---

## 5. Build Order

Mirrors PRD §7, expanded into concrete tasks. Build in this order — later sections reuse patterns proven in earlier ones (the pin mechanic built for Hero is reused, not reinvented, for PinnedStats).

1. **Scaffold** — Next.js app, `globals.css` with all tokens/base classes from Design.md §1–2, font imports, `Button` component with 3 variants.
2. **Nav** — fixed nav, scroll-triggered `.scrolled` state (swap `window.addEventListener('scroll')` for a small `useScroll`-driven boolean).
3. **Hero** — the signature moment, per PRD explicitly "get this right before anything else": sticky pin wrapper, 4 floating SVGs with idle-float CSS + scroll-tied parallax via `useTransform`, fade-overlay recede effect, stats strip below.
4. **MissionSection (dark)** — proves the dark/light alternation and the scale+fade reveal pattern (`useInView` replacing the wireframe's IntersectionObserver).
5. **Carousel** — proves the horizontal scroll-snap + active-card-detection pattern; build `useActiveCarouselCard` hook once here, it's carousel-specific so no reuse expected elsewhere.
6. **PinnedStats (dark #2)** — reuses the Hero's sticky-pin approach; new piece is the `useCountUp` hook (cubic-out easing, prefix/suffix support, fires once via `useInView`).
7. **HowItWorks** — standard scroll-reveal (reuse the reveal pattern from MissionSection/step rows), ghost-numeral watermark styling.
8. **Faq** — accordion state (single-open, controlled by index), CSS `max-height` transition.
9. **SupermarketTeaser + Footer** — lowest motion complexity, standard layout work.
10. **Responsive pass** — apply the 860px breakpoint from the wireframe, then add the intermediate tablet breakpoint noted in Design.md §5 (gap in the original, not a regression).
11. **Reduced-motion + a11y pass** — wire `usePrefersReducedMotion` into every animated component, add missing focus states (nav links, FAQ rows, carousel keyboard scroll) per Design.md §6.
12. **Side-by-side QA** — open both the wireframe and the Next.js build, scroll in parallel, confirm no divergence at desktop and mobile widths.

---

## 6. Interactivity Reference (wireframe JS → React)

| Wireframe mechanic | React replacement |
|---|---|
| `window.addEventListener('scroll', updateHeroFade)` | `useScroll({ target: heroWrapperRef })` + `useTransform` for overlay opacity |
| CSS `idleFloat*` keyframes | kept as-is (CSS), layered with Framer Motion parallax `y` transform |
| `track.addEventListener('scroll', updateActiveCard)` | `useActiveCarouselCard` hook, same closest-to-center logic, rAF-throttled |
| `IntersectionObserver` for `.reveal-scale`/`.reveal-fade`/`.step-row` | `useInView` per component, `once: true` |
| `IntersectionObserver` + `animateStats()` | `useInView` trigger → `useCountUp` hook, same cubic-out formula |
| FAQ `openFaqIdx` module-level variable | `useState<number | null>` in `Faq.tsx`, passed down to `FaqItem` |
| `nav.classList.toggle('scrolled', ...)` | `useState` + scroll listener (or `useScroll` with a threshold check) |

---

## 7. Acceptance Criteria (Phase 1 sign-off)

- [ ] All 9 sections present in the same order, same section-level dark/light alternation
- [ ] Hero pin + fade-recede behaves identically to the wireframe (no jump/flicker at the pin boundary)
- [ ] All 4 hero floating items have independent idle motion + scroll parallax
- [ ] Carousel: scroll-snap works via drag/swipe/keyboard, active card scales up, dots track index
- [ ] Mission section reveal (scale+fade) triggers once, doesn't re-fire on scroll-back
- [ ] Pinned stats count up once, correct formatting (`755,000t`, `=5,901`, `$342M` etc. per `lib/data/stats.ts`)
- [ ] FAQ: single-open accordion, icon rotates plus→x, smooth height transition
- [ ] All button hover states match (scale 1.03 + shadow deepen, correct variant colors)
- [ ] Responsive: hero reorders, nav collapses (real mobile nav, not just hidden links), step rows stack, ghost numerals shrink — all at ≤860px, plus the added tablet breakpoint
- [ ] `prefers-reduced-motion: reduce` disables float/parallax/scale-reveal, keeps opacity-only fades
- [ ] Lighthouse a11y check passes for contrast + keyboard operability on nav, buttons, FAQ, carousel

---

## 8. Explicitly Out of Scope for Phase 1

These are named in the PRD/README as the eventual product but are **not** part of "replicate the UI" — flagging them now so they aren't accidentally half-built mid-Phase-1:

- Real waitlist capture (form → email/DB) — "Join Waitlist" is a static button in Phase 1
- `/supermarkets` page content — stub route only, not the full B2B page
- Supermarket dashboard (inventory listing, RSA compliance reports, ESG reporting) — per README, this is core to the product but has no wireframe yet
- Consumer-facing browse/reserve flow (real inventory, geolocation, reservation logic) — the carousel is sample data only
- AI discount engine (PRD §3 Step 01 mentions this) — no design or API surface defined yet
- Auth, payments, any backend/database
- Blog (linked in footer, no content model yet)

---

## 9. Phase 2+ (Not Planned Yet — Placeholder)

Once Phase 1 is signed off, the next planning pass should cover: data model for inventory/listings, supermarket-side dashboard UI (needs its own design pass — no PRD exists for it yet), consumer reservation flow, auth, and the `/supermarkets` B2B page referenced by the teaser strip. Do not start any of this until asked — surfacing it here only so Phase 1's data-layer decisions (e.g. `lib/data/products.ts` shape) are made with half an eye on what will eventually replace them.
