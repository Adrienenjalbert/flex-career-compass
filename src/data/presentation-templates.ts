// Presentation Templates Data for Indeed Flex Team Review
// All URLs verified against actual routes in App.tsx

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  exampleUrl: string;
  pageCount: number;
  category: 'core' | 'geographic' | 'content' | 'tools' | 'programmatic';
  targetKeywords: string[];
  status: 'draft' | 'review' | 'approved';
  priority: 1 | 2 | 3;
}

export interface ReviewMilestone {
  week: number;
  phase: string;
  focus: string;
  deliverables: string[];
  pages: string[];
  status: 'pending' | 'in-progress' | 'complete';
}

export interface SEOChecklistItem {
  id: string;
  label: string;
  description: string;
  implemented: boolean;
  category: 'meta' | 'technical' | 'content' | 'performance';
}

export const pageTemplates: PageTemplate[] = [
  // === CORE PAGES ===
  {
    id: 'career-hub-home',
    name: 'Career Hub Home',
    description: 'Main landing page with navigation to all resources, tools, and guides',
    exampleUrl: '/career-hub',
    pageCount: 1,
    category: 'core',
    targetKeywords: ['indeed flex career resources', 'flexible work guide', 'temp job help'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'tools-index',
    name: 'Tools Index',
    description: 'Directory of all 14 interactive career tools and calculators',
    exampleUrl: '/career-hub/tools',
    pageCount: 1,
    category: 'core',
    targetKeywords: ['temp job calculator', 'career planning tools', 'shift planner'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'guides-index',
    name: 'Guides Index',
    description: 'Directory of all career guides and articles organized by category',
    exampleUrl: '/career-hub/guides',
    pageCount: 1,
    category: 'core',
    targetKeywords: ['temp work guides', 'flexible job tips', 'gig work advice'],
    status: 'review',
    priority: 1,
  },

  // === GEOGRAPHIC PAGES ===
  {
    id: 'active-market',
    name: 'Active Market (Location)',
    description: 'Detailed pages for 19 Indeed Flex active markets with local job data and seasonal guides',
    exampleUrl: '/career-hub/locations/austin',
    pageCount: 19,
    category: 'geographic',
    targetKeywords: ['indeed flex austin', 'temp jobs [city]', 'flexible work [city]'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'city-page',
    name: 'City Page',
    description: 'Programmatic pages for 50+ US cities with cost of living and job market data',
    exampleUrl: '/career-hub/cities/philadelphia',
    pageCount: 50,
    category: 'geographic',
    targetKeywords: ['temp jobs [city]', '[city] hourly work', 'gig work [city]'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'city-role',
    name: 'City × Role',
    description: 'Hyper-local pages combining city and role for targeted search intent',
    exampleUrl: '/career-hub/cities/austin/warehouse-clerk',
    pageCount: 1000,
    category: 'programmatic',
    targetKeywords: ['[role] jobs in [city]', '[city] [role] salary', 'hiring [role] [city]'],
    status: 'draft',
    priority: 3,
  },
  {
    id: 'location-role',
    name: 'Location × Role',
    description: 'Combined active market and role pages for Indeed Flex locations',
    exampleUrl: '/career-hub/locations/austin/bartender',
    pageCount: 380,
    category: 'geographic',
    targetKeywords: ['bartender jobs austin', '[role] jobs [market]'],
    status: 'review',
    priority: 2,
  },

  // === CONTENT PAGES ===
  {
    id: 'role-page',
    name: 'Role Page',
    description: 'Job role guides with pay ranges, requirements, and career progression',
    exampleUrl: '/career-hub/roles/bartender',
    pageCount: 20,
    category: 'content',
    targetKeywords: ['[role] jobs', 'how to become a [role]', '[role] salary'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'guide-article',
    name: 'Guide Article',
    description: 'In-depth guides covering getting started, interviews, career development',
    exampleUrl: '/career-hub/guides/complete-guide',
    pageCount: 16,
    category: 'content',
    targetKeywords: ['how to use indeed flex', 'temp work guide', 'flexible job tips'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'seasonal-localized',
    name: 'Seasonal Localized',
    description: 'City-specific seasonal guides (summer jobs, holiday hiring, etc.)',
    exampleUrl: '/career-hub/guides/summer-jobs-austin',
    pageCount: 114,
    category: 'content',
    targetKeywords: ['summer jobs [city]', 'holiday hiring [city]', 'seasonal work [city]'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'industry-page',
    name: 'Industry Page',
    description: 'Industry overviews for Industrial, Hospitality, Retail, Facilities',
    exampleUrl: '/career-hub/industries/hospitality',
    pageCount: 4,
    category: 'content',
    targetKeywords: ['[industry] temp jobs', 'indeed flex [industry]', '[industry] flexible work'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'financial-tips',
    name: 'Financial Tips',
    description: 'Money management guides for hourly and temp workers',
    exampleUrl: '/career-hub/financial-tips',
    pageCount: 10,
    category: 'content',
    targetKeywords: ['temp worker budgeting', 'gig economy finances', 'flexible work money tips'],
    status: 'review',
    priority: 2,
  },

  // === TOOLS ===
  {
    id: 'pay-calculator',
    name: 'Pay Calculator',
    description: 'Calculate hourly, weekly, and annual earnings with tax estimates',
    exampleUrl: '/career-hub/tools/pay-calculator',
    pageCount: 1,
    category: 'tools',
    targetKeywords: ['hourly wage calculator', 'temp job pay calculator', 'shift earnings'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'State-by-state tax estimator for W-2 and 1099 workers',
    exampleUrl: '/career-hub/tools/tax-calculator',
    pageCount: 1,
    category: 'tools',
    targetKeywords: ['gig worker tax calculator', 'w2 tax estimator', 'temp worker taxes'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'worktalk',
    name: 'WorkTalk',
    description: 'Workplace English phrases for ESL workers with audio pronunciation',
    exampleUrl: '/career-hub/tools/worktalk',
    pageCount: 1,
    category: 'tools',
    targetKeywords: ['workplace english', 'job phrases ESL', 'work vocabulary'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'cocktail-quiz',
    name: 'Cocktail Quiz',
    description: 'Interactive bartending knowledge trainer with flashcards',
    exampleUrl: '/career-hub/tools/cocktail-quiz',
    pageCount: 1,
    category: 'tools',
    targetKeywords: ['bartender training', 'cocktail recipes quiz', 'mixology practice'],
    status: 'review',
    priority: 2,
  },

  // === PROGRAMMATIC SEO ===
  {
    id: 'seasonal-hub',
    name: 'Seasonal Hiring Hub',
    description: 'National hub for seasonal hiring with interactive calendar',
    exampleUrl: '/career-hub/seasonal-hiring',
    pageCount: 1,
    category: 'programmatic',
    targetKeywords: ['seasonal jobs 2026', 'holiday hiring', 'summer employment'],
    status: 'review',
    priority: 1,
  },
  {
    id: 'event-page',
    name: 'Event Hiring Page',
    description: 'Event-specific hiring pages (Black Friday, Super Bowl, Prime Day)',
    exampleUrl: '/black-friday-hiring-2026',
    pageCount: 5,
    category: 'programmatic',
    targetKeywords: ['black friday jobs', 'super bowl hiring', 'prime day warehouse jobs'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'industry-location',
    name: 'Industry × Location',
    description: 'Combined industry and location pages for targeted searches',
    exampleUrl: '/warehouse-jobs-austin',
    pageCount: 80,
    category: 'programmatic',
    targetKeywords: ['warehouse jobs [city]', 'hospitality jobs [city]', '[industry] hiring [city]'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'how-to-find',
    name: 'How to Find Work',
    description: 'Location-specific guides on finding flexible work',
    exampleUrl: '/how-to-find-flexible-work-in-dallas',
    pageCount: 19,
    category: 'programmatic',
    targetKeywords: ['how to find temp work [city]', 'flexible jobs [city]', 'gig work [city]'],
    status: 'review',
    priority: 2,
  },
  {
    id: 'best-paying',
    name: 'Best Paying Jobs',
    description: 'City-specific pages highlighting highest-paying temp roles',
    exampleUrl: '/best-paying-temp-jobs-chicago',
    pageCount: 19,
    category: 'programmatic',
    targetKeywords: ['best paying temp jobs [city]', 'highest paying gig work'],
    status: 'review',
    priority: 2,
  },
];

export const reviewMilestones: ReviewMilestone[] = [
  {
    week: 1,
    phase: 'Foundation',
    focus: 'Core Templates',
    deliverables: [
      'Review Career Hub Home layout and navigation',
      'Evaluate Tools Index organization',
      'Assess Guides Index content structure',
    ],
    pages: ['/career-hub', '/career-hub/tools', '/career-hub/guides'],
    status: 'pending',
  },
  {
    week: 2,
    phase: 'Foundation',
    focus: 'Location Strategy',
    deliverables: [
      'Review 5 sample active market pages',
      'Validate local data accuracy',
      'Assess geographic SEO strategy',
    ],
    pages: [
      '/career-hub/locations/austin',
      '/career-hub/locations/dallas',
      '/career-hub/locations/chicago',
      '/career-hub/locations/atlanta',
      '/career-hub/locations/las-vegas',
    ],
    status: 'pending',
  },
  {
    week: 3,
    phase: 'Content',
    focus: 'Guide Articles',
    deliverables: [
      'Review all 16 non-seasonal guides',
      'Validate 2026 BLS statistics',
      'Approve content voice and messaging',
    ],
    pages: [
      '/career-hub/guides/complete-guide',
      '/career-hub/guides/first-flex-job',
      '/career-hub/guides/interview-skills',
    ],
    status: 'pending',
  },
  {
    week: 4,
    phase: 'Content',
    focus: 'Seasonal Content',
    deliverables: [
      'Review 6 seasonal page templates (1 per type)',
      'Validate localized employer data',
      'Approve seasonal messaging strategy',
    ],
    pages: [
      '/career-hub/guides/summer-jobs-austin',
      '/career-hub/guides/holiday-warehouse-dallas',
      '/career-hub/guides/back-to-school-jobs-atlanta',
    ],
    status: 'pending',
  },
  {
    week: 5,
    phase: 'Tools',
    focus: 'Financial Tools',
    deliverables: [
      'Review Pay Calculator accuracy',
      'Validate Tax Estimator state data',
      'Test Childcare Calculator formulas',
    ],
    pages: [
      '/career-hub/tools/pay-calculator',
      '/career-hub/tools/tax-calculator',
      '/career-hub/tools/childcare-calculator',
    ],
    status: 'pending',
  },
  {
    week: 6,
    phase: 'Tools',
    focus: 'Training Tools',
    deliverables: [
      'Review WorkTalk phrase accuracy',
      'Test CocktailQuiz content',
      'Validate SafetyFirst scenarios',
    ],
    pages: [
      '/career-hub/tools/worktalk',
      '/career-hub/tools/cocktail-quiz',
      '/career-hub/tools/safety-first',
      '/career-hub/tools/menu-master',
    ],
    status: 'pending',
  },
  {
    week: 7,
    phase: 'Programmatic',
    focus: 'Programmatic Pages',
    deliverables: [
      'Review Industry×Location templates',
      'Validate How-To page structure',
      'Test Best-Paying Jobs data',
    ],
    pages: [
      '/warehouse-jobs-austin',
      '/how-to-find-flexible-work-in-dallas',
      '/best-paying-temp-jobs-chicago',
    ],
    status: 'pending',
  },
  {
    week: 8,
    phase: 'Launch',
    focus: 'Launch Readiness',
    deliverables: [
      'Final SEO audit',
      'Broken link check',
      'Performance testing',
      'Accessibility review',
    ],
    pages: [],
    status: 'pending',
  },
];

export const seoChecklist: SEOChecklistItem[] = [
  {
    id: 'react-helmet',
    label: 'React Helmet Async',
    description: 'Dynamic meta tags for all pages',
    implemented: true,
    category: 'meta',
  },
  {
    id: 'sitemap-index',
    label: 'Sitemap Index',
    description: '7 category sitemaps with 1,700+ URLs',
    implemented: true,
    category: 'technical',
  },
  {
    id: 'robots-txt',
    label: 'robots.txt',
    description: 'Crawler directives with AI bot support',
    implemented: true,
    category: 'technical',
  },
  {
    id: 'faq-schema',
    label: 'FAQPage Schema',
    description: 'Structured data on guide articles',
    implemented: true,
    category: 'meta',
  },
  {
    id: 'breadcrumbs',
    label: 'Breadcrumb Navigation',
    description: 'Hierarchical navigation with schema',
    implemented: true,
    category: 'content',
  },
  {
    id: 'internal-links',
    label: 'Internal Link Hub',
    description: 'Cross-linking component on all pages',
    implemented: true,
    category: 'content',
  },
  {
    id: 'mobile-responsive',
    label: 'Mobile Responsive',
    description: 'Touch-friendly 44px targets, readable fonts',
    implemented: true,
    category: 'performance',
  },
  {
    id: 'og-tags',
    label: 'Open Graph Tags',
    description: 'Social sharing metadata',
    implemented: true,
    category: 'meta',
  },
  {
    id: 'canonical-urls',
    label: 'Canonical URLs',
    description: 'Self-referencing canonicals on all pages',
    implemented: true,
    category: 'technical',
  },
  {
    id: 'prerendering',
    label: 'Pre-rendering for Crawlers',
    description: 'Edge function bot detection (planned)',
    implemented: false,
    category: 'technical',
  },
  {
    id: 'core-web-vitals',
    label: 'Core Web Vitals',
    description: 'LCP <2.5s, INP <200ms, CLS <0.1',
    implemented: false,
    category: 'performance',
  },
  {
    id: 'image-optimization',
    label: 'Image Optimization',
    description: 'WebP format, lazy loading, alt text',
    implemented: true,
    category: 'performance',
  },
];

export const keyMetrics = {
  totalPages: 1700,
  templateTypes: 21,
  activeMarkets: 19,
  interactiveTools: 14,
  guideArticles: 130,
  programmaticPages: 1200,
  sitemapCategories: 7,
};
