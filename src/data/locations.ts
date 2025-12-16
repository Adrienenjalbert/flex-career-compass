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

// Helper function to generate slug from city name
const generateSlug = (city: string, state: string): string => {
  return `${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${state.toLowerCase()}`.replace(/-+/g, '-').replace(/-$/, '');
};

// Helper function to generate description
const generateDescription = (city: string, state: string, industries: string[]): string => {
  return `${city}, ${state} offers numerous flexible work opportunities across ${industries.slice(0, 3).join(', ')} sectors. The city provides a mix of urban amenities and job opportunities for workers seeking temp and gig work.`;
};

// Top 100 US Cities by Priority (based on search volume and conversion data)
export const usLocations: Location[] = [
  // Tier 1: Highest Priority Cities (183k+ impressions)
  {
    id: 'atlanta',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'atlanta',
    country: 'US',
    description: 'Atlanta is a major Southeastern hub with a diverse economy spanning logistics, hospitality, and retail. The city serves as a major distribution and transportation center with Hartsfield-Jackson, the world\'s busiest airport.',
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
  // Tier 2: Very High Priority (30k+ impressions)
  {
    id: 'lewisville',
    city: 'Lewisville',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'lewisville',
    country: 'US',
    description: 'Lewisville is a thriving city in the Dallas-Fort Worth metroplex with excellent warehouse and logistics opportunities. The city offers a lower cost of living than Dallas proper with easy access to major employers.',
    population: '111,822',
    topIndustries: ['Logistics', 'Retail', 'Manufacturing', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 85
    },
    highlights: [
      'Part of DFW metroplex',
      'Major distribution center hub',
      'No state income tax',
      'Growing job market'
    ],
    timezone: 'CST'
  },
  // Tier 3: High Priority (20k+ impressions)
  {
    id: 'sandy-springs',
    city: 'Sandy Springs',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'sandy-springs',
    country: 'US',
    description: 'Sandy Springs is an affluent city in metro Atlanta with strong corporate presence and hospitality sector. The city offers numerous flexible work opportunities in office support, retail, and food service.',
    population: '108,080',
    topIndustries: ['Corporate Services', 'Hospitality', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1500, oneBed: 1850 },
      groceries: 370,
      transport: 95
    },
    highlights: [
      'Major corporate hub',
      'Upscale hospitality venues',
      'Easy access to Atlanta',
      'Strong service sector'
    ],
    timezone: 'EST'
  },
  // Tier 4: Medium-High Priority (10k-20k impressions)
  {
    id: 'grand-prairie',
    city: 'Grand Prairie',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'grand-prairie',
    country: 'US',
    description: 'Grand Prairie sits between Dallas and Fort Worth, offering extensive warehouse and distribution opportunities. The city is home to major logistics facilities and entertainment venues.',
    population: '196,100',
    topIndustries: ['Logistics', 'Manufacturing', 'Entertainment', 'Retail'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 310,
      transport: 80
    },
    highlights: [
      'Strategic location between Dallas/Fort Worth',
      'Major warehouse district',
      'No state income tax',
      'Growing entertainment sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'raleigh',
    city: 'Raleigh',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'raleigh',
    country: 'US',
    description: 'Raleigh is North Carolina\'s capital and part of the Research Triangle, offering diverse opportunities in hospitality, logistics, and event staffing. The city combines Southern charm with a growing tech scene.',
    population: '467,665',
    topIndustries: ['Technology', 'Healthcare', 'Hospitality', 'Logistics'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 330,
      transport: 85
    },
    highlights: [
      'Research Triangle economy',
      'Growing hospitality sector',
      'Major healthcare employers',
      'Moderate cost of living'
    ],
    timezone: 'EST'
  },
  {
    id: 'gahanna',
    city: 'Gahanna',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'gahanna',
    country: 'US',
    description: 'Gahanna is a suburb of Columbus with easy access to major distribution centers and retail opportunities. The city offers affordable living with plenty of flexible work options.',
    population: '35,459',
    topIndustries: ['Logistics', 'Retail', 'Hospitality', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 300,
      transport: 70
    },
    highlights: [
      'Near Columbus distribution centers',
      'Affordable cost of living',
      'Growing retail sector',
      'Access to airport logistics'
    ],
    timezone: 'EST'
  },
  {
    id: 'benbrook',
    city: 'Benbrook',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'benbrook',
    country: 'US',
    description: 'Benbrook is a Fort Worth suburb with access to the DFW metroplex job market. The city offers affordable housing and numerous logistics and warehouse opportunities.',
    population: '23,649',
    topIndustries: ['Logistics', 'Retail', 'Manufacturing', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Affordable Fort Worth suburb',
      'Access to DFW job market',
      'No state income tax',
      'Growing warehouse sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'cheviot',
    city: 'Cheviot',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'cheviot',
    country: 'US',
    description: 'Cheviot is a Cincinnati suburb with excellent access to the city\'s warehouse and logistics district. The affordable area offers steady flexible work opportunities.',
    population: '8,375',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 850, oneBed: 1000 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Very affordable living',
      'Near Cincinnati distribution hubs',
      'Strong manufacturing sector',
      'Easy commute to major employers'
    ],
    timezone: 'EST'
  },
  {
    id: 'euless',
    city: 'Euless',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'euless',
    country: 'US',
    description: 'Euless is centrally located in the DFW metroplex, adjacent to DFW International Airport. The city offers numerous logistics and hospitality opportunities.',
    population: '56,587',
    topIndustries: ['Logistics', 'Hospitality', 'Retail', 'Aviation'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Adjacent to DFW Airport',
      'Major logistics hub',
      'No state income tax',
      'Growing hospitality sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'manor',
    city: 'Manor',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'manor',
    country: 'US',
    description: 'Manor is a fast-growing Austin suburb with expanding warehouse and distribution opportunities. The city offers affordable living compared to Austin proper.',
    population: '14,661',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Technology'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 330,
      transport: 90
    },
    highlights: [
      'Fast-growing Austin suburb',
      'Major Tesla/Samsung facilities nearby',
      'No state income tax',
      'Affordable alternative to Austin'
    ],
    timezone: 'CST'
  },
  {
    id: 'cartersville',
    city: 'Cartersville',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'cartersville',
    country: 'US',
    description: 'Cartersville is a growing city north of Atlanta with expanding logistics and manufacturing sectors. The city offers affordable living with access to metro Atlanta opportunities.',
    population: '21,764',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 290,
      transport: 75
    },
    highlights: [
      'Growing logistics sector',
      'Affordable cost of living',
      'Easy access to Atlanta',
      'Expanding manufacturing base'
    ],
    timezone: 'EST'
  },
  {
    id: 'powder-springs',
    city: 'Powder Springs',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'powder-springs',
    country: 'US',
    description: 'Powder Springs is a Cobb County suburb with growing warehouse and retail opportunities. The city offers suburban living with easy access to Atlanta\'s job market.',
    population: '16,127',
    topIndustries: ['Logistics', 'Retail', 'Healthcare', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 310,
      transport: 80
    },
    highlights: [
      'Growing Atlanta suburb',
      'Expanding warehouse district',
      'Affordable housing',
      'Strong retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'oak-point',
    city: 'Oak Point',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'oak-point',
    country: 'US',
    description: 'Oak Point is a rapidly growing Denton County community with access to the DFW metroplex job market. The city offers new development and expanding opportunities.',
    population: '5,577',
    topIndustries: ['Logistics', 'Retail', 'Construction', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 330,
      transport: 85
    },
    highlights: [
      'Fast-growing community',
      'Access to DFW job market',
      'No state income tax',
      'New development opportunities'
    ],
    timezone: 'CST'
  },
  {
    id: 'groveport',
    city: 'Groveport',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'groveport',
    country: 'US',
    description: 'Groveport is home to major Amazon and logistics facilities in the Columbus metro area. The city is a hotspot for warehouse and distribution work.',
    population: '6,868',
    topIndustries: ['Logistics', 'E-commerce', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Major Amazon fulfillment centers',
      'Logistics industry hub',
      'Affordable living',
      'High demand for warehouse workers'
    ],
    timezone: 'EST'
  },
  {
    id: 'smyrna',
    city: 'Smyrna',
    state: 'Tennessee',
    stateCode: 'TN',
    slug: 'smyrna',
    country: 'US',
    description: 'Smyrna is home to major automotive manufacturing and distribution facilities. The city offers steady work opportunities in logistics and manufacturing.',
    population: '54,174',
    topIndustries: ['Automotive', 'Manufacturing', 'Logistics', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 310,
      transport: 75
    },
    highlights: [
      'Nissan North America headquarters',
      'Major manufacturing hub',
      'No state income tax on wages',
      'Growing logistics sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'corinth',
    city: 'Corinth',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'corinth',
    country: 'US',
    description: 'Corinth is a Denton County city with access to the northern DFW job market. The city offers suburban living with growing retail and logistics opportunities.',
    population: '22,103',
    topIndustries: ['Retail', 'Logistics', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Growing DFW suburb',
      'Access to Denton and Dallas jobs',
      'No state income tax',
      'Family-friendly community'
    ],
    timezone: 'CST'
  },
  {
    id: 'desoto',
    city: 'DeSoto',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'desoto',
    country: 'US',
    description: 'DeSoto is a southern Dallas suburb with growing logistics and retail sectors. The city offers affordable living with easy access to Dallas opportunities.',
    population: '54,842',
    topIndustries: ['Logistics', 'Retail', 'Healthcare', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Affordable Dallas suburb',
      'Growing logistics sector',
      'No state income tax',
      'Diverse job market'
    ],
    timezone: 'CST'
  },
  {
    id: 'dublin-oh',
    city: 'Dublin',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'dublin-oh',
    country: 'US',
    description: 'Dublin is an affluent Columbus suburb with strong corporate presence and hospitality opportunities. The city offers numerous flexible work options in retail and events.',
    population: '49,328',
    topIndustries: ['Corporate Services', 'Hospitality', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 330,
      transport: 80
    },
    highlights: [
      'Major corporate hub',
      'Upscale hospitality venues',
      'Strong retail sector',
      'Growing event industry'
    ],
    timezone: 'EST'
  },
  {
    id: 'euclid',
    city: 'Euclid',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'euclid',
    country: 'US',
    description: 'Euclid is a Cleveland suburb with strong manufacturing heritage and growing logistics sector. The city offers affordable living with diverse work opportunities.',
    population: '48,139',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 800, oneBed: 950 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Affordable Cleveland suburb',
      'Strong manufacturing base',
      'Growing logistics sector',
      'Lake Erie waterfront'
    ],
    timezone: 'EST'
  },
  {
    id: 'hanover',
    city: 'Hanover',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'hanover-oh',
    country: 'US',
    description: 'Hanover Township in central Ohio offers access to Columbus-area distribution centers. The rural community provides affordable living with steady warehouse work.',
    population: '3,200',
    topIndustries: ['Logistics', 'Agriculture', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 750, oneBed: 900 },
      groceries: 270,
      transport: 60
    },
    highlights: [
      'Very affordable living',
      'Access to Columbus jobs',
      'Rural community feel',
      'Growing logistics presence'
    ],
    timezone: 'EST'
  },
  {
    id: 'canton-township',
    city: 'Canton Township',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'canton-township',
    country: 'US',
    description: 'Canton Township in Stark County offers manufacturing and logistics opportunities. The area provides affordable living with steady industrial employment.',
    population: '13,400',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 750, oneBed: 900 },
      groceries: 270,
      transport: 60
    },
    highlights: [
      'Strong manufacturing heritage',
      'Affordable cost of living',
      'Pro Football Hall of Fame area',
      'Growing distribution sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'newark-nj',
    city: 'Newark',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'newark-nj',
    country: 'US',
    description: 'Newark is New Jersey\'s largest city with a major airport and seaport. The city offers extensive logistics, hospitality, and warehouse opportunities.',
    population: '311,549',
    topIndustries: ['Logistics', 'Aviation', 'Hospitality', 'Healthcare'],
    avgHourlyWage: { min: 15, max: 24 },
    costOfLiving: {
      rent: { studio: 1300, oneBed: 1600 },
      groceries: 380,
      transport: 120
    },
    highlights: [
      'Newark Liberty International Airport',
      'Major seaport',
      'Extensive transit connections',
      'Growing hospitality sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'gary',
    city: 'Gary',
    state: 'Indiana',
    stateCode: 'IN',
    slug: 'gary',
    country: 'US',
    description: 'Gary offers affordable living with access to Chicago-area logistics and manufacturing jobs. The city is strategically located along major transportation corridors.',
    population: '69,093',
    topIndustries: ['Logistics', 'Manufacturing', 'Steel', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 700, oneBed: 850 },
      groceries: 270,
      transport: 70
    },
    highlights: [
      'Very affordable living',
      'Access to Chicago job market',
      'Major transportation hub',
      'Steel industry heritage'
    ],
    timezone: 'CST'
  },
  {
    id: 'independence',
    city: 'Independence',
    state: 'Kentucky',
    stateCode: 'KY',
    slug: 'independence-ky',
    country: 'US',
    description: 'Independence is a growing Kenton County city with access to Cincinnati-area logistics and distribution centers. The city offers affordable living with steady work opportunities.',
    population: '28,919',
    topIndustries: ['Logistics', 'Retail', 'Healthcare', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Growing Cincinnati suburb',
      'Amazon fulfillment nearby',
      'Affordable housing',
      'Strong job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'roswell',
    city: 'Roswell',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'roswell-ga',
    country: 'US',
    description: 'Roswell is an affluent north Atlanta suburb with strong retail and hospitality sectors. The city offers numerous flexible work opportunities in service industries.',
    population: '94,786',
    topIndustries: ['Hospitality', 'Retail', 'Healthcare', 'Corporate Services'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 360,
      transport: 90
    },
    highlights: [
      'Historic downtown district',
      'Upscale retail and dining',
      'Strong service sector',
      'Easy access to Atlanta'
    ],
    timezone: 'EST'
  },
  {
    id: 'allen',
    city: 'Allen',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'allen',
    country: 'US',
    description: 'Allen is a fast-growing Collin County city with excellent retail and hospitality opportunities. The city offers suburban amenities with access to the DFW job market.',
    population: '105,623',
    topIndustries: ['Retail', 'Hospitality', 'Healthcare', 'Technology'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1250, oneBed: 1500 },
      groceries: 340,
      transport: 85
    },
    highlights: [
      'Allen Premium Outlets',
      'Growing retail hub',
      'No state income tax',
      'Family-friendly community'
    ],
    timezone: 'CST'
  },
  {
    id: 'peoria',
    city: 'Peoria',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'peoria-az',
    country: 'US',
    description: 'Peoria is a Phoenix suburb with growing retail and healthcare sectors. The city offers affordable desert living with expanding job opportunities.',
    population: '190,985',
    topIndustries: ['Healthcare', 'Retail', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Growing Phoenix suburb',
      'Spring training baseball',
      'Expanding healthcare sector',
      'Affordable desert living'
    ],
    timezone: 'MST'
  },
  {
    id: 'lithia-springs',
    city: 'Lithia Springs',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'lithia-springs',
    country: 'US',
    description: 'Lithia Springs is a Douglas County community with extensive warehouse and distribution opportunities. The city offers affordable living near major Atlanta logistics hubs.',
    population: '17,842',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Major distribution center area',
      'Affordable Atlanta suburb',
      'Growing logistics sector',
      'Easy interstate access'
    ],
    timezone: 'EST'
  },
  {
    id: 'hoffman-estates',
    city: 'Hoffman Estates',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'hoffman-estates',
    country: 'US',
    description: 'Hoffman Estates is a northwest Chicago suburb with strong corporate and logistics presence. The city offers diverse work opportunities in multiple sectors.',
    population: '52,530',
    topIndustries: ['Corporate Services', 'Logistics', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 340,
      transport: 90
    },
    highlights: [
      'Sears/Transform HQ area',
      'Strong corporate presence',
      'Access to Chicago jobs',
      'Growing logistics sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'saint-bernard',
    city: 'Saint Bernard',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'saint-bernard',
    country: 'US',
    description: 'Saint Bernard is a Cincinnati suburb with access to the city\'s logistics and manufacturing sectors. The affordable community offers steady work opportunities.',
    population: '4,493',
    topIndustries: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 800, oneBed: 950 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Very affordable living',
      'Easy access to Cincinnati',
      'Industrial employment',
      'Close-knit community'
    ],
    timezone: 'EST'
  },
  {
    id: 'elsmere',
    city: 'Elsmere',
    state: 'Kentucky',
    stateCode: 'KY',
    slug: 'elsmere',
    country: 'US',
    description: 'Elsmere is a Kenton County city with access to Cincinnati-area distribution and logistics jobs. The city offers affordable living with strong employment opportunities.',
    population: '8,740',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 850, oneBed: 1000 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Affordable Cincinnati suburb',
      'Strong logistics presence',
      'Growing job market',
      'Easy interstate access'
    ],
    timezone: 'EST'
  },
  {
    id: 'plainfield',
    city: 'Plainfield',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'plainfield-il',
    country: 'US',
    description: 'Plainfield is a fast-growing Will County suburb with expanding logistics and retail opportunities. The city offers suburban living with access to Chicago-area jobs.',
    population: '44,762',
    topIndustries: ['Logistics', 'Retail', 'Healthcare', 'Construction'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 330,
      transport: 85
    },
    highlights: [
      'Fast-growing community',
      'Major I-55 corridor',
      'New development',
      'Access to Chicago jobs'
    ],
    timezone: 'CST'
  },
  {
    id: 'statesville',
    city: 'Statesville',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'statesville',
    country: 'US',
    description: 'Statesville is an Iredell County city with strong manufacturing and logistics sectors. The city offers affordable living in the Charlotte metro area.',
    population: '27,528',
    topIndustries: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Growing Charlotte suburb',
      'Strong manufacturing base',
      'Affordable housing',
      'I-77/I-40 intersection'
    ],
    timezone: 'EST'
  },
  {
    id: 'surprise',
    city: 'Surprise',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'surprise',
    country: 'US',
    description: 'Surprise is one of the fastest-growing Phoenix suburbs with expanding retail and healthcare opportunities. The city offers affordable desert living.',
    population: '143,148',
    topIndustries: ['Healthcare', 'Retail', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Fastest-growing city',
      'Spring training baseball',
      'Expanding job market',
      'Affordable housing'
    ],
    timezone: 'MST'
  },
  {
    id: 'pine-castle',
    city: 'Pine Castle',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'pine-castle',
    country: 'US',
    description: 'Pine Castle is an Orlando-area community with access to the region\'s tourism and hospitality industry. The city offers affordable living near major attractions.',
    population: '11,014',
    topIndustries: ['Hospitality', 'Tourism', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Near Orlando attractions',
      'Strong hospitality sector',
      'Affordable Orlando area',
      'Growing job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'buckeye',
    city: 'Buckeye',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'buckeye',
    country: 'US',
    description: 'Buckeye is one of America\'s fastest-growing cities with expanding logistics and manufacturing sectors. The Phoenix suburb offers affordable desert living.',
    population: '91,502',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1050, oneBed: 1300 },
      groceries: 310,
      transport: 75
    },
    highlights: [
      'Rapid growth city',
      'New logistics facilities',
      'Affordable housing',
      'Master-planned communities'
    ],
    timezone: 'MST'
  },
  {
    id: 'newtown',
    city: 'Newtown',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'newtown-oh',
    country: 'US',
    description: 'Newtown is a Hamilton County village with access to Cincinnati\'s eastern job market. The community offers affordable suburban living.',
    population: '2,719',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Affordable Cincinnati suburb',
      'Access to I-275 jobs',
      'Growing retail sector',
      'Family-friendly community'
    ],
    timezone: 'EST'
  },
  {
    id: 'lake-city',
    city: 'Lake City',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'lake-city-ga',
    country: 'US',
    description: 'Lake City is a Clayton County community near Hartsfield-Jackson Airport. The city offers extensive logistics and warehouse opportunities.',
    population: '2,796',
    topIndustries: ['Logistics', 'Aviation', 'Retail', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Near world\'s busiest airport',
      'Major logistics hub',
      'Warehouse employment',
      'Affordable living'
    ],
    timezone: 'EST'
  },
  {
    id: 'waxahachie',
    city: 'Waxahachie',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'waxahachie',
    country: 'US',
    description: 'Waxahachie is the Ellis County seat south of Dallas with growing logistics and manufacturing sectors. The historic city offers affordable living.',
    population: '41,140',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Historic downtown',
      'Growing logistics hub',
      'No state income tax',
      'Affordable DFW suburb'
    ],
    timezone: 'CST'
  },
  {
    id: 'villa-rica',
    city: 'Villa Rica',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'villa-rica',
    country: 'US',
    description: 'Villa Rica is a Carroll County city with growing logistics and retail sectors. The city offers affordable living west of Atlanta.',
    population: '16,640',
    topIndustries: ['Logistics', 'Retail', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Affordable west metro',
      'Growing logistics sector',
      'Historic gold rush town',
      'Easy I-20 access'
    ],
    timezone: 'EST'
  },
  {
    id: 'dacula',
    city: 'Dacula',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'dacula',
    country: 'US',
    description: 'Dacula is a fast-growing Gwinnett County city with access to Atlanta\'s northeastern job market. The city offers suburban living with diverse opportunities.',
    population: '7,310',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Fast-growing suburb',
      'Access to Atlanta jobs',
      'Strong retail sector',
      'Family-friendly community'
    ],
    timezone: 'EST'
  },
  {
    id: 'joliet',
    city: 'Joliet',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'joliet',
    country: 'US',
    description: 'Joliet is a major logistics hub southwest of Chicago with extensive warehouse and distribution opportunities. The city offers affordable living with strong job growth.',
    population: '150,362',
    topIndustries: ['Logistics', 'Manufacturing', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 310,
      transport: 80
    },
    highlights: [
      'Major distribution hub',
      'Amazon fulfillment center',
      'Affordable Chicago suburb',
      'Strong job growth'
    ],
    timezone: 'CST'
  },
  {
    id: 'piscataway',
    city: 'Piscataway',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'piscataway',
    country: 'US',
    description: 'Piscataway is a Middlesex County township with Rutgers University and extensive corporate presence. The city offers diverse flexible work opportunities.',
    population: '60,532',
    topIndustries: ['Pharmaceuticals', 'Logistics', 'Education', 'Healthcare'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 370,
      transport: 100
    },
    highlights: [
      'Rutgers University campus',
      'Major pharmaceutical hub',
      'Strong logistics sector',
      'Easy NYC access'
    ],
    timezone: 'EST'
  },
  {
    id: 'princeton',
    city: 'Princeton',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'princeton-tx',
    country: 'US',
    description: 'Princeton is a rapidly growing Collin County city northeast of Dallas. The city offers affordable living with expanding logistics opportunities.',
    population: '21,353',
    topIndustries: ['Logistics', 'Retail', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 310,
      transport: 80
    },
    highlights: [
      'Fast-growing community',
      'Affordable DFW suburb',
      'No state income tax',
      'New development'
    ],
    timezone: 'CST'
  },
  {
    id: 'marvin',
    city: 'Marvin',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'marvin',
    country: 'US',
    description: 'Marvin is a Union County village in the Charlotte metro area. The affluent community offers access to Charlotte\'s diverse job market.',
    population: '6,920',
    topIndustries: ['Corporate Services', 'Healthcare', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 340,
      transport: 85
    },
    highlights: [
      'Affluent Charlotte suburb',
      'Access to Charlotte jobs',
      'Growing retail sector',
      'Family-friendly community'
    ],
    timezone: 'EST'
  },
  {
    id: 'uhland',
    city: 'Uhland',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'uhland',
    country: 'US',
    description: 'Uhland is a Hays County city south of Austin with growing logistics and manufacturing presence. The city offers affordable living in the Austin metro.',
    population: '1,697',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Construction'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 85
    },
    highlights: [
      'Growing Austin suburb',
      'Amazon distribution nearby',
      'No state income tax',
      'Affordable alternative to Austin'
    ],
    timezone: 'CST'
  },
  {
    id: 'elgin-il',
    city: 'Elgin',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'elgin-il',
    country: 'US',
    description: 'Elgin is a Fox River city northwest of Chicago with strong manufacturing and logistics sectors. The city offers affordable living with diverse opportunities.',
    population: '114,797',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 310,
      transport: 80
    },
    highlights: [
      'Manufacturing heritage',
      'Growing logistics sector',
      'Affordable Chicago suburb',
      'River casino entertainment'
    ],
    timezone: 'CST'
  },
  {
    id: 'evanston',
    city: 'Evanston',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'evanston',
    country: 'US',
    description: 'Evanston is home to Northwestern University with strong hospitality and service sectors. The lakefront city offers diverse flexible work opportunities.',
    population: '78,110',
    topIndustries: ['Education', 'Healthcare', 'Hospitality', 'Retail'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 360,
      transport: 100
    },
    highlights: [
      'Northwestern University',
      'Strong hospitality sector',
      'Lake Michigan waterfront',
      'Excellent transit access'
    ],
    timezone: 'CST'
  },
  {
    id: 'waterbury',
    city: 'Waterbury',
    state: 'Connecticut',
    stateCode: 'CT',
    slug: 'waterbury',
    country: 'US',
    description: 'Waterbury is Connecticut\'s fifth-largest city with strong healthcare and manufacturing sectors. The city offers affordable living in the New Haven County area.',
    population: '114,403',
    topIndustries: ['Healthcare', 'Manufacturing', 'Retail', 'Logistics'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Healthcare employment hub',
      'Manufacturing heritage',
      'Affordable Connecticut',
      'Growing job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'bloomfield',
    city: 'Bloomfield',
    state: 'Connecticut',
    stateCode: 'CT',
    slug: 'bloomfield-ct',
    country: 'US',
    description: 'Bloomfield is a Hartford suburb with strong insurance and healthcare presence. The city offers suburban living with access to Hartford\'s job market.',
    population: '21,535',
    topIndustries: ['Insurance', 'Healthcare', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 330,
      transport: 85
    },
    highlights: [
      'Major insurance employers',
      'Strong healthcare sector',
      'Access to Hartford jobs',
      'Growing retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'newport',
    city: 'Newport',
    state: 'Kentucky',
    stateCode: 'KY',
    slug: 'newport-ky',
    country: 'US',
    description: 'Newport is a river city across from Cincinnati with strong entertainment and hospitality sectors. The city offers affordable living with diverse opportunities.',
    population: '15,003',
    topIndustries: ['Hospitality', 'Entertainment', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Newport on the Levee',
      'Strong entertainment sector',
      'Affordable Cincinnati area',
      'Growing hospitality jobs'
    ],
    timezone: 'EST'
  },
  {
    id: 'fort-mill',
    city: 'Fort Mill',
    state: 'South Carolina',
    stateCode: 'SC',
    slug: 'fort-mill',
    country: 'US',
    description: 'Fort Mill is a fast-growing York County town near Charlotte. The city offers diverse opportunities with no state income tax on wages.',
    population: '22,195',
    topIndustries: ['Corporate Services', 'Retail', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Fast-growing Charlotte suburb',
      'Lower SC taxes',
      'Major corporate presence',
      'Growing retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'lancaster',
    city: 'Lancaster',
    state: 'South Carolina',
    stateCode: 'SC',
    slug: 'lancaster-sc',
    country: 'US',
    description: 'Lancaster is the Lancaster County seat with growing logistics and manufacturing sectors. The city offers affordable living near Charlotte.',
    population: '9,187',
    topIndustries: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 850, oneBed: 1050 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Affordable Charlotte area',
      'Growing manufacturing',
      'Lower SC taxes',
      'Small-town feel'
    ],
    timezone: 'EST'
  },
  {
    id: 'cherry-hill',
    city: 'Cherry Hill',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'cherry-hill',
    country: 'US',
    description: 'Cherry Hill is a Camden County township with strong retail and healthcare presence. The city offers suburban living between Philadelphia and the Jersey Shore.',
    population: '74,553',
    topIndustries: ['Healthcare', 'Retail', 'Corporate Services', 'Hospitality'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 360,
      transport: 95
    },
    highlights: [
      'Major retail hub',
      'Strong healthcare sector',
      'Access to Philadelphia',
      'Growing corporate presence'
    ],
    timezone: 'EST'
  },
  {
    id: 'pennsauken',
    city: 'Pennsauken',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'pennsauken',
    country: 'US',
    description: 'Pennsauken is a Camden County township with strong logistics and retail presence. The city offers affordable living with access to Philadelphia.',
    population: '36,604',
    topIndustries: ['Logistics', 'Retail', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 330,
      transport: 85
    },
    highlights: [
      'Strong logistics sector',
      'Access to Philadelphia',
      'Growing retail sector',
      'Affordable living'
    ],
    timezone: 'EST'
  },
  {
    id: 'azle',
    city: 'Azle',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'azle',
    country: 'US',
    description: 'Azle is a Parker/Tarrant County city northwest of Fort Worth. The city offers affordable living with access to the DFW job market.',
    population: '13,454',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 20 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Affordable Fort Worth area',
      'Lake community living',
      'No state income tax',
      'Growing job market'
    ],
    timezone: 'CST'
  },
  {
    id: 'indian-trail',
    city: 'Indian Trail',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'indian-trail',
    country: 'US',
    description: 'Indian Trail is a fast-growing Union County town southeast of Charlotte. The city offers suburban living with access to Charlotte\'s diverse job market.',
    population: '43,037',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 320,
      transport: 80
    },
    highlights: [
      'Fast-growing Charlotte suburb',
      'Strong retail sector',
      'Family-friendly community',
      'Growing job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'homer-glen',
    city: 'Homer Glen',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'homer-glen',
    country: 'US',
    description: 'Homer Glen is a Will County village southwest of Chicago. The city offers suburban living with access to Chicago-area logistics and retail jobs.',
    population: '24,456',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Construction'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 85
    },
    highlights: [
      'Growing Chicago suburb',
      'Access to I-355 jobs',
      'Family-friendly community',
      'Strong retail sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'east-windsor',
    city: 'East Windsor',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'east-windsor',
    country: 'US',
    description: 'East Windsor is a Mercer County township between New York and Philadelphia. The city offers diverse opportunities with excellent transit access.',
    population: '27,281',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Corporate Services'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 360,
      transport: 95
    },
    highlights: [
      'NJ Transit access',
      'Between NYC and Philly',
      'Growing corporate presence',
      'Strong retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'mount-prospect',
    city: 'Mount Prospect',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'mount-prospect',
    country: 'US',
    description: 'Mount Prospect is a Cook County village northwest of Chicago. The city offers suburban living with easy access to Chicago\'s diverse job market.',
    population: '54,771',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 330,
      transport: 90
    },
    highlights: [
      'O\'Hare Airport access',
      'Strong retail sector',
      'Diverse job market',
      'Family-friendly community'
    ],
    timezone: 'CST'
  },
  {
    id: 'matteson',
    city: 'Matteson',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'matteson',
    country: 'US',
    description: 'Matteson is a Cook County village south of Chicago with strong retail presence. The city offers affordable living with access to Chicago-area jobs.',
    population: '19,522',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Lincoln Mall area',
      'Strong retail sector',
      'Affordable Chicago suburb',
      'Growing job market'
    ],
    timezone: 'CST'
  },
  {
    id: 'calumet-city',
    city: 'Calumet City',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'calumet-city',
    country: 'US',
    description: 'Calumet City is a Cook County city on the Indiana border. The city offers affordable living with access to both Chicago and Northwest Indiana jobs.',
    population: '36,619',
    topIndustries: ['Retail', 'Logistics', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 75
    },
    highlights: [
      'River Oaks retail center',
      'Access to two job markets',
      'Affordable living',
      'Strong logistics presence'
    ],
    timezone: 'CST'
  },
  {
    id: 'candler-mcafee',
    city: 'Candler-McAfee',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'candler-mcafee',
    country: 'US',
    description: 'Candler-McAfee is a DeKalb County community with access to Atlanta\'s diverse job market. The area offers affordable living east of Atlanta.',
    population: '24,100',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Affordable Atlanta area',
      'Access to MARTA transit',
      'Growing retail sector',
      'Diverse job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'redan',
    city: 'Redan',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'redan',
    country: 'US',
    description: 'Redan is a DeKalb County community with access to Atlanta\'s eastern job market. The area offers affordable suburban living.',
    population: '34,175',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Education'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 295,
      transport: 75
    },
    highlights: [
      'Affordable Atlanta suburb',
      'Growing retail sector',
      'Access to Stone Mountain',
      'Diverse community'
    ],
    timezone: 'EST'
  },
  {
    id: 'oak-park',
    city: 'Oak Park',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'oak-park-il',
    country: 'US',
    description: 'Oak Park is a Cook County village west of Chicago known for its architecture. The city offers diverse opportunities with excellent transit access.',
    population: '52,233',
    topIndustries: ['Healthcare', 'Retail', 'Hospitality', 'Education'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1250, oneBed: 1500 },
      groceries: 350,
      transport: 90
    },
    highlights: [
      'Historic architecture',
      'CTA Green/Blue Line access',
      'Strong hospitality sector',
      'Diverse community'
    ],
    timezone: 'CST'
  },
  {
    id: 'riverdale',
    city: 'Riverdale',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'riverdale-il',
    country: 'US',
    description: 'Riverdale is a Cook County village south of Chicago. The city offers affordable living with access to Chicago-area logistics and manufacturing jobs.',
    population: '13,549',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 20 },
    costOfLiving: {
      rent: { studio: 850, oneBed: 1000 },
      groceries: 280,
      transport: 70
    },
    highlights: [
      'Very affordable living',
      'Strong logistics presence',
      'Access to Chicago jobs',
      'Industrial employment'
    ],
    timezone: 'CST'
  },
  {
    id: 'lansing',
    city: 'Lansing',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'lansing-il',
    country: 'US',
    description: 'Lansing is a Cook County village on the Indiana border. The city offers affordable living with access to both Chicago and Northwest Indiana job markets.',
    population: '29,554',
    topIndustries: ['Retail', 'Logistics', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 290,
      transport: 75
    },
    highlights: [
      'Access to two job markets',
      'Strong retail presence',
      'Affordable living',
      'Growing logistics sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'lockhart-fl',
    city: 'Lockhart',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'lockhart-fl',
    country: 'US',
    description: 'Lockhart is an Orlando-area community with access to Central Florida\'s tourism and hospitality industry. The city offers affordable living.',
    population: '14,456',
    topIndustries: ['Hospitality', 'Tourism', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 310,
      transport: 75
    },
    highlights: [
      'Near Orlando attractions',
      'Strong hospitality sector',
      'Affordable Orlando area',
      'Growing job market'
    ],
    timezone: 'EST'
  },
  {
    id: 'east-chicago',
    city: 'East Chicago',
    state: 'Indiana',
    stateCode: 'IN',
    slug: 'east-chicago',
    country: 'US',
    description: 'East Chicago offers affordable living with access to Chicago-area logistics and industrial jobs. The city is located in the Calumet region.',
    population: '28,215',
    topIndustries: ['Steel', 'Logistics', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 700, oneBed: 850 },
      groceries: 270,
      transport: 65
    },
    highlights: [
      'Very affordable living',
      'Industrial employment',
      'Access to Chicago jobs',
      'Casino entertainment'
    ],
    timezone: 'CST'
  },
  {
    id: 'ball-ground',
    city: 'Ball Ground',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'ball-ground',
    country: 'US',
    description: 'Ball Ground is a Cherokee County city north of Atlanta with growing logistics presence. The city offers affordable small-town living.',
    population: '2,548',
    topIndustries: ['Logistics', 'Manufacturing', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Small-town charm',
      'Growing logistics sector',
      'Affordable north metro',
      'Easy I-575 access'
    ],
    timezone: 'EST'
  },
  {
    id: 'wilmington-oh',
    city: 'Wilmington',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'wilmington-oh',
    country: 'US',
    description: 'Wilmington is the Clinton County seat with strong logistics and distribution presence. The city offers affordable living in southwest Ohio.',
    population: '12,520',
    topIndustries: ['Logistics', 'Manufacturing', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 750, oneBed: 900 },
      groceries: 270,
      transport: 60
    },
    highlights: [
      'Air park logistics hub',
      'Very affordable living',
      'Strong distribution sector',
      'Small-town feel'
    ],
    timezone: 'EST'
  },
  {
    id: 'newton-nc',
    city: 'Newton',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'newton-nc',
    country: 'US',
    description: 'Newton is the Catawba County seat with strong manufacturing heritage. The city offers affordable living in western North Carolina.',
    population: '13,106',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 800, oneBed: 950 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Manufacturing heritage',
      'Affordable living',
      'Growing logistics sector',
      'Small-town charm'
    ],
    timezone: 'EST'
  },
  {
    id: 'coshocton',
    city: 'Coshocton',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'coshocton',
    country: 'US',
    description: 'Coshocton is a historic Ohio city with manufacturing and logistics presence. The city offers very affordable living in east-central Ohio.',
    population: '10,993',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 650, oneBed: 800 },
      groceries: 260,
      transport: 55
    },
    highlights: [
      'Very affordable living',
      'Historic Roscoe Village',
      'Manufacturing employment',
      'Small-town community'
    ],
    timezone: 'EST'
  },
  {
    id: 'mount-vernon-oh',
    city: 'Mount Vernon',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'mount-vernon-oh',
    country: 'US',
    description: 'Mount Vernon is the Knox County seat with manufacturing and logistics presence. The city offers affordable living in central Ohio.',
    population: '17,000',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      rent: { studio: 700, oneBed: 850 },
      groceries: 270,
      transport: 60
    },
    highlights: [
      'Historic downtown',
      'Manufacturing employment',
      'Affordable living',
      'Growing retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'holly-springs',
    city: 'Holly Springs',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'holly-springs',
    country: 'US',
    description: 'Holly Springs is a fast-growing Wake County town south of Raleigh. The city offers suburban living with access to the Research Triangle job market.',
    population: '41,338',
    topIndustries: ['Technology', 'Healthcare', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 1250, oneBed: 1500 },
      groceries: 340,
      transport: 85
    },
    highlights: [
      'Fast-growing community',
      'Research Triangle access',
      'Strong tech presence',
      'Family-friendly'
    ],
    timezone: 'EST'
  },
  {
    id: 'cornelius',
    city: 'Cornelius',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'cornelius',
    country: 'US',
    description: 'Cornelius is a Lake Norman town north of Charlotte. The city offers lakeside living with access to Charlotte\'s diverse job market.',
    population: '32,452',
    topIndustries: ['Hospitality', 'Retail', 'Healthcare', 'Corporate Services'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 340,
      transport: 85
    },
    highlights: [
      'Lake Norman waterfront',
      'Strong hospitality sector',
      'Access to Charlotte jobs',
      'Growing retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'sawmills',
    city: 'Sawmills',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'sawmills',
    country: 'US',
    description: 'Sawmills is a Caldwell County town with manufacturing presence. The city offers very affordable living in western North Carolina.',
    population: '5,500',
    topIndustries: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 18 },
    costOfLiving: {
      rent: { studio: 700, oneBed: 850 },
      groceries: 270,
      transport: 60
    },
    highlights: [
      'Very affordable living',
      'Manufacturing jobs',
      'Mountain foothills',
      'Small-town community'
    ],
    timezone: 'EST'
  },
  {
    id: 'willowick',
    city: 'Willowick',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'willowick',
    country: 'US',
    description: 'Willowick is a Lake County city on Lake Erie. The city offers affordable living with access to Cleveland-area jobs.',
    population: '14,496',
    topIndustries: ['Manufacturing', 'Retail', 'Healthcare', 'Logistics'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 800, oneBed: 950 },
      groceries: 280,
      transport: 65
    },
    highlights: [
      'Lake Erie waterfront',
      'Affordable Cleveland suburb',
      'Manufacturing employment',
      'Growing retail sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'jollyville',
    city: 'Jollyville',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'jollyville',
    country: 'US',
    description: 'Jollyville is an Austin-area community in Williamson County. The city offers suburban living with access to Austin\'s tech job market.',
    population: '17,000',
    topIndustries: ['Technology', 'Retail', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 340,
      transport: 90
    },
    highlights: [
      'Austin tech access',
      'Strong retail sector',
      'No state income tax',
      'Growing job market'
    ],
    timezone: 'CST'
  },
  {
    id: 'lakewood-oh',
    city: 'Lakewood',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'lakewood-oh',
    country: 'US',
    description: 'Lakewood is a Cuyahoga County city west of Cleveland. The city offers urban amenities with affordable living.',
    population: '50,942',
    topIndustries: ['Healthcare', 'Retail', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 850, oneBed: 1000 },
      groceries: 290,
      transport: 70
    },
    highlights: [
      'Walkable downtown',
      'Lake Erie access',
      'Affordable Cleveland suburb',
      'Strong hospitality sector'
    ],
    timezone: 'EST'
  },
  {
    id: 'weatherford',
    city: 'Weatherford',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'weatherford',
    country: 'US',
    description: 'Weatherford is the Parker County seat west of Fort Worth. The city offers small-town living with access to the DFW job market.',
    population: '35,138',
    topIndustries: ['Retail', 'Healthcare', 'Manufacturing', 'Logistics'],
    avgHourlyWage: { min: 14, max: 20 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Historic downtown',
      'Access to Fort Worth',
      'No state income tax',
      'Growing retail sector'
    ],
    timezone: 'CST'
  },
  {
    id: 'addison',
    city: 'Addison',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'addison',
    country: 'US',
    description: 'Addison is a Dallas suburb known for its restaurants and airport. The city offers excellent hospitality and corporate opportunities.',
    population: '15,941',
    topIndustries: ['Hospitality', 'Corporate Services', 'Aviation', 'Retail'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 340,
      transport: 85
    },
    highlights: [
      'Restaurant capital of DFW',
      'General aviation airport',
      'Strong corporate presence',
      'No state income tax'
    ],
    timezone: 'CST'
  },
  {
    id: 'munster',
    city: 'Munster',
    state: 'Indiana',
    stateCode: 'IN',
    slug: 'munster',
    country: 'US',
    description: 'Munster is a Lake County town with access to Chicago-area jobs. The city offers suburban living with lower Indiana taxes.',
    population: '22,954',
    topIndustries: ['Healthcare', 'Retail', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Access to Chicago jobs',
      'Lower Indiana taxes',
      'Strong healthcare sector',
      'Family-friendly community'
    ],
    timezone: 'CST'
  },
  {
    id: 'apache-junction',
    city: 'Apache Junction',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'apache-junction',
    country: 'US',
    description: 'Apache Junction is a Pinal County city east of Phoenix. The city offers affordable desert living near the Superstition Mountains.',
    population: '41,534',
    topIndustries: ['Retail', 'Healthcare', 'Tourism', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 950, oneBed: 1150 },
      groceries: 300,
      transport: 70
    },
    highlights: [
      'Superstition Mountains',
      'Affordable Phoenix area',
      'Growing retail sector',
      'Winter visitor destination'
    ],
    timezone: 'MST'
  },
  {
    id: 'beckett-ridge',
    city: 'Beckett Ridge',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'beckett-ridge',
    country: 'US',
    description: 'Beckett Ridge is a Butler County community with access to Cincinnati\'s northern job market. The city offers suburban living with growing opportunities.',
    population: '9,000',
    topIndustries: ['Retail', 'Healthcare', 'Logistics', 'Corporate Services'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: [
      'Growing Cincinnati suburb',
      'Strong retail presence',
      'Access to I-75 corridor',
      'Family-friendly community'
    ],
    timezone: 'EST'
  }
];

// UK Locations (keeping existing for now)
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
