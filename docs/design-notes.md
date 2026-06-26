# Design Notes — Page It Forward Landing Page

Brief rationale behind the visual and structural decisions. For the file layout
and how to run it, see the [README](../README.md).

---

## Goals

The previous landing page opened with a thin banner — logo, tagline, headline,
a paragraph explaining credits, and a footnote about the trial — then jumped
straight into the public library. It gave a new visitor no clear anchor, no
obvious primary action, and no fast read on what the platform is.

This redesign keeps the library exactly as-is but adds proper marketing scaffolding
around it:

1. **A real hero** (70–90vh) that states what PIF is, the core promise, the credit
   hook, and a single primary CTA — with a hint of the shelves visible at the
   bottom to pull the visitor down.
2. **A "How it works" strip** — three scannable steps (share → earn → request).
3. **A library teaser line** that frames the live data below.
4. **A footer CTA** that re-engages anyone who scrolls all the way through.

---

## The three hero directions

All three share the same copy strategy (what it is → the promise → the credit
hook → one strong CTA → trust stat → trial badge); they differ in layout and mood.

- **Variation 1 · Editorial Split.** Navy, two-column. Headline and CTA on the
  left, an illustrated book-stack-with-flamingo on the right, and a strip of
  colorful book-cover tops bleeding up from the bottom edge. The most conventional
  and legible "landing page" hero; best at answering *what is this* immediately.

- **Variation 2 · Centered Marquee.** Navy, centered headline, with a slow,
  infinite marquee of book covers riding a wooden shelf line along the bottom
  (pauses on hover, disabled under `prefers-reduced-motion`). Leads with the
  living-library feeling.

- **Variation 3 · Cozy Cream.** Inverted to a warm cream hero with a navy serif
  headline, coral italic accent, and a cozy shelf-scene illustration in a soft
  card. Navy primary CTA for contrast. The most indie-bookstore / book-club in
  tone.

A single direction should be chosen before production; the other two folders can
be deleted.

---

## Color

Deep navy and warm cream do the heavy lifting, with coral as the single accent
that carries every primary action. Greens, gold, and wood tones appear only in
the illustrations and the trial badge, so the accent never competes with itself.

| Token | Hex | Role |
|-------|-----|------|
| `--color-navy` | `#1a2942` | Primary dark sections (hero, library, CTA card) |
| `--color-navy-deep` | `#131f33` | Site footer, button hovers |
| `--color-navy-soft` / `--color-navy-line` | `#25395c` / `#34496e` | Depth, hairlines |
| `--color-cream` | `#f9f1e6` | Light sections |
| `--color-cream-light` | `#fdf8f0` | Text on navy, highlights |
| `--color-cream-card` | `#fbf4ea` | Shelf + step cards |
| `--color-coral` | `#e07a5f` | Primary CTA, accents |
| `--color-coral-deep` | `#cf6a50` | CTA hover, "See Full Shelf" links |
| `--color-coral-soft` | `#ec9a85` | Accents on navy |
| `--color-pink` / `--color-pink-soft` | `#e9a39c` / `#f1c2bc` | Logo, illustration |
| `--color-gold` | `#e6b45a` | Trial badge, coin icon |
| `--color-leaf` / `--color-leaf-deep` | `#7fa17a` / `#5d7d59` | Plants, globe |
| `--color-wood` / `--color-wood-deep` | `#c9a06a` / `#a87f4d` | Shelf bases |
| `--color-ink` / `--color-ink-soft` | `#2c2a2e` / `#6a6560` | Text on cream |

The chosen coral (`#e07a5f`, a warm terracotta) reads as friendly and literary
rather than loud, and holds enough contrast against both navy and cream to work
as the button color in every section.

---

## Typography

- **Fraunces** (serif) for all headlines and the logo wordmark. It is a soft,
  high-contrast "old-style" serif with optical sizing — warm and editorial, which
  suits a book community. Headlines use the italic for the emphasized phrase
  (e.g. *free*, *longing to read*, *someone's shelf*) in coral.
- **Nunito Sans** (sans-serif) for body copy, UI, and buttons. Rounded and
  friendly, it keeps the supporting text approachable next to the serif display.

Headline sizes use `clamp()` so they scale fluidly between mobile and desktop
without a cascade of breakpoints.

---

## Spacing, radii, and breakpoints

- **Spacing** is a small token scale (`--space-1` … `--space-7`, i.e.
  `0.5rem`–`6rem`) used for section padding and rhythm.
- **Radii**: `--radius` (18px) for small elements, `--radius-lg` (28px) for cards
  and shelves, `--radius-xl` (34px) for the footer CTA card. Soft, rounded corners
  throughout match the existing brand.
- **Breakpoints**: `--bp-tablet` 900px (two-column heroes collapse to one column;
  the 3-up steps stack; nav links hide) and `--bp-mobile` 600px (tighter gutters).
  CSS media queries can't read custom properties, so the literal values are
  mirrored in the responsive section and documented via the tokens for reference.

---

## Motion

Motion is deliberately gentle and always optional:

- **Scroll-reveal** (`scripts/main.js`): sections and cards marked `[data-reveal]`
  fade and rise slightly as they enter the viewport, via `IntersectionObserver`.
  This is progressive enhancement — the script adds a `.js` class to `<html>`, and
  the hidden-initial state only applies when that class is present, so with JS
  disabled everything is visible and styled normally.
- **Floating illustrations**: the hero SVGs animate their groups with a subtle
  6s float, defined *inside* the SVG files so they animate even when loaded via
  `<img>`.
- **Marquee** (variation 2): a CSS-only infinite scroll that pauses on hover.

All three honor `prefers-reduced-motion: reduce` and stop animating for users who
ask for less motion.

---

## Accessibility & semantics

- Semantic landmarks: `<header>`, `<main>`, `<section>` (each with an
  `aria-labelledby` pointing at its heading), and `<footer>`.
- Decorative imagery (illustrations, deco corners, avatar initials, the shelf
  peek/marquee) uses empty `alt=""` / `aria-hidden`; meaningful images (the
  "cover not available" placeholder) carry real `alt` text.
- Color choices keep text contrast comfortable on both navy and cream.

---

## What's a placeholder

- **Book covers** — CSS gradients standing in for member-uploaded images.
- **Trust stats** — "1,200+ readers sharing 8,400 books" is sample copy.
- **Library shelves** — 4 sample shelves represent what will be a repeating list
  of real member shelves.
- **Links** — nav and CTA `href`s point to in-page anchors; wire them to real
  destinations on integration.
