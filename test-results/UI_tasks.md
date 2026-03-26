Here's the full UI/UX audit of your portfolio:

---

# SIGNAL Portfolio — UI/UX Audit

## TL;DR — Top 10 Issues to Fix

| Priority    | Issue                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| 🔴 Critical | No mobile navigation whatsoever                                                                                |
| 🔴 Critical | Work cards are `cursor-pointer` but clicking does nothing — broken affordance                                  |
| 🔴 Critical | No `prefers-reduced-motion` support anywhere in the codebase                                                   |
| 🔴 Critical | Side nav buttons have no `aria-label` — invisible to screen readers                                            |
| 🟠 High     | Colophon lists wrong fonts ("Inter", "Geist Mono") — actual fonts are IBM Plex Sans, IBM Plex Mono, Bebas Neue |
| 🟠 High     | Signal dates are 9+ months stale (2025 content, it's March 2026)                                               |
| 🟠 High     | `scrollIntoView()` in SideNav bypasses Lenis → double-scroll jank                                              |
| 🟡 Medium   | `text-[9px]`/`text-[10px]` labels fail WCAG minimum size                                                       |
| 🟡 Medium   | Twitter/X link points to `#` — dead link                                                                       |
| 🟡 Medium   | AnimatedNoise canvas runs `requestAnimationFrame` when off-screen                                              |

---

## Visual Hierarchy & Typography

**Good:** Three-font system (Bebas Neue display, IBM Plex Sans body, IBM Plex Mono labels) is cohesive and well-executed. `clamp()` on the hero title scales gracefully.

**Issues:**

- The hero `<h2>` "Studies in Controlled Environments" uses `text-muted-foreground/60` — opacity 60% of an already muted color. Likely fails WCAG AA contrast at smaller viewport sizes.
- `text-[9px]` and `text-[10px]` labels are used extensively. Even with wide tracking, these fail minimum readable size on non-retina screens and for low-vision users. Raise to at least `text-[11px]`.
- Bebas Neue with `tracking-tight` on small work card labels compounds legibility issues.

---

## Color & Contrast

**Good:** Monochrome + single warm orange accent is disciplined. Selection color, scrollbar, and accent all use the same token — great consistency.

**Issues:**

- `border-border/50` (`oklch(0.25 0 0)` at 50%) produces nearly invisible borders against dark card backgrounds on poorly-calibrated monitors.
- `bg-accent/5` hover state on work cards is a ~2% tint — imperceptible on most displays. Hover feedback is essentially absent.
- `--muted-foreground: oklch(0.55 0 0)` at `text-xs` (12px) is borderline 4.2:1 contrast — passes AA for large text but not body text.

---

## Navigation Usability

**Good:** `IntersectionObserver` at 30% threshold correctly tracks active section. Hover-reveal labels are an elegant detail.

**Issues:**

- **No mobile navigation at all.** The side nav is `hidden md:flex` with zero alternative on mobile — no hamburger, no sticky header, no bottom bar. Mobile users have no orientation or section-jumping ability.
- **Zero discovery affordance on touch.** The nav is invisible dots that only reveal labels on hover — this means 0% affordance on touch devices.
- **`scrollIntoView()` bypasses Lenis.** The SideNav uses native `element.scrollIntoView({ behavior: 'smooth' })` while Lenis also intercepts scroll. This causes a double-scroll conflict. Use `lenis.scrollTo(element)` instead.

---

## Animation & Motion

**Good:** Split-flap "INTERFACES" animation is the standout element — character-by-character flip with randomized intermediates, staggered timing, and optional audio. The scramble-text CTA and corner-line work card reveals are polished.

**Issues:**

- **No `prefers-reduced-motion` checks anywhere.** Users who have this OS setting enabled get the full flip, parallax, scramble, and cursor tracking suite — an accessibility violation that can cause physical discomfort.
- **Two animation runtimes (GSAP + Framer Motion) run simultaneously.** Framer Motion is only used for the split-flap entrance (`opacity/y`) and the flap rotation. This adds ~35KB+ bundle overhead for what GSAP already handles everywhere else. Consolidate to GSAP.
- **AnimatedNoise `requestAnimationFrame` runs at 60fps whether the canvas is on-screen or not.** Add an `IntersectionObserver` to pause it when off-screen.
- **Work card `persistHover` (Project Lattice)** permanently sets the card active on first scroll-enter and never resets — the card is always "highlighted" after you've scrolled past it once.
- **Lenis `duration: 1.2s`** is long enough to feel sluggish to users accustomed to native scroll speed.

---

## Content Issues

- **Work cards have no links.** They're `cursor-pointer` with hover states implying clickability — but nothing happens. Add a modal with project details or real case study links before sharing this portfolio widely.
- **Colophon font list is wrong.** It says "Inter" and "Geist Mono" — neither is used. Fix to IBM Plex Sans, IBM Plex Mono, Bebas Neue.
- **Signal cards are 9+ months stale** (dated 2025.06, currently March 2026). A "What's New" section with old dates signals an unmaintained site.
- **Copyright says "© 2025 Signal"** — needs updating to 2026.
- **Twitter/X link is `href="#"`** — dead link, either fill it in or remove it.
- **`v.01 / Experimental Build` badge** in the hero subtly gives visitors permission to dismiss the work as unfinished. Consider removing before sharing.

---

## Mobile Responsiveness

- **Asymmetric work grid** (`col-span-2 row-span-2`) was designed for a 4-column layout. On 2-col mobile, `row-span-2` cards become 376px tall on a 375px wide screen — very awkward aspect ratios.
- **Signals horizontal scroll** has no affordance — no partial card peek, no scroll indicator, scrollbar is hidden. Mobile users won't know it's scrollable.
- **Hero left "SIGNAL" label** at `left-4` with `-rotate-90` likely clips outside the viewport safe area on small phones.
- **Principles alternating left/right alignment** collapses to all-left on mobile, losing the compositional rhythm entirely.

---

## Concrete Fix List

```
1. Add mobile navigation (bottom bar with 5 section dots minimum)
2. Fix work card links — add modal or real destinations
3. Add prefers-reduced-motion guards to all GSAP animations + Lenis
4. Add aria-label to all side nav buttons
5. Fix Colophon font attribution
6. Update Signal dates, copyright year, Twitter/X link
7. Replace scrollIntoView with lenis.scrollTo() in SideNav
8. Remove Framer Motion, unify on GSAP
9. Raise text-[9px]/text-[10px] to text-[11px] minimum
10. Add right-edge fade mask to Signals scroll strip for discoverability
11. Pause AnimatedNoise RAF when off-screen
```

The core concept and aesthetic is strong — the dark editorial tone, font choices, and split-flap hero are genuinely distinctive. The critical gaps are all fixable: navigation, interactivity, and accessibility are the areas holding it back from being shareable.
