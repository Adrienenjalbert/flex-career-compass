/**
 * Location-specific data for seasonal hiring articles
 * Combines with base seasonal articles to create hyper-local content
 */

import { cities, City, activeMarketSlugs, isActiveMarket } from '@/data/cities';

export interface LocalEmployer {
  name: string;
  type: 'warehouse' | 'retail' | 'hospitality' | 'logistics' | 'events' | 'tax-prep' | 'food-service';
  estimatedHires?: string;
  payRange?: { min: number; max: number };
  applyUrl?: string;
  localFacility?: string;
}

export interface LocalEvent {
  name: string;
  date?: string;
  venue?: string;
  expectedStaffing?: string;
  eventType?: 'concert' | 'sports' | 'festival' | 'convention' | 'holiday';
}

export interface SeasonalLocationData {
  citySlug: string;
  city: string;
  stateCode: string;
  seasonSlug: string;
  seasonType: 'holiday' | 'summer' | 'event' | 'tax' | 'student' | 'blackfriday';
  localEmployers: LocalEmployer[];
  localEvents: LocalEvent[];
  localTips: string[];
  avgWageRange: { min: number; max: number };
  transportInfo?: string;
  peakHiringWindow?: string;
  applicationDeadline?: string;
  relatedCities: string[]; // nearby city slugs
}

// Seasonal article slugs that can have location variants
export const seasonalArticleSlugs = [
  'holiday-warehouse-guide',
  'black-friday-hiring',
  'summer-hospitality-guide',
  'event-staffing-guide',
  'tax-season-jobs',
  'student-jobs-fall',
] as const;

export type SeasonalArticleSlug = typeof seasonalArticleSlugs[number];

// Map article slugs to season types
export const articleToSeasonType: Record<SeasonalArticleSlug, SeasonalLocationData['seasonType']> = {
  'holiday-warehouse-guide': 'holiday',
  'black-friday-hiring': 'blackfriday',
  'summer-hospitality-guide': 'summer',
  'event-staffing-guide': 'event',
  'tax-season-jobs': 'tax',
  'student-jobs-fall': 'student',
};

// Get cities that are prioritized for location-specific content
export const getPrioritizedCities = (): City[] => {
  // First: Indeed Flex active markets
  const activeMarkets = cities.filter(c => isActiveMarket(c.slug));
  
  // Then: High search volume cities not in active markets
  const highVolumeCities = cities
    .filter(c => !isActiveMarket(c.slug) && c.searchVolume === 'high')
    .slice(0, 10);
  
  return [...activeMarkets, ...highVolumeCities];
};

// Get nearby cities for internal linking
export const getNearbyCities = (citySlug: string, limit: number = 4): City[] => {
  const city = cities.find(c => c.slug === citySlug);
  if (!city) return [];
  
  // Same region first, then high volume
  return cities
    .filter(c => c.slug !== citySlug)
    .filter(c => c.region === city.region || c.searchVolume === 'high')
    .slice(0, limit);
};

// Generate URL for seasonal location article
export const getSeasonalLocationUrl = (articleSlug: SeasonalArticleSlug, citySlug: string): string => {
  return `/career-hub/guides/${articleSlug}-${citySlug}`;
};

// Parse URL to extract article and city slugs
export const parseSeasonalLocationUrl = (fullSlug: string): { articleSlug: SeasonalArticleSlug; citySlug: string } | null => {
  for (const articleSlug of seasonalArticleSlugs) {
    if (fullSlug.startsWith(`${articleSlug}-`)) {
      const citySlug = fullSlug.replace(`${articleSlug}-`, '');
      if (cities.some(c => c.slug === citySlug)) {
        return { articleSlug, citySlug };
      }
    }
  }
  return null;
};

// Location-specific employer data by season and region
// This data will be enhanced with Perplexity research
const defaultEmployersBySeasonAndRegion: Record<string, Record<string, LocalEmployer[]>> = {
  holiday: {
    South: [
      { name: 'Amazon', type: 'warehouse', estimatedHires: '10,000+', payRange: { min: 18, max: 26 }, applyUrl: 'https://www.amazon.jobs/en/locations/austin-area-texas' },
      { name: 'UPS', type: 'logistics', estimatedHires: '5,000+', payRange: { min: 17, max: 24 } },
      { name: 'FedEx Ground', type: 'logistics', estimatedHires: '3,000+', payRange: { min: 16, max: 23 } },
      { name: 'Target', type: 'retail', estimatedHires: '2,000+', payRange: { min: 15, max: 20 } },
    ],
    Midwest: [
      { name: 'Amazon', type: 'warehouse', estimatedHires: '8,000+', payRange: { min: 17, max: 25 } },
      { name: 'UPS', type: 'logistics', estimatedHires: '4,000+', payRange: { min: 16, max: 23 } },
      { name: 'Walmart Distribution', type: 'warehouse', estimatedHires: '2,000+', payRange: { min: 16, max: 22 } },
    ],
    West: [
      { name: 'Amazon', type: 'warehouse', estimatedHires: '12,000+', payRange: { min: 19, max: 28 } },
      { name: 'UPS', type: 'logistics', estimatedHires: '5,000+', payRange: { min: 18, max: 25 } },
      { name: 'FedEx', type: 'logistics', estimatedHires: '3,000+', payRange: { min: 17, max: 24 } },
    ],
    Southeast: [
      { name: 'Amazon', type: 'warehouse', estimatedHires: '8,000+', payRange: { min: 17, max: 24 } },
      { name: 'UPS', type: 'logistics', estimatedHires: '4,000+', payRange: { min: 16, max: 22 } },
      { name: 'Publix Distribution', type: 'warehouse', estimatedHires: '1,500+', payRange: { min: 15, max: 21 } },
    ],
    Northeast: [
      { name: 'Amazon', type: 'warehouse', estimatedHires: '10,000+', payRange: { min: 18, max: 27 } },
      { name: 'UPS', type: 'logistics', estimatedHires: '6,000+', payRange: { min: 17, max: 25 } },
    ],
    Southwest: [
      { name: 'Amazon', type: 'warehouse', estimatedHires: '6,000+', payRange: { min: 18, max: 26 } },
      { name: 'UPS', type: 'logistics', estimatedHires: '3,000+', payRange: { min: 17, max: 24 } },
    ],
  },
  summer: {
    South: [
      { name: 'Marriott', type: 'hospitality', payRange: { min: 14, max: 20 } },
      { name: 'Hilton', type: 'hospitality', payRange: { min: 14, max: 19 } },
    ],
    West: [
      { name: 'MGM Resorts', type: 'hospitality', payRange: { min: 16, max: 25 } },
      { name: 'Caesars Entertainment', type: 'hospitality', payRange: { min: 15, max: 24 } },
    ],
    Southeast: [
      { name: 'Disney', type: 'hospitality', payRange: { min: 15, max: 22 } },
      { name: 'Universal', type: 'hospitality', payRange: { min: 15, max: 21 } },
    ],
    Midwest: [
      { name: 'Marriott', type: 'hospitality', payRange: { min: 14, max: 19 } },
      { name: 'Local Hotels', type: 'hospitality', payRange: { min: 13, max: 18 } },
    ],
    Northeast: [
      { name: 'Marriott', type: 'hospitality', payRange: { min: 15, max: 22 } },
    ],
    Southwest: [
      { name: 'Marriott', type: 'hospitality', payRange: { min: 15, max: 21 } },
    ],
  },
  event: {
    South: [
      { name: 'Live Nation', type: 'events', payRange: { min: 15, max: 22 } },
      { name: 'Legends Hospitality', type: 'events', payRange: { min: 16, max: 24 } },
    ],
    West: [
      { name: 'AEG', type: 'events', payRange: { min: 18, max: 28 } },
      { name: 'Live Nation', type: 'events', payRange: { min: 17, max: 26 } },
    ],
    Southeast: [
      { name: 'Live Nation', type: 'events', payRange: { min: 15, max: 22 } },
      { name: 'Aramark', type: 'food-service', payRange: { min: 14, max: 20 } },
    ],
    Midwest: [
      { name: 'Live Nation', type: 'events', payRange: { min: 15, max: 22 } },
      { name: 'Levy Restaurants', type: 'food-service', payRange: { min: 14, max: 21 } },
    ],
    Northeast: [
      { name: 'Live Nation', type: 'events', payRange: { min: 16, max: 24 } },
      { name: 'Legends Hospitality', type: 'events', payRange: { min: 17, max: 25 } },
    ],
    Southwest: [
      { name: 'Live Nation', type: 'events', payRange: { min: 16, max: 23 } },
    ],
  },
  tax: {
    // Tax services are fairly uniform nationwide
    South: [
      { name: 'H&R Block', type: 'tax-prep', estimatedHires: '60,000+ nationally', payRange: { min: 13, max: 18 }, applyUrl: 'https://www.hrblock.com/careers/' },
      { name: 'Jackson Hewitt', type: 'tax-prep', payRange: { min: 12, max: 17 } },
      { name: 'Liberty Tax', type: 'tax-prep', payRange: { min: 12, max: 16 } },
    ],
    Midwest: [
      { name: 'H&R Block', type: 'tax-prep', payRange: { min: 13, max: 17 } },
      { name: 'Jackson Hewitt', type: 'tax-prep', payRange: { min: 12, max: 16 } },
    ],
    West: [
      { name: 'H&R Block', type: 'tax-prep', payRange: { min: 15, max: 20 } },
      { name: 'Jackson Hewitt', type: 'tax-prep', payRange: { min: 14, max: 19 } },
    ],
    Southeast: [
      { name: 'H&R Block', type: 'tax-prep', payRange: { min: 13, max: 17 } },
      { name: 'Jackson Hewitt', type: 'tax-prep', payRange: { min: 12, max: 16 } },
    ],
    Northeast: [
      { name: 'H&R Block', type: 'tax-prep', payRange: { min: 14, max: 19 } },
      { name: 'Jackson Hewitt', type: 'tax-prep', payRange: { min: 13, max: 18 } },
    ],
    Southwest: [
      { name: 'H&R Block', type: 'tax-prep', payRange: { min: 14, max: 18 } },
      { name: 'Jackson Hewitt', type: 'tax-prep', payRange: { min: 13, max: 17 } },
    ],
  },
  blackfriday: {
    South: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 20 } },
      { name: 'Walmart', type: 'retail', payRange: { min: 14, max: 19 } },
      { name: 'Best Buy', type: 'retail', payRange: { min: 15, max: 20 } },
    ],
    Midwest: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 19 } },
      { name: 'Walmart', type: 'retail', payRange: { min: 14, max: 18 } },
      { name: 'Kohl\'s', type: 'retail', payRange: { min: 13, max: 17 } },
    ],
    West: [
      { name: 'Target', type: 'retail', payRange: { min: 16, max: 22 } },
      { name: 'Best Buy', type: 'retail', payRange: { min: 16, max: 21 } },
    ],
    Southeast: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 19 } },
      { name: 'Walmart', type: 'retail', payRange: { min: 14, max: 18 } },
    ],
    Northeast: [
      { name: 'Target', type: 'retail', payRange: { min: 16, max: 21 } },
      { name: 'Macy\'s', type: 'retail', payRange: { min: 15, max: 20 } },
    ],
    Southwest: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 20 } },
      { name: 'Walmart', type: 'retail', payRange: { min: 14, max: 19 } },
    ],
  },
  student: {
    South: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 18 } },
      { name: 'Starbucks', type: 'food-service', payRange: { min: 12, max: 16 } },
    ],
    Midwest: [
      { name: 'Target', type: 'retail', payRange: { min: 14, max: 17 } },
      { name: 'Starbucks', type: 'food-service', payRange: { min: 12, max: 15 } },
    ],
    West: [
      { name: 'Target', type: 'retail', payRange: { min: 16, max: 20 } },
      { name: 'In-N-Out', type: 'food-service', payRange: { min: 18, max: 22 } },
    ],
    Southeast: [
      { name: 'Publix', type: 'retail', payRange: { min: 13, max: 17 } },
      { name: 'Chick-fil-A', type: 'food-service', payRange: { min: 13, max: 16 } },
    ],
    Northeast: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 19 } },
      { name: 'Starbucks', type: 'food-service', payRange: { min: 14, max: 17 } },
    ],
    Southwest: [
      { name: 'Target', type: 'retail', payRange: { min: 15, max: 18 } },
      { name: 'Starbucks', type: 'food-service', payRange: { min: 13, max: 16 } },
    ],
  },
};

// City-specific major events/venues
const cityEvents: Record<string, LocalEvent[]> = {
  'las-vegas': [
    { name: 'Las Vegas Raiders Home Games', venue: 'Allegiant Stadium', eventType: 'sports', expectedStaffing: '2,000+ per game' },
    { name: 'CES 2026', venue: 'Las Vegas Convention Center', date: 'January 2026', eventType: 'convention', expectedStaffing: '5,000+' },
    { name: 'EDC Las Vegas', venue: 'Las Vegas Motor Speedway', date: 'May 2026', eventType: 'festival', expectedStaffing: '3,000+' },
  ],
  'austin': [
    { name: 'SXSW 2026', venue: 'Downtown Austin', date: 'March 2026', eventType: 'festival', expectedStaffing: '4,000+' },
    { name: 'ACL Festival', venue: 'Zilker Park', date: 'October 2026', eventType: 'festival', expectedStaffing: '2,500+' },
    { name: 'UT Football Home Games', venue: 'Darrell K Royal Stadium', eventType: 'sports', expectedStaffing: '1,500+ per game' },
  ],
  'chicago': [
    { name: 'Lollapalooza 2026', venue: 'Grant Park', date: 'August 2026', eventType: 'festival', expectedStaffing: '3,500+' },
    { name: 'Chicago Bears Home Games', venue: 'Soldier Field', eventType: 'sports', expectedStaffing: '2,000+ per game' },
    { name: 'Chicago Cubs Home Games', venue: 'Wrigley Field', eventType: 'sports', expectedStaffing: '1,500+ per game' },
  ],
  'atlanta': [
    { name: 'Atlanta Falcons Home Games', venue: 'Mercedes-Benz Stadium', eventType: 'sports', expectedStaffing: '2,500+ per game' },
    { name: 'Music Midtown', venue: 'Piedmont Park', date: 'September 2026', eventType: 'festival', expectedStaffing: '1,500+' },
    { name: 'Peachtree Road Race', date: 'July 4, 2026', eventType: 'sports', expectedStaffing: '1,000+' },
  ],
  'orlando': [
    { name: 'Disney Peak Season', venue: 'Walt Disney World', date: 'Summer & Holidays', eventType: 'holiday', expectedStaffing: '10,000+' },
    { name: 'Universal Peak Season', venue: 'Universal Orlando', date: 'Summer & Holidays', eventType: 'holiday', expectedStaffing: '5,000+' },
  ],
  'nashville': [
    { name: 'CMA Fest', venue: 'Downtown Nashville', date: 'June 2026', eventType: 'festival', expectedStaffing: '2,000+' },
    { name: 'Tennessee Titans Home Games', venue: 'Nissan Stadium', eventType: 'sports', expectedStaffing: '1,500+ per game' },
  ],
  'phoenix': [
    { name: 'Super Bowl LX (if hosted)', venue: 'State Farm Stadium', date: 'February 2026', eventType: 'sports', expectedStaffing: '10,000+' },
    { name: 'Phoenix Suns Home Games', venue: 'Footprint Center', eventType: 'sports', expectedStaffing: '1,200+ per game' },
    { name: 'Spring Training', venue: 'Various Stadiums', date: 'February-March 2026', eventType: 'sports', expectedStaffing: '3,000+' },
  ],
  'dallas': [
    { name: 'Dallas Cowboys Home Games', venue: 'AT&T Stadium', eventType: 'sports', expectedStaffing: '3,000+ per game' },
    { name: 'State Fair of Texas', venue: 'Fair Park', date: 'September-October 2026', eventType: 'festival', expectedStaffing: '5,000+' },
  ],
  'houston': [
    { name: 'Houston Rodeo', venue: 'NRG Stadium', date: 'February-March 2026', eventType: 'festival', expectedStaffing: '5,000+' },
    { name: 'Houston Texans Home Games', venue: 'NRG Stadium', eventType: 'sports', expectedStaffing: '2,000+ per game' },
  ],
  'charlotte': [
    { name: 'Carolina Panthers Home Games', venue: 'Bank of America Stadium', eventType: 'sports', expectedStaffing: '1,500+ per game' },
    { name: 'Charlotte Motor Speedway Events', venue: 'Charlotte Motor Speedway', eventType: 'sports', expectedStaffing: '2,000+' },
  ],
};

// Generate location data for a specific city and season
export const getSeasonalLocationData = (citySlug: string, articleSlug: SeasonalArticleSlug): SeasonalLocationData | null => {
  const city = cities.find(c => c.slug === citySlug);
  if (!city) return null;

  const seasonType = articleToSeasonType[articleSlug];
  const region = city.region;

  // Get employers for this region and season
  const seasonEmployers = defaultEmployersBySeasonAndRegion[seasonType];
  const localEmployers = seasonEmployers?.[region] || seasonEmployers?.South || [];

  // Get events for this city
  const localEvents = cityEvents[citySlug] || [];

  // Get nearby cities for internal linking
  const relatedCities = getNearbyCities(citySlug).map(c => c.slug);

  // Season-specific tips
  const baseTips: Record<string, string[]> = {
    holiday: [
      `Apply by early October for best ${city.city} warehouse positions`,
      `Consider locations along ${city.metroArea || city.city} metro transit lines`,
      'Holiday premium pay often adds $2-5/hr to base rates',
      'Night and weekend shifts typically pay more',
    ],
    summer: [
      `${city.city} hospitality peaks Memorial Day through Labor Day`,
      'Pool clubs and outdoor venues offer premium pay in summer heat',
      'Early morning shifts avoid the hottest temperatures',
    ],
    event: [
      `Major ${city.city} venues hire months before big events`,
      'Get on multiple venue staffing lists for consistent work',
      'Event experience builds quickly with back-to-back shifts',
    ],
    tax: [
      `${city.city} tax offices start hiring in December`,
      'Training is typically paid and provided',
      'Remote positions available for experienced preparers',
    ],
    student: [
      `${city.city} campus-area jobs offer schedule flexibility`,
      'Retail back-to-school rush peaks August-September',
      'Many employers offer tuition assistance programs',
    ],
    blackfriday: [
      `${city.city} retailers begin Black Friday hiring in September`,
      'Overnight shifts on Black Friday pay premium rates',
      'Early hiring gets first pick of preferred shifts',
    ],
  };

  // Calculate wage range based on city cost of living
  const costMultiplier = city.costOfLiving.index / 100;
  const baseWages: Record<string, { min: number; max: number }> = {
    holiday: { min: 16, max: 24 },
    summer: { min: 14, max: 20 },
    event: { min: 15, max: 23 },
    tax: { min: 13, max: 18 },
    student: { min: 13, max: 17 },
    blackfriday: { min: 15, max: 22 },
  };

  const baseWage = baseWages[seasonType] || { min: 14, max: 20 };
  const avgWageRange = {
    min: Math.round(baseWage.min * costMultiplier),
    max: Math.round(baseWage.max * costMultiplier),
  };

  // Peak hiring windows
  const peakWindows: Record<string, string> = {
    holiday: 'September - November 2026',
    summer: 'March - May 2026',
    event: 'Year-round (peaks before major events)',
    tax: 'December 2025 - January 2026',
    student: 'July - August 2026',
    blackfriday: 'September - October 2026',
  };

  return {
    citySlug,
    city: city.city,
    stateCode: city.stateCode,
    seasonSlug: articleSlug,
    seasonType,
    localEmployers,
    localEvents: localEvents.filter(e => 
      seasonType === 'event' || 
      (seasonType === 'summer' && e.date?.toLowerCase().includes('summer')) ||
      (seasonType === 'holiday' && (e.eventType === 'holiday' || e.date?.toLowerCase().includes('december')))
    ),
    localTips: baseTips[seasonType] || baseTips.holiday,
    avgWageRange,
    transportInfo: `Check ${city.city} public transit options and employer-provided parking`,
    peakHiringWindow: peakWindows[seasonType],
    applicationDeadline: seasonType === 'holiday' ? 'Apply by early October for best selection' : undefined,
    relatedCities,
  };
};

// Get all location-seasonal combinations for sitemap generation
export const getAllSeasonalLocationCombinations = (): Array<{ articleSlug: SeasonalArticleSlug; citySlug: string }> => {
  const combinations: Array<{ articleSlug: SeasonalArticleSlug; citySlug: string }> = [];
  const prioritizedCities = getPrioritizedCities();

  for (const articleSlug of seasonalArticleSlugs) {
    for (const city of prioritizedCities) {
      combinations.push({ articleSlug, citySlug: city.slug });
    }
  }

  return combinations;
};

// Export for use in components
export { cities, isActiveMarket };
