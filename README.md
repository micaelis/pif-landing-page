# Page It Forward — Landing Page

Marketing landing page for **Page It Forward (PIF)**, a community book-sharing
platform where members upload books and mail them to one another. The page pairs
a proper marketing hero with the live public-library shelves below it, all on one
scrollable page.

It is delivered as **three self-contained design variations** so the hero
direction can be compared side by side. Everything below the hero (How It Works,
the library, and the footer CTA) is identical across all three.

| Variation | Hero direction | Feel |
|-----------|----------------|------|
| `variation-1` | **Editorial Split** — navy, headline left, illustration right, shelf "peek" at the bottom | Clearest "what is this", confident |
| `variation-2` | **Centered Marquee** — navy, centered headline, a live shelf of covers scrolling along the bottom | Most alive / product-forward |
| `variation-3` | **Cozy Cream** — cream background, navy serif headline, illustrated shelf scene, navy CTA | Warmest, most indie-bookstore |

---

## View it locally

No build step or dependencies — these are plain static files.

**Quickest:** open any variation's `index.html` directly in a browser:

```
variation-1/index.html
```

**Recommended (a tiny local server)** so relative asset paths and fonts resolve
exactly as they will in production. From the project root, pick one:

```bash
# Python 3 (built in on macOS / most Linux)
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit, for example, <http://localhost:8000/variation-1/>.

> An internet connection is needed for the Google Fonts (Fraunces + Nunito Sans);
> the page falls back to system serif/sans-serif fonts offline.

---

## Deploy (GitHub → Vercel)

These are plain static files, so no build step or framework config is needed.

1. Push this folder to a GitHub repo.
2. In Vercel, **Import** the repo. Framework preset: **Other**; leave the build
   command empty and set the output directory to the repo root (the default).
3. Deploy.

After deploy:

- `/` → the variation chooser (this folder's `index.html`)
- `/variation-1/`, `/variation-2/`, `/variation-3/` → the three full landing pages

Vercel serves each folder's `index.html` and handles trailing slashes correctly,
so the relative asset paths resolve without any extra configuration.

---

## Folder structure

```
pif-landing-page/
├── index.html                # variation chooser / gallery (site root)
├── README.md                 # this file
├── .gitignore
├── docs/
│   └── design-notes.md       # design decisions, tokens, typography
├── variation-1/              # Editorial Split
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   ├── scripts/
│   │   └── main.js           # progressive-enhancement scroll reveal
│   └── assets/
│       ├── icons/            # logo, step icons, plant, globe (SVG)
│       └── images/           # hero illustration, cover placeholder (SVG)
├── variation-2/              # Centered Marquee  (same structure)
└── variation-3/              # Cozy Cream        (same structure)
```

Each `variation-*/` folder is **independent and runnable on its own** — open its
`index.html` and it works with only the files inside that folder.

---

## Design tokens

Full rationale lives in [`docs/design-notes.md`](docs/design-notes.md). Quick
reference (defined as CSS custom properties at the top of every `main.css`):

### Colors

| Token | Value | Use |
|-------|-------|-----|
| `--color-navy` | `#1a2942` | Primary dark background |
| `--color-navy-deep` | `#131f33` | Footer, hover states |
| `--color-cream` | `#f9f1e6` | Light background |
| `--color-cream-card` | `#fbf4ea` | Cards / shelves |
| `--color-coral` | `#e07a5f` | Primary accent / CTA |
| `--color-coral-deep` | `#cf6a50` | Accent hover / links |
| `--color-pink` | `#e9a39c` | Logo, soft accents |
| `--color-gold` | `#e6b45a` | Trial badge, highlights |
| `--color-leaf` | `#7fa17a` | Plant / globe illustrations |
| `--color-ink` | `#2c2a2e` | Body text on cream |

### Typography

| Token | Family | Use |
|-------|--------|-----|
| `--font-serif` | **Fraunces** | Headlines, logo wordmark |
| `--font-sans` | **Nunito Sans** | Body, UI, buttons |

### Notes on placeholders

- **Book covers** in the library are CSS-gradient placeholders representing
  member-uploaded cover images (dynamic data in production). The
  "cover not available" state references `assets/images/cover-placeholder.svg`.
- **Trust stats** ("1,200+ readers sharing 8,400 books") are placeholder copy —
  wire these to real values when integrating.
- The library shows 4 sample shelves; in production this is a repeating list of
  member shelves.

---

## Porting to Bubble

This static mockup is the visual reference for the Bubble build. When porting:

1. Recreate the hero, How-It-Works, and footer-CTA sections as static design
   elements.
2. Replace the 4 sample shelves with a repeating group bound to member shelves.
3. Bind the trust-stat numbers to live counts.
4. Swap the gradient covers for the members' uploaded cover images, keeping the
   `cover-placeholder.svg` fallback for missing covers.
