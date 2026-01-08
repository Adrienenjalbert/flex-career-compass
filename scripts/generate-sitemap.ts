/**
 * Build-time sitemap generator
 * Run with: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from "fs";
import { join } from "path";

// Import data directly to avoid Vite/React dependencies
import { roles } from "../src/data/roles";
import { usLocations } from "../src/data/locations";
import { cities } from "../src/data/cities";
import { guideCategories } from "../src/data/articles/guides";
import { financialTips } from "../src/data/articles/financial-tips";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const BASE_URL = "https://indeedflex.com";
const TODAY = new Date().toISOString().split("T")[0];

function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({
    loc: `${BASE_URL}/career-hub`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 1.0,
  });

  // Industry pages
  const industries = ["hospitality", "industrial", "retail", "facilities"];
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

    // Location x Role pages
    roles.forEach((role) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/locations/${location.slug}/${role.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  // Cities index page
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

    // City x Role pages
    roles.forEach((role) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/cities/${city.slug}/${role.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  // Programmatic SEO pages - Industry + Location
  const industryUrlSlugs = ["warehouse", "hospitality", "retail", "facilities"];
  cities.forEach((city) => {
    industryUrlSlugs.forEach((industrySlug) => {
      entries.push({
        loc: `${BASE_URL}/${industrySlug}-jobs-${city.slug}`,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    // Intent-based pages
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

  // Tools pages
  entries.push({
    loc: `${BASE_URL}/career-hub/tools`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: 0.8,
  });

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
  tools.forEach((tool) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/tools/${tool}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  // Resource pages
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

  // Guide articles
  guideCategories.forEach((category) => {
    category.articles.forEach((article) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/guides/${article.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  // Financial tips articles
  financialTips.forEach((tip) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/financial-tips/${tip.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  // Active markets page
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

function generateSitemapXML(): string {
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
const outputPath = join(process.cwd(), "public", "sitemap.xml");

writeFileSync(outputPath, sitemap, "utf-8");

const entries = generateSitemapEntries();
console.log(`✅ Sitemap generated successfully!`);
console.log(`📍 Output: ${outputPath}`);
console.log(`📊 Total URLs: ${entries.length}`);
console.log(`📅 Last modified: ${TODAY}`);
