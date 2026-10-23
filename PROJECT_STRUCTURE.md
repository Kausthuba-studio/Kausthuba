# KAUSTHUBA STUDIO — PROJECT ARCHITECTURE & FILE DIRECTORY

A complete, production-grade breakdown of the **Kausthuba AI Creative Studio** codebase, detailing directory organization, component purposes, modular data pipelines, animation architecture, and asset management.

---

## 1. Directory Tree Overview

```
Kausthuba/
├── .env.local                    # Local environment variables (Gmail SMTP credentials)
├── index.html                    # Primary landing page (All 14 cinematic studio sections)
├── package.json                  # Node dependencies and npm scripts (dev, start, build, sync)
├── package-lock.json             # Pinned dependency lockfile
├── server.js                     # Local Express development server with clean routing & email API
├── vercel.json                   # Vercel deployment configuration (clean URLs, rewrites & caching)
├── README.md                     # Official studio documentation & Vercel deployment guide
├── PROJECT_STRUCTURE.md          # Comprehensive architectural reference (this file)
│
├── api/                          # Serverless Functions (for Vercel deployment)
│   └── send-inquiry.js           # Serverless Nodemailer handler for /api/send-inquiry
│
├── config/                       # Centralized Content & Media Configuration
│   └── site-config.js            # Single Source of Truth (window.SITE_CONFIG)
│
├── css/                          # Core Styling & Design System
│   └── styles.css                # Custom scrollbar, glassmorphism, responsive utilities, 3D card CSS
│
├── js/                           # Front-End Logic & Animation Pipelines
│   ├── main.js                   # GSAP ScrollTriggers, Lenis smooth-scroll, 3D Canvas, Three.js ruby
│   └── site-renderer.js          # Dynamic DOM hydrator & universal navigation glider
│
├── pages/                        # Organized Secondary Subpages
│   ├── about.html                # Studio Overview, philosophy, pillars & audio architecture
│   ├── contact.html              # Dedicated project inquiry & communication hub
│   ├── works.html                # Filterable portfolio & commercial showcase archive
│   ├── testimonials.html         # Authentic client reviews, feedback & studio chapters
│   ├── privacy-policy.html       # Studio data protection & privacy guidelines
│   └── 404.html                  # Cinematic 404 error page with quick links back home
│
├── assets/                       # Curated Production Media Assets
│   ├── images/                   # High-res visual cutouts, brand logos, card covers, marquee items
│   └── videos/                   # Cinematic commercial showcase MP4 reels
│
└── scripts/                      # Developer Tooling & Automation
    ├── build.js                  # Pre-deployment validation test suite (npm run build)
    └── sync-header-footer.js     # Header, mobile drawer & footer synchronization engine (npm run sync)
```

---

## 2. Root Files

### `index.html`
- **Role:** The primary entry point and flagship showcase of the studio. A cinematic, single-page experience containing all 14 visual and interactive narrative sections.
- **Key Sections:**
  1. `Section 01: #hero` — Dynamic headline, 3D brilliant-cut rotating Ruby gem, edge-to-edge ticker marquee with 0px whitespace gaps.
  2. `Section 02: #about` — Studio manifesto with GSAP text-reveal scrub animation.
  3. `Section 03: #anti-ai-factory` — The Anti-AI Factory statement and creative contrast.
  4. `Section 04: #commercial-standard` — The 120-Second Commercial Arc (5 expandable cutout cards).
  5. `Section 05: #pipeline-diamond-section` — Production pipeline (Stage 1 to 5 linear progression).
  6. `Section 06: #s06-sprint-section` — Creative Design Sprint (5 spatial 3D flip cards).
  7. `Section 07: #stack-container` — The Kausthuba Edge (interactive layered tech/philosophy cards).
  8. `Section 08: #working-process-section` — Step-by-step production schedule and studio timeline.
  9. `Section 09: #s09a-wall-of-works` — Infinite Wall of Works marquee (36 curated visual assets across 3 rows).
  10. `Section 09b: #selected-works` — 3D Revolving Showcase Reel (Cards 01–05 case studies + Card 06 Collage Hub).
  11. `Section 10: #sec-testimonials` — Client Reviews (authentic chapter cards & archive access).
  12. `Section 11: #sec-capabilities` — 4 narrative angles with synced preview videos, HUD telemetry, and descriptions.
  13. `Section 12: #sec-faq` — Interactive accordion cards + Card 05 popping CTA.
  14. `Section 13: #sec-inquiry` — 25-card spatial orbital arch + interactive inquiry transmission form.
  15. `Section 14: #sec-14-stage` — Founder profiles, scattered video bento cards & zooming video canvas with flush footer alignment.
  16. `#site-footer` — Unified studio sitemap, direct social channels, and legal coordinates.

### `server.js`
- **Role:** Local development server powered by Node.js and Express.
- **Capabilities:**
  - Serves static assets (`/css`, `/js`, `/assets`, `/config`, `/pages`).
  - Rewrites clean subpage routes (e.g., `/about` and `/about.html` → `pages/about.html`).
  - Automatically redirects `/pages/index.html` → `/`.
  - Automatically redirects all non-existent routes/pages → `/404` (serving root `404.html` with status 404).
  - Exposes the local `POST /api/send-inquiry` endpoint utilizing **Nodemailer** to send two simultaneous emails:
    1. An alert to the studio owner (`kausthuba.studio@gmail.com`).
    2. A branded confirmation receipt to the client.

### `vercel.json`
- **Role:** Production configuration file for 1-click deployment on **Vercel**.
- **Capabilities:**
  - Enables `cleanUrls: true` for clean browser URLs (`/about` instead of `/pages/about.html`).
  - Maps clean routes directly to HTML files in `pages/` (`/about`, `/contact`, `/works`, `/testimonials`, `/privacy-policy`).
  - Automatically serves root `404.html` for any unmatched/unidentified routes on Vercel.
  - Sets immutable long-term caching headers (`Cache-Control: public, max-age=31536000, immutable`) on static media under `/assets/`.

### `package.json` & `package-lock.json`
- **Role:** Manifest containing dependencies and developer scripts:
  - `npm run dev`: Starts local server via `node server.js` at `http://localhost:3000`.
  - `npm run build`: Runs `node scripts/build.js` to validate all configuration objects and subpages.
  - `npm run sync`: Runs `node scripts/sync-header-footer.js` to propagate header, drawer, and footer changes.

---

## 3. The `config/` Directory

### `config/site-config.js`
- **Role:** The **Single Source of Truth** for the entire website.
- **Mechanism:** Exposes `window.SITE_CONFIG`. Any image, video, headline, quote, metric, FAQ item, or link can be updated here **in one line without touching HTML markup or breaking GSAP scroll pins**.
- **Configured Sections:**
  - `brand`: Studio name, logo, taglines, contact email, coordinates.
  - `commercialArc`: 5 stage titles, descriptions, and cutout images.
  - `sprint`: 5 spatial cards (titles, descriptions, cover images).
  - `wallOfWorks`: 3 rows of curated marquee image items (36 images).
  - `selectedWorks`: Case study metadata, video sources, Card 06 collage videos.
  - `testimonials`: 3 authentic review cards.
  - `capabilities`: 4 narrative angles, video links, descriptions.
  - `faq`: 4 accordion QA cards + Card 05 commission CTA card.
  - `inquiryCards`: 25 orbital arch cards for Section 13.
  - `bento`: Video source for Section 14 hero zoom.

---

## 4. The `js/` Directory

### `js/main.js`
- **Role:** Master script for the main page (`index.html`).
- **Core Systems:**
  1. **Ultra-Smooth Scrolling via Lenis:** Initialized with 1.2s duration, custom power-2 easing, and synced into the GSAP ticker (`gsap.ticker.add(...)`).
  2. **GSAP ScrollTrigger Master Timelines:** Orchestrates pinning, scrubbing, and animations across all 14 sections (Section 04 expandable cards, Section 06 flip cards, Section 09b 3D orbit ring, Section 13 spatial orbital arch, Section 14 bento scatter).
  3. **Three.js Brilliant-Cut Ruby Canvas:** Real-time 3D parametric octahedral gem rendered via WebGL with custom red ambient lighting and specular highlights.
  4. **Form Submission Handler:** Submits inquiries to `/api/send-inquiry`, shows live transmission status, and manages button state.

### `js/site-renderer.js`
- **Role:** Dynamic DOM Hydrator and Navigation Glider running on every page.
- **Core Systems:**
  1. **Config Hydration:** Reads `window.SITE_CONFIG` and safely injects text, images, and videos into DOM elements before GSAP initializes.
  2. **Mobile Drawer Controller:** Manages hamburger toggle, backdrop blur overlay, escape key listener, and body scroll lock.
  3. **Universal Navigation Glider:** Intercepts clicks on anchor links (`#about`, `../index.html#commercial-standard`, etc.). On the main page, it glides smoothly to the target with Lenis; on subpages, it redirects seamlessly to `/index.html#...`.

---

## 5. The `pages/` Directory

Contains all dedicated secondary pages to keep the root directory clean and professional:

| File | Purpose | Key Features |
|---|---|---|
| `pages/about.html` | Studio Overview | Studio manifesto, core creative pillars, audio architecture, interactive 3D ruby canvas. |
| `pages/contact.html` | Project Inquiries | Direct transmission form, interactive input validation, contact channels, studio coordinates. |
| `pages/works.html` | Portfolio Archive | Filterable project showcase, categorized case studies, high-res commercial gallery. |
| `pages/testimonials.html` | Client Reviews | Comprehensive feedback archive, verified client chapters, production breakdowns. |
| `pages/privacy-policy.html` | Legal & Privacy | Studio privacy guidelines, data handling, tracking policy, copyright notices. |
| `pages/404.html` | Error Handling | Branded 404 screen with marquee ticker, 3D gem canvas, and quick links back home. |

---

## 6. The `css/` Directory

### `css/styles.css`
- **Role:** Global design system and custom CSS layer extending Tailwind.
- **Key Modules:**
  - **Custom Scrollbar:** 12px width, `#050505` track, `#9B111E` ruby pill thumb with hover `#D4AF37` gold transition.
  - **Zero Horizontal Overflow:** Enforces `overflow-x: hidden !important; width: 100% !important;` to eliminate any mobile side-scrolling.
  - **Smooth Scroll Normalization:** Enforces `scroll-behavior: auto !important` on `html` so Lenis virtual scrolling glides without browser fighting or auto-scroll loops.
  - **3D Card Transforms:** Perspective, backface visibility, flip card transitions (`transform-style: preserve-3d`).
  - **Glassmorphism:** Frosted translucent borders, crosshair badges, HUD grids, and telemetry overlays.

---

## 7. The `api/` Directory

### `api/send-inquiry.js`
- **Role:** Vercel Serverless Function handling form transmissions in production.
- **Route:** `POST /api/send-inquiry`
- **Mechanism:** Uses `nodemailer` with Gmail SMTP credentials (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) to simultaneously alert the studio owner and send a branded confirmation receipt to the prospective client.

---

## 8. The `scripts/` Directory

### `scripts/build.js`
- Validates that `config/site-config.js` has all required fields, image arrays, video links, and subpages in `pages/`. Exits with code `0` on success.

### `scripts/sync-header-footer.js`
- Automated templating engine that updates the desktop navbar, unnumbered mobile navigation drawer, and bottom footer across all 6 subpages in `pages/` in a single command (`npm run sync`).
