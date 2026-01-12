// Commute cost data - Sources: AAA 2026 Your Driving Costs, EIA, Transit Agency data
// Last updated: January 2026

// AAA 2024 Vehicle Operating Costs per Mile
export interface VehicleType {
  id: string;
  name: string;
  costPerMile: number;  // Total cost including depreciation, insurance, fuel, maintenance
  fuelCostPerMile: number;
  maintenanceCostPerMile: number;
  description: string;
}

export const vehicleTypes: VehicleType[] = [
  {
    id: "small_sedan",
    name: "Small Sedan",
    costPerMile: 0.5924,
    fuelCostPerMile: 0.1290,
    maintenanceCostPerMile: 0.0913,
    description: "Compact cars like Honda Civic, Toyota Corolla"
  },
  {
    id: "medium_sedan",
    name: "Medium Sedan",
    costPerMile: 0.7038,
    fuelCostPerMile: 0.1490,
    maintenanceCostPerMile: 0.1113,
    description: "Mid-size cars like Honda Accord, Toyota Camry"
  },
  {
    id: "subcompact_suv",
    name: "Subcompact SUV",
    costPerMile: 0.6751,
    fuelCostPerMile: 0.1390,
    maintenanceCostPerMile: 0.0963,
    description: "Small crossovers like Honda HR-V, Mazda CX-30"
  },
  {
    id: "compact_suv",
    name: "Compact SUV",
    costPerMile: 0.7104,
    fuelCostPerMile: 0.1490,
    maintenanceCostPerMile: 0.1013,
    description: "Popular SUVs like Toyota RAV4, Honda CR-V"
  },
  {
    id: "medium_suv",
    name: "Medium SUV",
    costPerMile: 0.8384,
    fuelCostPerMile: 0.1790,
    maintenanceCostPerMile: 0.1113,
    description: "Larger SUVs like Ford Explorer, Jeep Grand Cherokee"
  },
  {
    id: "midsize_pickup",
    name: "Mid-size Pickup",
    costPerMile: 0.8244,
    fuelCostPerMile: 0.1790,
    maintenanceCostPerMile: 0.0963,
    description: "Trucks like Toyota Tacoma, Ford Ranger"
  },
  {
    id: "halfton_pickup",
    name: "Half-Ton Pickup",
    costPerMile: 1.10,
    fuelCostPerMile: 0.2190,
    maintenanceCostPerMile: 0.1213,
    description: "Full-size trucks like Ford F-150, RAM 1500"
  },
  {
    id: "hybrid",
    name: "Hybrid",
    costPerMile: 0.6607,
    fuelCostPerMile: 0.0890,
    maintenanceCostPerMile: 0.0813,
    description: "Hybrid vehicles like Toyota Prius, Honda Insight"
  },
  {
    id: "electric",
    name: "Electric (EV)",
    costPerMile: 0.8469,
    fuelCostPerMile: 0.0490,  // Electricity cost
    maintenanceCostPerMile: 0.0663,
    description: "Electric vehicles like Tesla Model 3, Chevy Bolt"
  }
];

// Average gas prices by state (as of January 2026, $/gallon regular unleaded)
// Source: AAA Gas Prices, EIA
export interface StateGasPrice {
  name: string;
  abbreviation: string;
  regularGas: number;  // $/gallon
  dieselGas: number;   // $/gallon
}

export const stateGasPrices: StateGasPrice[] = [
  { name: "Alabama", abbreviation: "AL", regularGas: 2.59, dieselGas: 3.19 },
  { name: "Alaska", abbreviation: "AK", regularGas: 3.69, dieselGas: 4.09 },
  { name: "Arizona", abbreviation: "AZ", regularGas: 3.09, dieselGas: 3.59 },
  { name: "Arkansas", abbreviation: "AR", regularGas: 2.59, dieselGas: 3.19 },
  { name: "California", abbreviation: "CA", regularGas: 4.59, dieselGas: 5.09 },
  { name: "Colorado", abbreviation: "CO", regularGas: 2.89, dieselGas: 3.49 },
  { name: "Connecticut", abbreviation: "CT", regularGas: 3.19, dieselGas: 3.89 },
  { name: "Delaware", abbreviation: "DE", regularGas: 2.89, dieselGas: 3.49 },
  { name: "District of Columbia", abbreviation: "DC", regularGas: 3.39, dieselGas: 3.99 },
  { name: "Florida", abbreviation: "FL", regularGas: 2.99, dieselGas: 3.59 },
  { name: "Georgia", abbreviation: "GA", regularGas: 2.69, dieselGas: 3.29 },
  { name: "Hawaii", abbreviation: "HI", regularGas: 4.29, dieselGas: 5.19 },
  { name: "Idaho", abbreviation: "ID", regularGas: 3.19, dieselGas: 3.69 },
  { name: "Illinois", abbreviation: "IL", regularGas: 3.29, dieselGas: 3.79 },
  { name: "Indiana", abbreviation: "IN", regularGas: 2.89, dieselGas: 3.49 },
  { name: "Iowa", abbreviation: "IA", regularGas: 2.79, dieselGas: 3.39 },
  { name: "Kansas", abbreviation: "KS", regularGas: 2.69, dieselGas: 3.29 },
  { name: "Kentucky", abbreviation: "KY", regularGas: 2.69, dieselGas: 3.29 },
  { name: "Louisiana", abbreviation: "LA", regularGas: 2.59, dieselGas: 3.19 },
  { name: "Maine", abbreviation: "ME", regularGas: 3.09, dieselGas: 3.79 },
  { name: "Maryland", abbreviation: "MD", regularGas: 3.09, dieselGas: 3.69 },
  { name: "Massachusetts", abbreviation: "MA", regularGas: 3.19, dieselGas: 3.89 },
  { name: "Michigan", abbreviation: "MI", regularGas: 2.99, dieselGas: 3.59 },
  { name: "Minnesota", abbreviation: "MN", regularGas: 2.89, dieselGas: 3.49 },
  { name: "Mississippi", abbreviation: "MS", regularGas: 2.49, dieselGas: 3.09 },
  { name: "Missouri", abbreviation: "MO", regularGas: 2.59, dieselGas: 3.19 },
  { name: "Montana", abbreviation: "MT", regularGas: 3.09, dieselGas: 3.59 },
  { name: "Nebraska", abbreviation: "NE", regularGas: 2.79, dieselGas: 3.39 },
  { name: "Nevada", abbreviation: "NV", regularGas: 3.69, dieselGas: 4.19 },
  { name: "New Hampshire", abbreviation: "NH", regularGas: 2.99, dieselGas: 3.69 },
  { name: "New Jersey", abbreviation: "NJ", regularGas: 2.99, dieselGas: 3.59 },
  { name: "New Mexico", abbreviation: "NM", regularGas: 2.89, dieselGas: 3.49 },
  { name: "New York", abbreviation: "NY", regularGas: 3.39, dieselGas: 4.09 },
  { name: "North Carolina", abbreviation: "NC", regularGas: 2.79, dieselGas: 3.39 },
  { name: "North Dakota", abbreviation: "ND", regularGas: 2.89, dieselGas: 3.49 },
  { name: "Ohio", abbreviation: "OH", regularGas: 2.79, dieselGas: 3.39 },
  { name: "Oklahoma", abbreviation: "OK", regularGas: 2.49, dieselGas: 3.09 },
  { name: "Oregon", abbreviation: "OR", regularGas: 3.49, dieselGas: 3.99 },
  { name: "Pennsylvania", abbreviation: "PA", regularGas: 3.29, dieselGas: 3.89 },
  { name: "Rhode Island", abbreviation: "RI", regularGas: 3.09, dieselGas: 3.79 },
  { name: "South Carolina", abbreviation: "SC", regularGas: 2.59, dieselGas: 3.19 },
  { name: "South Dakota", abbreviation: "SD", regularGas: 2.89, dieselGas: 3.49 },
  { name: "Tennessee", abbreviation: "TN", regularGas: 2.59, dieselGas: 3.19 },
  { name: "Texas", abbreviation: "TX", regularGas: 2.49, dieselGas: 3.09 },
  { name: "Utah", abbreviation: "UT", regularGas: 3.09, dieselGas: 3.59 },
  { name: "Vermont", abbreviation: "VT", regularGas: 3.19, dieselGas: 3.89 },
  { name: "Virginia", abbreviation: "VA", regularGas: 2.89, dieselGas: 3.49 },
  { name: "Washington", abbreviation: "WA", regularGas: 4.09, dieselGas: 4.49 },
  { name: "West Virginia", abbreviation: "WV", regularGas: 2.79, dieselGas: 3.39 },
  { name: "Wisconsin", abbreviation: "WI", regularGas: 2.79, dieselGas: 3.39 },
  { name: "Wyoming", abbreviation: "WY", regularGas: 2.99, dieselGas: 3.49 }
];

// Public transit monthly pass costs by city
// Source: Transit agency websites, January 2026
export interface CityTransit {
  city: string;
  state: string;
  transitAgency: string;
  monthlyPass: number;        // Basic unlimited monthly pass
  monthlyPassPremium?: number; // Premium/express option if available
  singleRide: number;         // Single ride fare
  dailyCap?: number;          // Daily fare cap if applicable
  hasSubsidy: boolean;        // Employer pre-tax benefit commonly available
  notes: string;
  websiteUrl: string;
}

export const cityTransitCosts: CityTransit[] = [
  {
    city: "New York",
    state: "NY",
    transitAgency: "MTA",
    monthlyPass: 132,
    singleRide: 2.90,
    hasSubsidy: true,
    notes: "Unlimited rides on subway and local bus",
    websiteUrl: "https://new.mta.info/fares"
  },
  {
    city: "Los Angeles",
    state: "CA",
    transitAgency: "LA Metro",
    monthlyPass: 100,  // Approximate based on fare capping
    singleRide: 1.75,
    dailyCap: 5,
    hasSubsidy: true,
    notes: "Fare capping system - $5/day, ~$100/month cap",
    websiteUrl: "https://www.metro.net/riding/fares/"
  },
  {
    city: "Chicago",
    state: "IL",
    transitAgency: "CTA",
    monthlyPass: 105,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "Unlimited rides on 'L' trains and buses",
    websiteUrl: "https://www.transitchicago.com/fares/"
  },
  {
    city: "Houston",
    state: "TX",
    transitAgency: "METRO",
    monthlyPass: 90,
    singleRide: 1.25,
    hasSubsidy: true,
    notes: "Local bus and rail",
    websiteUrl: "https://www.ridemetro.org/fares"
  },
  {
    city: "Phoenix",
    state: "AZ",
    transitAgency: "Valley Metro",
    monthlyPass: 64,
    singleRide: 2.00,
    hasSubsidy: true,
    notes: "Local bus and light rail",
    websiteUrl: "https://www.valleymetro.org/fares"
  },
  {
    city: "Philadelphia",
    state: "PA",
    transitAgency: "SEPTA",
    monthlyPass: 107,
    monthlyPassPremium: 220,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "TransPass for city transit; premium includes regional rail",
    websiteUrl: "https://www.septa.org/fares/"
  },
  {
    city: "San Antonio",
    state: "TX",
    transitAgency: "VIA",
    monthlyPass: 38,
    singleRide: 1.30,
    hasSubsidy: true,
    notes: "One of the most affordable transit systems",
    websiteUrl: "https://www.viainfo.net/fares/"
  },
  {
    city: "San Diego",
    state: "CA",
    transitAgency: "MTS",
    monthlyPass: 72,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "Regional unlimited pass",
    websiteUrl: "https://www.sdmts.com/fares-passes"
  },
  {
    city: "Dallas",
    state: "TX",
    transitAgency: "DART",
    monthlyPass: 96,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "Local pass; regional pass available",
    websiteUrl: "https://www.dart.org/fares"
  },
  {
    city: "San Jose",
    state: "CA",
    transitAgency: "VTA",
    monthlyPass: 90,
    singleRide: 2.50,
    dailyCap: 7.50,
    hasSubsidy: true,
    notes: "Includes bus and light rail",
    websiteUrl: "https://www.vta.org/fares"
  },
  {
    city: "Austin",
    state: "TX",
    transitAgency: "CapMetro",
    monthlyPass: 41.25,
    singleRide: 1.25,
    dailyCap: 2.50,
    hasSubsidy: true,
    notes: "One of the most affordable in major cities",
    websiteUrl: "https://www.capmetro.org/fares"
  },
  {
    city: "San Francisco",
    state: "CA",
    transitAgency: "SFMTA/Muni",
    monthlyPass: 85,
    monthlyPassPremium: 102,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "M Pass for Muni; A Pass includes BART within SF",
    websiteUrl: "https://www.sfmta.com/getting-around/muni/fares"
  },
  {
    city: "Seattle",
    state: "WA",
    transitAgency: "King County Metro",
    monthlyPass: 108,
    singleRide: 2.75,
    hasSubsidy: true,
    notes: "PugetPass for regional transit",
    websiteUrl: "https://kingcounty.gov/depts/metro/fares-orca.aspx"
  },
  {
    city: "Denver",
    state: "CO",
    transitAgency: "RTD",
    monthlyPass: 114,
    monthlyPassPremium: 200,
    singleRide: 3.00,
    hasSubsidy: true,
    notes: "Local pass; Regional/Airport pass available",
    websiteUrl: "https://www.rtd-denver.com/fares-passes"
  },
  {
    city: "Washington DC",
    state: "DC",
    transitAgency: "WMATA",
    monthlyPass: 100,  // Average for typical commute
    singleRide: 2.25,
    hasSubsidy: true,
    notes: "Varies by distance; unlimited bus included",
    websiteUrl: "https://www.wmata.com/fares/"
  },
  {
    city: "Boston",
    state: "MA",
    transitAgency: "MBTA",
    monthlyPass: 90,
    monthlyPassPremium: 426,
    singleRide: 2.40,
    hasSubsidy: true,
    notes: "LinkPass for subway/bus; premium for commuter rail",
    websiteUrl: "https://www.mbta.com/fares"
  },
  {
    city: "Nashville",
    state: "TN",
    transitAgency: "WeGo",
    monthlyPass: 65,
    singleRide: 2.00,
    hasSubsidy: true,
    notes: "Local unlimited",
    websiteUrl: "https://www.wegotransit.com/fares/"
  },
  {
    city: "Detroit",
    state: "MI",
    transitAgency: "DDOT/SMART",
    monthlyPass: 70,
    singleRide: 2.00,
    hasSubsidy: true,
    notes: "Regional transit pass",
    websiteUrl: "https://detroitmi.gov/departments/detroit-department-transportation"
  },
  {
    city: "Portland",
    state: "OR",
    transitAgency: "TriMet",
    monthlyPass: 100,
    singleRide: 2.50,
    dailyCap: 5,
    hasSubsidy: true,
    notes: "Includes MAX light rail and all buses",
    websiteUrl: "https://trimet.org/fares/"
  },
  {
    city: "Las Vegas",
    state: "NV",
    transitAgency: "RTC",
    monthlyPass: 65,
    singleRide: 2.00,
    hasSubsidy: true,
    notes: "Includes all local routes",
    websiteUrl: "https://www.rtcsnv.com/ways-to-travel/fares-passes/"
  },
  {
    city: "Atlanta",
    state: "GA",
    transitAgency: "MARTA",
    monthlyPass: 95,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "Unlimited rail and bus",
    websiteUrl: "https://www.itsmarta.com/fare-programs.aspx"
  },
  {
    city: "Minneapolis",
    state: "MN",
    transitAgency: "Metro Transit",
    monthlyPass: 108,
    singleRide: 2.25,
    hasSubsidy: true,
    notes: "Includes light rail and buses",
    websiteUrl: "https://www.metrotransit.org/fares"
  },
  {
    city: "Miami",
    state: "FL",
    transitAgency: "Miami-Dade Transit",
    monthlyPass: 112.50,
    singleRide: 2.25,
    hasSubsidy: true,
    notes: "EASY Card monthly pass",
    websiteUrl: "https://www.miamidade.gov/transit/fares.asp"
  },
  {
    city: "Orlando",
    state: "FL",
    transitAgency: "LYNX",
    monthlyPass: 50,
    singleRide: 2.00,
    hasSubsidy: true,
    notes: "One of the most affordable",
    websiteUrl: "https://www.golynx.com/plan-trip/fares.stml"
  },
  {
    city: "Cleveland",
    state: "OH",
    transitAgency: "RTA",
    monthlyPass: 95,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "All-access monthly pass",
    websiteUrl: "https://www.riderta.com/fares"
  },
  {
    city: "Pittsburgh",
    state: "PA",
    transitAgency: "Port Authority",
    monthlyPass: 97.50,
    singleRide: 2.75,
    hasSubsidy: true,
    notes: "ConnectCard monthly",
    websiteUrl: "https://www.rideprt.org/fares-passes/"
  },
  {
    city: "Cincinnati",
    state: "OH",
    transitAgency: "Metro",
    monthlyPass: 88,
    monthlyPassPremium: 120,
    singleRide: 1.75,
    hasSubsidy: true,
    notes: "Local pass; Express routes available",
    websiteUrl: "https://www.go-metro.com/fares"
  },
  {
    city: "Charlotte",
    state: "NC",
    transitAgency: "CATS",
    monthlyPass: 88,
    singleRide: 2.20,
    hasSubsidy: true,
    notes: "Includes LYNX light rail",
    websiteUrl: "https://charlottenc.gov/cats/fares/Pages/default.aspx"
  },
  {
    city: "Salt Lake City",
    state: "UT",
    transitAgency: "UTA",
    monthlyPass: 83.75,
    singleRide: 2.50,
    hasSubsidy: true,
    notes: "TRAX, FrontRunner, and buses",
    websiteUrl: "https://www.rideuta.com/Fares-And-Passes"
  },
  {
    city: "Baltimore",
    state: "MD",
    transitAgency: "MTA Maryland",
    monthlyPass: 77,
    singleRide: 2.00,
    hasSubsidy: true,
    notes: "Unlimited local transit",
    websiteUrl: "https://www.mta.maryland.gov/fares"
  }
];

// National averages for reference
export const NATIONAL_AVERAGES = {
  gasPricePerGallon: 3.09,
  avgMPG: 25.4,
  avgCommuteMiles: 16,  // One way
  avgCommuteMinutes: 27.6,
  workDaysPerYear: 250,
  costPerMileAvg: 0.77,  // AAA average across all vehicle types
  parkingMonthlyUrban: 200,
  parkingMonthlySuburban: 75,
};

// IRS mileage rate for reference
export const IRS_MILEAGE_RATE_2026 = 0.70;  // $/mile for business use

// Helper functions
export const getStateGasPrice = (abbreviation: string): StateGasPrice | undefined => {
  return stateGasPrices.find(s => s.abbreviation === abbreviation);
};

export const getVehicleType = (id: string): VehicleType | undefined => {
  return vehicleTypes.find(v => v.id === id);
};

export const getCityTransit = (city: string): CityTransit | undefined => {
  return cityTransitCosts.find(c => c.city.toLowerCase() === city.toLowerCase());
};

// Calculate actual fuel cost per mile based on state gas price and MPG
export const calculateFuelCostPerMile = (gasPricePerGallon: number, mpg: number): number => {
  return gasPricePerGallon / mpg;
};

// Calculate time value of commute
export const calculateTimeValue = (hourlyWage: number, commuteMinutes: number, workDays: number): number => {
  const hoursPerYear = (commuteMinutes / 60) * 2 * workDays;  // 2 = round trip
  return hourlyWage * hoursPerYear;
};
