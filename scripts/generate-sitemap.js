/**
 * Build-time sitemap generator (CommonJS version for npm scripts)
 * Run with: node scripts/generate-sitemap.js
 * 
 * This script is auto-generated. For the source, see generate-sitemap.ts
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = "https://indeedflex.com";
const TODAY = new Date().toISOString().split("T")[0];

// Inline data to avoid ESM/CJS issues with imports
// These should match the data in src/data files

const roles = [
  { slug: "forklift-driver", title: "Forklift Driver" },
  { slug: "warehouse-associate", title: "Warehouse Associate" },
  { slug: "picker-packer", title: "Picker Packer" },
  { slug: "machine-operator", title: "Machine Operator" },
  { slug: "assembler", title: "Assembler" },
  { slug: "general-labor", title: "General Labor" },
  { slug: "loader", title: "Loader" },
  { slug: "warehouse-clerk", title: "Warehouse Clerk" },
  { slug: "event-staff", title: "Event Staff" },
  { slug: "banquet-server", title: "Banquet Server" },
  { slug: "bartender", title: "Bartender" },
  { slug: "prep-cook", title: "Prep Cook" },
  { slug: "dishwasher", title: "Dishwasher" },
  { slug: "hospitality-general-labor", title: "Hospitality General Labor" },
  { slug: "cleaner", title: "Cleaner" },
  { slug: "custodian", title: "Custodian" },
  { slug: "retail-assistant", title: "Retail Assistant" },
  { slug: "administrative-assistant", title: "Administrative Assistant" },
  { slug: "sales-support", title: "Sales Support" },
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

function generateSitemapEntries() {
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

  // Role pages
  roles.forEach((role) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/roles/${role.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.8,
    });
  });

  // Indeed Flex Active Market Location pages
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

  // Cities index
  entries.push({
    loc: `${BASE_URL}/career-hub/cities`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 0.9,
  });

  // City pages
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

  // Programmatic SEO pages
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

  // Tools
  entries.push({
    loc: `${BASE_URL}/career-hub/tools`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: 0.8,
  });

  tools.forEach((tool) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/tools/${tool}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  // Resources
  entries.push({
    loc: `${BASE_URL}/career-hub/guides`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 0.8,
  });

  entries.push({
    loc: `${BASE_URL}/career-hub/financial-tips`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 0.8,
  });

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

  // Active markets
  entries.push({
    loc: `${BASE_URL}/career-hub/active-markets`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 0.8,
  });

  // LLM page
  entries.push({
    loc: `${BASE_URL}/career-hub/llm`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: 0.5,
  });

  return entries;
}

function generateSitemapXML() {
  const entries = generateSitemapEntries();

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

// Main execution
const sitemap = generateSitemapXML();
const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");

fs.writeFileSync(outputPath, sitemap, "utf-8");

const entries = generateSitemapEntries();
console.log(`✅ Sitemap generated successfully!`);
console.log(`📍 Output: ${outputPath}`);
console.log(`📊 Total URLs: ${entries.length}`);
console.log(`📅 Last modified: ${TODAY}`);
