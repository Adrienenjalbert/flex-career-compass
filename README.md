<div align="center">

# 🚀 Indeed Flex Career Hub

**An SEO-optimized career resource platform for US flexible workers**

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://flex-career-compass.lovable.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](https://flex-career-compass.lovable.app) • [Tools](#-interactive-tools) • [Features](#-features) • [Getting Started](#-getting-started)

</div>

---

## 📋 Overview

The **Indeed Flex Career Hub** is a content-rich web application designed to help temporary and flexible workers in the United States make informed career decisions. Built with an SEO-first architecture, it generates **1,700+ programmatic pages** targeting high-intent searches.

### Who is this for?

- 🎯 **Aspiring Flexers** exploring flexible work opportunities
- 💼 **Active gig workers** planning earnings and career growth
- 🔄 **Career changers** transitioning to flexible employment
- 🎓 **Students** seeking part-time work that fits their schedule

---

## ✨ Features

### 🛠️ Interactive Tools (14)

| Tool | Description | Data Source |
|------|-------------|-------------|
| **💰 Paycheck Calculator** | Take-home pay estimates for all 50 states | 2026 tax rates |
| **📊 Tax Estimator** | 1099/W-2 quarterly tax planning | 2026 federal brackets |
| **📅 Shift Income Planner** | Weekly/monthly earnings projection | Real-time calculation |
| **👶 Childcare Calculator** | Break-even analysis with state-specific costs | 2026 state data |
| **🚗 Commute Calculator** | True commuting cost including time value | 2026 IRS rates |
| **📉 Unemployment Calculator** | State-by-state benefit estimates | 2026 state rules |
| **🎯 Career Path Explorer** | Visual role progression mapping | 20+ career paths |
| **🔍 Skills Analyzer** | Gap analysis with recommendations | Industry standards |
| **🗣️ WorkTalk** | Job-specific English for Spanish speakers | 250+ phrases with TTS |
| **🍸 CocktailQuiz** | Bartending trainer with 50+ cocktails | Industry standards |
| **⚠️ SafetyFirst** | OSHA safety trainer (bilingual EN/ES) | OSHA-aligned |
| **👨‍🍳 MenuMaster** | Culinary terms & food safety trainer | ServSafe-aligned |
| **🏙️ Cost of Living** | City-to-city expense comparison | BLS/Numbeo 2026 |

---

## 🎯 SEO Architecture

This project implements a **comprehensive programmatic SEO strategy** designed to overcome React SPA limitations and maximize search visibility.

### 📊 Page Count Summary

| Page Type | Count | URL Pattern |
|-----------|-------|-------------|
| Core Pages | ~10 | `/`, `/career-hub`, `/career-hub/tools`, etc. |
| Location Pages | 19 | `/career-hub/locations/{slug}` |
| City Pages | 50+ | `/career-hub/cities/{slug}` |
| Role Pages | 20+ | `/career-hub/roles/{slug}` |
| Industry Pages | 4 | `/career-hub/industries/{slug}` |
| City × Role Pages | 500+ | `/career-hub/cities/{city}/{role}` |
| Location × Role Pages | 100+ | `/career-hub/locations/{location}/{role}` |
| Guide Articles | 16 | `/career-hub/guides/{slug}` |
| Financial Tips | 12+ | `/career-hub/financial-tips/{slug}` |
| **Seasonal Location Pages** | 114 | `/career-hub/guides/{article}-{city}` |
| Seasonal Hub Pages | 10+ | `/{season}-jobs-{year}` |
| Event Hiring Pages | 10+ | `/{event}-hiring-{year}` |
| Industry × Location | 50+ | `/{industry}-jobs-{city}` |
| How-To Pages | 50+ | `/how-to-find-temp-work-in-{city}` |
| Best Paying Pages | 50+ | `/best-paying-temp-jobs-{city}` |
| Tools | 13 | `/career-hub/tools/{slug}` |
| **Total** | **1,700+** | |

---

### 🌍 Localized Seasonal Pages Architecture

One of the key SEO features is **114 localized seasonal guide pages** that combine article content with city-specific data.

#### How It Works

```
Article Types (6) × Priority Cities (19) = 114 Pages
```

**Article Types:**
1. `summer-jobs` — Summer hospitality & event hiring
2. `holiday-warehouse` — Q4 warehouse surge
3. `christmas-temp-jobs` — Holiday retail & fulfillment
4. `tax-season-jobs` — Q1 administrative demand
5. `back-to-school` — Late summer retail push
6. `spring-hiring` — Spring event season

**Priority Cities (19 Indeed Flex Markets):**
Austin, Dallas, Houston, Nashville, Atlanta, Cincinnati, Cleveland, Columbus, Chicago, Washington DC, Las Vegas, Reno, Charlotte, Phoenix, Orlando, Fort Mill, Bentonville, Cartersville, Ontario

#### URL Structure

```
/career-hub/guides/{article-slug}-{city-slug}

Examples:
/career-hub/guides/summer-jobs-austin
/career-hub/guides/holiday-warehouse-dallas
/career-hub/guides/christmas-temp-jobs-chicago
/career-hub/guides/tax-season-jobs-atlanta
```

#### Routing Logic

The `GuidesSlugRouter` component (`src/pages/career-hub/articles/GuidesSlugRouter.tsx`) intelligently routes requests:

```tsx
// If slug contains a city suffix → SeasonalLocationArticlePage
// Otherwise → Standard GuidesArticlePage
```

#### Discovery Strategy

Localized seasonal pages are linked from:
1. **City Pages** (`/career-hub/cities/{slug}`) — "Seasonal Guides" section
2. **Location Pages** (`/career-hub/locations/{slug}`) — "Seasonal Guides" section  
3. **Parent Seasonal Articles** — "Related Locations" section
4. **Internal Link Hub** — Contextual cross-linking

This solves the **orphan page problem** common in React SPAs by ensuring all programmatic pages are discoverable via high-authority parent pages.

---

### 📁 Sitemap Structure

The project uses a **sitemap index** pattern to organize 1,700+ URLs:

```
public/sitemap.xml (index)
├── sitemap-core.xml        (~10 URLs)     — Homepage, tools index, guides index
├── sitemap-locations.xml   (~20 URLs)     — Indeed Flex active markets
├── sitemap-cities.xml      (~500 URLs)    — City pages + city-role combinations
├── sitemap-roles.xml       (~100 URLs)    — Role pages + location-role combinations
├── sitemap-guides.xml      (~150 URLs)    — Guide articles + localized seasonal pages
├── sitemap-tools.xml       (~15 URLs)     — Interactive calculator pages
├── sitemap-seasonal.xml    (~50 URLs)     — Seasonal hub + event hiring pages
└── sitemap-programmatic.xml (~400 URLs)   — Industry-location, how-to, best-paying
```

#### Sitemap Generation

Sitemaps are generated at build time via `scripts/generate-sitemap.ts`:

```bash
npm run generate-sitemap
```

The script:
1. Imports all data sources (cities, roles, articles, seasonal combinations)
2. Generates category-specific XML files
3. Creates the sitemap index with `lastmod` timestamps
4. Outputs to `public/` directory

---

### 🤖 Technical SEO for React SPAs

#### Challenge

React SPAs render content client-side, which can cause:
- Crawlers seeing empty `<div id="root"></div>`
- Missing meta tags at initial request
- Poor Core Web Vitals due to hydration

#### Solutions Implemented

| Solution | Implementation |
|----------|----------------|
| **Static Meta Tags** | `react-helmet-async` injects `<title>`, `<meta>`, OG tags |
| **Schema.org Markup** | JSON-LD embedded in page components |
| **Pre-rendering** | Edge Functions detect bots and serve static HTML |
| **Sitemap Index** | Category-based XML sitemaps for efficient crawling |
| **Internal Linking** | Every page links to 3-5 related pages |
| **Breadcrumbs** | Visual + schema markup on all pages |

#### Bot Detection (Edge Function)

```typescript
// Detects Googlebot, Bingbot, etc. and serves pre-rendered HTML
const botUserAgents = ['googlebot', 'bingbot', 'yandex', 'baiduspider'];
```

---

### 🔗 Internal Linking Strategy

Every page includes contextual links to related content:

| Page Type | Links To |
|-----------|----------|
| City Page | Roles in that city, Nearby cities, Seasonal guides |
| Role Page | Locations hiring this role, Related roles, Career paths |
| Seasonal Article | Related locations, Parent seasonal hub, Tools |
| Industry Page | Roles in industry, Locations with jobs, Guides |

The `InternalLinkHub` component provides consistent cross-linking across all pages.

---

### 📝 Critical SEO Files

| File | Purpose |
|------|---------|
| `public/robots.txt` | Crawler directives, sitemap reference, AI bot rules |
| `public/sitemap.xml` | Sitemap index referencing all category sitemaps |
| `public/llm.txt` | Structured data for AI/LLM crawlers |
| `src/components/career-hub/seo/SEOMetaTags.tsx` | Dynamic meta tag generation |
| `src/components/career-hub/seo/EnhancedSchema.tsx` | Schema.org structured data |
| `scripts/generate-sitemap.ts` | Build-time sitemap generation |

#### robots.txt Configuration

```txt
User-agent: *
Allow: /
Sitemap: https://flex-career-compass.lovable.app/sitemap.xml

# AI/LLM Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

---

### 📐 URL Design Principles

| Principle | Example |
|-----------|---------|
| **Flat Structure** | `/career-hub/guides/summer-jobs-austin` (not `/guides/seasonal/summer/austin`) |
| **Lowercase** | All URLs lowercase with hyphens |
| **Descriptive** | `/career-hub/tools/pay-calculator` (not `/tools/calc1`) |
| **Consistent Trailing Slash** | No trailing slash (configured in Vite) |
| **Canonical URLs** | Every page specifies canonical to prevent duplicates |

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 (lightning-fast HMR) |
| **Styling** | Tailwind CSS + shadcn/ui components |
| **Routing** | React Router v6 |
| **State Management** | TanStack Query (React Query) |
| **Backend** | Supabase via Lovable Cloud |
| **SEO** | react-helmet-async |
| **Charts** | Recharts |
| **Audio** | Web Speech API (TTS) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── career-hub/
│   │   ├── seo/              # SEOMetaTags, EnhancedSchema
│   │   ├── tools/            # FlashcardMode, PhraseCard
│   │   ├── interactive/      # Calculators, assessments
│   │   ├── SeasonalGuidesSection.tsx  # City → Seasonal linking
│   │   ├── RelatedLocationsSection.tsx # Seasonal → Cities linking
│   │   └── InternalLinkHub.tsx        # Cross-page linking
│   └── ui/                   # shadcn/ui components
├── data/
│   ├── locations.ts          # 19 Indeed Flex US metros
│   ├── cities.ts             # 50+ US cities with metadata
│   ├── roles.ts              # 20+ job roles
│   ├── seasonal-hiring.ts    # Seasons, events, hiring data
│   ├── articles/
│   │   ├── guides.ts         # 16 guide articles
│   │   ├── financial-tips.ts # Financial articles
│   │   └── seasonal-location-data.ts # Localized seasonal data
│   └── [various data files]
├── pages/
│   └── career-hub/
│       ├── tools/            # 13 calculator pages
│       ├── articles/
│       │   ├── GuidesSlugRouter.tsx      # Routes guides vs seasonal
│       │   ├── SeasonalLocationArticlePage.tsx # Localized seasonal
│       │   └── GuidesArticlePage.tsx     # Standard guides
│       └── programmatic/
│           ├── ProgrammaticRouter.tsx    # URL pattern detection
│           ├── SeasonalHubPage.tsx       # National seasonal hubs
│           ├── SeasonalLocationPage.tsx  # Season × City pages
│           └── EventHiringPage.tsx       # Event-specific pages
├── lib/
│   ├── sitemap.ts            # Sitemap generation utilities
│   └── utils.ts              # Utility functions
└── integrations/
    └── supabase/             # Backend client
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm**, **yarn**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/indeed-flex-career-hub.git

# Navigate to project directory
cd indeed-flex-career-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Generate sitemaps
npm run generate-sitemap

# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📊 Data Sources

All calculators use verified, up-to-date data:

| Data Type | Coverage | Year | Update Frequency |
|-----------|----------|------|------------------|
| Federal Tax Brackets | US | 2026 | Annual |
| State Income Tax | 50 states | 2026 | Annual |
| Indeed Flex Markets | 19 metros | 2026 | As announced |
| Job Roles & Requirements | 20+ roles | 2026 | Quarterly |
| Childcare Costs | 50 states | 2026 | Annual |
| Unemployment Benefits | 50 states | 2026 | Annual |
| Seasonal Hiring Events | National | 2026 | Monthly |
| Workplace English Phrases | 250+ | 2026 | Ongoing |

---

## 🔎 SEO Performance Checklist

- ✅ **Unique content** for every location + role + seasonal combination
- ✅ **Schema.org markup** for rich search results (JobPosting, FAQPage, HowTo, Article, BreadcrumbList)
- ✅ **Smart internal linking** via SeasonalGuidesSection, RelatedLocationsSection, InternalLinkHub
- ✅ **Core Web Vitals optimized** with Vite bundling and lazy loading
- ✅ **Mobile-first** responsive design with 44px touch targets
- ✅ **Dynamic sitemap index** with 7 category sitemaps
- ✅ **AI/LLM crawler support** via robots.txt and llm.txt
- ✅ **Localized seasonal pages** (114) solving orphan page problem
- ✅ **Flat URL structure** preventing 404s from nested categories

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code style and conventions
- Pull request process
- Issue reporting guidelines

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Indeed Flex](https://indeedflex.com) — Platform data and inspiration
- [shadcn/ui](https://ui.shadcn.com) — Beautiful component library
- [Lovable](https://lovable.dev) — AI-powered development platform
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework

---

<div align="center">

**Built with ❤️ using [Lovable](https://lovable.dev)**

[⬆ Back to top](#-indeed-flex-career-hub)

</div>
