# CSS Token Reference — Component Map

Maps every component to the `globals.css` design tokens and custom classes it consumes.

---

## What `globals.css` Provides

### Design Tokens (CSS Custom Properties)

| Token | Value | What it looks like |
|---|---|---|
| `--background` | `oklch(0.08 0 0)` | Near-black page background |
| `--foreground` | `oklch(0.95 0 0)` | Near-white primary text |
| `--card` | `oklch(0.12 0 0)` | Slightly lighter surface for cards |
| `--card-foreground` | `oklch(0.95 0 0)` | Text on cards (same as foreground) |
| `--muted` | `oklch(0.25 0 0)` | Dark grey — borders, dividers |
| `--muted-foreground` | `oklch(0.55 0 0)` | Mid-grey — secondary/metadata text |
| `--accent` | `oklch(0.7 0.2 45)` | Warm orange — the only color accent |
| `--accent-foreground` | `oklch(0.08 0 0)` | Dark — text on orange backgrounds |
| `--border` | `oklch(0.25 0 0)` | Same value as `--muted`, used for lines |
| `--ring` | `oklch(0.7 0.2 45)` | Same as `--accent`, used for focus rings |
| `--secondary` | `oklch(0.18 0 0)` | Slightly lighter than background |
| `--radius` | `0rem` | All corners are square (no border-radius) |

### Fonts

| Token | Font | Tailwind class / usage |
|---|---|---|
| `--font-sans` | IBM Plex Sans | `font-sans` (body default) |
| `--font-mono` | IBM Plex Mono | `font-mono` |
| `--font-display` | Bebas Neue | `font-[var(--font-bebas)]` (inline) |

### Custom Classes

| Class | Definition | Purpose |
|---|---|---|
| `.grid-bg` | 60×60px grid lines in `oklch(0.2 0 0)` | Background grid overlay on the page |
| `.noise-overlay` | Fixed SVG fractalNoise at 3% opacity | Film-grain texture fixed over the full viewport |
| `::selection` | `bg-accent` / `color: background` | Orange highlight when user selects text |

### Base Layer (applied globally)

| Selector | Applied styles | Effect |
|---|---|---|
| `*` | `border-border outline-ring/50` | All elements default to `--border` color and orange focus rings |
| `body` | `bg-background text-foreground` | Sets the dark background and light text globally |
| `html`, `body` | Custom scrollbar styles | 10px scrollbar using `--border` track and `--muted` thumb |

---

## Component Breakdown

### `app/page.tsx`

The root page — the only place custom classes are applied directly.

| Token / Class | Tailwind class used | Purpose |
|---|---|---|
| `.grid-bg` | `grid-bg` | 60×60px grid pattern behind all content |
| `.noise-overlay` | `noise-overlay` | Grain texture fixed over the entire page |

---

### `app/layout.tsx`

Applies the base layer via `<body>` which inherits `bg-background text-foreground` from globals.css. Also loads all three fonts and wires them to the CSS variables.

---

### `components/side-nav.tsx`

The fixed left navigation strip visible on `md+` screens.

| Token | Tailwind class used | Where |
|---|---|---|
| `--background` | `bg-background/80` | Nav panel fill (80% opacity, semi-transparent) |
| `--border` | `border-border/30` | Right border of the nav panel |
| `--accent` | `bg-accent` | Active section dot fill |
| `--accent` | `text-accent` | Active section label text |
| `--muted-foreground` | `bg-muted-foreground/40` | Inactive dot fill |
| `--muted-foreground` | `text-muted-foreground` | Inactive label text |
| `--font-mono` | `font-mono` | All nav labels |

---

### `components/hero-section.tsx`

Full-viewport entry section.

| Token | Tailwind class used | Where |
|---|---|---|
| `--muted-foreground` | `text-muted-foreground` | Vertical "SIGNAL" label, body paragraph, secondary CTA |
| `--muted-foreground` | `text-muted-foreground/60` | `<h2>` subtitle (60% opacity for hierarchy) |
| `--foreground` | `text-foreground` | Primary CTA button text |
| `--foreground` | `border-foreground/20` | Primary CTA button border (resting state) |
| `--accent` | `hover:border-accent` | CTA button border on hover |
| `--accent` | `hover:text-accent` | CTA button text on hover |
| `--border` | `border-border` | Version badge (`v.01`) border |
| `--font-mono` | `font-mono` | Labels, body copy, CTA text |
| `--font-display` | `font-[var(--font-bebas)]` | `<h2>` subtitle |

---

### `components/split-flap-text.tsx`

The animated flip-board display that spells out the hero headline.

| Token | Tailwind class used | Where |
|---|---|---|
| `--font-mono` | `font-mono` | Individual flap characters during animation |

The font size is set via `clamp(4rem, 15vw, 14rem)` as an inline style, not a token.

---

### `components/animated-noise.tsx`

Canvas-based animated grain texture used inside the hero section.

**Uses no Tailwind or globals.css tokens.** The opacity is passed as a prop (`0.03`) and applied as an inline style. `mixBlendMode: "overlay"` is also inline.

---

### `components/signals-section.tsx`

Horizontally scrollable card strip.

| Token | Tailwind class used | Where |
|---|---|---|
| `--accent` | `border-accent bg-accent` | Custom orange cursor disc |
| `--accent` | `text-accent` | Section label `01 / Signals` |
| `--accent` | `group-hover:text-accent` | Card title on hover |
| `--accent` | `bg-accent/60` | Divider line under card title |
| `--accent` | `bg-accent/5` | Hover shadow/depth layer behind card |
| `--font-display` | `font-[var(--font-bebas)]` | Section `<h2>` and all card `<h3>` titles |
| `--font-mono` | `font-mono` | Section label, issue number, date, description |
| `--card` | `bg-card` | Card surface background |
| `--border` | `border-border/50` | Full card border (mobile) |
| `--border` | `md:border-t md:border-l md:border-r-0 md:border-b-0` | Open-frame border style (desktop) |
| `--border` | `via-border/40` | Gradient torn-edge line at card top |
| `--border` | `border-border/30` | Corner fold detail |
| `--background` | `bg-background` | Corner fold fill colour (matches page bg) |
| `--muted-foreground` | `text-muted-foreground` | Card description text |
| `--muted-foreground` | `text-muted-foreground/60` | Card date (further de-emphasised) |
| — | `scrollbar-hide` | Hides the horizontal scrollbar |

---

### `components/work-section.tsx`

Asymmetric 4-column experiment grid.

| Token | Tailwind class used | Where |
|---|---|---|
| `--accent` | `text-accent` | Section label `02 / Experiments` |
| `--accent` | `text-accent` (conditional) | Active card title and index number |
| `--accent` | `border-accent/60` (conditional) | Active card border |
| `--accent` | `bg-accent/5` (conditional) | Active card background tint |
| `--accent` | `bg-accent` | Corner lines (top + right) on active card |
| `--foreground` | `text-foreground` | Inactive card title |
| `--font-display` | `font-[var(--font-bebas)]` | Section `<h2>` and all card `<h3>` titles |
| `--font-mono` | `font-mono` | Section label, section description, card medium, card description, card index |
| `--muted-foreground` | `text-muted-foreground` | Section description, card medium label, card description |
| `--muted-foreground` | `text-muted-foreground/40` | Inactive card index number |
| `--border` | `border-border/40` | All card resting borders |

---

### `components/highlight-text.tsx`

Inline component that wraps a word with an animated orange swatch.

| Token | Tailwind class used | Where |
|---|---|---|
| `--accent` | `bg-accent` | The orange highlight block behind the text |

> **Note:** The text color animation (`oklch(0.95) → #000000`) is driven by GSAP with hardcoded values rather than CSS tokens. The `--foreground` and `--accent-foreground` tokens are not consumed here.

---

### `components/principles-section.tsx`

Four large-scale principles with alternating alignment.

| Token | Tailwind class used | Where |
|---|---|---|
| `--accent` | `text-accent` | Section label `03 / Principles` |
| `--font-display` | `font-[var(--font-bebas)]` | Section `<h2>` and all principle `<h3>` titles |
| `--font-mono` | `font-mono` | Section label, annotation labels, description paragraphs |
| `--muted-foreground` | `text-muted-foreground` | Annotation labels, description paragraphs |
| `--border` | `bg-border` | Decorative horizontal rule beneath each principle |
| — | `HighlightText` | Internally uses `bg-accent` — see above |

---

### `components/colophon-section.tsx`

Credits footer with a 6-column grid.

| Token | Tailwind class used | Where |
|---|---|---|
| `--accent` | `text-accent` | Section label `04 / Colophon` |
| `--accent` | `hover:text-accent` | Email and Twitter/X link hover |
| `--font-display` | `font-[var(--font-bebas)]` | Section `<h2>` "CREDITS" |
| `--font-mono` | `font-mono` | All text in the section |
| `--muted-foreground` | `text-muted-foreground` | Column headers (`text-[9px]`), copyright, tagline |
| `--foreground` | `text-foreground/80` | Column list items (80% opacity foreground) |
| `--border` | `border-border/30` | Section top separator |
| `--border` | `border-border/20` | Footer inner divider |

---

### `components/scramble-text.tsx` / `components/bitmap-chevron.tsx` / `components/draw-text.tsx` / `components/smooth-scroll.tsx` / `components/theme-provider.tsx`

These components contain **no direct globals.css token consumption** in their markup. They are purely behavioural/utility (GSAP text scramble, SVG chevron icon, Lenis scroll wrapper, shadcn theme provider).

---

## Token Usage Heat Map

Which tokens are used by the most components:

| Token | Used by |
|---|---|
| `--accent` | SideNav, Hero, Signals, Work, HighlightText, Principles, Colophon |
| `--font-mono` (`font-mono`) | Hero, SplitFlap, Signals, Work, Principles, Colophon, SideNav |
| `--font-display` (`var(--font-bebas)`) | Hero, Signals, Work, Principles, Colophon |
| `--muted-foreground` | SideNav, Hero, Signals, Work, Principles, Colophon |
| `--border` | SideNav, Hero, Signals, Work, Principles, Colophon |
| `--foreground` | Hero, Work, Colophon |
| `--background` | SideNav, Signals |
| `--card` | Signals only |
| `.grid-bg` | `page.tsx` only |
| `.noise-overlay` | `page.tsx` only |
| `::selection` | Global (no component owns it) |
