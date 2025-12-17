// Comprehensive state tax data for 2025
// Sources: Tax Foundation, state tax agencies

export interface StateTaxInfo {
  name: string;
  abbreviation: string;
  incomeTaxRate: number; // Simplified flat rate or effective average
  hasNoIncomeTax: boolean;
  overtimeRules: 'federal' | 'daily' | 'both'; // California has daily OT
  minWage: number; // State minimum wage 2025
  unemploymentMaxWeekly: number; // Max weekly unemployment benefit
  unemploymentMaxWeeks: number; // Max weeks of benefits
}

export const stateTaxData: Record<string, StateTaxInfo> = {
  AL: { name: "Alabama", abbreviation: "AL", incomeTaxRate: 0.05, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 275, unemploymentMaxWeeks: 14 },
  AK: { name: "Alaska", abbreviation: "AK", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 11.73, unemploymentMaxWeekly: 370, unemploymentMaxWeeks: 26 },
  AZ: { name: "Arizona", abbreviation: "AZ", incomeTaxRate: 0.025, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 14.35, unemploymentMaxWeekly: 320, unemploymentMaxWeeks: 26 },
  AR: { name: "Arkansas", abbreviation: "AR", incomeTaxRate: 0.044, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 11.00, unemploymentMaxWeekly: 451, unemploymentMaxWeeks: 16 },
  CA: { name: "California", abbreviation: "CA", incomeTaxRate: 0.093, hasNoIncomeTax: false, overtimeRules: 'daily', minWage: 16.50, unemploymentMaxWeekly: 450, unemploymentMaxWeeks: 26 },
  CO: { name: "Colorado", abbreviation: "CO", incomeTaxRate: 0.044, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 14.81, unemploymentMaxWeekly: 823, unemploymentMaxWeeks: 26 },
  CT: { name: "Connecticut", abbreviation: "CT", incomeTaxRate: 0.05, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 16.35, unemploymentMaxWeekly: 759, unemploymentMaxWeeks: 26 },
  DE: { name: "Delaware", abbreviation: "DE", incomeTaxRate: 0.066, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 15.00, unemploymentMaxWeekly: 400, unemploymentMaxWeeks: 26 },
  FL: { name: "Florida", abbreviation: "FL", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 13.00, unemploymentMaxWeekly: 275, unemploymentMaxWeeks: 12 },
  GA: { name: "Georgia", abbreviation: "GA", incomeTaxRate: 0.055, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 365, unemploymentMaxWeeks: 14 },
  HI: { name: "Hawaii", abbreviation: "HI", incomeTaxRate: 0.0825, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 14.00, unemploymentMaxWeekly: 823, unemploymentMaxWeeks: 26 },
  ID: { name: "Idaho", abbreviation: "ID", incomeTaxRate: 0.058, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 532, unemploymentMaxWeeks: 20 },
  IL: { name: "Illinois", abbreviation: "IL", incomeTaxRate: 0.0495, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 14.00, unemploymentMaxWeekly: 707, unemploymentMaxWeeks: 26 },
  IN: { name: "Indiana", abbreviation: "IN", incomeTaxRate: 0.0305, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 390, unemploymentMaxWeeks: 26 },
  IA: { name: "Iowa", abbreviation: "IA", incomeTaxRate: 0.044, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 591, unemploymentMaxWeeks: 26 },
  KS: { name: "Kansas", abbreviation: "KS", incomeTaxRate: 0.057, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 560, unemploymentMaxWeeks: 16 },
  KY: { name: "Kentucky", abbreviation: "KY", incomeTaxRate: 0.04, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 569, unemploymentMaxWeeks: 26 },
  LA: { name: "Louisiana", abbreviation: "LA", incomeTaxRate: 0.0425, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 275, unemploymentMaxWeeks: 26 },
  ME: { name: "Maine", abbreviation: "ME", incomeTaxRate: 0.0715, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 14.65, unemploymentMaxWeekly: 589, unemploymentMaxWeeks: 26 },
  MD: { name: "Maryland", abbreviation: "MD", incomeTaxRate: 0.0575, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 15.00, unemploymentMaxWeekly: 430, unemploymentMaxWeeks: 26 },
  MA: { name: "Massachusetts", abbreviation: "MA", incomeTaxRate: 0.09, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 15.00, unemploymentMaxWeekly: 1033, unemploymentMaxWeeks: 26 },
  MI: { name: "Michigan", abbreviation: "MI", incomeTaxRate: 0.0405, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 10.56, unemploymentMaxWeekly: 362, unemploymentMaxWeeks: 20 },
  MN: { name: "Minnesota", abbreviation: "MN", incomeTaxRate: 0.0685, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 10.85, unemploymentMaxWeekly: 857, unemploymentMaxWeeks: 26 },
  MS: { name: "Mississippi", abbreviation: "MS", incomeTaxRate: 0.05, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 235, unemploymentMaxWeeks: 26 },
  MO: { name: "Missouri", abbreviation: "MO", incomeTaxRate: 0.048, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 13.75, unemploymentMaxWeekly: 320, unemploymentMaxWeeks: 20 },
  MT: { name: "Montana", abbreviation: "MT", incomeTaxRate: 0.059, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 10.55, unemploymentMaxWeekly: 604, unemploymentMaxWeeks: 28 },
  NE: { name: "Nebraska", abbreviation: "NE", incomeTaxRate: 0.0584, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 13.50, unemploymentMaxWeekly: 552, unemploymentMaxWeeks: 26 },
  NV: { name: "Nevada", abbreviation: "NV", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 12.00, unemploymentMaxWeekly: 517, unemploymentMaxWeeks: 26 },
  NH: { name: "New Hampshire", abbreviation: "NH", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 427, unemploymentMaxWeeks: 26 },
  NJ: { name: "New Jersey", abbreviation: "NJ", incomeTaxRate: 0.0637, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 15.49, unemploymentMaxWeekly: 854, unemploymentMaxWeeks: 26 },
  NM: { name: "New Mexico", abbreviation: "NM", incomeTaxRate: 0.049, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 12.00, unemploymentMaxWeekly: 531, unemploymentMaxWeeks: 26 },
  NY: { name: "New York", abbreviation: "NY", incomeTaxRate: 0.0685, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 16.50, unemploymentMaxWeekly: 504, unemploymentMaxWeeks: 26 },
  NC: { name: "North Carolina", abbreviation: "NC", incomeTaxRate: 0.0475, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 350, unemploymentMaxWeeks: 12 },
  ND: { name: "North Dakota", abbreviation: "ND", incomeTaxRate: 0.0195, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 673, unemploymentMaxWeeks: 26 },
  OH: { name: "Ohio", abbreviation: "OH", incomeTaxRate: 0.04, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 10.70, unemploymentMaxWeekly: 561, unemploymentMaxWeeks: 26 },
  OK: { name: "Oklahoma", abbreviation: "OK", incomeTaxRate: 0.0475, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 539, unemploymentMaxWeeks: 26 },
  OR: { name: "Oregon", abbreviation: "OR", incomeTaxRate: 0.09, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 15.45, unemploymentMaxWeekly: 733, unemploymentMaxWeeks: 26 },
  PA: { name: "Pennsylvania", abbreviation: "PA", incomeTaxRate: 0.0307, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 594, unemploymentMaxWeeks: 26 },
  RI: { name: "Rhode Island", abbreviation: "RI", incomeTaxRate: 0.0599, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 15.00, unemploymentMaxWeekly: 867, unemploymentMaxWeeks: 26 },
  SC: { name: "South Carolina", abbreviation: "SC", incomeTaxRate: 0.064, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 326, unemploymentMaxWeeks: 20 },
  SD: { name: "South Dakota", abbreviation: "SD", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 11.50, unemploymentMaxWeekly: 487, unemploymentMaxWeeks: 26 },
  TN: { name: "Tennessee", abbreviation: "TN", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 275, unemploymentMaxWeeks: 26 },
  TX: { name: "Texas", abbreviation: "TX", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 563, unemploymentMaxWeeks: 26 },
  UT: { name: "Utah", abbreviation: "UT", incomeTaxRate: 0.0465, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 668, unemploymentMaxWeeks: 26 },
  VT: { name: "Vermont", abbreviation: "VT", incomeTaxRate: 0.066, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 14.01, unemploymentMaxWeekly: 589, unemploymentMaxWeeks: 26 },
  VA: { name: "Virginia", abbreviation: "VA", incomeTaxRate: 0.0575, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 12.41, unemploymentMaxWeekly: 378, unemploymentMaxWeeks: 26 },
  WA: { name: "Washington", abbreviation: "WA", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 16.66, unemploymentMaxWeekly: 999, unemploymentMaxWeeks: 26 },
  WV: { name: "West Virginia", abbreviation: "WV", incomeTaxRate: 0.055, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 8.75, unemploymentMaxWeekly: 424, unemploymentMaxWeeks: 26 },
  WI: { name: "Wisconsin", abbreviation: "WI", incomeTaxRate: 0.053, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 370, unemploymentMaxWeeks: 26 },
  WY: { name: "Wyoming", abbreviation: "WY", incomeTaxRate: 0, hasNoIncomeTax: true, overtimeRules: 'federal', minWage: 7.25, unemploymentMaxWeekly: 560, unemploymentMaxWeeks: 26 },
  DC: { name: "Washington D.C.", abbreviation: "DC", incomeTaxRate: 0.085, hasNoIncomeTax: false, overtimeRules: 'federal', minWage: 17.50, unemploymentMaxWeekly: 444, unemploymentMaxWeeks: 26 },
};

// Role templates for quick fill
export interface RoleTemplate {
  id: string;
  name: string;
  category: 'industrial' | 'hospitality' | 'retail' | 'facilities';
  defaultHourlyRate: number;
  minRate: number;
  maxRate: number;
  typicalHoursPerWeek: number;
  hasTips: boolean;
  avgTipsPerHour?: number;
  hasNightShift: boolean;
  hasWeekendPremium: boolean;
  description: string;
}

export const roleTemplates: RoleTemplate[] = [
  // Industrial
  { id: 'warehouse-worker', name: 'Warehouse Worker', category: 'industrial', defaultHourlyRate: 17, minRate: 14, maxRate: 22, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Picking, packing, and shipping orders' },
  { id: 'forklift-operator', name: 'Forklift Operator', category: 'industrial', defaultHourlyRate: 19, minRate: 16, maxRate: 25, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Operating forklifts and material handling equipment' },
  { id: 'machine-operator', name: 'Machine Operator', category: 'industrial', defaultHourlyRate: 18, minRate: 15, maxRate: 24, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Operating production machinery' },
  { id: 'assembler', name: 'Assembler', category: 'industrial', defaultHourlyRate: 16, minRate: 14, maxRate: 21, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Assembly line production work' },
  { id: 'loader', name: 'Loader / Crew', category: 'industrial', defaultHourlyRate: 16, minRate: 14, maxRate: 20, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Loading and unloading freight' },
  
  // Hospitality
  { id: 'server', name: 'Server / Waitstaff', category: 'hospitality', defaultHourlyRate: 7, minRate: 2.13, maxRate: 15, typicalHoursPerWeek: 30, hasTips: true, avgTipsPerHour: 15, hasNightShift: false, hasWeekendPremium: true, description: 'Restaurant table service' },
  { id: 'bartender', name: 'Bartender', category: 'hospitality', defaultHourlyRate: 8, minRate: 2.13, maxRate: 15, typicalHoursPerWeek: 30, hasTips: true, avgTipsPerHour: 20, hasNightShift: true, hasWeekendPremium: true, description: 'Mixing drinks and bar service' },
  { id: 'banquet-server', name: 'Banquet Server', category: 'hospitality', defaultHourlyRate: 15, minRate: 12, maxRate: 20, typicalHoursPerWeek: 25, hasTips: true, avgTipsPerHour: 5, hasNightShift: false, hasWeekendPremium: true, description: 'Event and banquet food service' },
  { id: 'prep-cook', name: 'Prep Cook', category: 'hospitality', defaultHourlyRate: 15, minRate: 12, maxRate: 19, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: false, hasWeekendPremium: true, description: 'Food preparation and kitchen support' },
  { id: 'dishwasher', name: 'Dishwasher', category: 'hospitality', defaultHourlyRate: 14, minRate: 11, maxRate: 17, typicalHoursPerWeek: 30, hasTips: false, hasNightShift: false, hasWeekendPremium: true, description: 'Kitchen cleaning and dishwashing' },
  { id: 'event-staff', name: 'Event Staff', category: 'hospitality', defaultHourlyRate: 16, minRate: 13, maxRate: 22, typicalHoursPerWeek: 20, hasTips: true, avgTipsPerHour: 3, hasNightShift: true, hasWeekendPremium: true, description: 'Event setup, service, and breakdown' },
  
  // Retail
  { id: 'retail-associate', name: 'Retail Associate', category: 'retail', defaultHourlyRate: 15, minRate: 12, maxRate: 18, typicalHoursPerWeek: 30, hasTips: false, hasNightShift: false, hasWeekendPremium: false, description: 'Customer service and sales floor' },
  { id: 'cashier', name: 'Cashier', category: 'retail', defaultHourlyRate: 14, minRate: 11, maxRate: 17, typicalHoursPerWeek: 28, hasTips: false, hasNightShift: false, hasWeekendPremium: false, description: 'Point of sale and checkout' },
  { id: 'stock-clerk', name: 'Stock Clerk', category: 'retail', defaultHourlyRate: 15, minRate: 12, maxRate: 18, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: true, hasWeekendPremium: false, description: 'Inventory and stocking shelves' },
  
  // Facilities
  { id: 'cleaner', name: 'Cleaner', category: 'facilities', defaultHourlyRate: 14, minRate: 11, maxRate: 18, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Commercial cleaning services' },
  { id: 'custodian', name: 'Custodian', category: 'facilities', defaultHourlyRate: 15, minRate: 12, maxRate: 19, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Building maintenance and cleaning' },
];

// Shift differentials
export interface ShiftDifferential {
  id: string;
  name: string;
  description: string;
  premiumType: 'flat' | 'percentage';
  premiumAmount: number; // flat $ or percentage
}

export const shiftDifferentials: ShiftDifferential[] = [
  { id: 'night', name: 'Night Shift', description: 'Evening/overnight shifts (typically 6pm-6am)', premiumType: 'flat', premiumAmount: 1.50 },
  { id: 'weekend', name: 'Weekend Premium', description: 'Saturday and Sunday shifts', premiumType: 'flat', premiumAmount: 2.00 },
  { id: 'holiday', name: 'Holiday Pay', description: 'Work on federal holidays', premiumType: 'percentage', premiumAmount: 50 }, // time and a half
];

// 2025 Federal tax brackets (Single filer)
export const federalTaxBrackets2025 = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: Infinity, rate: 0.37 },
];

// Calculate federal tax using progressive brackets
export function calculateFederalTax(taxableIncome: number): number {
  let tax = 0;
  let remainingIncome = taxableIncome;
  
  for (const bracket of federalTaxBrackets2025) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }
  
  return tax;
}

// Quarterly tax deadlines for 2025
export const quarterlyDeadlines2025 = [
  { quarter: 'Q1', period: 'Jan 1 - Mar 31', dueDate: 'April 15, 2025', isPast: false },
  { quarter: 'Q2', period: 'Apr 1 - May 31', dueDate: 'June 16, 2025', isPast: false },
  { quarter: 'Q3', period: 'Jun 1 - Aug 31', dueDate: 'September 15, 2025', isPast: false },
  { quarter: 'Q4', period: 'Sep 1 - Dec 31', dueDate: 'January 15, 2026', isPast: false },
];

// Common deductions for gig workers
export interface Deduction {
  id: string;
  label: string;
  description: string;
  category: 'vehicle' | 'equipment' | 'business' | 'home';
  calculationType: 'per-mile' | 'annual' | 'monthly' | 'percentage';
  defaultValue: number;
  unit?: string;
}

export const commonDeductions: Deduction[] = [
  // Vehicle
  { id: 'mileage', label: 'Vehicle Mileage', description: '70¢ per mile (2025 IRS rate)', category: 'vehicle', calculationType: 'per-mile', defaultValue: 0.70, unit: 'miles' },
  { id: 'parking', label: 'Parking & Tolls', description: 'Work-related parking and toll fees', category: 'vehicle', calculationType: 'annual', defaultValue: 500 },
  
  // Equipment
  { id: 'phone', label: 'Phone Bill (work %)', description: 'Business portion of cell phone', category: 'equipment', calculationType: 'monthly', defaultValue: 50 },
  { id: 'uniform', label: 'Work Uniforms', description: 'Required work clothing and safety gear', category: 'equipment', calculationType: 'annual', defaultValue: 250 },
  { id: 'tools', label: 'Tools & Equipment', description: 'Work-related tools and supplies', category: 'equipment', calculationType: 'annual', defaultValue: 200 },
  { id: 'computer', label: 'Computer/Tech', description: 'Work-related devices and software', category: 'equipment', calculationType: 'annual', defaultValue: 300 },
  
  // Business
  { id: 'meals', label: 'Business Meals', description: '50% of work-related meals deductible', category: 'business', calculationType: 'annual', defaultValue: 400 },
  { id: 'professional', label: 'Professional Services', description: 'Tax prep, legal, accounting', category: 'business', calculationType: 'annual', defaultValue: 300 },
  { id: 'insurance', label: 'Health Insurance', description: 'Self-employed health insurance deduction', category: 'business', calculationType: 'annual', defaultValue: 0 },
  
  // Home Office
  { id: 'homeoffice', label: 'Home Office', description: 'Simplified method: $5/sq ft up to 300 sq ft', category: 'home', calculationType: 'annual', defaultValue: 750 },
];

// Get sorted states list
export function getSortedStates(): Array<{ code: string; name: string }> {
  return Object.entries(stateTaxData)
    .map(([code, data]) => ({ code, name: data.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Get states with no income tax
export function getNoIncomeTaxStates(): string[] {
  return Object.entries(stateTaxData)
    .filter(([, data]) => data.hasNoIncomeTax)
    .map(([code]) => code);
}
