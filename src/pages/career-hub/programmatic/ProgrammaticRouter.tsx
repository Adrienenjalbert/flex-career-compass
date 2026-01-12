import { useParams } from "react-router-dom";
import IndustryLocationPage from "./IndustryLocationPage";
import HowToFindWorkPage from "./HowToFindWorkPage";
import BestPayingJobsPage from "./BestPayingJobsPage";
import SeasonalHubPage from "./SeasonalHubPage";
import SeasonalLocationPage from "./SeasonalLocationPage";
import EventHiringPage from "./EventHiringPage";
import NotFound from "@/pages/NotFound";
import { seasons, seasonalEvents } from "@/data/seasonal-hiring";

// URL Pattern Types
type PageType = 
  | 'industry-location' 
  | 'how-to-find-work' 
  | 'best-paying-jobs' 
  | 'seasonal-hub'
  | 'seasonal-location'
  | 'event-hiring'
  | 'unknown';

// Detect the type of programmatic page from the URL slug
function detectPageType(slug: string): { type: PageType; parsed: Record<string, string> } {
  // Seasonal hub pages: holiday-warehouse-jobs-2026, summer-hospitality-jobs-2026
  const seasonalHubPatterns = [
    { pattern: /^(holiday|christmas)-warehouse-jobs-(\d{4})$/, season: 'holiday' },
    { pattern: /^summer-hospitality-jobs-(\d{4})$/, season: 'summer' },
    { pattern: /^back-to-school-jobs-(\d{4})$/, season: 'back-to-school' },
    { pattern: /^tax-season-jobs-(\d{4})$/, season: 'tax-season' },
    { pattern: /^spring-hiring-(\d{4})$/, season: 'spring' },
  ];

  for (const { pattern, season } of seasonalHubPatterns) {
    const match = slug.match(pattern);
    if (match) {
      return { 
        type: 'seasonal-hub', 
        parsed: { seasonId: season, year: match[match.length - 1] } 
      };
    }
  }

  // Event pages: prime-day-hiring-2026, black-friday-jobs-2026, super-bowl-staffing-2026
  const eventPatterns = [
    { pattern: /^prime-day-hiring-(\d{4})$/, eventId: 'prime-day' },
    { pattern: /^black-friday-jobs-(\d{4})$/, eventId: 'black-friday' },
    { pattern: /^super-bowl-staffing-(\d{4})$/, eventId: 'super-bowl' },
    { pattern: /^concert-season-jobs-(\d{4})$/, eventId: 'concert-season' },
    { pattern: /^new-years-eve-jobs-(\d{4})$/, eventId: 'new-years-eve' },
  ];

  for (const { pattern, eventId } of eventPatterns) {
    const match = slug.match(pattern);
    if (match) {
      return { 
        type: 'event-hiring', 
        parsed: { eventId, year: match[1] } 
      };
    }
  }

  // Seasonal + location: christmas-temp-jobs-{city}, holiday-warehouse-jobs-{city}
  const seasonalLocationPatterns = [
    { pattern: /^christmas-temp-jobs-(.+)$/, seasonId: 'holiday' },
    { pattern: /^holiday-warehouse-jobs-(.+)$/, seasonId: 'holiday' },
    { pattern: /^summer-hospitality-jobs-(.+)$/, seasonId: 'summer' },
    { pattern: /^fall-retail-jobs-(.+)$/, seasonId: 'back-to-school' },
    { pattern: /^tax-season-jobs-(.+)$/, seasonId: 'tax-season' },
  ];

  for (const { pattern, seasonId } of seasonalLocationPatterns) {
    const match = slug.match(pattern);
    if (match && !/^\d{4}$/.test(match[1])) { // Exclude year-only matches (those are hub pages)
      return { 
        type: 'seasonal-location', 
        parsed: { seasonId, citySlug: match[1] } 
      };
    }
  }

  // How to find temp work: how-to-find-temp-work-in-{city}
  if (slug.startsWith('how-to-find-temp-work-in-')) {
    return { 
      type: 'how-to-find-work', 
      parsed: { citySlug: slug.substring('how-to-find-temp-work-in-'.length) } 
    };
  }
  
  // Best paying jobs: best-paying-temp-jobs-{city}
  if (slug.startsWith('best-paying-temp-jobs-')) {
    return { 
      type: 'best-paying-jobs', 
      parsed: { citySlug: slug.substring('best-paying-temp-jobs-'.length) } 
    };
  }
  
  // Industry + Location: {industry}-jobs-{city}
  const jobsIndex = slug.indexOf('-jobs-');
  if (jobsIndex !== -1) {
    const industrySlug = slug.substring(0, jobsIndex);
    const locationSlug = slug.substring(jobsIndex + 6);
    
    // Validate it's a known industry
    const validIndustries = ['warehouse', 'hospitality', 'retail', 'facilities', 'industrial'];
    if (validIndustries.includes(industrySlug)) {
      return { 
        type: 'industry-location', 
        parsed: { industrySlug, locationSlug } 
      };
    }
  }
  
  return { type: 'unknown', parsed: {} };
}

/**
 * Router component for programmatic SEO pages
 * Handles URL patterns like:
 * - /warehouse-jobs-philadelphia (Industry + Location)
 * - /how-to-find-temp-work-in-philadelphia (How-To Guide)
 * - /best-paying-temp-jobs-philadelphia (Best Paying Jobs)
 * - /holiday-warehouse-jobs-2026 (Seasonal Hub)
 * - /christmas-temp-jobs-dallas (Seasonal + Location)
 * - /prime-day-hiring-2026 (Event Hiring)
 */
const ProgrammaticRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <NotFound />;
  }
  
  const { type } = detectPageType(slug);
  
  switch (type) {
    case 'industry-location':
      return <IndustryLocationPage />;
    case 'how-to-find-work':
      return <HowToFindWorkPage />;
    case 'best-paying-jobs':
      return <BestPayingJobsPage />;
    case 'seasonal-hub':
      return <SeasonalHubPage />;
    case 'seasonal-location':
      return <SeasonalLocationPage />;
    case 'event-hiring':
      return <EventHiringPage />;
    default:
      return <NotFound />;
  }
};

export default ProgrammaticRouter;
