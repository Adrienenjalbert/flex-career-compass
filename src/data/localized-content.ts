// Type definitions for localized content from database
export interface CityEmployer {
  id: string;
  city_slug: string;
  season_type: 'holiday' | 'summer' | 'tax-season' | 'spring' | 'back-to-school' | 'event';
  employer_name: string;
  employer_type: 'warehouse' | 'retail' | 'hospitality' | 'logistics' | 'convention' | 'stadium' | 'restaurant' | 'hotel' | 'cleaning' | 'other';
  facility_name: string | null;
  facility_address: string | null;
  estimated_seasonal_hires: number | null;
  pay_range_min: number | null;
  pay_range_max: number | null;
  apply_url: string | null;
  hiring_start_date: string | null;
  hiring_end_date: string | null;
  verified_at: string | null;
  source_citation: string | null;
  is_verified: boolean;
}

export interface CityEvent {
  id: string;
  city_slug: string;
  event_name: string;
  event_type: 'sports' | 'festival' | 'convention' | 'concert' | 'holiday' | 'corporate' | 'other';
  venue_name: string | null;
  venue_address: string | null;
  event_start_date: string | null;
  event_end_date: string | null;
  estimated_staffing_needs: number | null;
  roles_needed: string[] | null;
  pay_range_min: number | null;
  pay_range_max: number | null;
  application_deadline: string | null;
  apply_url: string | null;
  verified_at: string | null;
  source_citation: string | null;
  is_verified: boolean;
}

export interface CityWageData {
  id: string;
  city_slug: string;
  industry: string;
  role_type: string | null;
  min_wage: number;
  max_wage: number;
  median_wage: number | null;
  state_average: number | null;
  national_average: number | null;
  wage_context: string | null;
  data_source: string;
  effective_date: string;
  verified_at: string | null;
  is_verified: boolean;
}

export interface CityTransportInfo {
  id: string;
  city_slug: string;
  major_transit_lines: string[] | null;
  transit_to_warehouse_districts: string | null;
  transit_to_hospitality_areas: string | null;
  parking_notes: string | null;
  commute_tips: string[] | null;
  rideshare_notes: string | null;
  verified_at: string | null;
  source_citation: string | null;
  is_verified: boolean;
}

export interface LocalizedCityData {
  employers: CityEmployer[];
  events: CityEvent[];
  wageData: CityWageData[];
  transportInfo: CityTransportInfo | null;
  dataCompleteness: {
    hasEmployers: boolean;
    hasEvents: boolean;
    hasWageData: boolean;
    hasTransportInfo: boolean;
    totalDataPoints: number;
    tier: 'tier1' | 'tier2' | 'tier3';
  };
}

// Map season types from article slugs
export const articleSlugToSeasonType: Record<string, string> = {
  'holiday-warehouse-jobs': 'holiday',
  'summer-hospitality-jobs': 'summer',
  'tax-season-work': 'tax-season',
  'spring-event-jobs': 'spring',
  'back-to-school-retail': 'back-to-school',
  'event-staffing-guide': 'event',
};

// Calculate data tier based on completeness
export function calculateDataTier(data: Omit<LocalizedCityData, 'dataCompleteness'>): LocalizedCityData['dataCompleteness'] {
  const hasEmployers = data.employers.length >= 3;
  const hasEvents = data.events.length >= 1;
  const hasWageData = data.wageData.length >= 1;
  const hasTransportInfo = !!data.transportInfo;
  
  const totalDataPoints = 
    data.employers.length + 
    data.events.length + 
    data.wageData.length + 
    (data.transportInfo ? 1 : 0);
  
  let tier: 'tier1' | 'tier2' | 'tier3';
  if (hasEmployers && hasEvents && hasWageData && hasTransportInfo && data.employers.length >= 5) {
    tier = 'tier1';
  } else if (hasEmployers || hasWageData) {
    tier = 'tier2';
  } else {
    tier = 'tier3';
  }
  
  return {
    hasEmployers,
    hasEvents,
    hasWageData,
    hasTransportInfo,
    totalDataPoints,
    tier,
  };
}

// Format date for display
export function formatEventDate(startDate: string | null, endDate: string | null): string {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  if (!endDate || startDate === endDate) {
    return startStr;
  }
  
  const end = new Date(endDate);
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startStr} - ${endStr}`;
}

// Format pay range
export function formatPayRange(min: number | null, max: number | null): string | null {
  if (min === null && max === null) return null;
  if (min !== null && max !== null) return `$${min.toFixed(2)}-$${max.toFixed(2)}/hr`;
  if (min !== null) return `From $${min.toFixed(2)}/hr`;
  if (max !== null) return `Up to $${max.toFixed(2)}/hr`;
  return null;
}
