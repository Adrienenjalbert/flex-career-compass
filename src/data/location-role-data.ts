// Location-specific role data for SEO-rich intersection pages
import { roles, Role } from './roles';
import { usLocations, ukLocations, Location } from './locations';

export interface LocationRoleData {
  location: Location;
  role: Role;
  localSalary: { min: number; max: number };
  tipsRange?: { min: number; max: number };
  demandLevel: 'high' | 'medium' | 'low';
  certifications: string[];
  peakSeasons: string[];
  topEmployers: string[];
  localInsights: string[];
  jobCount: number;
}

// State-specific certifications
const stateCertifications: Record<string, Record<string, string[]>> = {
  TX: {
    bartender: ['TABC (Texas Alcoholic Beverage Commission) Certification'],
    'waiting-staff': ['Texas Food Handler Certification'],
    barista: ['Texas Food Handler Certification'],
    'kitchen-porter': ['Texas Food Handler Certification'],
    'commis-chef': ['Texas Food Handler Certification', 'ServSafe Food Handler'],
    'chef-de-partie': ['Texas Food Handler Certification', 'ServSafe Manager'],
  },
  TN: {
    bartender: ['Tennessee ABC Server Permit'],
    'waiting-staff': ['Tennessee Food Handler Permit'],
    barista: ['Tennessee Food Handler Permit'],
  },
  GA: {
    bartender: ['Georgia Alcohol Server Training'],
    'waiting-staff': ['Georgia Food Handler Certificate'],
  },
  OH: {
    bartender: ['Ohio Responsible Alcohol Service Training'],
    'waiting-staff': ['Ohio Food Handler Certificate'],
  },
  CA: {
    bartender: ['California RBS (Responsible Beverage Service) Certification'],
    'waiting-staff': ['California Food Handler Card'],
    barista: ['California Food Handler Card'],
  },
};

// City-specific salary adjustments (multiplier based on cost of living)
const citySalaryMultipliers: Record<string, number> = {
  austin: 1.15,
  dallas: 1.10,
  houston: 1.05,
  nashville: 1.08,
  atlanta: 1.05,
  cincinnati: 1.00,
  columbus: 1.02,
  ontario: 1.12,
  london: 1.20,
  manchester: 1.05,
  birmingham: 1.00,
  leeds: 1.02,
};

// City-specific peak seasons
const cityPeakSeasons: Record<string, string[]> = {
  austin: ['March (SXSW)', 'October (ACL Festival)', 'Football Season (Fall)'],
  dallas: ['State Fair of Texas (Sept-Oct)', 'Holiday Season', 'Super Bowl Events'],
  houston: ['Houston Rodeo (Feb-Mar)', 'Holiday Season', 'Summer Events'],
  nashville: ['CMA Fest (June)', 'NFL Draft Events', 'New Year\'s Eve', 'Summer Tourism'],
  atlanta: ['Super Bowl Events', 'Dragon Con (Sept)', 'Holiday Season'],
  cincinnati: ['Oktoberfest (Sept)', 'Cincinnati Reds Season', 'Holiday Season'],
  columbus: ['Ohio State Football Season', 'State Fair (July-Aug)', 'Holiday Season'],
  ontario: ['Holiday Season', 'Summer Tourism', 'Convention Season'],
  london: ['Summer Season (June-Aug)', 'Christmas Markets', 'New Year\'s Eve'],
  manchester: ['Christmas Markets', 'Football Season', 'Pride (Aug)'],
  birmingham: ['German Christmas Market', 'Summer Festivals'],
  leeds: ['Christmas Markets', 'Leeds Festival (Aug)', 'Summer Season'],
};

// Top employers by city and industry
const topEmployersByCity: Record<string, Record<string, string[]>> = {
  austin: {
    hospitality: ['Marriott Hotels', 'Hyatt Regency', 'The Driskill', 'Four Seasons', 'W Austin'],
    industrial: ['Amazon Fulfillment', 'Tesla Gigafactory', 'Whole Foods DC', 'Dell Technologies'],
    retail: ['HEB', 'Whole Foods Market', 'Apple Store', 'Target'],
  },
  dallas: {
    hospitality: ['Omni Hotels', 'Hilton Anatole', 'The Ritz-Carlton', 'Marriott'],
    industrial: ['Amazon', 'UPS', 'FedEx', 'Walmart DC'],
    retail: ['Neiman Marcus', 'Nordstrom', 'Target', 'Costco'],
  },
  houston: {
    hospitality: ['Marriott Marquis', 'Hilton Americas', 'Four Seasons', 'Hotel Granduca'],
    industrial: ['Amazon', 'Sysco', 'Walmart DC', 'FedEx Ground'],
    retail: ['HEB', 'Kroger', 'Target', 'Costco'],
  },
  nashville: {
    hospitality: ['Grand Hyatt', 'JW Marriott', 'The Hermitage Hotel', 'Gaylord Opryland'],
    industrial: ['Amazon', 'Nissan', 'FedEx', 'Amazon Fresh'],
    retail: ['Nordstrom', 'Target', 'Walmart', 'Whole Foods'],
  },
  atlanta: {
    hospitality: ['The Ritz-Carlton', 'Four Seasons', 'W Atlanta', 'InterContinental'],
    industrial: ['Amazon Fulfillment', 'UPS Hub', 'Delta Airlines', 'Coca-Cola'],
    retail: ['Target', 'Kroger', 'Publix', 'Costco'],
  },
  cincinnati: {
    hospitality: ['21c Museum Hotel', 'The Westin', 'Hilton Netherland Plaza'],
    industrial: ['Amazon', 'DHL', 'Kroger DC', 'Procter & Gamble'],
    retail: ['Kroger', 'Target', 'Macy\'s', 'Costco'],
  },
  columbus: {
    hospitality: ['The Joseph', 'Hilton Columbus', 'Le Méridien'],
    industrial: ['Amazon', 'Walmart DC', 'L Brands', 'Cardinal Health'],
    retail: ['Target', 'Kroger', 'Macy\'s', 'Costco'],
  },
  ontario: {
    hospitality: ['DoubleTree', 'Hilton Ontario', 'Marriott'],
    industrial: ['Amazon ONT8', 'UPS', 'FedEx', 'Target DC'],
    retail: ['Ontario Mills Mall', 'Target', 'Costco', 'Walmart'],
  },
  london: {
    hospitality: ['The Savoy', 'Claridge\'s', 'The Ritz London', 'Marriott Park Lane'],
    industrial: ['Amazon UK', 'Ocado', 'DHL', 'Royal Mail'],
    retail: ['Harrods', 'Selfridges', 'John Lewis', 'Marks & Spencer'],
  },
  manchester: {
    hospitality: ['The Midland Hotel', 'Radisson Blu', 'Hilton Manchester'],
    industrial: ['Amazon MAN1', 'Co-op DC', 'Boohoo', 'JD Sports DC'],
    retail: ['Selfridges', 'Harvey Nichols', 'Primark', 'Next'],
  },
};

// Industry mapping for roles
const roleIndustryMap: Record<string, string> = {
  bartender: 'hospitality',
  barista: 'hospitality',
  'waiting-staff': 'hospitality',
  barback: 'hospitality',
  'chef-de-partie': 'hospitality',
  'commis-chef': 'hospitality',
  'kitchen-porter': 'hospitality',
  'warehouse-operative': 'industrial',
  'picker-packer': 'industrial',
  'delivery-driver': 'industrial',
  'forklift-operator': 'industrial',
  'general-labourer': 'industrial',
  'inventory-clerk': 'industrial',
  'loading-dock-worker': 'industrial',
  'retail-associate': 'retail',
  merchandiser: 'retail',
  cashier: 'retail',
  'stock-room-associate': 'retail',
  cleaner: 'facilities',
  'security-guard': 'facilities',
};

// Local insights by city
const cityInsights: Record<string, string[]> = {
  austin: [
    'Austin\'s "Live Music Capital" status means high demand for hospitality staff',
    'SXSW brings 400,000+ visitors, creating peak earning opportunities',
    'Tech industry growth drives high demand for event catering staff',
    'No state income tax means you keep more of your earnings',
  ],
  dallas: [
    'Dallas-Fort Worth is the 4th largest metro area with consistent demand',
    'Major convention center attracts year-round events',
    'Sports venues (Cowboys, Mavericks, Rangers) need flexible staff',
    'No state income tax boosts your take-home pay',
  ],
  houston: [
    'Largest city in Texas with diverse employment opportunities',
    'Houston Rodeo is one of the largest events in the US',
    'Major medical center district has hospitality needs',
    'No state income tax maximizes your earnings',
  ],
  nashville: [
    'Tourism has grown 70% in the last decade',
    'Broadway honky-tonks are always hiring experienced bartenders',
    'Bachelorette party capital creates consistent weekend demand',
    'No state income tax on wages',
  ],
  atlanta: [
    'Busiest airport in the world creates constant hospitality demand',
    'Film industry ("Hollywood of the South") needs craft services',
    'Major convention destination with steady event work',
    'Diverse food scene from fine dining to casual concepts',
  ],
  cincinnati: [
    'Emerging food scene with Over-the-Rhine restaurant district',
    'Oktoberfest Zinzinnati is the largest Oktoberfest in the US',
    'Lower cost of living means higher relative earnings',
    'Growing warehouse sector with Amazon and DHL presence',
  ],
  columbus: [
    'Ohio State University events create peak demand periods',
    'Fast-growing city with new restaurants opening regularly',
    'Strong warehouse and logistics sector',
    'Lower cost of living compared to coastal cities',
  ],
  ontario: [
    'Inland Empire logistics hub with major warehouse demand',
    'Ontario Mills attracts 30 million visitors annually',
    'Close proximity to LA without LA cost of living',
    'Year-round pleasant weather for outdoor events',
  ],
  london: [
    'One of the world\'s top hospitality destinations',
    'West End theatre creates consistent evening work',
    'Financial district needs professional event staff',
    'Higher wages reflect higher cost of living',
  ],
  manchester: [
    'UK\'s second largest city with vibrant nightlife',
    'Major football clubs create event staffing needs',
    'Christmas Markets attract 9 million+ visitors',
    'Lower living costs than London with strong wages',
  ],
};

// Get demand level based on industry presence in city
function getDemandLevel(cityId: string, roleId: string): 'high' | 'medium' | 'low' {
  const highDemandCombos: Record<string, string[]> = {
    austin: ['bartender', 'waiting-staff', 'barista', 'warehouse-operative'],
    dallas: ['warehouse-operative', 'picker-packer', 'bartender', 'delivery-driver'],
    houston: ['warehouse-operative', 'delivery-driver', 'picker-packer', 'forklift-operator'],
    nashville: ['bartender', 'waiting-staff', 'barback', 'kitchen-porter'],
    atlanta: ['warehouse-operative', 'picker-packer', 'bartender', 'waiting-staff'],
    cincinnati: ['warehouse-operative', 'picker-packer', 'bartender'],
    columbus: ['warehouse-operative', 'picker-packer', 'retail-associate'],
    ontario: ['warehouse-operative', 'picker-packer', 'forklift-operator', 'delivery-driver'],
    london: ['bartender', 'waiting-staff', 'barista', 'chef-de-partie'],
    manchester: ['bartender', 'waiting-staff', 'warehouse-operative'],
  };

  const cityHighDemand = highDemandCombos[cityId] || [];
  if (cityHighDemand.includes(roleId)) return 'high';
  
  const mediumDemandRoles = ['cleaner', 'retail-associate', 'cashier', 'security-guard'];
  if (mediumDemandRoles.includes(roleId)) return 'medium';
  
  return 'medium';
}

// Generate estimated job count
function getJobCount(cityId: string, roleId: string, demandLevel: string): number {
  const baseCounts: Record<string, number> = {
    austin: 150,
    dallas: 200,
    houston: 250,
    nashville: 120,
    atlanta: 180,
    cincinnati: 80,
    columbus: 100,
    ontario: 120,
    london: 300,
    manchester: 150,
  };
  
  const base = baseCounts[cityId] || 100;
  const demandMultiplier = demandLevel === 'high' ? 1.5 : demandLevel === 'medium' ? 1 : 0.6;
  
  return Math.round(base * demandMultiplier * (0.8 + Math.random() * 0.4));
}

export function getLocationRoleData(locationSlug: string, roleSlug: string): LocationRoleData | null {
  const allLocations = [...usLocations, ...ukLocations];
  const location = allLocations.find(l => l.slug === locationSlug);
  const role = roles.find(r => r.slug === roleSlug);
  
  if (!location || !role) return null;
  
  const multiplier = citySalaryMultipliers[locationSlug] || 1;
  const demandLevel = getDemandLevel(locationSlug, roleSlug);
  
  // Calculate localized salary
  const localSalary = {
    min: Math.round(role.avgHourlyRate.min * multiplier),
    max: Math.round(role.avgHourlyRate.max * multiplier),
  };
  
  // Tips for hospitality roles
  const tipsRoles = ['bartender', 'waiting-staff', 'barback', 'barista'];
  const tipsRange = tipsRoles.includes(roleSlug) ? {
    min: Math.round(8 * multiplier),
    max: Math.round(20 * multiplier),
  } : undefined;
  
  // Get certifications
  const stateCode = location.country === 'US' ? location.stateCode : 'UK';
  const certifications = stateCertifications[stateCode]?.[roleSlug] || [];
  
  // Get peak seasons
  const peakSeasons = cityPeakSeasons[locationSlug] || ['Holiday Season', 'Summer'];
  
  // Get top employers
  const industry = roleIndustryMap[roleSlug] || 'hospitality';
  const topEmployers = topEmployersByCity[locationSlug]?.[industry] || [];
  
  // Get local insights
  const localInsights = cityInsights[locationSlug] || [];
  
  // Generate job count
  const jobCount = getJobCount(locationSlug, roleSlug, demandLevel);
  
  return {
    location,
    role,
    localSalary,
    tipsRange,
    demandLevel,
    certifications,
    peakSeasons,
    topEmployers,
    localInsights,
    jobCount,
  };
}

// Get all valid location-role combinations
export function getAllLocationRoleCombinations(): { locationSlug: string; roleSlug: string }[] {
  const allLocations = [...usLocations, ...ukLocations];
  const combinations: { locationSlug: string; roleSlug: string }[] = [];
  
  allLocations.forEach(location => {
    roles.forEach(role => {
      combinations.push({
        locationSlug: location.slug,
        roleSlug: role.slug,
      });
    });
  });
  
  return combinations;
}

// Get popular roles for a location
export function getPopularRolesForLocation(locationSlug: string): Role[] {
  const highDemandRoles = roles.filter(role => {
    const data = getLocationRoleData(locationSlug, role.slug);
    return data?.demandLevel === 'high';
  });
  
  return highDemandRoles.slice(0, 6);
}

// Get popular locations for a role
export function getPopularLocationsForRole(roleSlug: string): Location[] {
  const allLocations = [...usLocations, ...ukLocations];
  return allLocations.filter(location => {
    const data = getLocationRoleData(location.slug, roleSlug);
    return data?.demandLevel === 'high';
  }).slice(0, 6);
}
