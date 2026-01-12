import { roles } from "@/data/roles";
import { usLocations } from "@/data/locations";
import { cities } from "@/data/cities";
import { guideCategories } from "@/data/articles/guides";
import { financialTips as financialTipsData } from "@/data/articles/financial-tips";
import { seasons, seasonalEvents } from "@/data/seasonal-hiring";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const BASE_URL = "https://indeedflex.com";
const TODAY = new Date().toISOString().split("T")[0];

/**
 * Generate sitemap entries for all pages in the Career Hub
 * This can be used to dynamically generate sitemap.xml
 */
export const generateSitemapEntries = (): SitemapEntry[] => {
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

  // Location pages
  usLocations.forEach((location) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/locations/${location.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.8,
    });

    // Location x Role pages
    roles.forEach((role) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/locations/${location.slug}/${role.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.6,
      });
    });
  });

  // City pages
  entries.push({
    loc: `${BASE_URL}/career-hub/cities`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 0.9,
  });

  cities.forEach((city) => {
    // City index pages
    entries.push({
      loc: `${BASE_URL}/career-hub/cities/${city.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.8,
    });

    // City x Role pages (high-value programmatic pages)
    roles.forEach((role) => {
      entries.push({
        loc: `${BASE_URL}/career-hub/cities/${city.slug}/${role.slug}`,
        lastmod: TODAY,
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  });

  // Industry + Location pages (programmatic SEO)
  const industryUrlSlugs = ['warehouse', 'hospitality', 'retail', 'facilities'];
  cities.forEach((city) => {
    industryUrlSlugs.forEach((industrySlug) => {
      entries.push({
        loc: `${BASE_URL}/${industrySlug}-jobs-${city.slug}`,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.8,
      });
    });
  });

  // Intent-based pages (programmatic SEO)
  cities.forEach((city) => {
    // How to find temp work pages
    entries.push({
      loc: `${BASE_URL}/how-to-find-temp-work-in-${city.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
    
    // Best paying jobs pages
    entries.push({
      loc: `${BASE_URL}/best-paying-temp-jobs-${city.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

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
  financialTipsData.forEach((tip) => {
    entries.push({
      loc: `${BASE_URL}/career-hub/financial-tips/${tip.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  // LLM page
  entries.push({
    loc: `${BASE_URL}/career-hub/llm`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: 0.5,
  });

  // Seasonal hiring hub index
  entries.push({
    loc: `${BASE_URL}/career-hub/seasonal-hiring`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: 0.9,
  });

  // National seasonal hub pages
  seasons.forEach((season) => {
    entries.push({
      loc: `${BASE_URL}/${season.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  // Seasonal x Location pages
  const seasonLocationPrefixes = [
    { prefix: "christmas-temp-jobs", seasonId: "holiday-2026" },
    { prefix: "summer-jobs", seasonId: "summer-2026" },
    { prefix: "fall-retail-jobs", seasonId: "back-to-school-2026" },
    { prefix: "tax-season-jobs", seasonId: "tax-season-2026" },
    { prefix: "spring-jobs", seasonId: "spring-2026" },
  ];

  seasonLocationPrefixes.forEach(({ prefix }) => {
    cities.forEach((city) => {
      entries.push({
        loc: `${BASE_URL}/${prefix}-${city.slug}`,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.7,
      });
    });
  });

  // Event pages (national)
  seasonalEvents.forEach((event) => {
    entries.push({
      loc: `${BASE_URL}/${event.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  // Event x Location pages for major events
  const eventLocationPrefixes = ["black-friday-jobs", "prime-day-jobs"];
  eventLocationPrefixes.forEach((prefix) => {
    cities.forEach((city) => {
      entries.push({
        loc: `${BASE_URL}/${prefix}-${city.slug}`,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.7,
      });
    });
  });

  return entries;
};

/**
 * Generate XML sitemap string
 */
export const generateSitemapXML = (): string => {
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
};

/**
 * Get total page count for analytics
 */
export const getTotalPageCount = (): number => {
  return generateSitemapEntries().length;
};

/**
 * Get page count by type
 */
export const getPageCountByType = (): Record<string, number> => {
  const entries = generateSitemapEntries();
  const counts: Record<string, number> = {
    home: 0,
    industries: 0,
    roles: 0,
    locations: 0,
    locationRoles: 0,
    cities: 0,
    cityRoles: 0,
    tools: 0,
    guides: 0,
    financialTips: 0,
    seasonal: 0,
    events: 0,
    other: 0,
  };

  entries.forEach((entry) => {
    const path = entry.loc.replace(BASE_URL, "");
    if (path === "/career-hub") counts.home++;
    else if (path.includes("/industries/")) counts.industries++;
    else if (path.match(/\/roles\/[^/]+$/)) counts.roles++;
    else if (path.match(/\/locations\/[^/]+$/)) counts.locations++;
    else if (path.match(/\/locations\/[^/]+\/[^/]+$/)) counts.locationRoles++;
    else if (path.match(/\/cities\/[^/]+$/)) counts.cities++;
    else if (path.match(/\/cities\/[^/]+\/[^/]+$/)) counts.cityRoles++;
    else if (path.includes("/tools")) counts.tools++;
    else if (path.includes("/guides/")) counts.guides++;
    else if (path.includes("/financial-tips/")) counts.financialTips++;
    else if (path.includes("/seasonal-hiring") || path.match(/christmas-temp-jobs|summer-jobs|fall-retail-jobs|tax-season-jobs|spring-jobs|holiday-warehouse|back-to-school/)) counts.seasonal++;
    else if (path.match(/black-friday|prime-day|super-bowl|concert-venue|new-years-eve/)) counts.events++;
    else counts.other++;
  });

  return counts;
};
