import { useParams } from "react-router-dom";
import IndustryLocationPage from "./IndustryLocationPage";
import HowToFindWorkPage from "./HowToFindWorkPage";
import BestPayingJobsPage from "./BestPayingJobsPage";
import NotFound from "@/pages/NotFound";

// URL Pattern Types
type PageType = 'industry-location' | 'how-to-find-work' | 'best-paying-jobs' | 'unknown';

// Detect the type of programmatic page from the URL slug
function detectPageType(slug: string): { type: PageType; parsed: Record<string, string> } {
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
    default:
      return <NotFound />;
  }
};

export default ProgrammaticRouter;
