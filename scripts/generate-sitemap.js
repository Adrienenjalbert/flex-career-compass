/**
 * Build-time sitemap index generator (CommonJS version for npm scripts)
 * Generates category-based sitemaps with an index file for better SEO management
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = "https://indeedflex.com";
const TODAY = new Date().toISOString().split("T")[0];

// Data definitions
const roles = [
  { slug: "forklift-driver" },
  { slug: "warehouse-associate" },
  { slug: "picker-packer" },
  { slug: "machine-operator" },
  { slug: "assembler" },
  { slug: "general-labor" },
  { slug: "loader" },
  { slug: "warehouse-clerk" },
  { slug: "event-staff" },
  { slug: "banquet-server" },
  { slug: "bartender" },
  { slug: "prep-cook" },
  { slug: "dishwasher" },
  { slug: "hospitality-general-labor" },
  { slug: "cleaner" },
  { slug: "custodian" },
  { slug: "retail-assistant" },
  { slug: "administrative-assistant" },
  { slug: "sales-support" },
];

const usLocations = [
  { slug: "austin" },
  { slug: "dallas" },
  { slug: "houston" },
  { slug: "nashville" },
  { slug: "atlanta" },
  { slug: "cartersville" },
  { slug: "cincinnati" },
  { slug: "cleveland" },
  { slug: "columbus" },
  { slug: "ontario" },
  { slug: "chicago" },
  { slug: "washington-dc" },
  { slug: "las-vegas" },
  { slug: "reno" },
  { slug: "charlotte" },
  { slug: "bentonville" },
  { slug: "fort-mill" },
  { slug: "orlando" },
  { slug: "phoenix" },
];

const cities = [
  { slug: "new-york" },
  { slug: "los-angeles" },
  { slug: "chicago" },
  { slug: "houston" },
  { slug: "phoenix" },
  { slug: "philadelphia" },
  { slug: "san-antonio" },
  { slug: "san-diego" },
  { slug: "dallas" },
  { slug: "austin" },
  { slug: "san-jose" },
  { slug: "fort-worth" },
  { slug: "jacksonville" },
  { slug: "charlotte" },
  { slug: "columbus" },
  { slug: "indianapolis" },
  { slug: "san-francisco" },
  { slug: "seattle" },
  { slug: "denver" },
  { slug: "oklahoma-city" },
  { slug: "nashville" },
  { slug: "el-paso" },
  { slug: "washington-dc" },
  { slug: "las-vegas" },
  { slug: "boston" },
  { slug: "portland" },
  { slug: "detroit" },
  { slug: "memphis" },
  { slug: "louisville" },
  { slug: "baltimore" },
  { slug: "milwaukee" },
  { slug: "albuquerque" },
  { slug: "tucson" },
  { slug: "fresno" },
  { slug: "sacramento" },
  { slug: "kansas-city" },
  { slug: "mesa" },
  { slug: "atlanta" },
  { slug: "omaha" },
  { slug: "colorado-springs" },
  { slug: "raleigh" },
  { slug: "miami" },
  { slug: "cleveland" },
  { slug: "tampa" },
  { slug: "new-orleans" },
  { slug: "orlando" },
  { slug: "minneapolis" },
  { slug: "pittsburgh" },
  { slug: "cincinnati" },
  { slug: "st-louis" },
];

const guideArticles = [
  "getting-started-indeed-flex",
  "building-strong-profile",
  "verification-process",
  "booking-first-shift",
  "maximizing-earnings",
  "understanding-ratings",
  "worker-rights",
  "workplace-safety",
  "career-advancement",
  "networking-strategies",
  "work-life-balance",
  "interview-preparation",
];

const financialTips = [
  "budgeting-flexible-income",
  "emergency-fund-basics",
  "tax-tips-gig-workers",
  "retirement-planning",
  "health-insurance-options",
  "maximizing-same-day-pay",
];

const tools = [
  "pay-calculator",
  "shift-planner",
  "cost-of-living",
  "tax-calculator",
  "skills-analyzer",
  "career-path",
  "worktalk",
  "childcare-calculator",
  "commute-calculator",
  "unemployment-calculator",
];

const industries = ["hospitality", "industrial", "retail", "facilities"];
const industryUrlSlugs = ["warehouse", "hospitality", "retail", "facilities"];

/**
 * Generate XML for a single sitemap
 */
function generateSitemapXML(entries) {
  const urlEntries = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generate sitemap index XML
 */
function generateSitemapIndexXML(sitemaps) {
  const sitemapEntries = sitemaps
    .map(
      (sitemap) => `  <sitemap>
    <loc>${BASE_URL}/${sitemap.filename}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Generate core pages sitemap (homepage, industries, main sections)
 */
function generateCoreSitemap() {
  const entries = [];

  // Homepage
  entries.push({
    loc: `${BASE_URL}/career-hub`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 1.0,
  });

  // Industry pages
  industries.forEach((industry) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/industries/${industry}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.9,
    });
  });

  // Main section pages
  entries.push({ loc: `${BASE_URL}/career-hub/cities`, lastmod: TODAY, changefreq: "weekly", priority: 0.9 });
  entries.push({ loc: `${BASE_URL}/career-hub/tools`, lastmod: TODAY, changefreq: "monthly", priority: 0.8 });
  entries.push({ loc: `${BASE_URL}/career-hub/guides`, lastmod: TODAY, changefreq: "weekly", priority: 0.8 });
  entries.push({ loc: `${BASE_URL}/career-hub/financial-tips`, lastmod: TODAY, changefreq: "weekly", priority: 0.8 });
  entries.push({ loc: `${BASE_URL}/career-hub/resources`, lastmod: TODAY, changefreq: "monthly", priority: 0.7 });
  entries.push({ loc: `${BASE_URL}/career-hub/active-markets`, lastmod: TODAY, changefreq: "weekly", priority: 0.8 });
  entries.push({ loc: `${BASE_URL}/career-hub/llm`, lastmod: TODAY, changefreq: "monthly", priority: 0.5 });

  return entries;
}

/**
 * Generate roles sitemap
 */
function generateRolesSitemap() {
  return roles.map((role) => ({
    loc: `${BASE_URL}/career-hub/roles/${role.slug}`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: 0.8,
  }));
}

/**
 * Generate Indeed Flex locations sitemap (active markets + role combos)
 */
function generateLocationsSitemap() {
  const entries = [];

  usLocations.forEach((location) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/locations/${location.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.9,
    });

    roles.forEach((role) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/locations/${location.slug}/${role.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  return entries;
}

/**
 * Generate cities sitemap (all US cities + role combos)
 */
function generateCitiesSitemap() {
  const entries = [];

  cities.forEach((city) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/cities/${city.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.8,
    });

    roles.forEach((role) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/cities/${city.slug}/${role.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  return entries;
}

/**
 * Generate programmatic SEO pages sitemap (industry+location, intent pages)
 */
function generateProgrammaticSitemap() {
  const entries = [];

  cities.forEach((city) => {
    industryUrlSlugs.forEach((industrySlug) => {
      entries.push({
        loc: `${BASE_URL}/${industrySlug}-jobs-${city.slug}`,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    entries.push({
      loc: `${BASE_URL}/how-to-find-temp-work-in-${city.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });

    entries.push({
      loc: `${BASE_URL}/best-paying-temp-jobs-${city.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  return entries;
}

/**
 * Generate tools sitemap
 */
function generateToolsSitemap() {
  return tools.map((tool) => ({
    loc: `${BASE_URL}/career-hub/tools/${tool}`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: 0.7,
  }));
}

/**
 * Generate guides sitemap (guides + financial tips)
 */
function generateGuidesSitemap() {
  const entries = [];

  guideArticles.forEach((slug) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/guides/${slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  financialTips.forEach((slug) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/financial-tips/${slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}

/**
 * Main function to generate all sitemaps
 */
function generateAllSitemaps() {
  const publicDir = path.join(__dirname, "..", "public");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemaps = [
    { filename: "sitemap-core.xml", generator: generateCoreSitemap },
    { filename: "sitemap-roles.xml", generator: generateRolesSitemap },
    { filename: "sitemap-locations.xml", generator: generateLocationsSitemap },
    { filename: "sitemap-cities.xml", generator: generateCitiesSitemap },
    { filename: "sitemap-programmatic.xml", generator: generateProgrammaticSitemap },
    { filename: "sitemap-tools.xml", generator: generateToolsSitemap },
    { filename: "sitemap-guides.xml", generator: generateGuidesSitemap },
  ];

  let totalUrls = 0;

  // Generate individual sitemaps
  sitemaps.forEach(({ filename, generator }) => {
    const entries = generator();
    const xml = generateSitemapXML(entries);
    const filepath = path.join(publicDir, filename);
    fs.writeFileSync(filepath, xml, "utf-8");
    console.log(`✓ Generated ${filename} with ${entries.length} URLs`);
    totalUrls += entries.length;
  });

  // Generate sitemap index
  const indexXml = generateSitemapIndexXML(sitemaps);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), indexXml, "utf-8");
  console.log(`✓ Generated sitemap.xml (index) referencing ${sitemaps.length} sitemaps`);

  console.log(`\n✅ Total: ${totalUrls} URLs across ${sitemaps.length} sitemaps`);
  console.log(`📅 Last modified: ${TODAY}`);
}

// Run the generator
generateAllSitemaps();
