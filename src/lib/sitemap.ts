import { roles } from "@/data/roles";
import { usLocations } from "@/data/locations";
import { cities } from "@/data/cities";
import { guideCategories } from "@/data/articles/guides";
import { financialTips as financialTipsData } from "@/data/articles/financial-tips";

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
    else counts.other++;
  });

  return counts;
};
