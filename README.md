# 🚀 Portfolio — Alex Dupont | Software Engineer · AI Engineer · Cloud & MLOps

A modern, bilingual (EN/FR), installable PWA portfolio built with Next.js 14 App Router.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Routing, SSR, metadata, PWA |
| **TypeScript** (strict) | Type safety |
| **Tailwind CSS** | Utility-first styling, responsive design |
| **Framer Motion** | Animations, scroll reveals, page transitions |
| **Lucide React** | Icon set |
| **next-pwa** | Service worker, offline support, installable app |

## 📦 Local development

### Prerequisites
- Node.js **18.18+**
- npm (or yarn / pnpm)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure environment variables
cp .env.example .env.local

# 3. Run the dev server
npm run dev

# Open http://localhost:3000
```

### Production build (local test)

```bash
npm run build
npm start
```

> Note: the PWA service worker (`next-pwa`) is **disabled in development** and only generated during `npm run build`.

## ☁️ Deploy to Vercel

### Option A — One-click via Git (recommended)
1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects **Next.js** — no extra configuration needed.
4. *(Optional)* Add an environment variable for correct SEO/OpenGraph URLs:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
5. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### What's already configured for Vercel
- ✅ `vercel.json` — framework detection + cache headers for PWA icons, manifest, and CV PDF
- ✅ `.gitignore` — excludes `.next`, `node_modules`, and auto-generated service worker files
- ✅ `next.config.js` — security headers, locale-redirect fixes, PWA build-safe config
- ✅ `next-env.d.ts` — required for TypeScript + Next.js
- ✅ Dynamic `metadataBase` via `NEXT_PUBLIC_SITE_URL` / Vercel's `VERCEL_URL`
- ✅ `engines.node >= 18.18.0` in `package.json`

## 📁 Project structure

```
portfolio-pwa/
├── app/
│   ├── globals.css       # Global styles + CSS variables (color system)
│   ├── layout.tsx        # Root layout, metadata, PWA meta tags
│   ├── page.tsx           # Home page (assembles all sections)
│   ├── loading.tsx        # Route loading skeleton
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # Bilingual 404 page
├── components/
│   ├── Navbar.tsx          # Sticky nav, scroll-spy, language toggle, mobile drawer
│   ├── Hero.tsx             # Hero with typing effect, animated stats
│   ├── About.tsx            # Bio, values, testimonials
│   ├── Skills.tsx           # Skill categories, filters, certifications
│   ├── Projects.tsx         # Project grid with filters & impact metrics
│   ├── Experience.tsx       # Career timeline, education, certifications
│   ├── Contact.tsx          # Contact form + availability info
│   ├── Footer.tsx           # Footer with quick links & status
│   ├── LangToggle.tsx        # EN ⇄ FR language switcher
│   ├── WhatsAppButton.tsx    # Floating WhatsApp CTA
│   └── SkipLink.tsx          # Accessibility skip-to-content link
├── lib/
│   ├── data.ts                # Static data (projects, experience, skills, links)
│   ├── translations.ts        # EN/FR translation dictionaries
│   ├── LanguageContext.tsx    # React context for language state
│   └── utils.ts                # Helper functions (cn)
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── icon-192.png         # PWA icon (192x192)
│   ├── icon-512.png         # PWA icon (512x512)
│   └── cv-alex-dupont.pdf    # Downloadable resume
├── vercel.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ✏️ Customization

### 1. Personal info & links
Update placeholder URLs in `lib/data.ts` (`CONTACT_LINKS`) and components (`Footer.tsx`, `Projects.tsx`, `Experience.tsx`, `WhatsAppButton.tsx`):
- Email, LinkedIn, GitHub, portfolio domain
- WhatsApp number in `WhatsAppButton.tsx`
- Calendly link in `Footer.tsx`

### 2. Content (projects, experience, skills)
- **Static fields** (stack, dates, categories, icons) → `lib/data.ts`
- **Translated text** (descriptions, achievements, titles) → `lib/translations.ts`
  - `projectsContent` (keyed by project `id`)
  - `experienceContent` (keyed by experience `id`)
  - `educationContent` (keyed by education `id`)

### 3. Resume PDF
Replace `public/cv-alex-dupont.pdf` with your own file (keep the same filename, or update the `download` references in `Navbar.tsx`, `Hero.tsx`, and `Footer.tsx`).

### 4. Colors
The color system lives in `app/globals.css` as CSS custom properties (`--accent-primary`, `--accent-fuchsia`, `--accent-cyan`, etc.) and is mirrored in `tailwind.config.ts`.

### 5. PWA icons
Regenerate `public/icon-192.png` and `public/icon-512.png` with your own branding, and update `public/manifest.json` accordingly.

## 🌐 Internationalization (EN/FR)

The portfolio is fully bilingual. The language toggle (`LangToggle.tsx`) switches the entire UI instantly using React Context (`LanguageContext.tsx`) with `localStorage` persistence — no page reload, no routing changes (avoids 404s from browser translation tools).

## 📊 Sections

- **Hero** — Typing effect (Software Engineer / AI Engineer / Cloud & MLOps), animated stats, availability badge
- **About** — Story, core values, testimonials
- **Skills** — 6 categories, filterable, with proficiency bars and certifications
- **Projects** — Filterable grid (Software / AI / MLOps / Cloud) with measurable impact
- **Experience** — Career timeline, education, certifications, career stats
- **Contact** — Form with company field, response time, timezone, open-to list

---

Built with ❤️ using Next.js 14, TypeScript & PWA.
