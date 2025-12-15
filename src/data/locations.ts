export interface Location {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  slug: string;
  country: 'US' | 'UK';
  description: string;
  population: string;
  topIndustries: string[];
  avgHourlyWage: { min: number; max: number };
  costOfLiving: {
    rent: { studio: number; oneBed: number };
    groceries: number;
    transport: number;
  };
  highlights: string[];
  timezone: string;
}

export const usLocations: Location[] = [
  {
    id: 'austin',
    city: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'austin',
    country: 'US',
    description: 'Austin is a vibrant tech hub known for its live music scene, food culture, and growing job market. The city offers numerous opportunities in hospitality, logistics, and retail.',
    population: '978,908',
    topIndustries: ['Technology', 'Hospitality', 'Healthcare', 'Logistics'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1350, oneBed: 1600 },
      groceries: 350,
      transport: 100
    },
    highlights: [
      'Fast-growing job market',
      'No state income tax',
      'Thriving food and beverage scene',
      'Year-round warm weather'
    ],
    timezone: 'CST'
  },
  {
    id: 'dallas',
    city: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'dallas',
    country: 'US',
    description: 'Dallas is a major business hub with a diverse economy spanning finance, technology, and logistics. The city offers abundant flexible work opportunities across multiple sectors.',
    population: '1,304,379',
    topIndustries: ['Finance', 'Logistics', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 23 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 340,
      transport: 90
    },
    highlights: [
      'Major logistics and distribution hub',
      'No state income tax',
      'Low cost of living compared to other major cities',
      'Strong hospitality sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'houston',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'houston',
    country: 'US',
    description: 'Houston is America\'s fourth-largest city with a thriving economy driven by energy, healthcare, and logistics. The diverse city offers extensive flexible work opportunities.',
    population: '2,304,580',
    topIndustries: ['Energy', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 330,
      transport: 85
    },
    highlights: [
      'Largest city in Texas',
      'No state income tax',
      'Diverse economy with many industries',
      'Lower cost of living than Austin/Dallas'
    ],
    timezone: 'CST'
  },
  {
    id: 'nashville',
    city: 'Nashville',
    state: 'Tennessee',
    stateCode: 'TN',
    slug: 'nashville',
    country: 'US',
    description: 'Nashville is a fast-growing city famous for its music scene and hospitality industry. The city offers excellent opportunities in food service, entertainment, and tourism.',
    population: '689,447',
    topIndustries: ['Entertainment', 'Hospitality', 'Healthcare', 'Tourism'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1650 },
      groceries: 340,
      transport: 85
    },
    highlights: [
      'Booming hospitality industry',
      'No state income tax on wages',
      'Growing tourism sector',
      'Vibrant entertainment scene'
    ],
    timezone: 'CST'
  },
  {
    id: 'atlanta',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'atlanta',
    country: 'US',
    description: 'Atlanta is a major Southeastern hub with a diverse economy spanning logistics, hospitality, and retail. The city serves as a major distribution and transportation center.',
    population: '498,715',
    topIndustries: ['Logistics', 'Film & Entertainment', 'Hospitality', 'Retail'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 350,
      transport: 100
    },
    highlights: [
      'Major logistics hub (Hartsfield-Jackson Airport)',
      'Growing film and entertainment industry',
      'Diverse hospitality sector',
      'Major retail and warehouse employers'
    ],
    timezone: 'EST'
  },
  {
    id: 'cincinnati',
    city: 'Cincinnati',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'cincinnati',
    country: 'US',
    description: 'Cincinnati offers an affordable cost of living with strong manufacturing and logistics sectors. The city is home to major companies and offers steady flexible work opportunities.',
    population: '309,317',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 300,
      transport: 70
    },
    highlights: [
      'Very affordable cost of living',
      'Strong manufacturing sector',
      'Major logistics employers',
      'Growing food and beverage scene'
    ],
    timezone: 'EST'
  },
  {
    id: 'columbus',
    city: 'Columbus',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'columbus',
    country: 'US',
    description: 'Columbus is Ohio\'s capital and largest city, featuring a diverse economy with strong logistics, retail, and hospitality sectors. The city offers affordable living and steady work.',
    population: '905,748',
    topIndustries: ['Logistics', 'Retail', 'Insurance', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 310,
      transport: 75
    },
    highlights: [
      'Major logistics and distribution center',
      'Affordable cost of living',
      'Growing hospitality scene',
      'Strong job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'ontario',
    city: 'Ontario',
    state: 'California',
    stateCode: 'CA',
    slug: 'ontario',
    country: 'US',
    description: 'Ontario, California is located in the Inland Empire region and serves as a major logistics hub with its international airport and numerous distribution centers.',
    population: '175,265',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 16, max: 24 },
    costOfLiving: {
      rent: { studio: 1500, oneBed: 1800 },
      groceries: 380,
      transport: 110
    },
    highlights: [
      'Major West Coast logistics hub',
      'Ontario International Airport',
      'Growing warehouse sector',
      'Access to greater LA job market'
    ],
    timezone: 'PST'
  }
];

export const ukLocations: Location[] = [
  {
    id: 'birmingham',
    city: 'Birmingham',
    state: 'West Midlands',
    stateCode: 'WM',
    slug: 'birmingham',
    country: 'UK',
    description: 'Birmingham is the UK\'s second-largest city with a thriving hospitality and retail sector.',
    population: '1,141,816',
    topIndustries: ['Manufacturing', 'Retail', 'Hospitality', 'Finance'],
    avgHourlyWage: { min: 10, max: 15 },
    costOfLiving: {
      rent: { studio: 700, oneBed: 850 },
      groceries: 200,
      transport: 80
    },
    highlights: ['Major retail destination', 'Growing hospitality scene', 'Good transport links'],
    timezone: 'GMT'
  },
  {
    id: 'london',
    city: 'London',
    state: 'Greater London',
    stateCode: 'GL',
    slug: 'london',
    country: 'UK',
    description: 'London is the UK\'s capital and largest city, offering the most flexible work opportunities in hospitality, retail, and events.',
    population: '8,799,800',
    topIndustries: ['Finance', 'Hospitality', 'Retail', 'Tourism'],
    avgHourlyWage: { min: 12, max: 18 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1800 },
      groceries: 280,
      transport: 150
    },
    highlights: ['Highest wages in UK', 'Most flexible work opportunities', 'World-class hospitality'],
    timezone: 'GMT'
  },
  {
    id: 'manchester',
    city: 'Manchester',
    state: 'Greater Manchester',
    stateCode: 'GM',
    slug: 'manchester',
    country: 'UK',
    description: 'Manchester is a vibrant northern hub with a strong hospitality sector and growing logistics industry.',
    population: '547,627',
    topIndustries: ['Hospitality', 'Logistics', 'Retail', 'Creative'],
    avgHourlyWage: { min: 10, max: 15 },
    costOfLiving: {
      rent: { studio: 850, oneBed: 1000 },
      groceries: 220,
      transport: 90
    },
    highlights: ['Thriving nightlife', 'Growing events sector', 'Strong warehouse employment'],
    timezone: 'GMT'
  }
];

export const allLocations = [...usLocations, ...ukLocations];

export const getLocationBySlug = (slug: string) => 
  allLocations.find(loc => loc.slug === slug);

export const getUSLocations = () => usLocations;
export const getUKLocations = () => ukLocations;
