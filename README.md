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

The **Indeed Flex Career Hub** is a content-rich web application designed to help temporary and flexible workers in the United States make informed career decisions. Built with an SEO-first architecture, it generates **200+ programmatic pages** targeting high-intent searches.

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

### 📍 Programmatic SEO Pages

- **19 Location Pages** — Indeed Flex active metro markets
- **20+ Role Pages** — Detailed job guides with requirements, pay, and progression
- **4 Industry Pages** — Hospitality, Industrial, Retail, Facilities Management
- **Location × Role Combinations** — Hyper-local content (e.g., "Forklift Driver in Austin")
- **Financial Tips & Guides** — Educational articles for gig workers

### 🔎 SEO Infrastructure

| Feature | Implementation |
|---------|----------------|
| Structured Data | Schema.org (JobPosting, FAQPage, HowTo, Article, BreadcrumbList) |
| Sitemap | Dynamic XML with 200+ URLs, auto-generated priorities |
| Meta Tags | Unique titles, descriptions, and Open Graph for every page |
| LLM-Friendly | `/llm.txt` endpoint for AI crawlers |
| Internal Linking | Contextual cross-linking between related content |

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
│   ├── career-hub/           # Domain-specific components
│   │   ├── seo/              # Schema.org structured data
│   │   ├── tools/            # Tool sub-components (FlashcardMode, etc.)
│   │   └── interactive/      # Calculators, assessments, widgets
│   └── ui/                   # shadcn/ui component library
├── data/
│   ├── locations.ts          # 19 Indeed Flex US metros
│   ├── cities.ts             # Extended city data
│   ├── roles.ts              # 20+ job roles with details
│   ├── state-taxes.ts        # 50 state income tax rates
│   ├── childcare-costs.ts    # State-by-state childcare data
│   ├── commute-costs.ts      # Transportation cost factors
│   ├── unemployment-benefits.ts  # State unemployment rules
│   └── job-english-phrases.ts    # 250+ bilingual workplace phrases
├── pages/
│   └── career-hub/
│       ├── tools/            # Calculator & tool pages
│       ├── articles/         # Content article pages
│       └── programmatic/     # SEO page generators
├── hooks/
│   ├── useSpeechSynthesis.ts # Text-to-speech with voice optimization
│   └── use-mobile.tsx        # Responsive breakpoint detection
├── lib/
│   ├── sitemap.ts            # Dynamic sitemap generation
│   └── utils.ts              # Utility functions
└── integrations/
    └── supabase/             # Backend client configuration
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
| Workplace English Phrases | 250+ | 2026 | Ongoing |

---

## 🎯 SEO Performance

This project implements **programmatic SEO best practices**:

- ✅ **Unique content** for every location + role combination
- ✅ **Schema.org markup** for rich search results
- ✅ **Smart internal linking** between contextually related pages
- ✅ **Core Web Vitals optimized** with Vite bundling
- ✅ **Mobile-first** responsive design
- ✅ **Dynamic sitemap** with proper priorities and changefreq

### Page Count by Type

```
Home & Core Pages:     ~10
Industry Pages:         4
Role Pages:           20+
Location Pages:        19
City Pages:           19+
City × Role Pages:   100+
Tools:                  9
Articles & Guides:    20+
─────────────────────────
Total:               200+
```

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
