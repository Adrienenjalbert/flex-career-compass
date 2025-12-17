import { ExternalLink, Building2, FileText, GraduationCap, Briefcase, Heart, DollarSign, LucideIcon, Truck, UtensilsCrossed, ShoppingBag, Scale, BookOpen, Shield, Warehouse, Users } from "lucide-react";

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

// Helper function to get resources by category
export const getResourcesByCategory = (category: 'government' | 'tax' | 'healthcare' | 'certifications' | 'financial' | 'warehouse' | 'hospitality' | 'retail' | 'rights' | 'learning'): ExternalResource[] => {
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
    default:
      return [];
  }
};
