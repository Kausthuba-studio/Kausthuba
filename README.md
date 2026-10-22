# KAUSTHUBA | AI Creative Studio

> **Transforming brand communication problems into original visual concepts and story-driven animated experiences.**

Kausthuba is an ultra-premium, cinematic studio website engineered with vanilla HTML, modern CSS, dynamic JavaScript, GSAP ScrollTrigger, Lenis smooth scrolling, and Three.js 3D WebGL graphics.

---

## ✦ Key Features

- **14 Cinematic Story-Driven Sections:**
  - **Hero with 3D Ruby Gem:** Parametric WebGL brilliant-cut octahedral ruby gem with dynamic lighting and specular reflections.
  - **Edge-to-Edge Marquee Ticker:** Seamless horizontal infinite scrolling headlines with zero margin/padding gaps.
  - **The 120-Second Commercial Arc:** Interactive expandable cutout cards showcasing production narrative phases.
  - **Creative Design Sprint:** 5 spatial 3D flip cards with interactive touch/hover triggers.
  - **Wall of Works:** 3-row infinite multi-directional portfolio marquee holding 36 curated visuals.
  - **3D Revolving Reel:** Spatial orbit ring showcasing commercial video case studies and a multi-video collage hub.
  - **Client Reviews & Chapters:** Authentic studio reviews and story chapter archives.
  - **Inquiry Orbital Arch:** 25-card floating spatial constellation surrounding an interactive inquiry terminal.
  - **Founder Video Bento Grid:** Dynamic video scaling and card scattering driven by GSAP scroll triggers with flush footer spacing.
- **Ultra-Smooth Scrolling:** Driven by **Lenis** with zero browser conflicts or auto-scroll glitches.
- **Zero Mobile Overflow:** Strictly prevents any unwanted horizontal scrolling across all mobile screen sizes.
- **Universal Seamless Navigation:** Top navigation, mobile drawer, and footer cleanly navigate between anchor sections on the main page and dedicated subpages.
- **Automated Inquiry Engine:** Built-in form transmission powered by **Nodemailer** sending instant dual emails (Admin alert + Client confirmation).
- **Single-File Content Customization:** Edit titles, case studies, images, and videos in `config/site-config.js` without touching HTML or breaking GSAP animations.

---

## ✦ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5 & Vanilla JS** | Semantic layout and core application logic. |
| **Tailwind CSS & Vanilla CSS** | Design system, glassmorphism, responsive utilities, and custom scrollbar (`css/styles.css`). |
| **GSAP & ScrollTrigger** | High-performance scrubbed timeline animations, 3D card flipping, and spatial pinning. |
| **Lenis** | Physics-based smooth scrolling synced directly to GSAP's animation ticker. |
| **Three.js** | Interactive 3D WebGL brilliant-cut ruby gem rendering. |
| **Node.js & Express** | Local development server, clean URL rewrites, and email transmission endpoint (`server.js`). |
| **Nodemailer** | SMTP email delivery for client inquiries. |
| **Vercel** | Production hosting with serverless functions and automated static caching (`vercel.json`). |

---

## ✦ Quick Start (Local Development)

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create or verify `.env.local` in the project root:
```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```
*(Generate an App Password via Google Account → Security → 2-Step Verification → App Passwords).*

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ✦ Clean Project Structure

All secondary pages are housed in `pages/` and all runtime components are strictly organized:

```
Kausthuba/
├── index.html                    # Main landing page (All 14 cinematic sections)
├── server.js                     # Local Node.js / Express development server
├── vercel.json                   # Vercel deployment configuration
├── package.json                  # Scripts and dependencies
├── api/                          # Serverless functions (Vercel)
│   └── send-inquiry.js           # Serverless inquiry email handler
├── config/                       # Central site configuration
│   └── site-config.js            # Edit ANY text, video, image, or link here
├── css/                          # Stylesheets
│   └── styles.css                # Custom scrollbar, glassmorphic styling
├── js/                           # JavaScript pipelines
│   ├── main.js                   # GSAP, Lenis, Three.js 3D gem logic
│   └── site-renderer.js          # DOM hydrator & universal navigation glider
├── pages/                        # Organized subpages
│   ├── about.html                # Dedicated Studio Overview
│   ├── contact.html              # Dedicated Contact Hub
│   ├── works.html                # Filterable Portfolio Archive
│   ├── testimonials.html         # Client Reviews & Testimonials
│   ├── privacy-policy.html       # Studio Privacy Policy
│   └── 404.html                  # Branded 404 Error Screen
├── assets/                       # Media assets (images & video reels)
└── scripts/                      # Developer build & sync utilities
    ├── build.js                  # Configuration validation suite (npm run build)
    └── sync-header-footer.js     # Global header/footer synchronizer (npm run sync)
```
*(For complete file-by-file documentation, refer to [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)).*

---

## ✦ How to Customize Content

You can swap ANY title, quote, image, or video in **1 line** without modifying HTML markup:

1. Open [config/site-config.js](config/site-config.js).
2. Update the property of your choice:
   - **Logo / Brand Info:** `SITE_CONFIG.brand`
   - **120s Commercial Arc:** `SITE_CONFIG.commercialArc.stages`
   - **Creative Design Sprint:** `SITE_CONFIG.sprint.cards`
   - **Wall of Works Images:** `SITE_CONFIG.wallOfWorks`
   - **Selected Works Videos:** `SITE_CONFIG.selectedWorks`
   - **Client Reviews:** `SITE_CONFIG.testimonials`
   - **FAQ Items:** `SITE_CONFIG.faq`
   - **Orbital Cards:** `SITE_CONFIG.inquiryCards`
3. Save the file. The site dynamically updates on refresh while preserving all GSAP timelines.

---

## ✦ Developer Commands

```bash
# Validate all configuration objects, image links, and modular pages
npm run build

# Synchronize header, mobile drawer, and footer changes across all subpages
npm run sync

# Start the local development server
npm run dev
```

---

## ✦ How to Deploy on Vercel (Step-by-Step)

Deploying Kausthuba Studio to Vercel takes less than 3 minutes. The project includes [vercel.json](vercel.json) for automatic clean URL routing and [api/send-inquiry.js](api/send-inquiry.js) for serverless email transmission.

### Method 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Kausthuba Studio"
   git branch -M main
   git remote add origin https://github.com/your-username/kausthuba-studio.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Log into [vercel.com](https://vercel.com).
   - Click **"Add New..."** → **"Project"**.
   - Select your `kausthuba-studio` repository and click **"Import"**.

3. **Configure Project Settings:**
   - **Framework Preset:** Select **Other** (or Leave as Default).
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` *(optional, validates config)*
   - **Output Directory:** `./`

4. **Add Environment Variables:**
   Under the **Environment Variables** section, add your Gmail credentials:
   - `GMAIL_USER`: `your_studio_email@gmail.com`
   - `GMAIL_APP_PASSWORD`: `your_16_character_app_password`

5. **Deploy:**
   - Click **"Deploy"**.
   - Vercel will build the project and assign a live URL (e.g., `https://kausthuba-studio.vercel.app`).

---

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   vercel
   ```
   - Follow the interactive prompts:
     - *Set up and deploy?* **Y**
     - *Which scope?* Select your account
     - *Link to existing project?* **N**
     - *Project name?* `kausthuba-studio`
     - *Directory?* `./`

4. **Add Environment Variables via CLI:**
   ```bash
   vercel env add GMAIL_USER
   vercel env add GMAIL_APP_PASSWORD
   ```

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## ✦ Post-Deployment Verification Checklist

- [ ] **Home Page:** Verify Three.js 3D gem canvas rotates smoothly.
- [ ] **Marquee:** Confirm the headline scroller stretches 100% full-width with zero margin gaps.
- [ ] **Mobile Drawer:** Open the hamburger menu on mobile; confirm links have no numbers and mirror desktop navigation.
- [ ] **Subpage Navigation:** Visit `/about` or `/works`; test the footer links and confirm they smoothly return to the respective main page sections.
- [ ] **Smooth Scrolling:** Test wheel and drag scrolling; verify the scrollbar never moves automatically.
- [ ] **Inquiry Submission:** Submit a test message on the home page or `/contact`; verify you receive an admin email notification and a branded confirmation receipt.

---

## ✦ License & Rights

© 2026 **Kausthuba | AI Creative Studio**. All rights reserved.
