import { ExternalLink, Building2, FileText, GraduationCap, Briefcase, Heart, DollarSign, LucideIcon, Truck, UtensilsCrossed, ShoppingBag, Scale, BookOpen, Shield, Warehouse, Users, Sun, Calendar, Receipt, FileCheck, BadgeCheck, IdCard } from "lucide-react";

export interface ExternalResource {
  name: string;
  url: string;
  description: string;
  icon?: LucideIcon;
}

export interface ResourceCategory {
  title: string;
  icon: LucideIcon;
  resources: ExternalResource[];
}

// Government assistance resources
export const governmentResources: ExternalResource[] = [
  {
    name: "211 Helpline",
    url: "https://211.org",
    description: "Free, confidential help with bills, food, housing, and more. Call or text 211 anytime.",
    icon: Heart
  },
  {
    name: "USA.gov Benefits Finder",
    url: "https://www.usa.gov/benefit-finder",
    description: "Answer a few questions to find government programs you may qualify for.",
    icon: Building2
  },
  {
    name: "SNAP Food Assistance",
    url: "https://www.fns.usda.gov/snap/recipient/eligibility",
    description: "Supplemental Nutrition Assistance Program helps eligible people buy food.",
    icon: Heart
  },
  {
    name: "CareerOneStop",
    url: "https://www.careeronestop.org",
    description: "Free career exploration, training, and job search resources from the U.S. Department of Labor.",
    icon: Briefcase
  },
  {
    name: "Benefits.gov",
    url: "https://www.benefits.gov",
    description: "Official benefits website to find government benefits you may be eligible to receive.",
    icon: Building2
  },
  {
    name: "Workforce Innovation & Opportunity Act",
    url: "https://www.dol.gov/agencies/eta/wioa",
    description: "Free job training, education, and employment services through local workforce centers.",
    icon: GraduationCap
  },
  {
    name: "American Job Centers",
    url: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx",
    description: "Free career services, job listings, and training programs at local workforce centers.",
    icon: Briefcase
  }
];

// Tax resources
export const taxResources: ExternalResource[] = [
  {
    name: "IRS VITA Program",
    url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
    description: "Free tax preparation for those earning $67,000 or less. Call 800-906-9887 for locations.",
    icon: FileText
  },
  {
    name: "IRS Free File",
    url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
    description: "Free online tax filing for incomes under $84,000 through IRS partner companies.",
    icon: FileText
  },
  {
    name: "IRS Direct Pay",
    url: "https://www.irs.gov/payments",
    description: "Pay federal taxes directly from your bank account. No fees, secure, and instant confirmation.",
    icon: DollarSign
  },
  {
    name: "Estimated Tax Payments (Form 1040-ES)",
    url: "https://www.irs.gov/forms-pubs/about-form-1040-es",
    description: "Calculate and pay quarterly estimated taxes for self-employment income.",
    icon: FileText
  },
  {
    name: "IRS Gig Economy Tax Center",
    url: "https://www.irs.gov/businesses/gig-economy-tax-center",
    description: "Tax information specifically for gig workers, freelancers, and independent contractors.",
    icon: FileText
  },
  {
    name: "State Tax Agencies",
    url: "https://www.taxadmin.org/state-tax-agencies",
    description: "Find your state tax agency for state income tax filing and information.",
    icon: Building2
  }
];

// Healthcare resources
export const healthcareResources: ExternalResource[] = [
  {
    name: "Healthcare.gov",
    url: "https://www.healthcare.gov",
    description: "Find ACA marketplace plans with subsidies based on income. Open enrollment Nov-Jan.",
    icon: Heart
  },
  {
    name: "Medicaid Eligibility",
    url: "https://www.medicaid.gov/medicaid/eligibility/index.html",
    description: "Check if you qualify for free or low-cost health coverage through Medicaid.",
    icon: Heart
  },
  {
    name: "Community Health Centers",
    url: "https://findahealthcenter.hrsa.gov",
    description: "Find affordable healthcare services near you, regardless of ability to pay.",
    icon: Heart
  },
  {
    name: "NeedyMeds",
    url: "https://www.needymeds.org",
    description: "Find free clinics, prescription assistance, and healthcare savings programs.",
    icon: Heart
  },
  {
    name: "RxAssist",
    url: "https://www.rxassist.org",
    description: "Database of patient assistance programs for affordable prescription medications.",
    icon: Heart
  }
];

// Warehouse & Industrial certifications
export const warehouseResources: ExternalResource[] = [
  {
    name: "OSHA Education Center",
    url: "https://www.oshaeducationcenter.com",
    description: "OSHA 10 & 30 hour certifications. $25-89, adds $1-3/hr for warehouse and industrial roles.",
    icon: Shield
  },
  {
    name: "National Forklift Foundation",
    url: "https://www.forkliftcertification.com",
    description: "Forklift certification programs. $60-150, increases pay by $3-5/hr in warehouse roles.",
    icon: Truck
  },
  {
    name: "APICS Supply Chain",
    url: "https://www.ascm.org",
    description: "Supply chain and operations management certifications for career advancement.",
    icon: Warehouse
  },
  {
    name: "Coursera Warehouse Courses",
    url: "https://www.coursera.org/search?query=warehouse%20management",
    description: "Free audit options for warehouse management, logistics, and supply chain courses.",
    icon: BookOpen
  },
  {
    name: "OSHA Outreach Training",
    url: "https://www.osha.gov/training/outreach",
    description: "Official OSHA workplace safety training programs and authorized provider list.",
    icon: Shield
  }
];

// Hospitality certifications
export const hospitalityResources: ExternalResource[] = [
  {
    name: "ServSafe Food Handler",
    url: "https://www.servsafe.com",
    description: "Industry-standard food safety certification. $15-18 for Food Handler, unlocks hospitality roles.",
    icon: UtensilsCrossed
  },
  {
    name: "TIPS Alcohol Training",
    url: "https://www.gettips.com",
    description: "Alcohol service certification. $38-55, often required for bartending. Can increase pay $5-10/hr.",
    icon: GraduationCap
  },
  {
    name: "National Restaurant Association",
    url: "https://restaurant.org/education-and-resources/",
    description: "Industry resources, training programs, and certifications for food service professionals.",
    icon: UtensilsCrossed
  },
  {
    name: "American Hotel & Lodging Association",
    url: "https://www.ahla.com/education",
    description: "Hotel industry certifications including Certified Guest Service Professional.",
    icon: Building2
  },
  {
    name: "BarSmarts",
    url: "https://www.barsmarts.com",
    description: "Free professional bartending training program from Pernod Ricard. Industry-recognized.",
    icon: GraduationCap
  },
  {
    name: "Allergen Training",
    url: "https://www.alwaysfoods.com",
    description: "Food allergen awareness certification. Increasingly required in food service.",
    icon: UtensilsCrossed
  }
];

// Retail resources
export const retailResources: ExternalResource[] = [
  {
    name: "National Retail Federation",
    url: "https://nrf.com/resources/retail-library/credentials",
    description: "Retail industry certifications including Customer Service and Sales Associate credentials.",
    icon: ShoppingBag
  },
  {
    name: "Retail Council of Canada Training",
    url: "https://www.retailcouncil.org/training/",
    description: "Free and paid retail training programs and resources for career development.",
    icon: ShoppingBag
  },
  {
    name: "LinkedIn Learning - Retail",
    url: "https://www.linkedin.com/learning/topics/retail",
    description: "Retail management and customer service courses. Free trial available.",
    icon: BookOpen
  },
  {
    name: "Coursera Retail Courses",
    url: "https://www.coursera.org/search?query=retail",
    description: "Free audit options for retail management, visual merchandising, and customer experience.",
    icon: BookOpen
  }
];

// General certifications
export const certificationResources: ExternalResource[] = [
  {
    name: "ServSafe Food Handler",
    url: "https://www.servsafe.com",
    description: "Industry-standard food safety certification. $15-18 for Food Handler, unlocks hospitality roles.",
    icon: GraduationCap
  },
  {
    name: "TIPS Alcohol Training",
    url: "https://www.gettips.com",
    description: "Alcohol service certification. $38-55, often required for bartending. Can increase pay $5-10/hr.",
    icon: GraduationCap
  },
  {
    name: "OSHA Education Center",
    url: "https://www.oshaeducationcenter.com",
    description: "OSHA 10 & 30 hour certifications. $25-89, adds $1-3/hr for warehouse and industrial roles.",
    icon: GraduationCap
  },
  {
    name: "National Forklift Training",
    url: "https://www.osha.gov/training/outreach",
    description: "Forklift certification typically $60-150, increases pay by $3-5/hr in warehouse roles.",
    icon: GraduationCap
  },
  {
    name: "American Red Cross",
    url: "https://www.redcross.org/take-a-class",
    description: "First Aid/CPR certification. $25-90, valuable across industries and for personal safety.",
    icon: GraduationCap
  },
  {
    name: "Microsoft Office Specialist",
    url: "https://learn.microsoft.com/en-us/certifications/mos-certification",
    description: "Microsoft Office certification validates Excel, Word, PowerPoint skills. $100-150 per exam.",
    icon: GraduationCap
  },
  {
    name: "Google Career Certificates",
    url: "https://grow.google/certificates/",
    description: "Professional certificates in IT Support, Data Analytics, Project Management. Financial aid available.",
    icon: GraduationCap
  }
];

// Financial tools and apps
export const financialToolResources: ExternalResource[] = [
  {
    name: "Stride (Mileage Tracking)",
    url: "https://www.stridehealth.com",
    description: "Free mileage and expense tracking app designed for gig workers. Also helps find health insurance.",
    icon: DollarSign
  },
  {
    name: "YNAB (Budgeting)",
    url: "https://www.ynab.com",
    description: "Zero-based budgeting app great for irregular income. 34-day free trial.",
    icon: DollarSign
  },
  {
    name: "NerdWallet (Financial Advice)",
    url: "https://www.nerdwallet.com",
    description: "Compare financial products, calculators, and educational content on personal finance.",
    icon: DollarSign
  },
  {
    name: "Fidelity (Retirement)",
    url: "https://www.fidelity.com",
    description: "No-minimum IRAs with excellent low-cost index funds. Easy to open and manage.",
    icon: DollarSign
  },
  {
    name: "Chime (Banking)",
    url: "https://www.chime.com",
    description: "No-fee banking with early direct deposit. Good option for workers without traditional bank accounts.",
    icon: DollarSign
  },
  {
    name: "Experian Boost",
    url: "https://www.experian.com/consumer-products/score-boost.html",
    description: "Free service to boost credit score by adding utility and phone payments to credit history.",
    icon: DollarSign
  },
  {
    name: "Credit Karma",
    url: "https://www.creditkarma.com",
    description: "Free credit monitoring, score tracking, and personalized financial recommendations.",
    icon: DollarSign
  }
];

// Worker rights and legal resources
export const workerRightsResources: ExternalResource[] = [
  {
    name: "Department of Labor - Wage & Hour",
    url: "https://www.dol.gov/agencies/whd",
    description: "Information on minimum wage, overtime, and worker rights. File complaints for wage theft.",
    icon: Scale
  },
  {
    name: "National Labor Relations Board",
    url: "https://www.nlrb.gov",
    description: "Protects workers' rights to organize and ensures fair labor practices.",
    icon: Users
  },
  {
    name: "EEOC (Discrimination)",
    url: "https://www.eeoc.gov",
    description: "File complaints for workplace discrimination based on race, gender, age, disability, etc.",
    icon: Scale
  },
  {
    name: "Workers' Rights Guide",
    url: "https://www.dol.gov/general/topic/workhours",
    description: "Official DOL guide to work hours, overtime, and leave requirements.",
    icon: FileText
  },
  {
    name: "Gig Workers Rising",
    url: "https://www.gigworkersrising.org",
    description: "Advocacy and resources for gig workers, including know your rights information.",
    icon: Users
  }
];

// Free learning platforms
export const learningResources: ExternalResource[] = [
  {
    name: "Coursera (Free Audit)",
    url: "https://www.coursera.org",
    description: "Audit most courses for free. Skills in business, tech, and personal development.",
    icon: BookOpen
  },
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org",
    description: "100% free education in math, finance, economics, and more. Great for skill building.",
    icon: BookOpen
  },
  {
    name: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/",
    description: "Professional courses on soft skills, business, and technology. Free trial available.",
    icon: BookOpen
  },
  {
    name: "Alison",
    url: "https://www.alison.com",
    description: "Free online courses with certificates. Workplace skills, health & safety, and more.",
    icon: BookOpen
  },
  {
    name: "edX",
    url: "https://www.edx.org",
    description: "Free courses from top universities. Professional certificates available for a fee.",
    icon: BookOpen
  },
  {
    name: "Google Digital Garage",
    url: "https://learndigitalwithgoogle.com",
    description: "Free courses on digital marketing, data, and career development from Google.",
    icon: BookOpen
  }
];

// ============================================
// SEASONAL HIRING RESOURCES - 2026
// ============================================

// Holiday/Warehouse seasonal hiring
export const seasonalWarehouseResources: ExternalResource[] = [
  {
    name: "Amazon Seasonal Jobs",
    url: "https://www.amazon.jobs/en/landing_pages/hourly-jobs",
    description: "Apply for warehouse, delivery, and seasonal positions. Amazon hires 150,000+ workers for holiday peak.",
    icon: Warehouse
  },
  {
    name: "UPS Seasonal Careers",
    url: "https://www.jobs-ups.com/category/package-handler-jobs/1187/4362/1",
    description: "Package handlers, driver helpers, and seasonal positions. UPS hires 100,000+ for peak season.",
    icon: Truck
  },
  {
    name: "FedEx Peak Season Jobs",
    url: "https://careers.fedex.com/",
    description: "Package handler and driver positions during holiday rush. FedEx hires 70,000+ seasonally.",
    icon: Truck
  },
  {
    name: "Target Seasonal Careers",
    url: "https://jobs.target.com/hourly-store-roles",
    description: "Distribution center and store positions. Target hires 100,000+ for the holiday season.",
    icon: ShoppingBag
  },
  {
    name: "Walmart Seasonal Jobs",
    url: "https://careers.walmart.com/",
    description: "Fulfillment center and store associate positions for holiday season staffing.",
    icon: ShoppingBag
  },
  {
    name: "USPS Holiday Hiring",
    url: "https://about.usps.com/careers/",
    description: "Postal Service Assistants and mail handlers for holiday mail volume surge.",
    icon: Truck
  },
  {
    name: "DHL Express Careers",
    url: "https://careers.dhl.com/",
    description: "Package handlers and logistics positions during e-commerce peak season.",
    icon: Truck
  },
  {
    name: "XPO Logistics Jobs",
    url: "https://jobs.xpo.com/",
    description: "Third-party logistics warehouse positions handling major retailer fulfillment.",
    icon: Warehouse
  }
];

// Event and hospitality staffing
export const eventStaffingResources: ExternalResource[] = [
  {
    name: "Live Nation Careers",
    url: "https://www.livenationentertainment.com/careers/",
    description: "Event staff positions at concerts, festivals, and venues nationwide. Largest live events company.",
    icon: Users
  },
  {
    name: "Legends Hospitality",
    url: "https://www.legends.net/careers",
    description: "Premium hospitality at stadiums and arenas. Super Bowl, major sports, and concerts.",
    icon: Building2
  },
  {
    name: "Aramark Event Services",
    url: "https://careers.aramark.com/",
    description: "Catering, concessions, and hospitality at stadiums, arenas, and convention centers.",
    icon: UtensilsCrossed
  },
  {
    name: "Levy Restaurants",
    url: "https://www.levyrestaurants.com/careers/",
    description: "Premium food service at sports venues, convention centers, and special events.",
    icon: UtensilsCrossed
  },
  {
    name: "AEG Worldwide Careers",
    url: "https://www.aegworldwide.com/careers",
    description: "Event staffing at AEG-owned venues including Staples Center, O2 Arena, and festivals.",
    icon: Users
  },
  {
    name: "Delaware North Hospitality",
    url: "https://careers.delawarenorth.com/",
    description: "Hospitality services at national parks, stadiums, airports, and entertainment venues.",
    icon: Building2
  },
  {
    name: "Centerplate Careers",
    url: "https://www.centerplate.com/careers/",
    description: "Food and beverage service at convention centers and special events nationwide.",
    icon: UtensilsCrossed
  },
  {
    name: "Staffing Agencies - Events",
    url: "https://www.indeed.com/q-event-staffing-jobs.html",
    description: "Search event staffing positions from multiple agencies on Indeed.",
    icon: Briefcase
  }
];

// Tax season hiring
export const taxSeasonResources: ExternalResource[] = [
  {
    name: "H&R Block Seasonal Jobs",
    url: "https://www.hrblock.com/corporate/careers/",
    description: "Tax preparer, receptionist, and support roles. Free training provided. 60,000+ seasonal positions.",
    icon: FileText
  },
  {
    name: "Jackson Hewitt Careers",
    url: "https://www.jacksonhewitt.com/careers/",
    description: "Tax preparation positions at retail locations. Training and certification included.",
    icon: FileText
  },
  {
    name: "Intuit TurboTax Experts",
    url: "https://www.intuit.com/careers/",
    description: "Remote tax expert positions. Flexible schedules, work from home during tax season.",
    icon: FileText
  },
  {
    name: "Liberty Tax Careers",
    url: "https://www.libertytax.com/careers/",
    description: "Tax preparer and marketing positions. Comprehensive training for new preparers.",
    icon: FileText
  },
  {
    name: "IRS Seasonal Jobs",
    url: "https://www.jobs.irs.gov/",
    description: "IRS Seasonal Processing positions. Government pay and benefits for tax season.",
    icon: Building2
  },
  {
    name: "Robert Half Tax Staffing",
    url: "https://www.roberthalf.com/",
    description: "Temporary accounting and tax support positions at CPA firms during tax season.",
    icon: Briefcase
  }
];

// Summer hospitality
export const summerHospitalityResources: ExternalResource[] = [
  {
    name: "CoolWorks Summer Jobs",
    url: "https://www.coolworks.com/",
    description: "Jobs at national parks, resorts, ranches, and outdoor recreation destinations.",
    icon: Sun
  },
  {
    name: "Marriott Careers",
    url: "https://careers.marriott.com/",
    description: "Resort and hotel positions nationwide. Seasonal and year-round hospitality.",
    icon: Building2
  },
  {
    name: "Hilton Jobs",
    url: "https://jobs.hilton.com/",
    description: "Hotel and resort positions. Strong summer demand at vacation destinations.",
    icon: Building2
  },
  {
    name: "Omni Hotels Careers",
    url: "https://www.omnihotels.com/careers",
    description: "Luxury resort positions. Pool, restaurant, and event staffing for summer season.",
    icon: Building2
  },
  {
    name: "Xanterra Travel Collection",
    url: "https://www.xanterra.com/careers/",
    description: "Jobs at Yellowstone, Grand Canyon, and other national park destinations.",
    icon: Sun
  },
  {
    name: "Vail Resorts Summer Jobs",
    url: "https://jobs.vailresorts.com/",
    description: "Mountain resort positions. Hospitality, food service, and outdoor recreation.",
    icon: Sun
  }
];

// Indeed Flex specific links
export const indeedFlexLinks = {
  download: {
    name: "Download Indeed Flex",
    url: "https://indeedflex.com/download-app/",
    description: "Get the Indeed Flex app to find flexible shifts that fit your schedule."
  },
  benefits: {
    name: "Indeed Flex Benefits",
    url: "https://indeedflex.com/benefits-pay/",
    description: "Learn about medical benefits, rewards, and perks available to Flexers."
  },
  sameDayPay: {
    name: "Same Day Pay",
    url: "https://indeedflex.com/benefits-pay/same-day-pay/",
    description: "Access up to 50% of your earnings within 1 hour of completing a shift."
  },
  howItWorks: {
    name: "How Indeed Flex Works",
    url: "https://indeedflex.com/how-the-app-works/",
    description: "See how to find shifts, get verified, and start earning with Indeed Flex."
  },
  roles: {
    name: "Available Roles",
    url: "https://indeedflex.com/roles-and-industries/",
    description: "Explore industrial, hospitality, retail, and clerical roles available on Indeed Flex."
  }
};

// Grouped resources by category for display
export const resourceCategories: ResourceCategory[] = [
  {
    title: "Government Assistance",
    icon: Building2,
    resources: governmentResources
  },
  {
    title: "Tax Help",
    icon: FileText,
    resources: taxResources
  },
  {
    title: "Healthcare",
    icon: Heart,
    resources: healthcareResources
  },
  {
    title: "Certifications",
    icon: GraduationCap,
    resources: certificationResources
  },
  {
    title: "Warehouse & Industrial",
    icon: Warehouse,
    resources: warehouseResources
  },
  {
    title: "Hospitality",
    icon: UtensilsCrossed,
    resources: hospitalityResources
  },
  {
    title: "Retail",
    icon: ShoppingBag,
    resources: retailResources
  },
  {
    title: "Financial Tools",
    icon: DollarSign,
    resources: financialToolResources
  },
  {
    title: "Worker Rights",
    icon: Scale,
    resources: workerRightsResources
  },
  {
    title: "Free Learning",
    icon: BookOpen,
    resources: learningResources
  }
];

// ============================================
// EMPLOYMENT ELIGIBILITY RESOURCES
// ============================================

export const employmentEligibilityResources: ExternalResource[] = [
  {
    name: "USCIS I-9 Central",
    url: "https://www.uscis.gov/i-9-central",
    description: "Official USCIS resource for I-9 forms, instructions, and acceptable documents list.",
    icon: FileCheck
  },
  {
    name: "Form I-9 Download",
    url: "https://www.uscis.gov/i-9",
    description: "Download the current Form I-9 and review detailed instructions from USCIS.",
    icon: FileText
  },
  {
    name: "E-Verify Self Check",
    url: "https://www.e-verify.gov/employees/e-verify-overview/self-check",
    description: "Free service to check your own work authorization before starting a new job.",
    icon: BadgeCheck
  },
  {
    name: "Social Security Number Application",
    url: "https://www.ssa.gov/number-card/request-number-first-time",
    description: "Apply for your Social Security number online or find your local SSA office.",
    icon: IdCard
  },
  {
    name: "ITIN Application (Form W-7)",
    url: "https://www.irs.gov/individuals/individual-taxpayer-identification-number",
    description: "Apply for an Individual Taxpayer Identification Number if you don't qualify for an SSN.",
    icon: FileText
  },
  {
    name: "I-9 Acceptable Documents",
    url: "https://www.uscis.gov/i-9-central/form-i-9-acceptable-documents",
    description: "Official list of acceptable documents for Form I-9 verification.",
    icon: FileCheck
  },
  {
    name: "Handbook for Employers (M-274)",
    url: "https://www.uscis.gov/i-9-central/form-i-9-resources/handbook-for-employers-m-274",
    description: "Comprehensive employer guide—useful for understanding what employers should do.",
    icon: BookOpen
  },
  {
    name: "Immigrant and Employee Rights",
    url: "https://www.justice.gov/crt/immigrant-and-employee-rights-section",
    description: "Report discrimination in employment verification. Hotline: 1-800-255-7688.",
    icon: Scale
  },
  {
    name: "E-Verify Overview for Employees",
    url: "https://www.e-verify.gov/employees/e-verify-overview",
    description: "Learn how E-Verify works and what to do if you receive a Tentative Nonconfirmation.",
    icon: BadgeCheck
  },
  {
    name: "Find Your Local SSA Office",
    url: "https://www.ssa.gov/locator/",
    description: "Locate the nearest Social Security Administration office for in-person services.",
    icon: Building2
  },
  {
    name: "U.S. Passport Application",
    url: "https://travel.state.gov/content/travel/en/passports/need-passport/apply-in-person.html",
    description: "Apply for a U.S. passport—the easiest single document for I-9 verification.",
    icon: IdCard
  },
  {
    name: "USCIS Case Status Check",
    url: "https://egov.uscis.gov/casestatus/landing.do",
    description: "Check the status of your pending immigration case or application.",
    icon: FileCheck
  }
];

// Helper function to get resources by category
export const getResourcesByCategory = (category: 'government' | 'tax' | 'healthcare' | 'certifications' | 'financial' | 'warehouse' | 'hospitality' | 'retail' | 'rights' | 'learning' | 'seasonal-warehouse' | 'seasonal-events' | 'seasonal-tax' | 'seasonal-summer' | 'employment-eligibility'): ExternalResource[] => {
  switch (category) {
    case 'government':
      return governmentResources;
    case 'tax':
      return taxResources;
    case 'healthcare':
      return healthcareResources;
    case 'certifications':
      return certificationResources;
    case 'financial':
      return financialToolResources;
    case 'warehouse':
      return warehouseResources;
    case 'hospitality':
      return hospitalityResources;
    case 'retail':
      return retailResources;
    case 'rights':
      return workerRightsResources;
    case 'learning':
      return learningResources;
    case 'seasonal-warehouse':
      return seasonalWarehouseResources;
    case 'seasonal-events':
      return eventStaffingResources;
    case 'seasonal-tax':
      return taxSeasonResources;
    case 'seasonal-summer':
      return summerHospitalityResources;
    case 'employment-eligibility':
      return employmentEligibilityResources;
    default:
      return [];
  }
};
